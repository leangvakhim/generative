// Data for the visualization steps
const steps = [
    {
        title: "1. The Standard Autoencoder (AE)",
        text: `
            <p class="mb-4">An <strong>Autoencoder</strong> is a neural network designed to compress data and then reconstruct it. It consists of two main parts:</p>
            <ul class="space-y-3 mb-4 text-sm">
                <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">1.</span> <strong>Encoder:</strong> Compresses the input (e.g., an image) into a lower-dimensional representation.</li>
                <li class="flex items-start"><span class="text-purple-500 font-bold mr-2">2.</span> <strong>Latent Space (Bottleneck):</strong> The compressed knowledge. It forces the network to keep only the most essential features.</li>
                <li class="flex items-start"><span class="text-green-500 font-bold mr-2">3.</span> <strong>Decoder:</strong> Tries to reconstruct the original input from this compressed latent vector.</li>
            </ul>
            <p class="text-sm bg-blue-50 p-3 rounded-lg border border-blue-100 text-blue-800"><strong>Goal:</strong> Make the Output look exactly like the Input.</p>
        `,
        visual: `
            <div class="flex items-center justify-center w-full h-full pb-10">
                <div class="flex items-center space-x-4">
                    <!-- Input -->
                    <div class="flex flex-col items-center"><div class="w-16 h-16 bg-gray-200 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs text-gray-500">Input Image</div></div>
                    <div class="flow-arrow"></div>
                    <!-- Encoder -->
                    <div class="flex flex-col space-y-2 py-4 px-2 bg-blue-50 rounded-xl border border-blue-100">
                        <div class="text-xs font-bold text-blue-600 text-center mb-1">Encoder</div>
                        <div class="flex space-x-2 justify-center"><div class="w-4 h-4 bg-blue-400 rounded-full"></div><div class="w-4 h-4 bg-blue-400 rounded-full"></div><div class="w-4 h-4 bg-blue-400 rounded-full"></div></div>
                        <div class="flex space-x-2 justify-center"><div class="w-4 h-4 bg-blue-500 rounded-full"></div><div class="w-4 h-4 bg-blue-500 rounded-full"></div></div>
                    </div>
                    <div class="flow-arrow"></div>
                    <!-- Latent -->
                    <div class="flex flex-col space-y-2 items-center">
                        <div class="text-xs font-bold text-purple-600 mb-1">Latent Vector (z)</div>
                        <div class="w-6 h-6 bg-purple-500 rounded-full pulse-node text-white text-[10px] flex items-center justify-center">z1</div>
                        <div class="w-6 h-6 bg-purple-500 rounded-full pulse-node text-white text-[10px] flex items-center justify-center">z2</div>
                    </div>
                    <div class="flow-arrow"></div>
                    <!-- Decoder -->
                    <div class="flex flex-col space-y-2 py-4 px-2 bg-green-50 rounded-xl border border-green-100">
                        <div class="text-xs font-bold text-green-600 text-center mb-1">Decoder</div>
                        <div class="flex space-x-2 justify-center"><div class="w-4 h-4 bg-green-500 rounded-full"></div><div class="w-4 h-4 bg-green-500 rounded-full"></div></div>
                        <div class="flex space-x-2 justify-center"><div class="w-4 h-4 bg-green-400 rounded-full"></div><div class="w-4 h-4 bg-green-400 rounded-full"></div><div class="w-4 h-4 bg-green-400 rounded-full"></div></div>
                    </div>
                    <div class="flow-arrow"></div>
                    <!-- Output -->
                    <div class="flex flex-col items-center"><div class="w-16 h-16 bg-gray-200 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs text-gray-500 text-center">Reconstructed</div></div>
                </div>
            </div>
        `
    },
    {
        title: "2. The Latent Space Flaw",
        text: `
            <p class="mb-4">Why can't we use standard Autoencoders to generate <em>new</em> things?</p>
            <p class="mb-4 text-sm text-gray-600">Standard AEs map inputs to highly specific, isolated points in the latent space. They don't care about the space <em>between</em> the points.</p>
            <div class="bg-red-50 p-4 rounded-xl border border-red-100">
                <p class="text-sm text-red-800">If we pick a random point in an empty area of the latent space and pass it to the Decoder, it will generate meaningless garbage, because the Decoder has never seen anything from that region.</p>
            </div>
        `,
        visual: `
            <div class="w-full h-full flex flex-col items-center justify-center">
                <div class="relative w-64 h-64 border-l-2 border-b-2 border-gray-300">
                    <span class="absolute -left-6 top-0 text-xs text-gray-400">z2</span>
                    <span class="absolute right-0 -bottom-6 text-xs text-gray-400">z1</span>

                    <!-- Mapped Points -->
                    <div class="absolute w-3 h-3 bg-blue-500 rounded-full top-1/4 left-1/4" title="Image of a cat"></div>
                    <div class="absolute w-3 h-3 bg-green-500 rounded-full bottom-1/4 right-1/4" title="Image of a dog"></div>
                    <div class="absolute w-3 h-3 bg-purple-500 rounded-full top-1/8 right-1/3" title="Image of a bird"></div>

                    <!-- Empty Space Problem -->
                    <div class="absolute w-4 h-4 border-2 border-red-500 border-dashed rounded-full top-1/2 left-1/2 flex items-center justify-center animate-bounce">
                        <span class="absolute -top-6 text-xs text-red-500 font-bold w-32 text-center -ml-14">Garbage Output Here</span>
                    </div>
                </div>
                <p class="text-xs text-gray-400 mt-6 italic">2D Latent Space Visualization</p>
            </div>
        `
    },
    {
        title: "3. Variational Autoencoders (VAEs)",
        text: `
            <p class="mb-4">To fix the "gaps", a <strong>Variational Autoencoder</strong> changes how the bottleneck works.</p>
            <p class="text-sm mb-4">Instead of mapping an image to a single point, the Encoder maps it to a <strong>Probability Distribution</strong> (a fuzzy zone).</p>
            <ul class="space-y-3 mb-4 text-sm text-gray-700 bg-purple-50 p-4 rounded-xl border border-purple-100">
                <li><strong>1.</strong> The encoder outputs a <strong>Mean ($\mu$)</strong> (the center of the zone) and a <strong>Variance ($\sigma$)</strong> (how wide the zone is).</li>
                <li><strong>2. Reparameterization Trick:</strong> We <em>sample</em> a random point $z$ from this zone.</li>
                <li><strong>3.</strong> The decoder uses this sampled point to reconstruct the image.</li>
            </ul>
        `,
        visual: `
            <div class="flex items-center justify-center w-full h-full pb-10">
                <div class="flex items-center space-x-2 lg:space-x-4 scale-90 lg:scale-100">
                    <!-- Encoder -->
                    <div class="flex flex-col space-y-2 py-4 px-2 bg-blue-50 rounded-xl border border-blue-100">
                        <div class="text-xs font-bold text-blue-600 text-center mb-1">Encoder</div>
                        <div class="flex space-x-2 justify-center"><div class="w-4 h-4 bg-blue-500 rounded-full"></div></div>
                    </div>
                    <div class="flow-arrow w-6"></div>

                    <!-- VAE Latent Split -->
                    <div class="flex flex-col items-center space-y-4">
                        <div class="flex flex-col items-center p-2 border border-purple-200 rounded-lg bg-purple-50">
                            <div class="text-[10px] font-bold text-purple-600 mb-1">Mean ($\mu$)</div>
                            <div class="flex space-x-1"><div class="w-4 h-4 bg-purple-400 rounded-full"></div><div class="w-4 h-4 bg-purple-400 rounded-full"></div></div>
                        </div>
                        <div class="flex flex-col items-center p-2 border border-pink-200 rounded-lg bg-pink-50">
                            <div class="text-[10px] font-bold text-pink-600 mb-1">Variance ($\sigma$)</div>
                            <div class="flex space-x-1"><div class="w-4 h-4 bg-pink-400 rounded-full"></div><div class="w-4 h-4 bg-pink-400 rounded-full"></div></div>
                        </div>
                    </div>

                    <div class="flow-arrow w-8 border-dashed border-gray-400 relative">
                        <span class="absolute -top-4 text-[10px] text-gray-500 w-16 -ml-4">Sample $z$</span>
                    </div>

                    <!-- Sampled Z -->
                    <div class="flex flex-col items-center">
                        <div class="text-xs font-bold text-purple-800 mb-1">Sample (z)</div>
                        <div class="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg pulse-node">
                            <div class="flex space-x-1"><div class="w-4 h-4 bg-white/50 rounded-full"></div><div class="w-4 h-4 bg-white/50 rounded-full"></div></div>
                        </div>
                    </div>

                    <div class="flow-arrow w-6"></div>
                    <!-- Decoder -->
                    <div class="flex flex-col space-y-2 py-4 px-2 bg-green-50 rounded-xl border border-green-100">
                        <div class="text-xs font-bold text-green-600 text-center mb-1">Decoder</div>
                        <div class="flex space-x-2 justify-center"><div class="w-4 h-4 bg-green-500 rounded-full"></div></div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "4. Continuous Latent Space",
        text: `
            <p class="mb-4">Because the network is forced to decode a slightly different point every time (due to sampling), the zones start to overlap.</p>
            <p class="mb-4 text-sm text-gray-600">The latent space becomes <strong>continuous and smooth</strong>. Similar concepts are grouped close together.</p>
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-purple-100">
                <p class="text-sm font-medium text-purple-900"><strong>Generative Power:</strong> Now, picking a random point anywhere in the center, or interpolating between two points, produces smooth, valid, and novel outputs!</p>
            </div>
        `,
        visual: `
            <div class="w-full h-full flex flex-col items-center justify-center relative">
                <div class="relative w-64 h-64 border-l-2 border-b-2 border-gray-300 overflow-hidden">
                    <!-- Distributions (Circles with large blur/opacity) -->
                    <div class="absolute w-24 h-24 bg-blue-400/30 rounded-full top-4 left-4 mix-blend-multiply blur-md border border-blue-400/50"></div>
                    <span class="absolute top-12 left-12 text-[10px] font-bold text-blue-800">Cats</span>

                    <div class="absolute w-28 h-28 bg-green-400/30 rounded-full bottom-4 right-4 mix-blend-multiply blur-md border border-green-400/50"></div>
                    <span class="absolute bottom-16 right-16 text-[10px] font-bold text-green-800">Dogs</span>

                    <div class="absolute w-32 h-32 bg-purple-400/30 rounded-full top-1/4 right-1/4 mix-blend-multiply blur-md border border-purple-400/50"></div>
                    <span class="absolute top-1/3 right-1/3 text-[10px] font-bold text-purple-800">Wolves</span>

                    <!-- Interpolation line -->
                    <svg class="absolute inset-0 w-full h-full z-10" pointer-events="none">
                        <line x1="50" y1="50" x2="200" y2="200" stroke="#6b7280" stroke-width="2" stroke-dasharray="4" />
                        <circle cx="125" cy="125" r="4" fill="#ef4444" class="pulse-node" />
                    </svg>
                    <span class="absolute top-[135px] left-[135px] text-[10px] font-bold text-red-500 z-20 bg-white/80 px-1 rounded">Cat-Dog Hybrid</span>
                </div>
                    <p class="text-xs text-gray-400 mt-6 italic">Smooth, overlapping continuous Latent Space</p>
            </div>
        `
    },
    {
        title: "5. The Mathematics of VAEs",
        text: `
            <p class="mb-3">To make this work, the VAE uses a special <strong>Loss Function</strong> composed of two distinct parts:</p>

            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl mb-4 text-center overflow-x-auto">
                <span class="text-lg">$$ \\mathcal{L} = \\text{Reconstruction Loss} + \\text{KL Divergence} $$</span>
            </div>

            <div class="space-y-4 text-sm">
                <div class="p-3 bg-green-50 rounded-lg border border-green-100">
                    <h4 class="font-bold text-green-700 mb-1">1. Reconstruction Loss: $- \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)]$</h4>
                    <p class="text-gray-700">Ensures the decoded output looks like the original input. (Usually calculated using Mean Squared Error or Binary Cross-Entropy).</p>
                </div>

                <div class="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <h4 class="font-bold text-purple-700 mb-1">2. KL Divergence: $D_{KL}(q_\\phi(z|x) \\parallel p(z))$</h4>
                    <p class="text-gray-700">A regularization term. It forces the learned distributions (the $\\mu$ and $\\sigma$ for each image) to stay close to a standard normal distribution $\\mathcal{N}(0,1)$. This ensures the latent space stays tight, overlapping, and continuous without gaps.</p>
                </div>
            </div>
        `,
        visual: `
            <div class="w-full h-full flex flex-col items-center justify-center p-6">
                <div class="w-full bg-white rounded-xl shadow-inner border border-gray-200 p-6">
                    <h3 class="text-sm font-bold text-gray-500 mb-4 text-center uppercase tracking-wider">The Complete VAE Objective (ELBO)</h3>

                    <div class="overflow-x-auto flex justify-center w-full">
                        <div class="text-base sm:text-lg w-max text-center">
                            $$ \\mathcal{L}(\\theta, \\phi; x) = - D_{KL}(q_\\phi(z|x) \\parallel p(z)) + \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] $$
                        </div>
                    </div>

                    <div class="mt-8 grid grid-cols-2 gap-4 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                        <div>
                            <span class="font-bold text-purple-600 block mb-1">Regularization</span>
                            Pulls distributions to center (0,0) and radius 1.
                        </div>
                        <div>
                            <span class="font-bold text-green-600 block mb-1">Reconstruction</span>
                            Pushes distributions apart to memorize distinct features.
                        </div>
                    </div>
                    <p class="text-xs text-center text-gray-400 italic mt-6">The balance of these two opposing forces creates the perfect generative space.</p>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const stepSubtitle = document.getElementById('step-subtitle');
const stepDotsContainer = document.getElementById('step-dots');
const contentArea = document.getElementById('content-area');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// Initialize Visualization
function init() {
    // Create dots
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === 0 ? 'bg-purple-600' : 'bg-gray-200'}`;
        dot.id = `dot-${i}`;
        stepDotsContainer.appendChild(dot);
    }

    updateUI();

    // Event Listeners
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
}

// Update UI based on current step
function updateUI() {
    const stepData = steps[currentStep];

    // Update Header
    stepSubtitle.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Dots
    for (let i = 0; i < steps.length; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i === currentStep) {
            dot.className = 'w-4 h-2 rounded-full transition-all duration-300 bg-purple-600';
        } else {
            dot.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-gray-200';
        }
    }

    // Update Buttons
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = "Finish";
        btnNext.classList.remove('from-blue-600', 'to-purple-600');
        btnNext.classList.add('from-green-500', 'to-emerald-600');
    } else {
        btnNext.innerHTML = "Next Step &rarr;";
        btnNext.classList.remove('from-green-500', 'to-emerald-600');
        btnNext.classList.add('from-blue-600', 'to-purple-600');
    }

    // Animate Content Swap
    contentArea.classList.remove('fade-enter-active');
    contentArea.classList.add('fade-enter');

    setTimeout(() => {
        contentArea.innerHTML = `
            <div class="w-full md:w-5/12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-6">${stepData.title}</h2>
                <div class="text-gray-600 leading-relaxed">
                    ${stepData.text}
                </div>
            </div>
            <div class="w-full md:w-7/12 flex items-center justify-center min-h-[300px] bg-gray-50/50 rounded-2xl md:ml-4">
                ${stepData.visual}
            </div>
        `;

        // Trigger animation
        requestAnimationFrame(() => {
            contentArea.classList.remove('fade-enter');
            contentArea.classList.add('fade-enter-active');
        });

        // Re-render MathJax
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([contentArea]).catch(function (err) {
                console.error('MathJax rendering error:', err.message);
            });
        }
    }, 150); // Small delay to let fade-out begin
}

// Start App
window.addEventListener('DOMContentLoaded', init);