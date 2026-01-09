const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// -------- Circle class --------
class Circle {
    constructor(x, y, radius, number, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.number = number;
        this.color = color;

        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
        this.moving = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.number, this.x, this.y);
    }

    move() {
        if (!this.moving) return;

        this.x += this.dx;
        this.y += this.dy;

        // պատերի բախում
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy *= -1;
        }
    }

    isClicked(mx, my) {
        const dist = Math.hypot(mx - this.x, my - this.y);
        return dist < this.radius;
    }
}

// -------- Create circles --------
const circles = [];

for (let i = 1; i <= 10; i++) {
    circles.push(
        new Circle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            30,
            i,
            `hsl(${Math.random() * 360}, 70%, 50%)`
        )
    );
}

// -------- Mouse click --------
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    circles.forEach(circle => {
        if (circle.isClicked(mx, my)) {
            circle.moving = !circle.moving; // կանգ / շարժ
        }
    });
});

// -------- Animation loop --------
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        circle.move();
        circle.draw();
    });

    requestAnimationFrame(animate);
}

animate();
