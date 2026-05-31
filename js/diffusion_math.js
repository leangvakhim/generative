// --- Navigation Logic ---
const totalSteps = 7;
let currentStep = 0;

const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const stepCounter = document.getElementById('step-counter');
const progressBar = document.getElementById('progress-bar');

function updateUI() {
    // Hide all steps, show current
    for (let i = 0; i < totalSteps; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (i === currentStep) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    }

    // Update counter and progress bar
    stepCounter.innerText = currentStep + 1;
    progressBar.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;

    // Button states
    btnBack.disabled = (currentStep === 0);

    if (currentStep === totalSteps - 1) {
        btnNext.innerHTML = 'Finish <i class="fa-solid fa-check"></i>';
        btnNext.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        btnNext.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        // Trigger math render for sandbox specifically just in case
        updateSandbox();
    } else {
        btnNext.innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
        btnNext.classList.add('bg-blue-600', 'hover:bg-blue-700');
        btnNext.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
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

// --- Sandbox Logic ---
const inputX = document.getElementById('input-x');
const inputBeta = document.getElementById('input-beta');
const inputEpsilon = document.getElementById('input-epsilon');
const inputAi = document.getElementById('input-ai');

const valX = document.getElementById('val-x');
const valBeta = document.getElementById('val-beta');
const valEpsilon = document.getElementById('val-epsilon');
const valAi = document.getElementById('val-ai');

function updateSandbox() {
    // Get current values
    const x = parseFloat(inputX.value);
    const beta = parseFloat(inputBeta.value);
    const epsilon = parseFloat(inputEpsilon.value);
    const epsilonAi = parseFloat(inputAi.value);

    // Update Labels
    valX.innerText = x;
    valBeta.innerText = beta.toFixed(2);
    valEpsilon.innerText = epsilon > 0 ? `+${epsilon}` : epsilon;
    valAi.innerText = epsilonAi > 0 ? `+${epsilonAi}` : epsilonAi;

    // 1. Calculate Forward Math
    // Mean = sqrt(1 - beta) * x
    const meanFactor = Math.sqrt(1 - beta);
    const meanValue = meanFactor * x;
    const xt = meanValue + epsilon;

    // Render Forward Math using KaTeX
    const meanStr = `\\text{Mean} = \\sqrt{1 - ${beta.toFixed(2)}} \\times ${x} = ${meanValue.toFixed(1)}`;
    const xtStr = `x_t = ${meanValue.toFixed(1)} + (${epsilon}) = ${xt.toFixed(1)}`;

    katex.render(meanStr, document.getElementById('math-out-mean'), { displayMode: true });
    katex.render(xtStr, document.getElementById('math-out-xt'), { displayMode: true });

    // 2. Calculate Loss Math
    const diff = epsilon - epsilonAi;
    const loss = Math.pow(diff, 2);

    // Render Loss Math using KaTeX
    const lossCalcStr = `\\text{Diff} = ${epsilon} - (${epsilonAi}) = ${diff}`;
    const lossStr = `\\mathcal{L}_{simple} = (${diff})^2 = ${loss}`;

    katex.render(lossCalcStr, document.getElementById('math-out-loss-calc'), { displayMode: true });
    katex.render(lossStr, document.getElementById('math-out-loss'), { displayMode: true });
}

// Attach listeners to sliders
[inputX, inputBeta, inputEpsilon, inputAi].forEach(input => {
    input.addEventListener('input', updateSandbox);
});

// --- Initialization ---
document.addEventListener("DOMContentLoaded", function () {
    // Auto-render static math on the page
    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
        ],
        throwOnError: false
    });

    // Initialize UI state
    updateUI();

    // Initial calculations for sandbox
    updateSandbox();
});