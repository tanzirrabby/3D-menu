# ARoma 3D Restaurant Menu

A simple static web project for restaurants where guests scan a QR code from the menu and instantly open a 3D preview of each dish.

## Features

- Restaurant landing page with dish cards and pricing.
- Auto-generated QR code per dish.
- Dedicated 3D viewer page (`viewer.html`) for each item.
- Interactive controls (rotate, zoom, pan) using Three.js.
- Mobile-friendly UI for table-side scanning.

## Run locally

Because ES modules are used in `viewer.js`, serve files with a local server:

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/index.html`

## Project structure

- `index.html` - menu + QR cards
- `app.js` - dish data and QR code generation
- `viewer.html` - 3D scene container
- `viewer.js` - Three.js interactive dish rendering
- `styles.css` - full styling
