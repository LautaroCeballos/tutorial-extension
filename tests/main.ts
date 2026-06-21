// Smoke tests for the tutorial extension. Run from the repo root with `pxt test`.
namespace tests {
    export function crearPersonajeDevuelveSprite(): boolean {
        const s = tutorial.crearPersonaje(sprites.create(img``, SpriteKind.Player), sprites.castle.princessFront0, SpriteKind.Player);
        return s !== null && s.kind() === SpriteKind.Player;
    }
}
