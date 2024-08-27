const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas =document.getElementById("myCanvas");
const clearButton =document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontSize =document.getElementById("fontSize");
const retrieveButton = document.getElementById("retrieveButton");
const ctx = canvas.getContext('2d');
colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})
canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        lastX =event.offsetX;
        lastY =event.offsetY;

    }
})
canvas.addEventListener('mouseup',(e)=>{
    isDrawing = false
   
})
canvasColor.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,750,400)
})

fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

saveButton.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());
    let link =document.createElement('a');

    link.download = 'my-signature.png';
    link.href = canvas.toDataURL();
    link.click();
})
retrieveButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents');
    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})