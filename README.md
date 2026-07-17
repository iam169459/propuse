# Propuse - Romantic Proposal Website

A beautiful, interactive romantic proposal website with animations, photo gallery, and music.

## Features

- Floating hearts background animation
- Interactive photo gallery
- Heartfelt message letter
- Romantic proposal with yes/no buttons
- Celebration animation with confetti
- Background music toggle
- Fully responsive design

## Deployment to Render

### Option 1: Direct Deploy

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: propuse
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Click "Create Web Service"

### Option 2: Using render.yaml

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and configure everything

## Customization

### Adding Photos

1. Place your photos in `public/images/`
2. Edit `public/index.html` and replace the gallery placeholders:

```html
<div class="gallery-item">
  <img src="images/your-photo.jpg" alt="Our moment">
</div>
```

### Changing the Message

Edit the letter content in `public/index.html` in the `message-section`.

### Changing Colors

Edit the CSS variables in `public/css/style.css`:

```css
:root {
  --pink: #ff6b9d;
  --light-pink: #ffa5c3;
  --dark-pink: #e84393;
  --gold: #f9ca24;
  --purple: #a29bfe;
}
```

### Adding Music

Replace the audio URL in `public/js/main.js`:

```javascript
audio = new Audio('your-music-url.mp3');
```

## Local Development

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## Tech Stack

- HTML5
- CSS3 (Animations)
- JavaScript (ES6)
- Node.js + Express
