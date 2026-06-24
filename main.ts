namespace SpriteKind {
    //% isKind
    export const Pelota = SpriteKind.create()

    //% isKind
    export const Arquero = SpriteKind.create()

    //% isKind
    export const Porteria = SpriteKind.create()
}

/**
 * Bloques simples para crear juegos de fútbol en MakeCode Arcade.
 */
//% color="#0F766E" weight=100 icon="\uf1e3" block="World Cup 2026"
//% groups=['Inicializacion', 'Crear Sprites', 'Mover Sprites', 'Crear Proyectiles', 'Informacion']
namespace arcadeFacil {

    let porteriaActual: Sprite = null
    let juegoTerminado = false

    export enum ResultadoJuego {
        //% block="ganaste"
        Ganaste,

        //% block="perdiste"
        Perdiste
    }

    export enum FondoPenales {
        //% block="Césped clásico"
        CespedClasico = 7,

        //% block="Cancha profunda"
        CanchaProfunda = 6,

        //% block="Mundial nocturno"
        MundialNocturno = 11,

        //% block="Final vibrante"
        FinalVibrante = 13,

        //% block="Copa dorada"
        CopaDorada = 14
    }

    function crearFondoDePenales(colorFondo: number): Image {
        let fondo = image.create(160, 120)

        fondo.fill(colorFondo)

        let blanco = 1

        fondo.drawLine(0, 12, 159, 12, blanco)

        fondo.drawLine(6, 13, 6, 108, blanco)
        fondo.drawLine(152, 13, 152, 108, blanco)

        fondo.drawLine(24, 13, 24, 66, blanco)
        fondo.drawLine(134, 13, 134, 66, blanco)
        fondo.drawLine(24, 66, 134, 66, blanco)

        fondo.drawLine(6, 108, 152, 108, blanco)

        fondo.setPixel(80, 77, blanco)
        fondo.drawLine(78, 78, 82, 78, blanco)
        fondo.setPixel(80, 79, blanco)

        return fondo
    }

    function crearImagenPorteria(): Image {
        let porteria = image.create(60, 16)

        porteria.fill(0)

        let blanco = 1

        porteria.fillRect(0, 0, 60, 3, blanco)
        porteria.fillRect(0, 3, 3, 13, blanco)
        porteria.fillRect(57, 3, 3, 13, blanco)

        return porteria
    }

    function crearPorteria(): void {
        if (porteriaActual) {
            porteriaActual.destroy()
        }

        porteriaActual = sprites.create(crearImagenPorteria(), SpriteKind.Porteria)
        porteriaActual.setPosition(80, 10)
        porteriaActual.z = 10
    }

    function finalizarJuego(resultado: ResultadoJuego): void {
        if (juegoTerminado) {
            return
        }

        juegoTerminado = true

        if (resultado == ResultadoJuego.Ganaste) {
            game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), false)
            game.setGameOverMessage(true, "Ganaste la copa del mundo!!!")
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        } else {
            game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
            game.setGameOverMessage(false, "Oh no, el arquedo gano de nuevo")
            game.setGameOverEffect(false, effects.dissolve)
            game.gameOver(false)
        }
    }

    /**
     * Establece el fondo de penales.
     * También crea la portería, reinicia el puntaje en 0 y establece 3 vidas.
     */
    //% blockId=arcadefacil_establecer_fondo_penales
    //% block="establecer fondo de penales estilo $color"
    //% group="Inicializacion"
    //% color.defl=FondoPenales.CespedClasico
    export function establecerFondoDePenales(color: FondoPenales): void {
        scene.setBackgroundImage(crearFondoDePenales(color))
        crearPorteria()
        info.setScore(0)
        info.setLife(3)
        juegoTerminado = false
    }

    /**
     * Crea un sprite con imagen, posición y tipo.
     * El sprite permanece automáticamente dentro de la pantalla.
     */
    //% blockId=arcadefacil_crear_sprite
    //% block="crear sprite con imagen $imagen en x $x y $y de tipo $tipo"
    //% blockSetVariable=mySprite
    //% group="Crear Sprites"
    //% imagen.shadow=image_picker
    //% x.min=0 x.max=160 x.defl=80
    //% y.min=0 y.max=120 y.defl=60
    //% tipo.shadow=spritekind
    //% tipo.defl=SpriteKind.Player
    //% inlineInputMode=inline
    export function crearSprite(imagen: Image, x: number, y: number, tipo: number): Sprite {
        let mySprite = sprites.create(imagen, tipo)
        mySprite.setPosition(x, y)
        mySprite.setStayInScreen(true)
        return mySprite
    }

    /**
     * Mueve un sprite con los botones.
     * El movimiento es horizontal.
     * La velocidad queda oculta detrás del botón (+).
     */
    //% blockId=arcadefacil_mover_con_botones
    //% block="mover $mySprite con botones || con velocidad $velocidad"
    //% group="Mover Sprites"
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% velocidad.min=0 velocidad.max=200 velocidad.defl=100
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function moverConBotones(mySprite: Sprite, velocidad: number = 100): void {
        controller.moveSprite(mySprite, velocidad, 0)
        mySprite.setStayInScreen(true)
    }

    /**
     * Mueve un sprite automáticamente.
     * El movimiento es horizontal y rebota en las paredes.
     */
    //% blockId=arcadefacil_mover_automatico
    //% block="mover $mySprite automáticamente con velocidad $velocidad"
    //% group="Mover Sprites"
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% velocidad.min=0 velocidad.max=200 velocidad.defl=60
    //% inlineInputMode=inline
    export function moverAutomatico(mySprite: Sprite, velocidad: number): void {
        mySprite.vx = velocidad
        mySprite.vy = 0
        mySprite.setBounceOnWall(true)
        mySprite.setStayInScreen(true)
    }

    /**
     * Crea una pelota/proyectil desde un sprite.
     * El alumno escribe VY positivo.
     * Internamente se invierte para que la pelota suba.
     */
    //% blockId=arcadefacil_crear_pelota
    //% block="crear pelota con imagen $imagen desde $mySprite con VY $vy"
    //% blockSetVariable=pelota
    //% group="Crear Proyectiles"
    //% imagen.shadow=image_picker
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% vy.min=0 vy.max=200 vy.defl=0
    //% inlineInputMode=inline
    export function crearPelota(imagen: Image, mySprite: Sprite, vy: number): Sprite {
        let pelota = sprites.createProjectileFromSprite(imagen, mySprite, 0, -vy)
        pelota.setKind(SpriteKind.Pelota)
        return pelota
    }

    /**
     * Suma puntos al puntaje, reproduce sonido y opcionalmente elimina una pelota.
     */
    //% blockId=arcadefacil_sumar_puntos
    //% block="sumar puntos por $puntos || y eliminar $pelota"
    //% group="Informacion"
    //% puntos.min=1 puntos.max=100 puntos.defl=1
    //% pelota.shadow=variables_get
    //% pelota.defl=pelota
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function sumarPuntos(puntos: number, pelota: Sprite = null): void {
        info.changeScoreBy(puntos)
        music.baDing.play()

        if (pelota) {
            pelota.destroy(effects.confetti, 100)
        }
    }

    /**
     * Resta vidas, reproduce sonido knock y opcionalmente elimina una pelota.
     */
    //% blockId=arcadefacil_restar_vidas
    //% block="restar vidas en $vidas || y eliminar $pelota"
    //% group="Informacion"
    //% vidas.min=1 vidas.max=10 vidas.defl=1
    //% pelota.shadow=variables_get
    //% pelota.defl=pelota
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function restarVidas(vidas: number, pelota: Sprite = null): void {
        info.changeLifeBy(-vidas)
        music.knock.play()

        if (pelota) {
            pelota.destroy(effects.disintegrate, 100)
        }
    }

    /**
     * Termina el juego automáticamente cuando se llega a cierto puntaje.
     * No necesita estar dentro de un bloque para siempre.
     */
    //% blockId=arcadefacil_si_llegas_a_puntaje
    //% block="si llegas a puntaje $puntaje entonces $resultado"
    //% group="Informacion"
    //% puntaje.min=1 puntaje.max=100 puntaje.defl=5
    //% resultado.defl=ResultadoJuego.Ganaste
    //% inlineInputMode=inline
    export function siLlegasAPuntaje(puntaje: number, resultado: ResultadoJuego): void {
        info.onScore(puntaje, function () {
            finalizarJuego(resultado)
        })
    }
} 