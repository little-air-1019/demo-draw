import confetti from 'canvas-confetti';

/**
 * Subtle celebration — muted tones matching Japanese minimalist palette
 */
export function fireCelebration() {
    const colors = ['#8B9D83', '#A8B8A0', '#C4D1BE', '#333333', '#888888', '#D4C5A9'];

    // Single gentle burst
    confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.55 },
        colors,
        startVelocity: 30,
        gravity: 1,
        ticks: 200,
        scalar: 0.9,
    });

    // Subtle side accents
    setTimeout(() => {
        confetti({
            particleCount: 20,
            angle: 60,
            spread: 40,
            origin: { x: 0.1, y: 0.6 },
            colors,
            startVelocity: 20,
            scalar: 0.7,
        });
        confetti({
            particleCount: 20,
            angle: 120,
            spread: 40,
            origin: { x: 0.9, y: 0.6 },
            colors,
            startVelocity: 20,
            scalar: 0.7,
        });
    }, 300);
}

/**
 * Small spark for individual winner reveal
 */
export function fireSpark(originX = 0.5, originY = 0.5) {
    confetti({
        particleCount: 15,
        spread: 30,
        origin: { x: originX, y: originY },
        colors: ['#8B9D83', '#A8B8A0', '#D4C5A9', '#333333'],
        startVelocity: 15,
        gravity: 1.5,
        ticks: 100,
        scalar: 0.6,
    });
}
