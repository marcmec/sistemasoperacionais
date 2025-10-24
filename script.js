const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const img = new Image();
img.src = "sprites.png";

let x = 0;
let speed = 9;
let frame = 0;
let direction = 1;
let sprite = 1;
const p = 955;

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(img, x, 0);

    if (sprite == 8) { direction = -1; }
    if (sprite == 1) { direction = 1; }

    frame++;
    if (frame >= speed) {
        x -= p * direction;
        sprite += direction;
        frame = 0;
    }

    requestAnimationFrame(animate);
}
img.onload = () => {
    animate();
};