// --- Core Application State ---
let currentStep = 0;
let isCanvasMode = true;

// --- Canvas Setup ---
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Offscreen canvas for drawing base images cleanly
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = 300;
offscreenCanvas.height = 300;
const offscreenCtx = offscreenCanvas.getContext('2d');

let baseImageData = null;
let targetImageData = ctx.createImageData(300, 300);

// --- Animation State ---
let animState = {
    level: 0,        // Current noise level (0 = clean, 1 = pure noise)
    target: 0,       // Target noise level
    startLevel: 0,
    startTime: 0,
    duration: 1000,
    active: false
};

// --- Step Definitions ---
const stepsData = [
    {
        title: "The Core Concept",
        desc: "Diffusion Models are powerful generative AI models. They learn to create data by first learning how to systematically destroy it. We start with a clear piece of data (like an image) and slowly add random static noise until it's completely unrecognizable.",
        setup: () => {
            isCanvasMode = true;
            setBaseImage('🦊'); // Fox Emoji
            animState.level = 1; // Start noisy to show a quick reveal on load
            triggerAnimation(0, 1500);
        }
    },
    {
        title: "Forward Process (Adding Noise)",
        desc: "In the <strong>Forward Process</strong>, we gradually add Gaussian noise to our image over a series of steps (time \\(t\\)). By the final step \\(T\\), the image is turned into pure random noise. The model doesn't learn anything here; this is just a fixed mathematical formula applied to the data.",
        setup: () => {
            isCanvasMode = true;
            setBaseImage('🦊');
            animState.level = 0; // Start clean
            triggerAnimation(1, 2500); // Slowly destroy it
        }
    },
    {
        title: "Reverse Process (Denoising)",
        desc: "The <strong>Reverse Process</strong> is where the AI works its magic! A neural network (usually a U-Net architecture) is trained to predict the exact amount of noise that was added. By predicting and subtracting the noise step-by-step, it successfully reconstructs the original image from static.",
        setup: () => {
            isCanvasMode = true;
            setBaseImage('🦊');
            animState.level = 1; // Start destroyed
            triggerAnimation(0, 3000); // Reconstruct
        }
    },
    {
        title: "Generation (Sampling)",
        desc: "Once fully trained, we can generate <strong>entirely new data</strong>! We start with pure, random noise (meaningless static) and pass it through our trained Reverse Process. The AI hallucinates a brand new, unique image out of the static based on what it learned.",
        setup: () => {
            isCanvasMode = true;
            setBaseImage('🚀'); // Rocket Emoji for new generation
            animState.level = 1; // Start pure noise
            triggerAnimation(0, 3500); // Generate!
        }
    },
    {
        title: "The Mathematics",
        desc: "At its core, Diffusion relies on probability. The Forward Process is a fixed Markov chain. The Reverse Process is parameterized by a neural network \\(\\theta\\). The model is optimized using a simplified loss function \\(\\mathcal{L}\\) that trains it to predict the true added noise \\(\\epsilon\\).",
        setup: () => {
            isCanvasMode = false; // Switch to math view
        }
    }
];

// --- Core Functions ---

// 1. Draw the base emoji image to the offscreen canvas
function setBaseImage(emoji) {
    offscreenCtx.fillStyle = '#ffffff';
    offscreenCtx.fillRect(0, 0, 300, 300);
    offscreenCtx.font = '160px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.fillText(emoji, 150, 165); // Draw centered
    baseImageData = offscreenCtx.getImageData(0, 0, 300, 300);
}

// 2. Apply noise based on the current level (0.0 to 1.0)
function drawNoise(level) {
    if (!baseImageData) return;
    const baseData = baseImageData.data;
    const targetData = targetImageData.data;
    const len = baseData.length;

    for (let i = 0; i < len; i += 4) {
        // Generate monochromatic (grayscale) static for a classic noise look
        const noiseVal = Math.random() * 255;

        // Linear interpolation: (original * (1 - level)) + (noise * level)
        targetData[i] = baseData[i] * (1 - level) + noiseVal * level; // R
        targetData[i + 1] = baseData[i + 1] * (1 - level) + noiseVal * level; // G
        targetData[i + 2] = baseData[i + 2] * (1 - level) + noiseVal * level; // B
        targetData[i + 3] = 255; // Keep alpha fully opaque
    }
    ctx.putImageData(targetImageData, 0, 0);
}

// 3. Trigger a smooth animation transition
function triggerAnimation(target, duration) {
    animState.startLevel = animState.level;
    animState.target = target;
    animState.duration = duration;
    animState.startTime = performance.now();
    animState.active = true;
}

// 4. Main Render Loop
function renderLoop(time) {
    // Calculate animation progress
    if (animState.active) {
        let elapsed = time - animState.startTime;
        let progress = elapsed / animState.duration;

        // Update UI progress bar
        const progBarContainer = document.getElementById('animProgressContainer');
        const progBar = document.getElementById('animProgressBar');
        progBarContainer.style.opacity = '1';
        progBar.style.width = `${Math.min(progress * 100, 100)}%`;

        if (progress >= 1) {
            progress = 1;
            animState.active = false;
            progBarContainer.style.opacity = '0'; // hide progress bar when done
        }

        // Sine Easing function for smooth start/end
        let ease = -(Math.cos(Math.PI * progress) - 1) / 2;
        animState.level = animState.startLevel + (animState.target - animState.startLevel) * ease;
    }

    if (isCanvasMode) {
        // Redraw constantly if there's noise to create a TV static flickering effect
        // If completely clean (level === 0) and not animating, stop redrawing to save CPU
        if (animState.active || animState.level > 0.01) {
            drawNoise(animState.level);
        } else if (animState.level <= 0.01) {
            drawNoise(0); // Ensure perfectly clean image is rendered
        }
    }

    requestAnimationFrame(renderLoop);
}

// --- UI & Navigation Logic ---

function updateUI() {
    const step = stepsData[currentStep];

    // Text Updates
    document.getElementById('stepBadge').innerText = `Step ${currentStep + 1} of ${stepsData.length}`;
    document.getElementById('stepTitle').innerText = step.title;
    document.getElementById('stepDesc').innerHTML = step.desc;

    // Render Inline Math in the description text
    if (window.renderMathInElement) {
        renderMathInElement(document.getElementById('stepDesc'), {
            delimiters: [{ left: '\\(', right: '\\)', display: false }]
        });
    }

    // Button States
    document.getElementById('btnBack').disabled = currentStep === 0;
    document.getElementById('btnNext').disabled = currentStep === stepsData.length - 1;
    document.getElementById('btnNext').innerHTML = currentStep === stepsData.length - 1 ? 'Finish' : 'Next Step &rarr;';

    // Re-trigger animation to reset text container fade
    const txtContainer = document.getElementById('textContainer');
    txtContainer.classList.remove('fade-in');
    void txtContainer.offsetWidth; // trigger reflow
    txtContainer.classList.add('fade-in');

    // View Mode Toggling (Canvas vs Math)
    const wrapper = document.getElementById('canvasWrapper');
    const mathUI = document.getElementById('mathContainer');

    if (isCanvasMode) {
        wrapper.classList.remove('hidden');
        mathUI.classList.add('hidden');
    } else {
        wrapper.classList.add('hidden');
        mathUI.classList.remove('hidden');
    }

    renderStepper();
}

function renderStepper() {
    const stepper = document.getElementById('stepper');
    stepper.innerHTML = '';

    stepsData.forEach((_, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'flex items-center';

        const isActive = index === currentStep;
        const isPast = index < currentStep;

        // Circle
        const circle = document.createElement('div');
        circle.className = `w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 z-10
            ${isActive ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-110' :
                isPast ? 'bg-blue-100 text-blue-700 border-blue-300 cursor-pointer hover:bg-blue-200' :
                    'bg-white text-slate-400 border-slate-200 cursor-pointer hover:bg-slate-50'}`;
        circle.innerText = index + 1;

        // Allow clicking past or future steps directly
        circle.onclick = () => goToStep(index);

        stepDiv.appendChild(circle);

        // Connecting Line
        if (index < stepsData.length - 1) {
            const line = document.createElement('div');
            // Ensure the line highlights correctly depending on step progression
            const lineActive = index < currentStep;
            line.className = `w-8 md:w-16 h-1 -mx-1 transition-colors duration-500 ${lineActive ? 'bg-blue-400' : 'bg-slate-200'}`;
            stepDiv.appendChild(line);
        }

        stepper.appendChild(stepDiv);
    });
}

function goToStep(index) {
    if (index < 0 || index >= stepsData.length) return;
    currentStep = index;
    // Execute the step's specific logic (setup animation or math view)
    stepsData[currentStep].setup();
    updateUI();
}

function nextStep() {
    goToStep(currentStep + 1);
}

function prevStep() {
    goToStep(currentStep - 1);
}

// --- Initialization ---
window.onload = () => {
    // Render the complex equations in the math container once on load
    if (window.renderMathInElement) {
        renderMathInElement(document.getElementById('mathContainer'), {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\(', right: '\\)', display: false }
            ]
        });
    }

    // Start the application
    goToStep(0);
    requestAnimationFrame(renderLoop);
};