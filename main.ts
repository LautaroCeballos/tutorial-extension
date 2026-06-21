/**
 * Tutorial helpers for MakeCode Arcade.
 */
//% color=190 weight=100 icon="\uf1ec" block="Tutorial"
//% groups=['Crear', 'Movimiento', 'Mundo', 'others']
namespace tutorial {

    // ---------------------------------------------------------------------
    // Crear
    // ---------------------------------------------------------------------

    /**
     * Crear un personaje como objeto de tipo Player con física de plataforma.
     * @param imagen la imagen del personaje, eg: sprites.castle.princessFront0
     */
    //% blockId=tutorial_crear_personaje
    //% block="establecer $nuevoPersonaje como objeto $imagen de tipo $tipo"
    //% group="Crear"
    //% weight=100
    //% blockSetVariable=nuevoPersonaje
    //% tipo.defl=SpriteKind.Player
    export function crearPersonaje(nuevoPersonaje: Sprite, imagen: Image, tipo: number): Sprite {
        const s = sprites.create(imagen, tipo);
        scene.cameraFollowSprite(s);
        controller.moveSprite(s, 80, 0);
        s.ay = 300;
        return s;
    }

    // ---------------------------------------------------------------------
    // Movimiento
    // ---------------------------------------------------------------------

    /**
     * Mover al personaje a la izquierda y derecha con las flechas.
     * @param personaje
     */
    //% blockId=tutorial_mover_flechas
    //% block="mover $personaje a la izquierda y derecha con las flechas"
    //% group="Movimiento"
    //% weight=90
    export function moverConFlechas(personaje: Sprite): void {
        controller.moveSprite(personaje, 80, 0);
    }

    /**
     * Saltar con el personaje al presionar el botón A o la flecha arriba.
     * El personaje debe haber sido creado con crearPersonaje para tener
     * la física de plataforma activa.
     * @param personaje
     */
    //% blockId=tutorial_saltar_a
    //% block="saltar con $personaje al presionar el botón A o la flecha arriba"
    //% group="Movimiento"
    //% weight=80
    export function saltarConA(personaje: Sprite): void {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (personaje.isHittingTile(CollisionDirection.Bottom)) {
                personaje.vy = -150;
            }
        });
        controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            if (personaje.isHittingTile(CollisionDirection.Bottom)) {
                personaje.vy = -150;
            }
        });
    }
}
