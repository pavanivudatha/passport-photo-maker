document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const imageToCrop = document.getElementById('imageToCrop');
    const cropBtn = document.getElementById('cropBtn');
    const resultCanvas = document.getElementById('resultCanvas');
    const downloadLink = document.getElementById('downloadLink');
    const printBtn = document.getElementById('printBtn');

    const cropSection = document.querySelector('.crop-section');
    const resultSection = document.querySelector('.result-section');

    let cropper = null;

    // Vertical Photo Dimensions (3.5cm x 4.5cm)
    const PASSPORT_ASPECT_RATIO = 3.5 / 4.5;
    const CROP_WIDTH = 413;
    const CROP_HEIGHT = 531;

    imageUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                imageToCrop.src = reader.result;
                cropSection.classList.remove('hidden');
                resultSection.classList.add('hidden');

                if (cropper) cropper.destroy();

                cropper = new Cropper(imageToCrop, {
                    aspectRatio: PASSPORT_ASPECT_RATIO,
                    viewMode: 1,
                    guides: true,
                    background: false,
                    autoCropArea: 0.8,
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });

    cropBtn.addEventListener('click', () => {
        if (!cropper) return;

        const selectedLayout = document.querySelector('input[name="sheetSize"]:checked').value;
        const photoCount = parseInt(selectedLayout, 10);

        const croppedCanvas = cropper.getCroppedCanvas({
            width: CROP_WIDTH,
            height: CROP_HEIGHT,
            imageSmoothingQuality: 'high',
        });

        resultSection.classList.remove('hidden');
        drawPhotoSheet(croppedCanvas, photoCount);
    });

    function drawPhotoSheet(singlePhotoCanvas, photoCount) {
        // 1. Flip the cropped image horizontally
        const flippedCanvas = document.createElement('canvas');
        const flippedCtx = flippedCanvas.getContext('2d');
        flippedCanvas.width = CROP_WIDTH;
        flippedCanvas.height = CROP_HEIGHT;
       // flippedCtx.scale(-1, 1);
       // flippedCtx.translate(-CROP_WIDTH, 0);
        flippedCtx.drawImage(singlePhotoCanvas, 0, 0);

        // 2. Rotate the flipped image 90 degrees left
        const rotatedCanvas = document.createElement('canvas');
        const rotatedCtx = rotatedCanvas.getContext('2d');
        rotatedCanvas.width = CROP_HEIGHT;
        rotatedCanvas.height = CROP_WIDTH;

        rotatedCtx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
        rotatedCtx.rotate(-Math.PI / 2);
        rotatedCtx.translate(-flippedCanvas.width / 2, -flippedCanvas.height / 2);
        rotatedCtx.drawImage(flippedCanvas, 0, 0);

        const FINAL_PHOTO_WIDTH = rotatedCanvas.width;
        const FINAL_PHOTO_HEIGHT = rotatedCanvas.height;

        const ctx = resultCanvas.getContext('2d');
        const BORDER_WIDTH = 4;
        const SHEET_WIDTH = 1200;
        const SHEET_HEIGHT = 1800;

        resultCanvas.width = SHEET_WIDTH;
        resultCanvas.height = SHEET_HEIGHT;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, SHEET_WIDTH, SHEET_HEIGHT);

        let photosPerRow, photosPerCol;
        let horizontalPadding, verticalPadding;

        if (photoCount === 4) {
            // --- This logic arranges photos on the TOP HALF of the sheet ---
            photosPerRow = 2;
            photosPerCol = 2;
            
            const drawingAreaHeight = SHEET_HEIGHT / 2; // Confine to the top half
            const totalPhotosWidth = photosPerRow * FINAL_PHOTO_WIDTH;
            const totalPhotosHeight = photosPerCol * FINAL_PHOTO_HEIGHT;
            
            horizontalPadding = (SHEET_WIDTH - totalPhotosWidth) / (photosPerRow + 1);
            verticalPadding = (drawingAreaHeight - totalPhotosHeight) / (photosPerCol + 1);

        } else { // 8 photos
            photosPerRow = 2;
            photosPerCol = 4;
            const totalPhotosWidth = photosPerRow * FINAL_PHOTO_WIDTH;
            const totalPhotosHeight = photosPerCol * FINAL_PHOTO_HEIGHT;
            horizontalPadding = (SHEET_WIDTH - totalPhotosWidth) / (photosPerRow + 1);
            verticalPadding = (SHEET_HEIGHT - totalPhotosHeight) / (photosPerCol + 1);
        }

        for (let row = 0; row < photosPerCol; row++) {
            for (let col = 0; col < photosPerRow; col++) {
                const x = horizontalPadding + col * (FINAL_PHOTO_WIDTH + horizontalPadding);
                const y = verticalPadding + row * (FINAL_PHOTO_HEIGHT + verticalPadding);

                ctx.fillStyle = 'black';
                ctx.fillRect(x - BORDER_WIDTH, y - BORDER_WIDTH, FINAL_PHOTO_WIDTH + (BORDER_WIDTH * 2), FINAL_PHOTO_HEIGHT + (BORDER_WIDTH * 2));
                
                ctx.drawImage(rotatedCanvas, x, y);
            }
        }
        downloadLink.href = resultCanvas.toDataURL('image/jpeg', 0.95);
        downloadLink.download = `passport_photos_${photoCount}_sheet.jpg`;
    }

    printBtn.addEventListener('click', () => {
        const dataUrl = resultCanvas.toDataURL('image/jpeg');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Passport Photos</title>
                <style>
                    @media print {
                        @page {
                            size: 4in 6in portrait;
                            margin: 0;
                        }
                        body { margin: 0; }
                        img { width: 100%; height: 100%; display: block; }
                    }
                </style>
            </head>
            <body>
                <img src="${dataUrl}" />
                <script>
                    setTimeout(() => {
                        window.print();
                        window.onafterprint = () => window.close();
                    }, 250);
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    });
});