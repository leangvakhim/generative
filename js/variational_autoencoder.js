// <!-- Application Logic -->
// Navigation State
let currentStep = 0;
const totalSteps = 5;

// Init KaTeX
document.addEventListener("DOMContentLoaded", function () {
    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
        ],
        throwOnError: false
    });

    updateNavigation();

    // Setup simulator listeners
    document.getElementById('slider-mu').addEventListener('input', (e) => {
        document.getElementById('mu-val').innerText = e.target.value;
    });
    document.getElementById('slider-sigma').addEventListener('input', (e) => {
        document.getElementById('sigma-val').innerText = parseFloat(e.target.value).toFixed(1);
    });

    // Initial bake
    bakeCookie();
});

function navigate(direction) {
    // Hide current
    document.getElementById(`step-${currentStep}`).classList.remove('active');

    // Update state
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= totalSteps) currentStep = totalSteps - 1;

    // Show new
    document.getElementById(`step-${currentStep}`).classList.add('active');

    updateNavigation();
}

function updateNavigation() {
    // Update buttons
    document.getElementById('btn-back').disabled = (currentStep === 0);

    const nextBtn = document.getElementById('btn-next');
    if (currentStep === totalSteps - 1) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "Finish";
    } else {
        nextBtn.disabled = false;
        nextBtn.innerHTML = "Next &rarr;";
    }

    // Update indicator
    document.getElementById('step-indicator').innerText = `Step ${currentStep + 1} of ${totalSteps}`;

    // Update progress bar
    const progress = ((currentStep + 1) / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// --- Simulator Logic ---

// Box-Muller transform for standard normal distribution N(0,1)
function standardNormal() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function bakeCookie() {
    const mu = parseFloat(document.getElementById('slider-mu').value);
    const sigma = parseFloat(document.getElementById('slider-sigma').value);

    // 1. Generate random epsilon from N(0,1)
    const epsilon = standardNormal();

    // 2. Reparameterization Trick: z = mu + sigma * epsilon
    const z_raw = mu + (sigma * epsilon);

    // 3. Since we bake physical chips, we need an integer >= 0
    let z = Math.round(z_raw);
    z = Math.max(0, z); // Can't have negative chocolate chips!

    // 4. Update UI Text
    document.getElementById('out-epsilon').innerText = epsilon.toFixed(3);
    document.getElementById('out-calc').innerHTML = `${mu} + (${sigma.toFixed(1)} &times; <span class="${epsilon < 0 ? 'text-red-500' : 'text-blue-500'}">${epsilon.toFixed(3)}</span>) = ${z_raw.toFixed(2)}`;
    document.getElementById('out-z').innerText = z;

    // 5. Visual Animation feedback
    const cookie = document.getElementById('cookie-container');
    cookie.style.transform = 'scale(0.95)';
    setTimeout(() => { cookie.style.transform = 'scale(1)'; }, 150);

    // 6. Draw the chips
    drawChips(z);
}

function drawChips(count) {
    const container = document.getElementById('cookie-container');
    container.innerHTML = ''; // Clear old chips

    // Calculate dimensions
    const containerRect = container.getBoundingClientRect();
    // Fallback if rendered while display:none
    const size = containerRect.width > 0 ? containerRect.width : 256;
    const radius = size / 2;
    const chipRadius = size * 0.04; // scale chips relative to cookie
    const maxPlacementRadius = radius - chipRadius - (size * 0.05); // Keep chips inside edge

    for (let i = 0; i < count; i++) {
        // Random point within a circle math
        const r = maxPlacementRadius * Math.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;

        // Convert polar to cartesian, center it
        const x = radius + (r * Math.cos(theta)) - chipRadius;
        const y = radius + (r * Math.sin(theta)) - chipRadius;

        // Create chip DOM element
        const chip = document.createElement('div');
        chip.className = 'chocolate-chip absolute rounded-full';
        chip.style.width = `${chipRadius * 2}px`;
        chip.style.height = `${chipRadius * 2}px`;
        chip.style.left = `${x}px`;
        chip.style.top = `${y}px`;

        // Randomize rotation a bit for natural look
        chip.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(chip);
    }
}