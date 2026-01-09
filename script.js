const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// test circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
