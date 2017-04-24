# PHANTOM TESTING APP (v1.9.8) #


## Installation ##

1. Installs dependencies

    ```
    npm run build
    ```


2. Start server

    ```
    grunt dev
    ```

3. Preview
    ```
    localhost:3040/
    ```
4. PDF file
    ```
    ./preview.pdf
    ```
4. Info

    ```
    * Header and footer is in ./views/index.ejs -> place there all additional scripts and styles
    
    * PDF content is in ./views/layout.ejs
    
    * Write styles in SASS (./public/scss/styles.scss) - it will automatically convert to ./public/css/styles.css file
    
    * Write javascript in ./public/javascipts/scripts.js
    
    * If you want to change:
        - PDF orientation: 
            ./phantom/pdfize.js -> orientation: 'landscape'/'portrait'
        - PDF borders: 
            ./phantom/pdfize.js -> border: { 'top': '1cm', 'left': '1cm', 'right': '1cm', 'bottom': '0.5cm' }
        - PDF footer:
            ./phantom/pdfize.js -> footer: height && contents
    ```