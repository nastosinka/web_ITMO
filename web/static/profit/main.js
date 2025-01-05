


let button_flag = 0;
let music_flag = 1;

btn1 = null;
let xval, yval, rval;
let current_button = null;
alert("И пусть удача будет с вами!");

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

async function getValues() {
    let out_flag = 0;
    yval = document.getElementById("yval").value;
    rval = document.getElementById("rval").value;
    document.getElementById("js-answer").textContent = "";
    if (xval.indexOf(",")!=-1) {
        xval = xval.replace(",", ".");
    }
    if (yval.indexOf(",")!=-1) {
        yval = yval.replace(",", ".");
    }
    if (yval.indexOf(",")!=-1) {
        yval = yval.replace(",", ".");
    }
    if (xval) {
        if (yval) {
            if ((yval>=-5) && (yval<=5)) {
                if (rval) {
                    if ((rval>=1) && (rval<=4)) {
                    console.log(xval, yval, rval); //урааа значения
                    } else {
                        document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение R из отрезка от 1 до 4.";
                        out_flag = 1;
                        //alert("Пожалуйста, введите значение R из отрезка от 1 до 4.")
                    }
                } else {
                    document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для R.";
                    out_flag = 1;
                    // alert("Пожалуйста, введите значение для R."); } 
                }
            } else {
                out_flag = 1;
                document.getElementById("js-answer").textContent = "!Пожалуйста, поменяйте значение Y на значение из отрезка от -5 до 5.";
                //alert("Пожалуйста, поменяйте значение Y на значение из отрезка от -5 до 5."); }
            }
            } else {
                out_flag = 1;
                document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для Y.";
        }
    } else {
        out_flag = 1;
        document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для Х.";
       // alert("Пожалуйста, введите значение для Х."); 
    }
        console.log("Мы тут)");
        if (out_flag == 0) {
            await sendRequest();
        } else {
            out_flag = 0;
        }
} // пнуть на жабу

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
    button_flag=0;
    if (current_button) {
    current_button.classList.remove("active");
    current_button=null;
    xval = null;
    yval = null;
    rval = null;
    console.log(xval, yval, rval); //урааа значения
}
}

function drawGraph() {
    const R = 100; 
    const blue = 'blue';
    const canvas = document.getElementById("graphic");
    const context = canvas.getContext('2d');
    context.strokeStyle = blue;
    context.fillStyle = blue;
    context.globalAlpha = 1;
    // рисовка осей
    drawArrow(context, 0, 200, 400, 200); // Ось X
    drawArrow(context, 200, 400, 200, 0); // Ось Y
    // рисовка точек сетки
    drawDot(100, 200, blue);
    drawDot(150, 200, blue);
    drawDot(250, 200, blue);
    drawDot(300, 200, blue);
    drawDot(200, 100, blue);
    drawDot(200, 150, blue);
    drawDot(200, 250, blue);
    drawDot(200, 300, blue);
    context.globalAlpha = 0.20;
    // прямоугольник 
    context.fillRect(200, 200-R, R/2, R); 
    // треугольник 
    context.beginPath();
    context.moveTo(200, 200); 
    context.lineTo(200 - R / 2, 200);
    context.lineTo(200, 200 + R); 
    context.closePath();
    context.fill();
    // Четверть круга 
    context.beginPath();
    context.arc(200, 200, R, Math.PI, 1.5 * Math.PI); // Четверть круга
    context.lineTo(200, 200); // Замкнуть к началу
    context.fill();
    context.globalAlpha = 1;
    context.font = '18px monospace';
    // ненавижу этот .бучий канвас
    context.fillText('-R', 100, 200);
    context.fillText('-R/2', 150, 200);
    context.fillText('R', 200, 100);
    context.fillText('R/2', 200, 150);
    context.fillText('R/2', 250, 200);
    context.fillText('R', 300, 200);
    context.fillText('-R/2', 200, 250);
    context.fillText('-R', 200, 300);
}
function drawDot(x, y, color) {
    const canvas = document.getElementById("graphic");
    const context = canvas.getContext('2d');
    context.fillStyle = color;
    context.globalAlpha = 1;
    context.fillRect(x, y, 3, 3);
}
function drawArrow(context, fromx, fromy, tox, toy) {
    const headlen = 10;
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}



async function sendRequest() {
    console.log("aaaa запрос 1");

    if (!xval || !yval || !rval) {
        console.error("Не все данные заданы для запроса.");
        return;
    }
    
    const url = new URL('./fcgi-bin/web1.jar', window.location.href);
    console.log("x: ", xval);
    url.searchParams.set('x', xval);
    console.log("y: ", yval);
    url.searchParams.set('y', yval);
    console.log("r: ", rval);
    url.searchParams.set('r', rval);

    console.log("запрос: ", url);

    try {
        await fetch(url)
            .then(response => response.text())
            .then(response => {
                console.log(response);
                return JSON.parse(response);
            })
            .then(response => {
                console.log(response);
                const resultsTable = document.getElementById("result-table");
                const newRow = resultsTable.insertRow();
                newRow.insertCell(0).innerText = response[0].x;
                newRow.insertCell(1).innerText = response[0].y;
                newRow.insertCell(2).innerText = response[0].R;
                newRow.insertCell(3).innerText = response[0].timestamp;
                newRow.insertCell(4).innerText = response[0].scriptTime;
                newRow.insertCell(5).innerText = (response[0].answer == "true") ? "Погладил котика" : "Котик убежал("; // сделать буль
                controlMusic(response[0].answer == "true"); //мяукает
            });
    } catch (error) {
        console.error("Ошибка: ", error.message);
    }
}

//todo: это система, чтобы сделать из обычных кнопок радио. но почему-то она не работает( а мне уже спать хочется(
//document.querySelectorAll('.xButtons input[type="button"]').forEach(button => {
 //   button.addEventListener('click', function () {
 //       document.querySelectorAll('.xButtons input[type="button"]').forEach(btn => {
   //         btn.classList.remove('active');
     //   });
       // this.classList.add('active');
 //       xval = document.querySelector('.xButtons input.active')?.value;
   // });
//})