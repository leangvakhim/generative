// Story Data
const steps = [
    {
        title: "The Magical Toy Robot & The Map",
        text: "Imagine you have a magical robot that builds toys. To tell the robot what to build, you point to a spot on a giant paper map. <br><br>This map is what scientists call the <strong>Latent Space</strong>.",
        math: "",
        visualState: { showIslands: false, pointerActive: false, output: "", showGarbage: false, showEmptyBox: false }
    },
    {
        title: "The Known Islands",
        text: "On this map, the robot has drawn three specific <strong>islands</strong> where it knows exactly what to do.<br><br>The Dots are the specific things the computer has memorized perfectly.",
        math: "z_i \\in \\{z_{car}, z_{bear}, z_{lego}\\}",
        visualState: { showIslands: true, pointerActive: false, output: "", showGarbage: false, showEmptyBox: false }
    },
    {
        title: "Pointing to an Island",
        text: "<strong>The Blue Dot (Island 1):</strong> If you point here, the robot builds a perfect toy car! It memorized the exact instructions for this specific spot.",
        math: "\\text{Decoder}(z_{car}) = \\text{Perfect Car}",
        visualState: { showIslands: true, pointerActive: true, pointerPos: { top: '20%', left: '25%' }, output: "🚗", showGarbage: false, showEmptyBox: false }
    },
    {
        title: "The Empty Ocean",
        text: "<strong>So, what is the 'Flaw'?</strong><br><br>The problem is that the robot only memorized those exact three islands. It didn't bother learning anything about the blank ocean in between them.",
        math: "\\text{Empty Space} \\notin \\text{Known Distributions}",
        visualState: { showIslands: true, pointerActive: false, output: "", showGarbage: false, showEmptyBox: true }
    },
    {
        title: "The Garbage Output",
        text: "If you point to a totally empty, blank space on the map right in the middle hoping for a cool mix of a car and a teddy bear, the robot gets completely confused!<br><br>Because it has never seen anything here, it panics and spits out a broken, messy lump.",
        math: "\\text{Decoder}(z_{unknown}) \\Rightarrow \\text{Garbage Output}",
        visualState: { showIslands: true, pointerActive: true, pointerPos: { top: '45%', left: '50%' }, output: "", showGarbage: true, showEmptyBox: true }
    },
    {
        title: "The Takeaway",
        text: "A standard Autoencoder (the toy robot) is great at copying things it already knows, but it's really bad at inventing new things because it gets lost in the empty spaces on its map!<br><br><em>(This is why we need more advanced models like Variational Autoencoders!)</em>",
        math: "\\mathcal{L} = ||x - x'||^2 \\; \\text{(Standard Autoencoder only learns points, not continuous space)}",
        visualState: { showIslands: true, pointerActive: true, pointerPos: { top: '45%', left: '50%' }, output: "", showGarbage: true, showEmptyBox: true }
    }
];

let currentStep = 0;

// DOM Elements
const elStepCounter = document.getElementById('step-counter');
const elTotalSteps = document.getElementById('total-steps');
const elStepTitle = document.getElementById('step-title');
const elStepDesc = document.getElementById('step-description');
const elMathContainer = document.getElementById('math-container');
const elKatexRender = document.getElementById('katex-render');

const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');

const visIslandBlue = document.getElementById('island-blue');
const visIslandPurple = document.getElementById('island-purple');
const visIslandGreen = document.getElementById('island-green');
const visPointer = document.getElementById('pointer');
const visOutputContent = document.getElementById('output-content');
const visGarbageOutput = document.getElementById('garbage-output');
const visEmptyBox = document.getElementById('empty-space-box');

// Initialization
elTotalSteps.textContent = steps.length;
renderStep();

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

function renderStep() {
    const step = steps[currentStep];

    // 1. Update Text Content
    elStepCounter.textContent = currentStep + 1;
    elStepTitle.textContent = step.title;

    // Trigger text re-animation
    elStepDesc.innerHTML = step.text;
    elStepDesc.classList.remove('fade-in');
    void elStepDesc.offsetWidth; // Trigger reflow
    elStepDesc.classList.add('fade-in');

    // 2. Render KaTeX Math
    if (step.math) {
        elMathContainer.classList.remove('hidden');
        katex.render(step.math, elKatexRender, {
            throwOnError: false,
            displayMode: true
        });
    } else {
        elMathContainer.classList.add('hidden');
    }

    // 3. Update Visual State
    const state = step.visualState;

    // Islands
    const opacityClass = state.showIslands ? '1' : '0';
    visIslandBlue.style.opacity = opacityClass;
    visIslandPurple.style.opacity = opacityClass;
    visIslandGreen.style.opacity = opacityClass;

    // Empty Box Area
    if (state.showEmptyBox) {
        visEmptyBox.classList.remove('hidden');
        setTimeout(() => visEmptyBox.style.opacity = '1', 50);
    } else {
        visEmptyBox.style.opacity = '0';
        setTimeout(() => visEmptyBox.classList.add('hidden'), 500);
    }

    // Pointer
    if (state.pointerActive) {
        visPointer.style.opacity = '1';
        visPointer.style.top = state.pointerPos.top;
        visPointer.style.left = state.pointerPos.left;
    } else {
        visPointer.style.opacity = '0';
    }

    // Normal Output (e.g. Car emoji)
    if (state.output !== "") {
        visOutputContent.innerHTML = state.output;
        visOutputContent.classList.remove('scale-0');
        visOutputContent.classList.add('scale-100');
    } else {
        visOutputContent.classList.remove('scale-100');
        visOutputContent.classList.add('scale-0');
    }

    // Garbage Output (Red Box)
    if (state.showGarbage) {
        visGarbageOutput.classList.remove('hidden');
        visGarbageOutput.classList.add('flex');
    } else {
        visGarbageOutput.classList.add('hidden');
        visGarbageOutput.classList.remove('flex');
    }

    // 4. Update Button States
    btnBack.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    if (currentStep === steps.length - 1) {
        // Dim the Next button if at the end
        btnNext.classList.remove('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/30');
        btnNext.classList.add('bg-slate-200', 'text-slate-500');
    } else {
        // Restore primary button styling
        btnNext.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/30');
        btnNext.classList.remove('bg-slate-200', 'text-slate-500', 'bg-slate-500');
    }
}