// Data for each step of the interactive visualization
const stepsData = [
    {
        title: "1. The Input (Your Original Castle)",
        desc: "Imagine you just built a massive, awesome Lego Castle. It's huge, and it’s perfect. In a computer, this is your original piece of data, like a high-quality photograph.",
        formula: "x \\in \\mathbb{R}^d",
        formulaContext: "Where 'x' is the high-dimensional original data (the Castle).",
        visual: `<div class="text-[120px] emoji-shadow animate-bounce-slow">🏰</div>`
    },
    {
        title: "2. The Encoder (The Careful Smasher)",
        desc: "Since the castle won't fit in the lunchbox, you have to break it down into the most important chunks (tower, walls) and remember how they fit together. The Encoder shrinks a big thing into a tightly packed version.",
        formula: "h = f_\\theta(x)",
        formulaContext: "The Encoder function (f) compresses input (x) into a smaller representation (h).",
        visual: `
            <div class="flex items-center gap-6 w-full justify-center">
                <div class="text-7xl emoji-shadow">🏰</div>
                <div class="text-4xl text-slate-400 font-bold">➔</div>
                <div class="text-7xl emoji-shadow">🛠️</div>
                <div class="text-4xl text-slate-400 font-bold">➔</div>
                <div class="flex flex-wrap w-24 gap-1 justify-center animate-pulse-slow">
                    <div class="text-3xl">🧱</div><div class="text-3xl">🟥</div><div class="text-3xl">🟦</div>
                </div>
            </div>`
    },
    {
        title: "3. The Latent Space (The Tiny Lunchbox)",
        desc: "This is the tiny lunchbox itself. It is a 'bottleneck' because there is very little room. It holds the secret, squished-down instructions and essential pieces needed to rebuild the castle.",
        formula: "h \\in \\mathbb{R}^p \\quad \\text{where } p \\ll d",
        formulaContext: "The latent space (h) has a much smaller dimension (p) than the original data (d).",
        visual: `<div class="relative flex items-center justify-center">
                    <div class="text-[140px] emoji-shadow">🍱</div>
                    <div class="absolute inset-0 flex items-center justify-center mt-4">
                        <span class="text-3xl bg-white/80 rounded-full p-2 shadow-sm animate-pulse">🧱</span>
                    </div>
                    </div>`
    },
    {
        title: "4. The Decoder (The Master Builder)",
        desc: "When you get to your friend's house, you open the tiny lunchbox. The Decoder takes those small, squished-up pieces and figures out how to rebuild them back to full size.",
        formula: "\\hat{x} = g_\\phi(h)",
        formulaContext: "The Decoder function (g) reconstructs the data (x̂) from the latent space (h).",
        visual: `
            <div class="flex items-center gap-6 w-full justify-center">
                <div class="text-7xl emoji-shadow">🍱</div>
                <div class="text-4xl text-slate-400 font-bold">➔</div>
                <div class="text-7xl emoji-shadow animate-bounce-slow">👷‍♂️</div>
                <div class="text-4xl text-slate-400 font-bold">➔</div>
                <div class="text-7xl emoji-shadow opacity-50">🏰</div>
            </div>`
    },
    {
        title: "5. The Goal! (Reconstructed Castle)",
        desc: "When completely done, the rebuilt castle should look almost exactly like the original. The computer learns by checking how close the rebuilt version is to the original one.",
        formula: "\\mathcal{L}(x, \\hat{x}) = ||x - \\hat{x}||^2",
        formulaContext: "The Loss function measures the difference between original (x) and rebuilt (x̂). We want this to be as close to 0 as possible!",
        visual: `
            <div class="flex items-center gap-8 w-full justify-center">
                <div class="text-center">
                    <div class="text-6xl mb-2">🏰</div>
                    <div class="text-sm font-bold text-slate-500">Original</div>
                </div>
                <div class="text-5xl text-green-500 font-bold">≈</div>
                <div class="text-center">
                    <div class="text-6xl mb-2">🏰✨</div>
                    <div class="text-sm font-bold text-slate-500">Rebuilt</div>
                </div>
            </div>`
    },
    {
        title: "Superpower 1: Cleaning Up Messes",
        desc: "If your castle falls in mud, it won't fit in the lunchbox! You must brush off the dirt first. Computers use Denoising Autoencoders to clean up blurry or scratched photos by throwing away the 'mud' that won't fit in the bottleneck.",
        formula: "\\mathcal{L} = ||x - g(f(x_{\\text{muddy}}))||^2",
        formulaContext: "Train the model to reconstruct the clean image (x) from a corrupted input (x_muddy).",
        visual: `
            <div class="flex items-center gap-4 w-full justify-center">
                <div class="text-5xl relative">🏰<span class="absolute -bottom-2 -right-2 text-3xl">💩</span></div>
                <div class="text-2xl text-slate-400 font-bold">➔</div>
                <div class="text-5xl">🍱</div>
                <div class="text-2xl text-slate-400 font-bold">➔</div>
                <div class="text-6xl drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">🏰✨</div>
            </div>`
    },
    {
        title: "Superpower 2: Saving a Ton of Space",
        desc: "100 giant castles won't fit in your room. But 100 tiny lunchboxes easily fit in a closet! This is Data Compression. Autoencoders shrink huge files (like movies) so you can keep thousands of them on your phone.",
        formula: "\\text{Compression Ratio} = \\frac{\\text{Size}(x)}{\\text{Size}(h)}",
        formulaContext: "Comparing the size of the original data to the tiny latent lunchbox.",
        visual: `
            <div class="grid grid-cols-5 gap-4">
                <div class="text-4xl">🍱</div><div class="text-4xl">🍱</div><div class="text-4xl">🍱</div>
                <div class="text-4xl">🍱</div><div class="text-4xl">🍱</div>
                <div class="text-4xl">🍱</div><div class="text-4xl">🍱</div><div class="text-4xl text-slate-300">...</div>
            </div>`
    },
    {
        title: "Superpower 3: Spotting Fakes",
        desc: "If you hand the computer a Spaceship, it doesn't know how to squish it because it only practiced on Castles. It makes a mess trying to rebuild it! Banks use Anomaly Detection to spot fraud when a purchase doesn't fit your normal 'castle' pattern.",
        formula: "\\text{If } ||x_{\\text{new}} - \\hat{x}_{\\text{new}}||^2 > \\text{Threshold, it's a Fake!}",
        formulaContext: "If the reconstruction error is too high, the data is anomalous (a spaceship).",
        visual: `
            <div class="flex flex-col items-center gap-2">
                <div class="flex items-center gap-4">
                    <div class="text-6xl animate-pulse">🚀</div>
                    <div class="text-2xl text-slate-400 font-bold">➔</div>
                    <div class="text-5xl">🍱</div>
                    <div class="text-2xl text-slate-400 font-bold">➔</div>
                    <div class="text-6xl relative">💥<span class="absolute inset-0 flex items-center justify-center text-4xl">❓</span></div>
                </div>
                <div class="text-red-500 font-bold mt-4 animate-bounce">🚨 ERROR: NOT A CASTLE! 🚨</div>
            </div>`
    },
    {
        title: "Superpower 4: Inventing Brand New Things",
        desc: "Once the Decoder is a Master Builder, you can put a slightly different mix of pieces in the lunchbox. The Decoder will build a brand new castle that never existed before! This is Generative AI (like Variational Autoencoders).",
        formula: "z \\sim \\mathcal{N}(\\mu_x, \\sigma_x^2) \\quad \\rightarrow \\quad x_{\\text{new}} = g(z)",
        formulaContext: "By picking random coordinates (z) in the latent space, the decoder generates entirely new data.",
        visual: `
            <div class="flex flex-col items-center gap-2">
                <div class="flex items-center gap-4">
                    <div class="text-5xl">🍱</div>
                    <div class="text-3xl text-slate-400 font-bold">+</div>
                    <div class="text-5xl animate-spin-slow" style="animation: spin 6s linear infinite;">🎲</div>
                    <div class="text-2xl text-slate-400 font-bold">➔</div>
                    <div class="text-7xl drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-pulse-slow">🏰🦄</div>
                </div>
                <div class="text-purple-500 font-bold mt-4">✨ A brand new creation! ✨</div>
            </div>`
    }
];

let currentStep = 0;

function init() {
    // Setup dots
    const dotsContainer = document.getElementById('progress-dots');
    stepsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-slate-300'}`;
        dot.id = `dot-${index}`;
        dotsContainer.appendChild(dot);
    });

    updateUI();
}

function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= stepsData.length) currentStep = stepsData.length - 1;

    updateUI();
}

function updateUI() {
    const step = stepsData[currentStep];

    // Trigger animation re-flow for visual container
    const visualContainer = document.getElementById('visual-container');
    visualContainer.style.opacity = '0';
    visualContainer.style.transform = 'scale(0.95)';

    setTimeout(() => {
        visualContainer.innerHTML = step.visual;
        visualContainer.style.opacity = '1';
        visualContainer.style.transform = 'scale(1)';
    }, 200);

    // Update Text
    document.getElementById('step-title').innerText = step.title;
    document.getElementById('step-desc').innerText = step.desc;

    // Update counter
    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${stepsData.length}`;

    // Render KaTeX Formula
    const formulaContainer = document.getElementById('formula-container');
    if (step.formula) {
        document.getElementById('formula-box').style.display = 'inline-block';
        katex.render(step.formula, formulaContainer, {
            throwOnError: false,
            displayMode: true
        });

        // Add contextual text under formula
        const ctxDiv = document.createElement('div');
        ctxDiv.className = "text-xs text-slate-500 font-normal mt-2 text-center";
        ctxDiv.innerText = step.formulaContext;
        formulaContainer.appendChild(ctxDiv);
    } else {
        document.getElementById('formula-box').style.display = 'none';
    }

    // Update Buttons
    document.getElementById('btn-prev').disabled = currentStep === 0;
    document.getElementById('btn-next').disabled = currentStep === stepsData.length - 1;

    // Update Dots
    stepsData.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 bg-blue-600 ring-4 ring-blue-100';
        } else if (index < currentStep) {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 bg-blue-300';
        } else {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 bg-slate-200';
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);