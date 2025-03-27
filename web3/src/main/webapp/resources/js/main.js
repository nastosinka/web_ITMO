

//localStorage.clear(); // делаем так чтобы все точки удалились перед запуском страницы

let button_flag = 0;
let music_flag = 1;

btn1 = null;
let xval, yval, rval;
let current_button = null;

let circlesAll = [];

function addCircle(x, y, r) {
    const svgContainer = document.getElementById('graphSvg');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'shot');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y - 125);
    circle.setAttribute('r', 2);
    let x_cor = ((x - 200)/200*r * 2).toFixed(2);
    let y_cor = (-(y - 325) / 200 * r * 2).toFixed(2);
    let r_cor=r;
    if (((x_cor >= -r_cor) && (x_cor <= 0) && ((y_cor >= 0) && (y_cor <= r_cor)) && ((x_cor*x_cor + y_cor*y_cor) <= r_cor*r_cor)) || ((x_cor >= 0) && (x_cor <= r_cor/2) && (y_cor <= r_cor) && (y_cor >= 0)) || ((x_cor <= 0) && (x_cor >= -r_cor/2) && (y_cor <= 0) && (y_cor >= -r_cor) && (y_cor >= (-2*x_cor - r_cor)))) {
        circle.setAttribute('fill', 'green');
    } else {
        circle.setAttribute('fill', 'orangered');
    }
    circle.setAttribute('stroke-width', 0);
    svgContainer.appendChild(circle);
    circlesAll.push({x,y,r});
    localStorage.setItem('circlesAll', JSON.stringify(circlesAll));
    console.log('circlesAll: ', circlesAll);
    redrawCircles();
}
function redrawCircles() {
    const savedCircles = localStorage.getItem('circlesAll');
    if (savedCircles) {
        circlesAll = JSON.parse(savedCircles);
        const svgContainer = document.getElementById('graphSvg');
        circlesAll.forEach(circleData => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            let x = circleData.x;
            let y = circleData.y;
            let r = circleData.r;
            circle.setAttribute('class', 'shot');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y - 125);
            circle.setAttribute('r', 2);
            let x_cor = ((x - 200)/200*r * 2).toFixed(2);
            let y_cor = (-(y - 325) / 200 * r * 2).toFixed(2);
            let r_cor=r;
            if (((x_cor >= -r_cor) && (x_cor <= 0) && ((y_cor >= 0) && (y_cor <= r_cor)) && ((x_cor*x_cor + y_cor*y_cor) <= r_cor*r_cor)) || ((x_cor >= 0) && (x_cor <= r_cor/2) && (y_cor <= r_cor) && (y_cor >= 0)) || ((x_cor <= 0) && (x_cor >= -r_cor/2) && (y_cor <= 0) && (y_cor >= -r_cor) && (y_cor >= (-2*x_cor - r_cor)))) {
                circle.setAttribute('fill', 'green');
            } else {
                circle.setAttribute('fill', 'orangered');
            }
            circle.setAttribute('stroke-width', 0);
            svgContainer.appendChild(circle);
        });
    }
}



//сделать замену кнопочки при нажатии
function pageMusic() {
    if (music_flag) {
        music_flag = 0;
        document.getElementById("music").value="Поставить крутую музо4ку на паузу";
        const audioM = document.getElementById('audioPlayerMusic');
        audioM.play();
    } else {
        music_flag = 1;
        document.getElementById("music").value="Включить крутую музо4ку этой страницы";
        const audioM = document.getElementById('audioPlayerMusic');
        audioM.pause();
    }
}

function controlMusic(playMusic) {
    const audioPlayerMeow = document.getElementById('audioPlayerMeow');
    const audioPlayerPurr = document.getElementById('audioPlayerPurr');
    if (playMusic) {
        audioPlayerMeow.pause();
        audioPlayerMeow.currentTime = 0; // в начало
        audioPlayerPurr.play();
    } else {
        audioPlayerPurr.pause();
        audioPlayerPurr.currentTime = 0;
        audioPlayerMeow.play();
    }
}

function ClickFunction(button) {
    if (button_flag!==1) {
        if (current_button) {
            current_button.classList.remove("active");
            current_button.style.borderColor = "black";
        }
        current_button=button;
        button_flag=1;
        button.classList.add("active");
        xval = button.value;
        console.log(xval);
    }
}

function resetValues() {
    console.log(circlesAll);
    circlesAll = [];
    console.log(circlesAll);
    localStorage.clear();
    console.log("reset values starting");
}

async function svgHandler(event) {
    redrawCircles();
    let out_flag = 0;
    console.log("проверка работы svgHandler");
    const svg = document.getElementById("graphSvg");
    const rect = svg.getBoundingClientRect();
    let rval_cur = document.getElementById("input-form:rval_input").value.replace(",", ".");
    if (!rval_cur) {
        document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для R.";
        out_flag = 1;
    }
    if (out_flag === 0) {
        console.log("входные данные (пиксели): ", event.clientX, event.clientY);
        addCircle(event.clientX, event.clientY, rval_cur);
        xval = ((event.clientX - 200)/200*rval_cur * 2).toFixed(2);
        yval = (-(event.clientY - 325)/200*rval_cur * 2).toFixed(2);
        rval = rval_cur;
        document.getElementById('graphForm:rGraph').value = rval;
        document.getElementById('graphForm:xGraph').value = xval;
        document.getElementById('graphForm:yGraph').value = yval;
        document.getElementById('graphForm:submit').click();
        circlesAll.push([xval, yval]);
        console.log("координаты: ", xval, yval, rval);
    }


}

function updateSVG() {
    const svg = document.getElementById('graphSvg');
    svg.style.scale = (getSelectedRValue() / 3).toString();

}

function getSelectedRValue() {
    const rText = document.getElementById('input-form:rval_input');
    if (rText == null) {
        console.log("smth is null");
        return null;
    }
    return parseFloat(rText.value.replace(',', '.'));
}


