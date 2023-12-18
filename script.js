let c = document.querySelector("canvas");
let r = c.getContext("2d");
let w, h;
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function resizeInput() {
    let elem = document.getElementById("string");

    let text = document.createElement("span"); 
    document.body.appendChild(text); 
    
    text.style.font = "Inter"; 
    text.style.fontSize = "17px"; 
    text.style.height = 'auto'; 
    text.style.width = 'auto'; 
    text.style.position = 'absolute'; 
    text.style.whiteSpace = 'no-wrap'; 
    text.style.color = "transparent";
    text.style.zIndex = "-1";
    
    text.innerHTML = elem.value;
    width = Math.ceil(text.clientWidth) + 5;
    if(width > 150) {
        elem.style.width = width + "px";
    }

    if((width <= 150) && (elem.offsetWidth > 150)) {
        elem.style.width = "150px";
    }

    document.body.removeChild(text);

    setCanvasSize();
}

function setCanvasSize() {
    let widthInput = document.getElementById("width").value;
    let heightInput = document.getElementById("height").value;
    let onlyNums = true;
    
    for(let i = 0; i < widthInput.length; i++) {
        if(!(nums.includes(parseInt(widthInput[i])))) {
            onlyNums = false;
            widthInput = 0;
            break;
        }
    }

    if(onlyNums) {
        let temp = parseInt(widthInput);
        widthInput = temp;
    }
    c.width = widthInput;
    w = c.width;

    onlyNums = true;

    for(let i = 0; i < heightInput.length; i++) {
        if(!(nums.includes(parseInt(heightInput[i])))) {
            onlyNums = false;
            heightInput = 0;
            break;
        }
    }

    if(onlyNums) {
        let temp = parseInt(heightInput);
        heightInput = temp;
    }
    c.height = heightInput;
    h = c.height;

    r.clearRect(0, 0, w, h);
    r.fillStyle = "#9575CD";
    r.fillRect(0, 0, w, h);

    createBorder();
}

function createBorder() {
    let text = document.getElementById("string").value;
    let temp = text.replace(" ", "");
    text = temp;

    let scale = 0.85;
    let totalSize = (w * scale) + (w * scale) + (h * scale) + (h * scale);

    let margin = 5;
    let fontSize = -1;
    let offset = -1;

    // calculate font size
    let maxRange = 100;
    for(let i = 5; i < maxRange; i++) {
        r.font = i + "px Arial";
        let size = r.measureText(text).width + (margin * text.length);

        if((size > totalSize) || (i >= (maxRange - 1))) {
            fontSize = (i - 5) + "px";
            offset = (i - 5) + "px";
            break;
        }
    }

    r.fillStyle = "black";
    let x = 5;
    let y = parseInt(offset.replace("px", "")) * 0.7;
    
    let start = 0;

    // top
    for(let i = start; i < text.length; i++) {
        ++start;
        r.font = fontSize + "px";
        
        let c = text[i];
        r.fillText(c, x, y);

        x += r.measureText(c).width + margin;

        if(x > (w - 10)) {
            break;
        }
    }

    x = w - (parseInt(offset.replace("px", "")) * 0.6);
    y += (parseInt(offset.replace("px", "")) * 0.25) + margin;
    // right
    for(let i = start; i < text.length; i++) {
        ++start;
        r.font = fontSize + "px";
        
        let c = text[i];

        r.save();
        r.translate(x, y);
        r.rotate(0 + (Math.PI / 2));
        r.textAlign = "center";
        r.fillText(c, 0, 0);
        r.restore();

        y += r.measureText(c).width + margin;

        if(y > (h - 10)) {
            break;
        }
    }

    x = w - (parseInt(offset.replace("px", "")) * 0.6);
    y = h - ((parseInt(offset.replace("px", "")) * 0.5) + margin) * 1;

    // bottom
    for(let i = start; i < text.length; i++) {
        ++start;
        r.font = fontSize + "px";
        
        let c = text[i];

        r.save();
        r.translate(x, y);
        r.rotate(0 + (Math.PI / 1));
        r.textAlign = "center";
        r.fillText(c, 0, 0);
        r.restore();

        x -= r.measureText(c).width + margin;

        if(x < 10) {
            break;
        }
    }

    x = (parseInt(offset.replace("px", "")) * 0.7);
    // x = 5;
    y -= ((parseInt(offset.replace("px", "")) * 0.5) + margin) * 0.5;

    // left
    for(let i = start; i < text.length; i++) {
        ++start;
        r.font = fontSize + "px";
        
        let c = text[i];

        r.save();
        r.translate(x, y);
        r.rotate(0 - (Math.PI / 2));
        r.textAlign = "center";
        r.fillText(c, 0, 0);
        r.restore();

        y -= r.measureText(c).width + margin;

        if(y < 10) {
            break;
        }
    }
}

window.setTimeout(()=>{
    resizeInput();
}, 50);