import { spawnParticles } from "./confetto.js";

const MAX_HEALTH = 400;
const PHASES = 4;
const CONFETTI_MIN = 10;
const CONFETTI_MAX = 50;

let health = MAX_HEALTH;
let phase = 0;

function init() {
    const present = document.getElementById("present") || document.getElementById("canvas");
    if (present) {
        present.addEventListener("click", presentClickHandler);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

function presentClickHandler(event) {
    const present = document.getElementById("present") || document.getElementById("canvas");

    if (health >= 0) health--;
    if (health % (Math.round(MAX_HEALTH / PHASES)) === 0) {
        phase++;
        present.style.backgroundImage = `url("static/present-${phase + 1}.png")`;
    }

    const particleCount = Math.floor(Math.random() * (CONFETTI_MAX - CONFETTI_MIN)) + CONFETTI_MIN + 1;
    spawnParticles(event.clientX, event.clientY, particleCount);
}
