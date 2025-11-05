# 📸 Passport Photo Maker

A simple, client-side web application to generate printable passport-sized photo sheets from any image. This tool allows for on-the-fly image adjustments, background changes, and layout selection.

## 🚀 Live Demo

**[Try the live version deployed on Vercel!]([httpsIA://YOUR_VERCEL_LINK_HERE](https://passport-photo-maker-seven.vercel.app/))**


## ✨ Features

* **Upload Image:** Upload any photo from your device.
* **Interactive Crop:** Crop your image to the standard 3.5cm x 4.5cm passport photo aspect ratio.
* **Live Adjustments:** Instantly see changes as you adjust **Brightness**, **Contrast**, **Saturation**, and **Grayscale**.
* **Background Change:** Automatically removes a simple, solid-color background and replaces it with white, blue, grey, or a custom color.
* **Image Transformations:** Includes options to **flip** (mirror) and **rotate** the final photos.
* **Multiple Layouts:** Choose between a 4-photo (on the top half of a sheet) or 8-photo (on a full sheet) layout.
* **Print-Ready:** Generates a 4x6 inch portrait sheet with a 2px border on each photo.
* **Direct Print & Download:** Instantly download the JPG sheet or send it directly to your printer.

---

## 🛠️ Technology Used

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **[Cropper.js](https://github.com/fengyuanchen/cropperjs):** A powerful JavaScript library for image cropping.

This project is fully **client-side** and runs entirely in your browser. No data is ever uploaded to a server.

---

## 🚀 How to Use

1.  Click **Choose Image** to upload your photo.
2.  Move and resize the crop box to frame your face. The aspect ratio is locked.
3.  Use the sliders to adjust brightness, contrast, and other settings in the live preview.
4.  Select a new background color if desired. (Works best on simple, solid backgrounds).
5.  Choose a 4-photo or 8-photo layout.
6.  Click **Generate Passport Photos**.
7.  Click **Download Sheet** or **Print Sheet**.

---

## 💻 How to Run Locally

Since this is a static site, you don't need any complex setup.

1.  **Clone the repository:**
    ```bash
    git clone ([https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/pavanivudatha/passport-photo-maker.git))
    ```
2.  **Navigate to the folder:**
    ```bash
    cd YOUR_REPO_NAME
    ```
3.  **Open the file:**
    Just double-click the `index.html` file to open it in your web browser.

---

## 📄 License

This project is open-source and available under the **MIT License**.
