let c = document.querySelector("canvas");
let r = c.getContext("2d");
let h, w;
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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
}

function getSize() {
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
}

getSize();