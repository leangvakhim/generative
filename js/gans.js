// SVG Assets for visualization
const svgs = {
    intro: `<svg class="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" class="text-purple-500" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" class="text-blue-500" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>`,

    generator: `<div class="flex items-center space-x-6 text-purple-600">
        <div class="flex flex-col items-center">
            <svg class="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span class="text-sm font-bold">Random Noise</span>
        </div>
        <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        <div class="flex flex-col items-center bg-purple-50 p-4 rounded-xl border border-purple-200">
            <svg class="w-16 h-16 mb-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span class="text-sm font-bold">Generator (Forger)</span>
        </div>
        <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        <div class="flex flex-col items-center">
            <div class="w-16 h-16 mb-2 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-md border-2 border-purple-300 border-dashed flex items-center justify-center"><span class="text-xs text-purple-600 font-bold">FAKE</span></div>
            <span class="text-sm font-bold">Fake Image</span>
        </div>
    </div>`,

    discriminator: `<div class="flex items-center space-x-6 text-blue-600">
        <div class="flex flex-col space-y-4">
            <div class="flex items-center space-x-2">
                <div class="w-12 h-12 bg-green-100 rounded-md border-2 border-green-300 flex items-center justify-center"><span class="text-xs text-green-600 font-bold">REAL</span></div>
                <span class="text-xs font-bold text-green-600">Data</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-12 h-12 bg-purple-100 rounded-md border-2 border-purple-300 border-dashed flex items-center justify-center"><span class="text-xs text-purple-600 font-bold">FAKE</span></div>
                <span class="text-xs font-bold text-purple-600">From Gen</span>
            </div>
        </div>
        <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        <div class="flex flex-col items-center bg-blue-50 p-4 rounded-xl border border-blue-200">
            <svg class="w-16 h-16 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span class="text-sm font-bold">Discriminator (Detective)</span>
        </div>
        <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        <div class="flex flex-col items-center space-y-2">
            <span class="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">90% Real</span>
            <span class="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full text-sm">10% Fake</span>
        </div>
    </div>`,

    loop: `<div class="relative w-48 h-48 flex items-center justify-center mb-6">
        <div class="absolute inset-0 border-4 border-dashed border-indigo-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div class="absolute top-0 transform -translate-y-1/2 bg-purple-100 px-4 py-2 rounded-full border-2 border-purple-400">
            <span class="font-bold text-purple-700 text-sm">Generator</span>
        </div>
        <div class="absolute bottom-0 transform translate-y-1/2 bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-400">
            <span class="font-bold text-blue-700 text-sm">Discriminator</span>
        </div>
        <div class="text-center z-10 bg-white p-4 rounded-full shadow-sm border border-slate-50">
            <p class="font-bold text-slate-700 text-base">Adversarial<br>Loop</p>
        </div>
    </div>`,

    math: `<div class="flex flex-col items-center justify-center w-full">
        <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-inner mb-6 text-xl overflow-x-auto w-full text-center">
            <p id="math-formula">
                $$\\min_{G} \\max_{D} V(D, G) = \\mathbb{E}_{x \\sim p_{data}(x)}[\\log D(x)] + \\mathbb{E}_{z \\sim p_{z}(z)}[\\log(1 - D(G(z)))]$$
            </p>
        </div>
    </div>`
};

// Step Data
const steps = [
    {
        title: "The Setup: Two AI Models",
        desc: "A GAN is not just one Artificial Intelligence, it is actually <strong>two</strong> separate neural networks fighting against each other. <br><br> Imagine an <strong>Art Forger</strong> (trying to paint fake masterpieces) and an <strong>Art Detective</strong> (trying to spot the fakes).",
        visual: svgs.intro
    },
    {
        title: "Step 1: The Generator (The Forger)",
        desc: "The <span class='text-purple-600 font-bold'>Generator</span> is the forger. It starts with completely random numbers (noise) as its 'inspiration' and uses it to generate a completely new image. <br><br> At first, its paintings look like random static, but its goal is to create an image so perfect that it looks exactly like the real thing.",
        visual: svgs.generator
    },
    {
        title: "Step 2: The Discriminator (The Detective)",
        desc: "The <span class='text-blue-600 font-bold'>Discriminator</span> is the detective. It looks at a mix of <strong>Real Images</strong> (actual data) and <strong>Fake Images</strong> (created by the Generator). <br><br> Its job is simply to output a probability: <em>'Is this image REAL or FAKE?'</em>",
        visual: svgs.discriminator
    },
    {
        title: "Step 3: The Adversarial Loop",
        desc: "This is where the magic happens. They train together in a loop.<br><br>If the Detective spots a fake, it tells the Forger <em>why</em> it looked fake, so the Forger gets better. If the Forger successfully fools the Detective, the Detective learns from its mistake and gets stricter. They force each other to become experts.",
        visual: svgs.loop
    },
    {
        title: "Step 4: The GAN Equation (Minimax Game)",
        desc: "Mathematically, they are playing a 'Minimax' game. <br><br> <ul class='text-left inline-block mt-4 space-y-2 text-sm'><li><span class='text-blue-600 font-bold'>D(x)</span> = Detective's guess that a real image is real.</li><li><span class='text-purple-600 font-bold'>G(z)</span> = Forger's fake image made from noise (z).</li><li><span class='text-blue-600 font-bold'>D(G(z))</span> = Detective's guess that the fake image is real.</li></ul> <br><br> The Detective ($D$) wants to <strong>maximize</strong> the formula (be right). The Forger ($G$) wants to <strong>minimize</strong> the formula (make the Detective wrong).",
        visual: svgs.math
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-description');
const visualEl = document.getElementById('visual-container');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const counterEl = document.getElementById('step-counter');
const indicatorsContainer = document.getElementById('step-indicators');
const contentAnim = document.getElementById('step-content');

// Initialize Indicators
function initIndicators() {
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`;
        dot.id = `indicator-${i}`;
        indicatorsContainer.appendChild(dot);
    }
}

function updateUI() {
    // Trigger animation
    contentAnim.classList.remove('fade-enter-active');
    contentAnim.classList.add('fade-enter');

    setTimeout(() => {
        // Update Content
        const step = steps[currentStep];
        titleEl.innerHTML = step.title;
        descEl.innerHTML = step.desc;
        visualEl.innerHTML = step.visual;

        // Update Buttons
        prevBtn.disabled = currentStep === 0;

        if (currentStep === steps.length - 1) {
            nextBtn.innerHTML = "Finish";
            nextBtn.disabled = true;
            nextBtn.classList.replace('bg-indigo-600', 'bg-slate-300');
            nextBtn.classList.replace('hover:bg-indigo-700', 'hover:bg-slate-300');
        } else {
            nextBtn.innerHTML = "Next Step &rarr;";
            nextBtn.disabled = false;
            nextBtn.classList.replace('bg-slate-300', 'bg-indigo-600');
            nextBtn.classList.replace('hover:bg-slate-300', 'hover:bg-indigo-700');
        }

        // Update Counter & Indicators
        counterEl.innerText = `Step ${currentStep + 1} of ${steps.length}`;
        for (let i = 0; i < steps.length; i++) {
            const dot = document.getElementById(`indicator-${i}`);
            if (i === currentStep) {
                dot.className = `w-3 h-3 rounded-full transition-all duration-300 bg-indigo-600`;
            } else if (i < currentStep) {
                dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 bg-indigo-300`;
            } else {
                dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 bg-slate-200`;
            }
        }

        // If MathJax is present and it's the math step, force re-render
        if (currentStep === 4 && window.MathJax) {
            MathJax.typesetPromise([visualEl, descEl]).catch((err) => console.log('MathJax error:', err.message));
        }

        contentAnim.classList.remove('fade-enter');
        contentAnim.classList.add('fade-enter-active');
    }, 50); // Small delay to allow CSS class reset
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

// Start
initIndicators();
updateUI();