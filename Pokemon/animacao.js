const canvas = document.getElementById('animacaoCanvas');
const ctx = canvas.getContext('2d');

const totalFrames = 3; 
const frames = [];
let framesCarregados = 0;
let frameAtual = 0;
const velocidadeFPS = 6; 

const CLIP_LARGURA = canvas.width; 
const CLIP_ALTURA = canvas.height; 


function carregarFrames() {
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.onload = () => {
            framesCarregados++;
            if (framesCarregados === totalFrames) {
                iniciarAnimacao();
            }
        };
        img.src = `img/${i}.svg`; 
        frames.push(img);
    }
}

function desenharMoldeClip(ctx, largura, altura) {
    
    const h_rec = altura * 0.6; 
    
    ctx.beginPath();
    ctx.moveTo(0, 0); 
    ctx.lineTo(largura, 0); 
    ctx.lineTo(largura, h_rec); 
    ctx.lineTo(largura / 2, altura); 
    ctx.lineTo(0, h_rec); 
    ctx.closePath();
    ctx.clip(); 
}

function desenharContornoMolde(ctx, largura, altura) {
    
    const h_rec = altura * 0.6; 
    
    ctx.strokeStyle = 'black'; 
    ctx.lineWidth = 2; 
    ctx.beginPath();
    ctx.moveTo(0, 0); 
    ctx.lineTo(largura, 0); 
    ctx.lineTo(largura, h_rec); 
    ctx.lineTo(largura / 2, altura); 
    ctx.lineTo(0, h_rec); 
    ctx.closePath();
    ctx.stroke(); 
}


function renderizar() {
   
    ctx.clearRect(0, 0, CLIP_LARGURA, CLIP_ALTURA); 
        
    ctx.save();
    
    desenharMoldeClip(ctx, CLIP_LARGURA, CLIP_ALTURA);

    const frame = frames[frameAtual];
    if (frame) {
        ctx.drawImage(frame, 0, 0, CLIP_LARGURA, CLIP_ALTURA);
    }
    
    ctx.restore(); 
    
    desenharContornoMolde(ctx, CLIP_LARGURA, CLIP_ALTURA);

    frameAtual = (frameAtual + 1) % totalFrames;
}

let ultimoTimestamp = 0;
const intervalo = 1500 / velocidadeFPS; 

function loopAnimacao(timestamp) {
    if (timestamp - ultimoTimestamp > intervalo) {
        renderizar();
        ultimoTimestamp = timestamp;
    }
    requestAnimationFrame(loopAnimacao); 
}

function iniciarAnimacao() {
    requestAnimationFrame(loopAnimacao);
}

carregarFrames();