const START_YEAR = 2000;

let isDragging = false;
let totalRotations = 0;
let currentDays = 0;
let previousAngle = null;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dobInput").addEventListener("click", revealDOBElement)
    const container = document.getElementById("sliderContainer");
    // Event Listeners for Mouse and Touch Dragging
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support for mobile devices
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX, e.touches[0].clientY);
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });
});


function revealDOBElement() {
    const dobContainer = document.getElementById("dobContainer");
    dobContainer.style.visibility = "visible";
}

function toDate(yearOffset, dayOfYear) {
    const date = new Date(START_YEAR + yearOffset, 0, dayOfYear);

    // Add padStart to ensure 2-digit months/days (e.g., 05/09/2026)
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

function updateSlider(clientX, clientY) {
    const svg = document.getElementById("slider-svg");
    const thumb = document.getElementById("thumb");
    const track = document.getElementById("track");
    const dobInput = document.getElementById("dobInput");
    const gradient = document.getElementById("earth-gradient");

    // Map mouse client coords to SVG viewBox coordinate space
    let pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    let svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    // Move thumb
    const centerX = track.cx.baseVal.value;
    const centerY = track.cy.baseVal.value;
    const radiusX = track.rx.baseVal.value;
    const radiusY = track.ry.baseVal.value;

    const x = svgPoint.x - centerX;
    const y = svgPoint.y - centerY;

    let angle = Math.atan2(y, x);
    const thumbX = centerX + radiusX * Math.cos(angle);
    const thumbY = centerY + radiusY * Math.sin(angle);

    // Center the 30x30 thumb by subtracting 15
    const offsetX = thumbX - 15;
    const offsetY = thumbY - 15;

    thumb.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);

    // Update shadow
    let degrees = angle * (180 / Math.PI) + 180;
    gradient.setAttribute('gradientTransform', `rotate(${degrees}, 0.5, 0.5)`)

    // Track number of rotations
    if (previousAngle !== null) {
        let delta = angle - previousAngle;
        if (delta < -Math.PI) {
            totalRotations++;
        } else if (delta > Math.PI) {
            totalRotations--;
        }
        currentDays = Math.round((angle + Math.PI) / (2 * Math.PI) * 364) + 1
    }
    previousAngle = angle;


    // update date display
    const displayDate = toDate(totalRotations, currentDays);
    dobInput.value = displayDate;
}
