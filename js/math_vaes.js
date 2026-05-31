// <!-- Application Logic -->
const steps = [
    {
        title: "The Big Idea: The Play-Doh Toy Factory",
        content: `
            <div class="space-y-4 fade-in">
                <h2 class="text-2xl font-bold text-indigo-700 mb-4">The Magical Machine</h2>
                <p class="text-lg leading-relaxed">Imagine you have a magical machine that makes Play-Doh toys.</p>
                <ul class="list-disc list-inside space-y-2 text-lg text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <li>You put a real toy dinosaur into the machine (the input, $x$).</li>
                    <li>The machine squashes Play-Doh around it to make a mold (the latent space, $z$).</li>
                    <li>The machine uses the mold to stamp out a brand-new Play-Doh dinosaur (the output).</li>
                </ul>
                <p class="text-lg leading-relaxed mt-4">
                    For this machine to be the best in the world, it needs to be graded on its work. We want the <strong>lowest penalty score possible!</strong>
                </p>
            </div>
        `
    },
    {
        title: "The Grading Rubric",
        content: `
            <div class="space-y-4 fade-in">
                <h2 class="text-2xl font-bold text-indigo-700 mb-4">The Loss Function ($\\mathcal{L}$)</h2>
                <p class="text-lg leading-relaxed">
                    The equation that grades our machine is simply a Grading Rubric called the <strong>Loss Function</strong>.
                </p>
                <div class="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-6 rounded-r-xl shadow-sm text-center">
                    <span class="text-2xl font-semibold">
                        $$\\text{Total Penalty} = \\text{Copying Penalty} + \\text{Messiness Penalty}$$
                    </span>
                </div>
                <p class="text-lg leading-relaxed">
                    To win, the machine must learn to balance these two completely different tests. Let's look at each one.
                </p>
            </div>
        `
    },
    {
        title: "1. The Copying Penalty",
        content: `
            <div class="space-y-4 fade-in">
                <h2 class="text-2xl font-bold text-indigo-700 mb-2">Reconstruction Loss</h2>
                <div class="bg-slate-100 p-4 rounded-lg inline-block mb-4 shadow-sm border border-slate-200 text-lg">
                    <strong>The Math Term:</strong> $ -\\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] $
                </div>
                <h3 class="text-xl font-semibold mt-4">The 7-Year-Old Version:</h3>
                <p class="text-lg leading-relaxed italic text-slate-600 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    "Did the new Play-Doh dinosaur look exactly like the original one?"
                </p>
                <p class="text-lg leading-relaxed">
                    If the original dinosaur had 3 horns and the new one only has 2, the machine gets penalty points. The more mistakes the machine makes when rebuilding the toy, the higher this penalty gets.
                </p>
                <div class="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
                    <strong>Goal:</strong> Make the new toy look exactly like the old toy. (Pushes the machine to memorize specific details).
                </div>
            </div>
        `
    },
    {
        title: "2. The Messiness Penalty",
        content: `
            <div class="space-y-4 fade-in">
                <h2 class="text-2xl font-bold text-indigo-700 mb-2">KL Divergence</h2>
                <div class="bg-slate-100 p-4 rounded-lg inline-block mb-4 shadow-sm border border-slate-200 text-lg">
                    <strong>The Math Term:</strong> $ D_{KL}(q_\\phi(z|x) \\parallel p(z)) $
                </div>
                <h3 class="text-xl font-semibold mt-4">The 7-Year-Old Version:</h3>
                <p class="text-lg leading-relaxed italic text-slate-600 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    "How neat and tidy are the Play-Doh molds kept inside the machine?"
                </p>
                <p class="text-lg leading-relaxed">
                    If the machine makes molds that are all crazy sizes, jagged, and thrown all over the room, it's too messy.
                    The rule is that all molds must be kept in a neat, overlapping pile in the center of the desk (a standard normal distribution, $\\mathcal{N}(0, 1)$).
                    If a mold is placed too far away or is weirdly shaped, the machine gets a Messiness Penalty.
                </p>
                <div class="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
                    <strong>Goal:</strong> Keep all the "ideas" (molds) neatly organized in the center. (Pulls the data together so there are no empty gaps).
                </div>
            </div>
        `
    },
    {
        title: "Step-by-Step Calculation (The Extremes)",
        content: `
            <div class="space-y-4 fade-in">
                <h2 class="text-2xl font-bold text-indigo-700 mb-2">The Toy Factory Example</h2>
                <p class="text-lg leading-relaxed mb-4">Let’s apply this with numbers. Scenario: The machine tries to recreate a toy car. A perfect car has 10 details. A perfectly neat mold has a messiness score of 0.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm">
                        <h3 class="font-bold text-red-800 text-lg mb-2">Attempt 1: Focus ONLY on Copying</h3>
                        <p class="text-slate-700 mb-2">The machine creates a perfect car! (10/10 details).</p>
                        <ul class="text-sm space-y-1 mb-3">
                            <li><strong>Copying Penalty:</strong> 0 points</li>
                            <li><strong>Messiness Penalty:</strong> 8 points (Made a massive, thrown-around mold)</li>
                        </ul>
                        <div class="font-bold text-red-900 bg-red-100 p-2 rounded text-center">
                            Total Loss ($\\mathcal{L}$): 8 points
                        </div>
                    </div>

                    <div class="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm">
                        <h3 class="font-bold text-blue-800 text-lg mb-2">Attempt 2: Focus ONLY on Being Neat</h3>
                        <p class="text-slate-700 mb-2">Perfectly smooth, standard round mold in the center.</p>
                        <ul class="text-sm space-y-1 mb-3">
                            <li><strong>Copying Penalty:</strong> 6 points (Looks like a blob, missed 6 details)</li>
                            <li><strong>Messiness Penalty:</strong> 0 points</li>
                        </ul>
                        <div class="font-bold text-blue-900 bg-blue-100 p-2 rounded text-center">
                            Total Loss ($\\mathcal{L}$): 6 points
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "The VAE Balance",
        content: `
            <div class="space-y-4 fade-in flex flex-col items-center justify-center h-full">
                <h2 class="text-3xl font-bold text-indigo-700 mb-4 text-center">Attempt 3: The Sweet Spot</h2>
                <p class="text-xl leading-relaxed text-center max-w-2xl text-slate-600 mb-8">
                    The machine compromises. It makes a mold that is mostly neat, but just detailed enough to look like a car.
                </p>

                <div class="bg-gradient-to-br from-green-100 to-emerald-50 p-8 rounded-2xl border border-green-300 shadow-lg w-full max-w-md transform transition-transform hover:scale-105">
                    <ul class="text-lg space-y-4 mb-6 text-slate-800">
                        <li class="flex justify-between border-b border-green-200 pb-2">
                            <span><strong>Copying Penalty:</strong> (Missed 2 tiny details)</span>
                            <span class="font-bold text-green-700">2 pts</span>
                        </li>
                        <li class="flex justify-between border-b border-green-200 pb-2">
                            <span><strong>Messiness Penalty:</strong> (Slightly outside center)</span>
                            <span class="font-bold text-green-700">2 pts</span>
                        </li>
                    </ul>
                    <div class="text-2xl font-black text-center text-green-900 bg-white p-4 rounded-xl shadow-inner border border-green-200">
                        Total Loss ($\\mathcal{L}$): $2 + 2 = \\textbf{4 points}$
                        <div class="text-sm text-green-600 mt-2 uppercase tracking-wide">🏆 The Winning Model 🏆</div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Interactive Lab: Visualizing the Latent Space",
        content: `
            <div class="space-y-4 fade-in w-full">
                <h2 class="text-2xl font-bold text-indigo-700 mb-2">Adjusting the Penalties</h2>
                <p class="text-slate-600 mb-4 text-sm">
                    Move the slider to see how adjusting the machine's priorities affects the shape and location of the molds (Latent Space Distributions) for three different toys (🚗 Car, 🦖 Dino, ✈️ Plane).
                </p>

                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-8 items-center">

                    <!-- Canvas Visualization -->
                    <div class="relative">
                        <canvas id="latentCanvas" width="350" height="250" class="bg-white border-2 border-slate-300 rounded-xl shadow-inner"></canvas>
                        <div class="absolute top-2 left-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Latent Desk</div>
                    </div>

                    <!-- Controls & Dashboard -->
                    <div class="flex-1 w-full space-y-6">
                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                                <span>Focus on Details<br/>(Messy Desk)</span>
                                <span class="text-right">Focus on Neatness<br/>(Blurry Blobs)</span>
                            </div>
                            <input type="range" id="weightSlider" min="0" max="100" value="50" class="w-full appearance-none focus:outline-none">
                        </div>

                        <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                            <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3 text-center border-b pb-2">Live Grading Rubric</h4>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-slate-600 text-sm">Copying Penalty:</span>
                                <span id="cp-val" class="font-mono font-bold text-red-500">0.0</span>
                            </div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-slate-600 text-sm">Messiness Penalty:</span>
                                <span id="mp-val" class="font-mono font-bold text-blue-500">0.0</span>
                            </div>
                            <div class="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
                                <span class="font-bold text-slate-800">Total Loss ($\\mathcal{L}$):</span>
                                <span id="total-val" class="font-mono font-black text-xl text-indigo-700">0.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];

let currentStep = 0;
const container = document.getElementById('step-container');
const counter = document.getElementById('step-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function renderMath() {
    renderMathInElement(container, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
        ],
        throwOnError: false
    });
}

function updateUI() {
    // Inject HTML Content
    container.innerHTML = steps[currentStep].content;

    // Update counter and buttons
    counter.innerText = `Step ${currentStep + 1} of ${steps.length}`;
    btnPrev.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.disabled = true;
        btnNext.classList.add('opacity-50', 'cursor-not-allowed');
        initInteractiveCanvas();
    } else {
        btnNext.disabled = false;
        btnNext.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Render LaTeX
    renderMath();
}

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

// Step 7 Logic: Interactive Canvas
function initInteractiveCanvas() {
    const canvas = document.getElementById('latentCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('weightSlider');

    // Original "Messy" distinct representations (far from center, distinct features)
    const toys = [
        { emoji: '🚗', x: -90, y: -60, color: 'rgba(239, 68, 68, 0.4)', border: '#dc2626' },
        { emoji: '🦖', x: 80, y: -40, color: 'rgba(34, 197, 94, 0.4)', border: '#16a34a' },
        { emoji: '✈️', x: -20, y: 80, color: 'rgba(59, 130, 246, 0.4)', border: '#2563eb' }
    ];

    function drawLatentSpace() {
        // v goes from 0 (All Copying/Messy) to 1 (All Neat/No Details)
        const v = slider.value / 100;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // 1. Draw Target Distribution (Standard Normal N(0,1))
        ctx.beginPath();
        ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226, 232, 240, 0.5)';
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('N(0,1) Target', centerX, centerY - 40);

        // 2. Calculate smooth curved penalties (Quadratic creates a nice "sweet spot" at 0.5)
        const copyPenalty = (10 * Math.pow(v, 2)).toFixed(1);
        const messPenalty = (10 * Math.pow(1 - v, 2)).toFixed(1);
        const totalLoss = (parseFloat(copyPenalty) + parseFloat(messPenalty)).toFixed(1);

        document.getElementById('cp-val').innerText = copyPenalty;
        document.getElementById('mp-val').innerText = messPenalty;
        document.getElementById('total-val').innerText = totalLoss;

        // Highlight lowest loss (Sweet spot is near v=0.5, total ~5.0)
        const totalEl = document.getElementById('total-val');
        if (totalLoss <= 5.1) {
            totalEl.classList.add('text-green-600', 'scale-110', 'transform', 'transition-transform');
            totalEl.classList.remove('text-indigo-700');
        } else {
            totalEl.classList.remove('text-green-600', 'scale-110', 'transform', 'transition-transform');
            totalEl.classList.add('text-indigo-700');
        }

        // 3. Draw Toy Molds Distribution (q(z|x))
        toys.forEach(toy => {
            // Pull towards center based on 'v'
            const currentX = toy.x * (1 - v);
            const currentY = toy.y * (1 - v);

            // Radius changes:
            // v=0: Tight radius (10) - highly confident specific features
            // v=1: Broad radius (35) - matches standard normal, loses specificity
            const currentR = 10 * (1 - v) + 35 * v;

            ctx.beginPath();
            ctx.arc(centerX + currentX, centerY + currentY, currentR, 0, Math.PI * 2);
            ctx.fillStyle = toy.color;
            ctx.fill();
            ctx.strokeStyle = toy.border;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw Emoji in center (fade out slightly as it gets "messy/blobby")
            ctx.globalAlpha = Math.max(0.2, 1 - v);
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(toy.emoji, centerX + currentX, centerY + currentY);
            ctx.globalAlpha = 1.0; // reset
        });
    }

    slider.addEventListener('input', drawLatentSpace);
    drawLatentSpace(); // Initial draw
}

// Initialize First Step
document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});