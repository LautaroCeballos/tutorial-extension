// Smoke tests for the tutorial-extension. Run from the repo root with `pxt test`.
namespace tests {
    export function crearSpriteDevuelveSpriteDelTipoElegido(): boolean {
        const s = arcadeFacil.crearSprite(img`2`, 10, 10, SpriteKind.Arquero);
        return s !== null && s.kind() === SpriteKind.Arquero;
    }

    export function crearPelotaDevuelveSpriteDeTipoPelota(): boolean {
        const lanzador = arcadeFacil.crearSprite(img`2`, 80, 60, SpriteKind.Player);
        const p = arcadeFacil.crearPelota(img`2`, lanzador, -50);
        return p !== null && p.kind() === SpriteKind.Pelota;
    }
}
