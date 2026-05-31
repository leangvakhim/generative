// <!-- Application Script -->
// --- Core Application State ---
let currentStep = 0;
let viewMode = 'canvas'; // 'canvas', 'math', or 'code'

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
    level: 0,
    target: 0,
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
            viewMode = 'canvas';
            setBaseImage('🦊');
            animState.level = 1;
            triggerAnimation(0, 1500);
        }
    },
    {
        title: "Forward Process (Adding Noise)",
        desc: "In the <strong>Forward Process</strong>, we gradually add Gaussian noise to our image over a series of steps (time \\(t\\)). By the final step \\(T\\), the image is turned into pure random noise. The model doesn't learn anything here; this is just a fixed mathematical formula applied to the data.",
        setup: () => {
            viewMode = 'canvas';
            setBaseImage('🦊');
            animState.level = 0;
            triggerAnimation(1, 2500);
        }
    },
    {
        title: "Reverse Process (Denoising)",
        desc: "The <strong>Reverse Process</strong> is where the AI works its magic! A neural network is trained to predict the exact amount of noise that was added. By predicting and subtracting the noise step-by-step, it successfully reconstructs the original image from static.",
        setup: () => {
            viewMode = 'canvas';
            setBaseImage('🦊');
            animState.level = 1;
            triggerAnimation(0, 3000);
        }
    },
    {
        title: "Generation (Sampling)",
        desc: "Once fully trained, we can generate <strong>entirely new data</strong>! We start with pure, random noise (meaningless static) and pass it through our trained Reverse Process. The AI hallucinates a brand new, unique image out of the static based on what it learned.",
        setup: () => {
            viewMode = 'canvas';
            setBaseImage('🚀');
            animState.level = 1;
            triggerAnimation(0, 3500);
        }
    },
    {
        title: "The Mathematics",
        desc: "At its core, Diffusion relies on probability. The Forward Process is a fixed Markov chain. The Reverse Process is parameterized by a neural network \\(\\theta\\). The model is optimized using a simplified loss function \\(\\mathcal{L}\\) that trains it to predict the true added noise \\(\\epsilon\\).",
        setup: () => {
            viewMode = 'math';
        }
    },
    {
        title: "PyTorch Implementation",
        desc: "Let's translate these concepts into a simple <strong>Python & PyTorch</strong> script. <br><br>The code demonstrates the 3 major components: mathematically adding the noise (Forward), building the Neural Network to predict the noise, and calculating the loss to train the model.",
        setup: () => {
            viewMode = 'code';
            hljs.highlightElement(document.getElementById('pythonCodeBlock'));
        }
    }
];

// --- Core Functions ---

function setBaseImage(emoji) {
    offscreenCtx.fillStyle = '#ffffff';
    offscreenCtx.fillRect(0, 0, 300, 300);
    offscreenCtx.font = '160px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.fillText(emoji, 150, 165);
    baseImageData = offscreenCtx.getImageData(0, 0, 300, 300);
}

function drawNoise(level) {
    if (!baseImageData) return;
    const baseData = baseImageData.data;
    const targetData = targetImageData.data;
    const len = baseData.length;

    for (let i = 0; i < len; i += 4) {
        const noiseVal = Math.random() * 255;
        targetData[i] = baseData[i] * (1 - level) + noiseVal * level;
        targetData[i + 1] = baseData[i + 1] * (1 - level) + noiseVal * level;
        targetData[i + 2] = baseData[i + 2] * (1 - level) + noiseVal * level;
        targetData[i + 3] = 255;
    }
    ctx.putImageData(targetImageData, 0, 0);
}

function triggerAnimation(target, duration) {
    animState.startLevel = animState.level;
    animState.target = target;
    animState.duration = duration;
    animState.startTime = performance.now();
    animState.active = true;
}

function renderLoop(time) {
    if (animState.active) {
        let elapsed = time - animState.startTime;
        let progress = elapsed / animState.duration;

        const progBarContainer = document.getElementById('animProgressContainer');
        const progBar = document.getElementById('animProgressBar');
        progBarContainer.style.opacity = '1';
        progBar.style.width = `${Math.min(progress * 100, 100)}%`;

        if (progress >= 1) {
            progress = 1;
            animState.active = false;
            progBarContainer.style.opacity = '0';
        }

        let ease = -(Math.cos(Math.PI * progress) - 1) / 2;
        animState.level = animState.startLevel + (animState.target - animState.startLevel) * ease;
    }

    if (viewMode === 'canvas') {
        if (animState.active || animState.level > 0.01) {
            drawNoise(animState.level);
        } else if (animState.level <= 0.01) {
            drawNoise(0);
        }
    }
    requestAnimationFrame(renderLoop);
}

// --- View & Navigation Logic ---

function updateUI() {
    const step = stepsData[currentStep];

    // Text Updates
    document.getElementById('stepBadge').innerText = `Step ${currentStep + 1} of ${stepsData.length}`;
    document.getElementById('stepTitle').innerText = step.title;
    document.getElementById('stepDesc').innerHTML = step.desc;

    if (window.renderMathInElement) {
        renderMathInElement(document.getElementById('stepDesc'), {
            delimiters: [{ left: '\\(', right: '\\)', display: false }]
        });
    }

    // Controls State
    document.getElementById('btnBack').disabled = currentStep === 0;
    document.getElementById('btnNext').disabled = currentStep === stepsData.length - 1;
    document.getElementById('btnNext').innerHTML = currentStep === stepsData.length - 1 ? 'Finish' : 'Next Step &rarr;';

    // Animation Reflow
    const txtContainer = document.getElementById('textContainer');
    txtContainer.classList.remove('fade-in');
    void txtContainer.offsetWidth;
    txtContainer.classList.add('fade-in');

    // Toggle Visual Panes
    const canvasWrapper = document.getElementById('canvasWrapper');
    const mathUI = document.getElementById('mathContainer');
    const codeUI = document.getElementById('codeContainer');

    canvasWrapper.classList.toggle('hidden', viewMode !== 'canvas');
    mathUI.classList.toggle('hidden', viewMode !== 'math');
    codeUI.classList.toggle('hidden', viewMode !== 'code');

    // Handle Specific Step 5 Button logic
    const extraBtn = document.getElementById('extraBtnContainer');
    if (currentStep === 4) { // Step 5 index is 4
        extraBtn.classList.remove('hidden');
    } else {
        extraBtn.classList.add('hidden');
    }

    renderStepper();
}

function renderStepper() {
    const stepper = document.getElementById('stepper');
    stepper.innerHTML = '';

    stepsData.forEach((_, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'flex items-center my-1';

        const isActive = index === currentStep;
        const isPast = index < currentStep;

        const circle = document.createElement('div');
        circle.className = `w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10
            ${isActive ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-110' :
                isPast ? 'bg-blue-100 text-blue-700 border-blue-300 cursor-pointer hover:bg-blue-200' :
                    'bg-white text-slate-400 border-slate-200 cursor-pointer hover:bg-slate-50'}`;
        circle.innerText = index + 1;
        circle.onclick = () => goToStep(index);
        stepDiv.appendChild(circle);

        if (index < stepsData.length - 1) {
            const line = document.createElement('div');
            const lineActive = index < currentStep;
            line.className = `w-4 md:w-8 h-1 -mx-1 transition-colors duration-500 ${lineActive ? 'bg-blue-400' : 'bg-slate-200'}`;
            stepDiv.appendChild(line);
        }

        stepper.appendChild(stepDiv);
    });
}

function goToStep(index) {
    if (index < 0 || index >= stepsData.length) return;
    currentStep = index;
    stepsData[currentStep].setup();
    updateUI();
}

function nextStep() { goToStep(currentStep + 1); }
function prevStep() { goToStep(currentStep - 1); }

// --- Custom HTML File Generator ---
function openExternalHtmlFile() {
    // Programmatically open a new tab and write the HTML string to it
    const newWindow = window.open("./diffusion_math.html", "_blank");
}

// --- Initialization ---
window.onload = () => {
    if (window.renderMathInElement) {
        renderMathInElement(document.getElementById('mathContainer'), {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\(', right: '\\)', display: false }
            ]
        });
    }

    goToStep(0);
    requestAnimationFrame(renderLoop);
};