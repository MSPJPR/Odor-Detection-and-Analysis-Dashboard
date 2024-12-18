function analyzeOdor() {
    const chemical = document.getElementById("chemical").value;
    let output = "";

    // Odor descriptions
    const odors = {
        H2S: "Hydrogen Sulfide (H₂S): Rotten egg smell. Used in environmental monitoring.",
        NH3: "Ammonia (NH₃): Pungent smell. Common in cleaning products and medical diagnostics.",
        CH3COOH: "Acetic Acid (CH₃COOH): Vinegar-like smell. Relevant in food quality assurance.",
        C6H6: "Benzene (C₆H₆): Sweet odor. Important for industrial and safety applications.",
        SO2: "Sulfur Dioxide (SO₂): Sharp, irritating smell. Found in volcanic activity and pollution control.",
        CH4: "Methane (CH₄): Odorless by itself but detectable with additives. Used in gas leak detection."
    };

    output = odors[chemical] || "Unknown chemical.";

    document.getElementById("output").innerText = output;

    // Visualize intensity
    visualizeIntensity();

    // Speech output
    speakOutput(output);

    // Machine Learning Classification
    classifyOdor(chemical);
}

// Visualize intensity with animation
function visualizeIntensity() {
    const visualization = document.getElementById("visualization");
    visualization.classList.remove("intense");
    setTimeout(() => {
        visualization.classList.add("intense");
    }, 100);
}

// Speech output using Web Speech API
function speakOutput(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    } else {
        alert("Sorry, your browser does not support text-to-speech.");
    }
}

// Machine learning classification using Brain.js
function classifyOdor(chemical) {
    const net = new brain.NeuralNetwork();

    // Sample training data
    net.train([
        { input: { H2S: 1 }, output: { unpleasant: 1 } },
        { input: { NH3: 1 }, output: { pungent: 1 } },
        { input: { CH3COOH: 1 }, output: { sour: 1 } },
        { input: { C6H6: 1 }, output: { sweet: 1 } },
        { input: { SO2: 1 }, output: { sharp: 1 } },
        { input: { CH4: 1 }, output: { odorless: 1 } }
    ]);

    const result = net.run({ [chemical]: 1 });
    console.log("Classification:", result);
}
