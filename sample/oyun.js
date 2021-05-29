let mobilmi = false;
(function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) mobilmi = true; })(navigator.userAgent || navigator.vendor || window.opera);

//console.log(mobilmi);
//document.getElementById("sonuc").innerHTML = mobilmi;

//setup
var c = document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);
var ctx = c.getContext("2d");

var pts = []; // array tanımı
while (pts.length < 254) {
    while (pts.includes(val = Math.floor(Math.random() * 255)));
    pts.push(val); // array içerisine random veri atama
}

pts.push(pts[0]); // array in ilk ve son elemanını eşitledik
// artık uc uc eklenmiş zincir gibi akan zemin var

var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.pi)) / 2; // keskin hatları yumuşatma fonksiyonu lerp

//console.table(pts); // consola print etme
var noise = x => {
    x = x * 0.01 % 254;
    //console.log(x);
    return lerp(pts[Math.floor(x)], pts[Math.ceil(x)], (x - Math.floor(x)));
}

// init
var bgcolor = "#ff4301"; // turuncu
var forecolor = "#4a3f35"; // açık gri
var linecolor = "#2f2519"; // koyu gri
var linewidth = 5;
var offset = -10;
var yRatio = 0.4;
var t = 0; // adım
var speed = 0;
var playing = true;
// drawing car
var player = new function() {
        this.x = c.width / 2;
        this.y = 50;
        this.truck = new Image();
        this.truck.src = "t.png";
        this.rot = 0;
        this.ySpeed = 0;
        this.rSpeed = 0;

        //interface
        this.startBtn = new Image();
        this.startBtn.src = "basla.png";

        this.draw = function() {

            var p1 = (c.height * .9) - noise(this.x + t) * yRatio;
            var p2 = (c.height * .9) - noise(this.x + t + 5) * yRatio;
            var gnd = 0;
            var offset = 38;
            if ((p1 - offset) > this.y) {
                this.ySpeed += 0.1;
            } else {
                this.ySpeed -= this.y - (p1 - offset);
                this.y = p1 - offset;
                gnd = 1;
            }

            // fall check
            if (!playing || gnd && (Math.abs(this.rot) > Math.PI * .5)) {
                playing = false;
                this.rSpeed = 5;
                this.x -= speed * 5;

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = "32px Impact";
                ctx.fillStyle = "white";
                ctx.fillText("Game Over", c.width / 2, c.height / 3);
                ctx.drawImage(this.startBtn, (c.width / 2) - 25, (c.height / 3) + 50, 50, 50);
            }

            // rotation calc
            var angle = Math.atan2((p2 - offset) - this.y, (this.x + 5) - this.x);
            if (gnd && playing) {
                this.rot -= (this.rot - angle) * 0.5;
                this.rSpeed = this.rSpeed - (angle - this.rot);
            }
            this.rot -= this.rSpeed * 0.1;
            if (this.rot > Math.PI) { this.rot = -Math.PI }
            if (this.rot > -Math.PI) { this.rot = Math.PI }

            this.y += this.ySpeed;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.drawImage(this.truck, -40, -40, 80, 80);
            ctx.restore();
        }
    }
    // draw part
function draw() {

    // burada speed değerini 0 ile 1 arasında 
    // asla 1 olmayacak şekilde ölçeklendirdik.
    speed -= (speed - 1) * 0.01;

    //console.log(speed);
    t += 5 * speed; // zaman sabiti gittikçe ivmelenen bir duruma geldi

    // back ground
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, c.width, c.height);

    // player
    player.draw();

    // ground drawing
    ctx.fillStyle = forecolor;
    ctx.strokeStyle = linecolor;
    c.linewidth = linewidth;
    ctx.beginPath();
    ctx.moveTo(offset, c.height - offset);
    for (let i = offset; i < c.width - offset; ++i) {
        ctx.lineTo(i, (c.height * .9) - noise(i + t) * yRatio);
    }
    ctx.lineTo(c.width - offset, c.height - offset);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // animation frame start
    requestAnimationFrame(draw); // draw fonksiyonunu animation frame kullanarak tekrar çağırdık
}

draw();

c.addEventListener("touchstart", handleStart, false);
c.addEventListener("touchend", handleEnd, false);

function handleStart(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    // console.log(touches);
    for (let i = 0; i < touches.length; i++) {
        var touch = touches[i];
        console.log(touch.pageX + ":" + touch.pageY);

        if ((touch.pageX > (c.width / 2) - 25) && (touch.pageX < c.width / 2) + 25) {

        }
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    // console.log(touches);
    for (let i = 0; i < touches.length; i++) {
        var touch = touches[i];
        //console.log(touch.pageX + ":" + touch.pageY);
    }
}