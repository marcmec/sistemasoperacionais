const canvas = document.getElementById("animacaoCanvas");
const ctx = canvas.getContext("2d");

const totalFrames = 7;  
let frameAtual = 1;      
const velocidadeMs = 450; 

const frames = [];
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = `${i}.svg`;
  frames.push(img);
}

function desenharFrame() {
  const img = frames[frameAtual - 1];
  if (img.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  frameAtual++;
  if (frameAtual > totalFrames) frameAtual = 1;

  setTimeout(desenharFrame, velocidadeMs);
}

Promise.all(
  frames.map(img => new Promise(resolve => img.onload = resolve))
).then(() => desenharFrame());