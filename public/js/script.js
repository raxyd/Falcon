function createSpecs(num) {
    const specsContainer = document.querySelector('.specs');
    for (let i = 0; i < num; i++) {
        const spec = document.createElement('div');
        spec.classList.add('spec');
        spec.style.left = `${Math.random() * 100}vw`;
        spec.style.top = `${Math.random() * -100}vh`;
        spec.style.animationDuration = `${Math.random() * 10 + 5}s`;
        spec.style.animationDelay = `${Math.random() * 5}s`;
        specsContainer.appendChild(spec);

        // Remove spec after animation ends
        spec.addEventListener('animationend', () => {
            spec.remove();
            createSpecs(1);
        });
    }
}

// Continuously create new specs
setInterval(() => {
    createSpecs(5);
}, 3000);

createSpecs(100);
