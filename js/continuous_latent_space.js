// Setup KaTeX rendering on load
document.addEventListener("DOMContentLoaded", function () {
    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
        ],
        throwOnError: false
    });

    initInteractiveMap();
});

// Navigation State
const totalSteps = 5;
let currentStep = 0;

const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const progressBar = document.getElementById('progress-bar');

function updateUI() {
    // Update buttons
    btnBack.disabled = currentStep === 0;
    btnNext.disabled = currentStep === totalSteps - 1;
    if (currentStep === totalSteps - 1) {
        btnNext.innerHTML = "Finish 🎉";
    } else {
        btnNext.innerHTML = "Next &rarr;";
    }

    // Update progress bar
    const progressPercent = (currentStep / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update viewable step
    for (let i = 0; i < totalSteps; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (i === currentStep) {
            // Make it visible to the layout system immediately
            stepEl.style.display = '';

            // Force a rapid browser redraw so the transition plays smoothly
            void stepEl.offsetWidth;

            stepEl.classList.remove('hide-step');
            stepEl.classList.add('show-step');
        } else {
            stepEl.classList.remove('show-step');
            stepEl.classList.add('hide-step');

            // Crucial Fix: Wait for the 300ms fade-out transition to finish,
            // then completely hide the element from the layout to prevent blank scroll spaces.
            setTimeout(() => {
                // Double check the user hasn't quickly navigated back to this step
                if (currentStep !== i) {
                    stepEl.style.display = 'none';
                }
            }, 300);
        }
    }

    // Render Math when switching to step 2 (0-indexed)
    if (currentStep === 2) {
        // Minor timeout to ensure DOM visibility before KaTeX processes
        setTimeout(() => {
            renderMathInElement(document.getElementById(`step-2`), {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ]
            });
        }, 50);
    }
}

btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        updateUI();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Initialize UI
updateUI();

// --------------------------------------------------------
// Interactive Map Logic (Step 3)
// --------------------------------------------------------
function initInteractiveMap() {
    const map = document.getElementById('interactive-map');
    const dot = document.getElementById('map-dot');

    const barCat = document.getElementById('bar-cat');
    const barDog = document.getElementById('bar-dog');
    const barBird = document.getElementById('bar-bird');
    const barWolf = document.getElementById('bar-wolf');

    const pctCat = document.getElementById('pct-cat');
    const pctDog = document.getElementById('pct-dog');
    const pctBird = document.getElementById('pct-bird');
    const pctWolf = document.getElementById('pct-wolf');

    const blendedColor = document.getElementById('blended-color');
    const dominantEmoji = document.getElementById('dominant-emoji');

    let isDragging = false;

    function calculateWeights(xRatio, yRatio) {
        // xRatio: 0 (Left) to 1 (Right)
        // yRatio: 0 (Top) to 1 (Bottom)

        // Top-Left: Cat
        const wCat = (1 - xRatio) * (1 - yRatio);
        // Top-Right: Dog
        const wDog = xRatio * (1 - yRatio);
        // Bottom-Left: Bird
        const wBird = (1 - xRatio) * yRatio;
        // Bottom-Right: Wolf
        const wWolf = xRatio * yRatio;

        return { wCat, wDog, wBird, wWolf };
    }

    function updateOutput(weights) {
        // Update Bars & Text
        barCat.style.width = `${weights.wCat * 100}%`;
        pctCat.innerText = `${Math.round(weights.wCat * 100)}%`;

        barDog.style.width = `${weights.wDog * 100}%`;
        pctDog.innerText = `${Math.round(weights.wDog * 100)}%`;

        barBird.style.width = `${weights.wBird * 100}%`;
        pctBird.innerText = `${Math.round(weights.wBird * 100)}%`;

        barWolf.style.width = `${weights.wWolf * 100}%`;
        pctWolf.innerText = `${Math.round(weights.wWolf * 100)}%`;

        // Calculate Color Blend
        // Cat (Blue): 59, 130, 246
        // Dog (Green): 34, 197, 94
        // Bird (Yellow): 234, 179, 8
        // Wolf (Red): 239, 68, 68
        const r = Math.round((weights.wCat * 59) + (weights.wDog * 34) + (weights.wBird * 234) + (weights.wWolf * 239));
        const g = Math.round((weights.wCat * 130) + (weights.wDog * 197) + (weights.wBird * 179) + (weights.wWolf * 68));
        const b = Math.round((weights.wCat * 246) + (weights.wDog * 94) + (weights.wBird * 8) + (weights.wWolf * 68));

        blendedColor.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // Find Dominant Emoji
        let maxWeight = Math.max(weights.wCat, weights.wDog, weights.wBird, weights.wWolf);
        let currentEmoji = '🐱';
        if (maxWeight === weights.wDog) currentEmoji = '🐶';
        else if (maxWeight === weights.wBird) currentEmoji = '🐦';
        else if (maxWeight === weights.wWolf) currentEmoji = '🐺';

        // Add a small scale effect if near the center (representing a hybrid)
        if (maxWeight < 0.4) {
            dominantEmoji.innerText = "✨"; // Truly hybrid state
            dominantEmoji.style.transform = "scale(1.2)";
        } else {
            dominantEmoji.innerText = currentEmoji;
            dominantEmoji.style.transform = "scale(1)";
        }
    }

    function handleMove(clientX, clientY) {
        const rect = map.getBoundingClientRect();

        // Calculate position relative to map container
        let x = clientX - rect.left;
        let y = clientY - rect.top;

        // Clamp to boundaries
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));

        // Update Dot UI
        const xRatio = x / rect.width;
        const yRatio = y / rect.height;

        dot.style.left = `${xRatio * 100}%`;
        dot.style.top = `${yRatio * 100}%`;

        // Calculate & Update Output
        const weights = calculateWeights(xRatio, yRatio);
        updateOutput(weights);
    }

    // --- Mouse Events ---
    map.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // --- Touch Events ---
    map.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
        // Don't prevent default on start to allow initial clicks if needed,
        // but we will prevent scrolling on move.
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent page scrolling while dragging map
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Set initial state (top left - Cat)
    dot.style.left = '0%';
    dot.style.top = '0%';
    updateOutput(calculateWeights(0, 0));
}