// отправить всю эту херь с гета на бек
//убрать алерты и сделать ебучую надпись снизу

let flag = 0;
btn1 = null;
var xval, yval, rval;
let current_button = null;
alert("Голодные игры начались!");

function getValues() {
    var yval = document.getElementById("yval").value;
    var rval = document.getElementById("rval").value;
    document.getElementById("js-answer").textContent = "";
    if (xval) {
        if (yval) {
            if ((yval>=-5) && (yval<=5)) {
                if (rval) {
                    if ((rval>=1) && (rval<=4)) {
                    console.log(xval, yval, rval); //урааа значения
                    } else {
                        document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение R из отрезка от 1 до 4.";
                        //alert("Пожалуйста, введите значение R из отрезка от 1 до 4.")
                    }
                } else {
                    document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для R.";
                   // alert("Пожалуйста, введите значение для R."); } 
                }
            } else {
                document.getElementById("js-answer").textContent = "!Пожалуйста, поменяйте значение Y на значение из отрезка от -5 до 5.";
                //alert("Пожалуйста, поменяйте значение Y на значение из отрезка от -5 до 5."); }
            }
            } else {
            document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для Y.";
        }
    } else {
        document.getElementById("js-answer").textContent = "!Пожалуйста, введите значение для Х.";
       // alert("Пожалуйста, введите значение для Х."); 
    }
        console.log("Мы тут)");
   }; // пнуть на жабу

//function ClickFunction(btn) {
   // btn1 = btn;
//    if (flag!=1) {
  //      var xval = document.getElementById('x-radio1').value;
    //    btn.classList.add("active");
      //  flag = 1;
   // }
   //ПОЧЕМУ ЭТА ХРЕНЬ НЕ РАБОТАЕТ ААААААААААААааааааААааа

//}
function ClickFunction(button) {
    if (flag!=1) {
        if (current_button) {
            current_button.classList.remove("active");
            current_button.style.borderColor = "black";
        }
        current_button=button;
        flag=1;
        button.classList.add("active");
        xval = button.value;
        console.log(xval);
    } 
}

function resetValues() {
    flag=0;
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
    const R = 100; // Пример радиуса, вы можете установить его на нужное значение
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


