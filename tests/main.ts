// Smoke tests for the tutorial extension. Run from the repo root with `pxt test`.
namespace tests {
    export function clampInRange(): boolean {
        return tutorial.clamp(5, 0, 10) === 5;
    }

    export function clampBelowMin(): boolean {
        return tutorial.clamp(-3, 0, 10) === 0;
    }

    export function clampAboveMax(): boolean {
        return tutorial.clamp(42, 0, 10) === 10;
    }

    export function randomIntInRange(): boolean {
        for (let i = 0; i < 20; i++) {
            const v = tutorial.randomInt(3, 3);
            if (v !== 3) return false;
        }
        return true;
    }
}
