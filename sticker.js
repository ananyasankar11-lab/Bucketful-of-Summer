<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Stickers &lt;3</title>

<script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>

<style>
* {
box-sizing: border-box;
font-family: Tahoma, Geneva, Verdana, sans-serif;
}

body {
background-color: #fdf5f5;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
margin: 0;
}

h1 {
color: #e57373;
margin-bottom: 25px;
}

.container {
display: flex;
gap: 30px;
align-items: flex-start;
}

/* Sticker Sheet / Dropzone */
#sticker-sheet {
width: 320px;
height: 480px;
background: #ffffff;
border: 4px solid #f48fb1;
border-radius: 16px;
position: relative;
overflow: hidden;
box-shadow: 0 4px 15px rgba(244, 143, 177, 0.2);
}

/* Tray */
.tray {
width: 240px;
padding: 16px;
border: 2px dashed #f48fb1;
border-radius: 16px;
background-color: #fff9fa;
text-align: center;
}

.tray h3 {
margin: 0 0 16px 0;
color: #e57373;
font-size: 14px;
letter-spacing: 1px;
}

.stickers-list {
display: flex;
flex-wrap: wrap;
gap: 16px;
justify-content: center;
}

/* Sticker items */
.tray-sticker {
width: 60px;
height: 60px;
cursor: grab;
user-select: none;
touch-action: none;
}

/* Placed Stickers inside sheet */
.placed-sticker {
position: absolute;
width: 60px;
height: 60px;
cursor: grab;
user-select: none;
touch-action: none;
}

.placed-sticker:active {
cursor: grabbing;
}
</style>
</head>
<body>

<h1>🍬 Stickers &lt;3 🍬</h1>

<div class="container">
<div id="sticker-sheet"></div>

<div class="tray">
<h3>ADDS SWEETS</h3>
<div class="stickers-list">
<img class="tray-sticker" src="https://cdn-icons-png.flaticon.com/128/2553/2553691.png" alt="Candy" />
<img class="tray-sticker" src="https://cdn-icons-png.flaticon.com/128/992/992736.png" alt="Lollipop" />
<img class="tray-sticker" src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" alt="Cupcake" />
</div>
</div>
</div>

<script>
const sheet = document.getElementById('sticker-sheet');

// 1. Click on tray item to spawn a draggable sticker onto sheet
document.querySelectorAll('.tray-sticker').forEach(img => {
img.addEventListener('click', () => {
createSticker(img.src, 130, 210);
});
});

// 2. Setup Interact.js Draggable logic
interact('.placed-sticker').draggable({
inertia: true,
modifiers: [
// Keep stickers within the sheet boundary
interact.modifiers.restrictRect({
restriction: '#sticker-sheet',
endOnly: false
})
],
listeners: {
move(event) {
const target = event.target;

// Read current coords or fallback to 0
const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

// Apply translation
target.style.transform = `translate(${x}px, ${y}px)`;

// Update attributes
target.setAttribute('data-x', x);
target.setAttribute('data-y', y);
}
}
});

// 3. Helper to create placed sticker elements
function createSticker(src, x, y) {
const sticker = document.createElement('img');
sticker.src = src;
sticker.className = 'placed-sticker';
sticker.style.left = `${x}px`;
sticker.style.top = `${y}px`;

// Double click to delete
sticker.addEventListener('dblclick', () => sticker.remove());

sheet.appendChild(sticker);
}
</script>
</body>
</html>
