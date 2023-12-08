document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('main');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let brushSize = 5;
    let currentColor = 'black';

    // Set initial brush color
    ctx.strokeStyle = currentColor;

    // Event listeners
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        draw(e);  
    });

    canvas.addEventListener('mouseup', function(e) {
        isDrawing = false;
        ctx.beginPath();
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        if (currentColor === 'eraser') {
            ctx.strokeStyle = 'white';
        } else {
            ctx.strokeStyle = currentColor;
        }

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });

    document.getElementById('new').addEventListener('click', function(e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('erase').addEventListener('click', function(e) {
        currentColor = 'eraser';
    });

    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            currentColor =e.target.closest('button').getAttribute("data-color"); 
        });
    });

    document.getElementById('slider').addEventListener('change', function(e) {
        brushSize = e.target.value;
        document.getElementById('brushSize').innerHTML = brushSize;
    });

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        if (currentColor === 'eraser') {
            ctx.strokeStyle = 'white';
        } else {
            ctx.strokeStyle = currentColor;
        }

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

});