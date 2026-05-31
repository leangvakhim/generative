// <!-- Application Logic -->
// Define the steps of our tutorial
const steps = [
    {
        title: "The Real-World Example 🃏",
        content: `
            <div class="text-center space-y-6 max-w-2xl mx-auto">
                <p class="text-lg leading-relaxed text-slate-600">
                    Imagine a game of Cops and Robbers, but played with <strong>Pokémon cards</strong>.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div class="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                        <div class="emoji-icon mb-2">🎨</div>
                        <h3 class="text-xl font-bold text-red-700 mb-2">The Forger (G - Generator)</h3>
                        <p class="text-sm text-red-900">Trying to draw fake, homemade Pokémon cards out of random scribbles and sneak them into the deck. Their goal is to trick the Detective.</p>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                        <div class="emoji-icon mb-2">🕵️‍♂️</div>
                        <h3 class="text-xl font-bold text-blue-700 mb-2">The Detective (D - Discriminator)</h3>
                        <p class="text-sm text-blue-900">A Pokémon card expert. Their job is to look at a card and guess: "Is this a real card from the store, or a fake made by the Forger?"</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Translating to Math 🧮",
        content: `
            <div class="space-y-6">
                <p class="text-lg text-center">Before we see the scoreboard, let's learn what the math letters mean in plain English:</p>

                <div class="space-y-4 max-w-2xl mx-auto">
                    <div class="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span class="text-xl font-bold text-slate-800 w-16 text-center">$x$</span>
                        <span class="text-slate-600 flex-1">A <strong>REAL</strong> Pokémon card.</span>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span class="text-xl font-bold text-slate-800 w-16 text-center">$z$</span>
                        <span class="text-slate-600 flex-1">Random scribbles and noise (the Forger's starting materials).</span>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span class="text-xl font-bold text-blue-600 w-24 text-center">$D(x)$</span>
                        <span class="text-slate-600 flex-1">The Detective looking at a <strong>REAL</strong> card. <br><span class="text-sm text-green-600 font-semibold">(Goal: Guess 100% real)</span></span>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span class="text-xl font-bold text-red-600 w-24 text-center">$G(z)$</span>
                        <span class="text-slate-600 flex-1">The Forger making a <strong>FAKE</strong> card out of $z$.</span>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span class="text-xl font-bold text-purple-600 w-32 text-center">$D(G(z))$</span>
                        <span class="text-slate-600 flex-1">The Detective looking at the <strong>FAKE</strong> card. <br><span class="text-sm text-purple-700 font-semibold">(Detective wants 0% real, Forger wants 100% real)</span></span>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "The Scary Equation 😱",
        content: `
            <div class="space-y-6">
                <p class="text-center text-lg">In AI research papers, you will see this terrifying equation for GANs:</p>

                <div class="math-block overflow-x-auto text-purple-800">
                    $$ \\min_G \\max_D V(D, G) = \\mathbb{E}_{x}[\\log D(x)] + \\mathbb{E}_{z}[\\log(1 - D(G(z)))] $$
                </div>

                <p class="text-center text-lg mt-8 font-semibold">Don't panic! It is just the Scoreboard for the game.</p>

                <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mt-6 max-w-2xl mx-auto">
                    <h4 class="font-bold text-yellow-800 mb-2">The Minimax Game Rules:</h4>
                    <ul class="list-disc pl-5 space-y-2 text-yellow-900">
                        <li>The 🕵️‍♂️ <strong>Detective</strong> wants the total score to be as <strong>HIGH</strong> as possible (Maximize).</li>
                        <li>The 🎨 <strong>Forger</strong> wants the total score to be as <strong>LOW</strong> as possible (Minimize).</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Simplified Scoring System 🎯",
        content: `
            <div class="space-y-6">
                <p class="text-lg text-center">Let's pretend the score is based on percentages from $0$ to $1$ (where $1$ means $100\\%$ confident). <br>Here is our simplified scorecard:</p>

                <div class="grid md:grid-cols-2 gap-8 mt-6">
                    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                        <h4 class="font-bold text-blue-800 text-center mb-4">Points from REAL Cards</h4>
                        <div class="math-block bg-white text-blue-700">$$ \\text{Score} = D(x) $$</div>
                        <p class="text-sm text-blue-900 text-center mt-2">Detective gets points directly for being confident it's real.</p>
                    </div>

                    <div class="p-6 bg-red-50 rounded-2xl border border-red-200">
                        <h4 class="font-bold text-red-800 text-center mb-4">Points from FAKE Cards</h4>
                        <div class="math-block bg-white text-red-700">$$ \\text{Score} = 1 - D(G(z)) $$</div>
                        <p class="text-sm text-red-900 text-center mt-2">Why "1 minus"? If the Detective thinks the fake is $0\\%$ real, $1 - 0 = 1$ full point!</p>
                    </div>
                </div>

                <div class="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-200 text-center max-w-2xl mx-auto shadow-sm">
                    <h3 class="text-xl font-bold text-purple-800 mb-4">Total Score Equation</h3>
                    <div class="math-block bg-white text-purple-700 font-bold">
                        $$ \\text{Total Score} = D(x) + (1 - D(G(z))) $$
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Round 1: The Forger is a Beginner 🖍️",
        content: `
            <div class="space-y-6 max-w-3xl mx-auto">
                <p class="text-lg text-center italic text-slate-500 mb-8">The Forger draws a fake Pikachu with crayons. It looks terrible.</p>

                <div class="space-y-4">
                    <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Step 1</span>
                        <div class="flex-1">The Detective looks at a <strong>real card</strong> and is 99% sure it's real.</div>
                        <div class="font-bold text-blue-700 min-w-[120px] text-right">$$ D(x) = 0.99 $$</div>
                    </div>

                    <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Step 2</span>
                        <div class="flex-1">The Detective looks at the <strong>crayon drawing</strong> and is only 1% fooled.</div>
                        <div class="font-bold text-red-700 min-w-[120px] text-right">$$ D(G(z)) = 0.01 $$</div>
                    </div>
                </div>

                <div class="bg-slate-800 text-white p-6 rounded-2xl mt-8 shadow-lg">
                    <h4 class="text-center font-bold text-slate-300 mb-4 uppercase tracking-widest text-sm">Calculate the Score</h4>
                    <div class="space-y-2 text-center text-lg">
                        <p>$$ \\text{Score} = 0.99 + (1 - 0.01) $$</p>
                        <p>$$ \\text{Score} = 0.99 + 0.99 $$</p>
                        <div class="math-block bg-slate-700 border-none text-green-400 font-bold mt-4">
                            $$ \\text{Total Score} = 1.98 $$
                        </div>
                    </div>
                </div>

                <div class="text-center mt-6">
                    <h3 class="text-2xl font-bold text-green-600">🏆 Winner: The Detective!</h3>
                    <p class="text-slate-600 mt-2">The score is near the maximum of 2.0. The Detective successfully <strong>maximized</strong> the score.</p>
                </div>
            </div>
        `
    },
    {
        title: "Round 2: The Forger Gets Good ✨",
        content: `
            <div class="space-y-6 max-w-3xl mx-auto">
                <p class="text-lg text-center italic text-slate-500 mb-8">The Forger practices. They print a shiny fake Charizard. It looks amazing.</p>

                <div class="space-y-4">
                    <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Step 1</span>
                        <div class="flex-1">The Detective looks at a <strong>real card</strong>. He's tired, but 90% sure it's real.</div>
                        <div class="font-bold text-blue-700 min-w-[120px] text-right">$$ D(x) = 0.90 $$</div>
                    </div>

                    <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Step 2</span>
                        <div class="flex-1">The Detective looks at the <strong>shiny fake</strong>. He gets tricked and is 80% sure it's real!</div>
                        <div class="font-bold text-red-700 min-w-[120px] text-right">$$ D(G(z)) = 0.80 $$</div>
                    </div>
                </div>

                <div class="bg-slate-800 text-white p-6 rounded-2xl mt-8 shadow-lg">
                    <h4 class="text-center font-bold text-slate-300 mb-4 uppercase tracking-widest text-sm">Calculate the Score</h4>
                    <div class="space-y-2 text-center text-lg">
                        <p>$$ \\text{Score} = 0.90 + (1 - 0.80) $$</p>
                        <p>$$ \\text{Score} = 0.90 + 0.20 $$</p>
                        <div class="math-block bg-slate-700 border-none text-red-400 font-bold mt-4">
                            $$ \\text{Total Score} = 1.10 $$
                        </div>
                    </div>
                </div>

                <div class="text-center mt-6">
                    <h3 class="text-2xl font-bold text-red-600">🏆 Winner: The Forger!</h3>
                    <p class="text-slate-600 mt-2">By making a great fake, the Forger forced the total score down. They successfully <strong>minimized</strong> the equation.</p>
                </div>
            </div>
        `
    },
    {
        title: "The Grand Conclusion 🚀",
        content: `
            <div class="text-center space-y-8 max-w-2xl mx-auto flex flex-col items-center justify-center h-full mt-4">
                <div class="text-6xl">🤖</div>
                <h3 class="text-2xl font-bold text-slate-800">How AI Learns</h3>
                <p class="text-lg text-slate-600 leading-relaxed">
                    The AI program trains by playing this exact math game <strong>millions of times</strong>.
                </p>

                <div class="w-full bg-slate-100 p-6 rounded-2xl border border-slate-200 relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">The Loop</div>
                    <ul class="text-left space-y-4 text-slate-700 font-medium">
                        <li class="flex items-center gap-3">🕵️‍♂️ The Detective keeps getting better at spotting fakes.</li>
                        <li class="flex items-center gap-3">🎨 The Forger keeps getting better at drawing them to avoid losing points.</li>
                    </ul>
                </div>

                <p class="text-xl font-bold text-green-600 bg-green-50 p-4 rounded-xl border border-green-200 w-full">
                    Eventually, the Forger gets so incredibly good that their fake images look 100% like real life!
                </p>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const mainContent = document.getElementById('main-content');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepCounter = document.getElementById('step-counter');
const progressBar = document.getElementById('progress-bar');

// Function to render the current step
function renderStep() {
    // Setup content with fade-in animation
    mainContent.innerHTML = `
        <div class="fade-in w-full h-full flex flex-col justify-center">
            <h2 class="text-3xl font-extrabold text-slate-800 mb-8 text-center">${steps[currentStep].title}</h2>
            ${steps[currentStep].content}
        </div>
    `;

    // Wait for DOM injection, then trigger KaTeX auto-rendering
    // We use setTimeout to ensure the HTML is painted before math rendering starts
    setTimeout(() => {
        renderMathInElement(mainContent, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }, 10);

    // Update UI Controls
    btnBack.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = 'Finish 🏁';
        btnNext.classList.remove('bg-purple-600', 'hover:bg-purple-700');
        btnNext.classList.add('bg-green-600', 'hover:bg-green-700', 'shadow-green-200');
    } else {
        btnNext.innerHTML = 'Next &rarr;';
        btnNext.classList.remove('bg-green-600', 'hover:bg-green-700', 'shadow-green-200');
        btnNext.classList.add('bg-purple-600', 'hover:bg-purple-700');
    }

    // Update Text and Progress bar
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;
    const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    } else {
        // If it's the last step, just loop back to the beginning to restart
        // currentStep = 0;
        // renderStep();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

// Initialize the first load
document.addEventListener('DOMContentLoaded', () => {
    // KaTeX relies on DOM fully loading for the auto-render function to be ready
    renderStep();
});