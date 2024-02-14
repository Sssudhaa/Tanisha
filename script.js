class Paper {
    holdingPaper = false;
    touchX = 0;
    touchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;
    
    init(paper) {
        const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
        const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
        const endEvent = isTouchDevice ? 'touchend' : 'mouseup';

        document.addEventListener(moveEvent, (e) => {
            e.preventDefault(); // Prevent scrolling on touch devices

            const eventX = isTouchDevice ? e.touches[0].clientX : e.clientX;
            const eventY = isTouchDevice ? e.touches[0].clientY : e.clientY;

            if (!this.rotating) {
                this.mouseX = eventX;
                this.mouseY = eventY;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }
            const dirX = eventX - this.touchX;
            const dirY = eventY - this.touchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = (180 * angle) / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }
            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

                this.currentPaperX = Math.max(0, Math.min(this.currentPaperX, viewportWidth - paper.offsetWidth));
                this.currentPaperY = Math.max(0, Math.min(this.currentPaperY, viewportHeight - paper.offsetHeight));

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        });

        paper.addEventListener(startEvent, (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            this.initialPaperX = this.currentPaperX;
            this.initialPaperY = this.currentPaperY;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            if (isTouchDevice) {
                this.touchX = e.touches[0].clientX;
                this.touchY = e.touches[0].clientY;
                this.prevMouseX = this.touchX;
                this.prevMouseY = this.touchY;
                e.preventDefault(); // Prevent default touch behavior
            } else {
                if (e.button === 0) {
                    this.touchX = this.mouseX;
                    this.touchY = this.mouseY;
                    this.prevMouseX = this.mouseX;
                    this.prevMouseY = this.mouseY;
                }
                if (e.button === 2) {
                    this.rotating = true;
                }
            }
        });

        window.addEventListener(endEvent, () => {
            this.holdingPaper = false;
            this.rotating = false;
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
let highestZ = 1;

papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});

var love = setInterval(function () {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    $('.bg_heart').append(
        "<div class='heart' style='width:" +
        r_size +
        "px;height:" +
        r_size +
        "px;left:" +
        r_left +
        "%;background:rgba(255," +
        (r_bg - 25) +
        "," +
        r_bg +
        ",1);-webkit-animation:love " +
        r_time +
        's ease;-moz-animation:love ' +
        r_time +
        's ease;-ms-animation:love ' +
        r_time +
        's ease;animation:love ' +
        r_time +
        "s ease'></div>"
    );

    $('.bg_heart').append(
        "<div class='heart' style='width:" +
        (r_size - 10) +
        "px;height:" +
        (r_size - 10) +
        "px;left:" +
        (r_left + r_num) +
        "%;background:rgba(255," +
        (r_bg - 25) +
        "," +
        (r_bg + 25) +
        ",1);-webkit-animation:love " +
        (r_time + 5) +
        's ease;-moz-animation:love ' +
        (r_time + 5) +
        's ease;-ms-animation:love ' +
        (r_time + 5) +
        's ease;animation:love ' +
        (r_time + 5) +
        "s ease'></div>"
    );
}, 500);

var i = 0;
var txt1 = 'HAPPY VALENTINES DAY BABY <3';
var speed = 150;
typeWriter();
function typeWriter() {
    if (i < txt1.length) {
        document.getElementById('text1').innerHTML += txt1.charAt(i); // Add character
        i++;
        setTimeout(typeWriter, speed);
    } else {
        i = 0; // Reset i back to 0
        document.getElementById('text1').innerHTML = ''; // Clear the text
        setTimeout(typeWriter, 3000); // Call typeWriter again
    }
}

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
});
