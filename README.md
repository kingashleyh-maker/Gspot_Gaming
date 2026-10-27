# G Spot Automotive Kiosk

## Open the project

1. Extract the entire ZIP folder.
2. In Visual Studio Code, choose **File → Open Folder** and select **Gspot**.
3. Right-click **index.html** and choose **Open with Live Server** (install the Live Server extension if needed).

You can also open index.html directly in a modern browser. Keep the folder structure intact. No npm install or build step is required.

## Files and editing guide

| File or folder | Purpose |
| --- | --- |
| index.html | Page title, app container, file links and demo notice |
| css/styles.css | Theme colors, layout, Tailwind utilities and local font declarations |
| js/app.js | React application, screens, demo data and bundled libraries |
| js/ui.js | Demo notice dismiss button |
| assets/images/ | Extracted kiosk images |
| assets/fonts/ | Extracted local fonts |

Use **Ctrl+Shift+F** in VS Code to find visible labels, product names or prices across the project. Find the matching entry in js/app.js before making an edit. Replace images using the same filename, or update their paths in js/app.js. Paths in CSS are relative to the css folder; image paths in the app are relative to index.html.

## Cleanup performed

- Separated HTML, CSS and JavaScript.
- Formatted JavaScript and CSS with two-space indentation.
- Extracted embedded images and fonts into local asset folders and reused identical assets.
- Moved the demo notice click handler into js/ui.js.
- Preserved the existing screen logic and third-party license notices.

## Source limitations

The supplied HTML is an already compiled React application. js/app.js includes the compiled app and its runtime libraries; formatting does not restore the original JSX/TSX component files or original variable names. For component-level source editing, use the original React project if available.

This remains the supplied offline demo. Accounts and orders stay in this browser. Payment and external sign-in features require a connected backend to become real services. Extracting the files does not add a backend.

## Expanded demo catalog

20 services and 36 parts. Additional listings reuse matching local catalog photos as illustrative pictures. Prices and stock are sample values; confirm fitment and actual pricing before real use.

## Back navigation

Catalog Back buttons and the kiosk logo return guests to home and signed-in customers to their account. Cart Back returns to its catalog. Service details Back returns to the cart; payment Back returns to details. Parts checkout Back returns to the parts cart.
