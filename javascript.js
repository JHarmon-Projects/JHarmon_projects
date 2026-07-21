// script.js
const logo = document.getElementById('dvd-logo');

// Initial coordinates and speed parameters
let posX = Math.random() * (window.innerWidth - 120);
let posY = Math.random() * (window.innerHeight - 70);
let speedX = 4; 
let speedY = 4;

// Array of random hex colors for the bounce effect
const colors = ['#ff0055', '#00ffcc', '#ffcc00', '#00ff33', '#cc00ff', '#0066ff'];

function changeColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    logo.style.backgroundColor = randomColor;
}

function updateAnimation() {
    // Get real-time dimensions of the viewport and object
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const logoWidth = logo.clientWidth;
    const logoHeight = logo.clientHeight;

    // Increment positions
    posX += speedX;
    posY += speedY;

    // Horizontal boundary collision check (Left / Right edges)
    if (posX + logoWidth >= screenWidth || posX <= 0) {
        speedX = -speedX; // Reverse horizontal direction
        posX = Math.max(0, Math.min(posX, screenWidth - logoWidth)); // Keep inside bounds
        changeColor();
    }

    // Vertical boundary collision check (Top / Bottom edges)
    if (posY + logoHeight >= screenHeight || posY <= 0) {
        speedY = -speedY; // Reverse vertical direction
        posY = Math.max(0, Math.min(posY, screenHeight - logoHeight)); // Keep inside bounds
        changeColor();
    }

    // Apply the updated coordinate vectors via CSS styles
    logo.style.left = posX + 'px';
    logo.style.top = posY + 'px';

    // Request the next frame recursively
    requestAnimationFrame(updateAnimation);
}

// Initialize position and kickstart loop
changeColor();
updateAnimation();

// Handle window resizing dynamically to prevent getting trapped outside the canvas
window.addEventListener('resize', () => {
    posX = Math.min(posX, window.innerWidth - logo.clientWidth);
    posY = Math.min(posY, window.innerHeight - logo.clientHeight);
});
