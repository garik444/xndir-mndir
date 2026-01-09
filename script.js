const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ---------- CIRCLE CLASS ---------- */
class Circle {
    constructor(x, y, r, number, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.number = number;
        this.color = color;
        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
        this.moving = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.number, this.x, this.y);
    }

    move() {
        if (!this.moving) return;

        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.r < 0 || this.x + this.r > canvas.width) this.dx *= -1;
        if (this.y - this.r < 0 || this.y + this.r > canvas.height) this.dy *= -1;
    }

    collide(other) {
        const dist = Math.hypot(this.x - other.x, this.y - other.y);
        if (dist < this.r + other.r) {
            this.dx *= -1;
            this.dy *= -1;
            other.dx *= -1;
            other.dy *= -1;
        }
    }

    isClicked(mx, my) {
        return Math.hypot(mx - this.x, my - this.y) < this.r;
    }
}

/* ---------- RECTANGLE CLASS ---------- */
class Rectangle {
    constructor(x, y, w, h, symbol) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.symbol = symbol;
        this.dx = Math.random() * 3 - 1.5;
        this.dy = Math.random() * 3 - 1.5;
        this.moving = true;
    }

    draw() {
        ctx.fillStyle = "#444";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = "yellow";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.symbol, this.x + this.w / 2, this.y + this.h / 2);
    }

    move() {
        if (!this.moving) return;

        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x + this.w > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y + this.h > canvas.height) this.dy *= -1;
    }

    isClicked(mx, my) {
        return (
            mx > this.x &&
            mx < this.x + this.w &&
            my > this.y &&
            my < this.y + this.h
        );
    }

    changeSymbol() {
        const symbols = ["+", "-", "*", "/", "="];
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
    }
}

/* ---------- CREATE OBJECTS ---------- */
const circles = [];
for (let i = 1; i <= 10; i++) {
    circles.push(
        new Circle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            25,
            i,
            `hsl(${Math.random() * 360},70%,50%)`
        )
    );
}

const rects = [
    new Rectangle(100, 100, 60, 40, "+"),
    new Rectangle(300, 200, 60, 40, "*"),
    new Rectangle(500, 300, 60, 40, "/")
];

/* ---------- MOUSE CLICK ---------- */
canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    circles.forEach(c => {
        if (c.isClicked(mx, my)) c.moving = !c.moving;
    });

    rects.forEach(r => {
        if (r.isClicked(mx, my)) {
            r.moving = !r.moving;
            r.changeSymbol();
        }
    });
});

/* ---------- ANIMATION ---------- */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach((c, i) => {
        c.move();
        for (let j = i + 1; j < circles.length; j++) {
            c.collide(circles[j]);
        }
        c.draw();
    });

    rects.forEach(r => {
        r.move();
        r.draw();
    });

    requestAnimationFrame(animate);
}

animate();

