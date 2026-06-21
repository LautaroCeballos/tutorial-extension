/**
 * Tutorial helpers for MakeCode Arcade.
 */
//% color=190 weight=100 icon="\uf1ec" block="Tutorial"
//% groups=['Getting started', 'Sprite helpers', 'Math', 'others']
namespace tutorial {

    // ---------------------------------------------------------------------
    // Getting started
    // ---------------------------------------------------------------------

    /**
     * Run code once when the game starts.
     * @param handler
     */
    //% blockId=tutorial_on_start
    //% block="on game start"
    //% group="Getting started"
    //% weight=100
    export function onStart(handler: () => void): void {
        handler();
    }

    /**
     * Show a message on the screen for a short time.
     * @param text the message, eg: "Hello!"
     * @param ms how long to show it, eg: 1000
     */
    //% blockId=tutorial_show_message
    //% block="show message $text for $ms ms"
    //% group="Getting started"
    //% weight=90
    //% text.defl="Hello!"
    //% ms.defl=1000
    //% ms.min=0
    export function showMessage(text: string, ms: number): void {
        game.showLongText(text, DialogLayout.Center);
        if (ms > 0) pause(ms);
    }

    // ---------------------------------------------------------------------
    // Sprite helpers
    // ---------------------------------------------------------------------

    /**
     * Spawn a player sprite of the given kind at the center of the screen.
     * @param img the sprite image, eg: sprites.castle.princessFront0
     */
    //% blockId=tutorial_spawn_player
    //% block="spawn player with image $img"
    //% group="Sprite helpers"
    //% weight=80
    //% blockSetVariable=player
    export function spawnPlayer(img: Image): Sprite {
        return sprites.create(img, SpriteKind.Player);
    }

    /**
     * Move a sprite one step in the given direction.
     * @param sprite
     * @param dir up, down, left or right
     */
    //% blockId=tutorial_step
    //% block="$sprite step $dir"
    //% group="Sprite helpers"
    //% weight=70
    //% dir.defl=Direction.Right
    export function step(sprite: Sprite, dir: Direction): void {
        const v = 16;
        switch (dir) {
            case Direction.Up:    sprite.y -= v; break;
            case Direction.Down:  sprite.y += v; break;
            case Direction.Left:  sprite.x -= v; break;
            case Direction.Right: sprite.x += v; break;
        }
    }

    /**
     * Run code whenever two sprites of the same kind overlap.
     * @param kind
     * @param handler
     */
    //% blockId=tutorial_on_overlap
    //% block="on $kind overlap"
    //% group="Sprite helpers"
    //% weight=60
    //% kind.defl=SpriteKind.Player
    export function onOverlap(kind: number, handler: (sprite: Sprite, other: Sprite) => void): void {
        sprites.onOverlap(kind, kind, handler);
    }

    // ---------------------------------------------------------------------
    // Math
    // ---------------------------------------------------------------------

    /**
     * Clamp a value into a [min, max] range.
     * @param value the value, eg: 120
     * @param min the minimum, eg: 0
     * @param max the maximum, eg: 100
     */
    //% blockId=tutorial_clamp
    //% block="clamp $value between $min and $max"
    //% group="Math"
    //% weight=50
    export function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    /**
     * Pick a random integer in the inclusive range [low, high].
     * @param low the lower bound, eg: 1
     * @param high the upper bound, eg: 6
     */
    //% blockId=tutorial_random_int
    //% block="random integer between $low and $high"
    //% group="Math"
    //% weight=40
    //% low.defl=1
    //% high.defl=6
    export function randomInt(low: number, high: number): number {
        return randint(low, high);
    }
}
