let particles = [];
const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const canvas = document.getElementById('confetti-canvas') || document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to full screen with high DPI support
function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Confetto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 6; // Random size between 6px and 14px
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random momentum / velocity
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = Math.random() * 8 + 3;       // Random speed magnitude
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 3;     // Slight upward bias

        // Physics & dissipation factors
        this.gravity = 0.35;
        this.friction = 0.95;
        this.alpha = 1.0;                          // Opacity for fading out
        this.decay = Math.random() * 0.02 + 0.015; // How fast it dissipates

        // Rotation properties for 3D tumbling effect
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.oscillationSpeed = Math.random() * 0.1 + 0.05;
        this.oscillationDistance = Math.random() * 10;
        this.time = Math.random() * 100;
    }

    update() {
        this.time += this.oscillationSpeed;
        
        // Apply physics
        this.vx *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx + Math.sin(this.time) * 0.5; // Add organic drift
        this.y += this.vy;
        
        this.rotation += this.rotationSpeed;
        this.alpha -= this.decay; // Dissipate over time
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        
        // Draw as a rectangle (tumbles as it falls)
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        ctx.restore();
    }
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Remove dead particles
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

export function spawnParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        particles.push(new Confetto(x, y))
    }
}

animate();
