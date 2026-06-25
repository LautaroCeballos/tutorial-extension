namespace SpriteKind {
    //% isKind
    export const Pelota = SpriteKind.create()

    //% isKind
    export const Arquero = SpriteKind.create()

    //% isKind
    export const Arco = SpriteKind.create()
}

/**
 * Bloques simples para crear juegos de fútbol en MakeCode Arcade.
 */
//% color="#0F766E" weight=100 icon="\uf1e3" block="Mundial 2026"
//% groups=['Inicializacion', 'Crear Sprites', 'Mover Sprites', 'Proyectiles', 'Informacion']
namespace arcadeFacil {

    let arcoActual: Sprite = null
    let juegoTerminado = false

    let arqueroInteligente: Sprite = null
    let velocidadArquero = 60
    let inteligenciaArquero = false
    let actualizacionArqueroRegistrada = false
    let eventoVidasCeroRegistrado = false

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

    function crearImagenArco(): Image {
        let arco = image.create(60, 16)

        arco.fill(0)

        let blanco = 1

        arco.fillRect(0, 0, 60, 3, blanco)
        arco.fillRect(0, 3, 3, 13, blanco)
        arco.fillRect(57, 3, 3, 13, blanco)

        return arco
    }

    function crearArco(): void {
        if (arcoActual) {
            arcoActual.destroy()
        }

        arcoActual = sprites.create(crearImagenArco(), SpriteKind.Arco)
        arcoActual.setPosition(80, 10)
        arcoActual.z = 10
    }

    function obtenerPelota(): Sprite {
        let pelotas = sprites.allOfKind(SpriteKind.Pelota)

        if (pelotas.length > 0) {
            return pelotas[0]
        }

        return null
    }

    function registrarActualizacionArquero(): void {
        if (actualizacionArqueroRegistrada) {
            return
        }

        actualizacionArqueroRegistrada = true

        game.onUpdate(function () {
            if (!arqueroInteligente) {
                return
            }

            if (!inteligenciaArquero) {
                if (arqueroInteligente.vx == 0) {
                    arqueroInteligente.vx = velocidadArquero
                }

                return
            }

            let pelota = obtenerPelota()

            if (pelota) {
                let velocidadMejorada = velocidadArquero + info.score() * 8

                if (velocidadMejorada > 150) {
                    velocidadMejorada = 150
                }

                if (pelota.x > arqueroInteligente.x + 2) {
                    arqueroInteligente.vx = velocidadMejorada
                } else if (pelota.x < arqueroInteligente.x - 2) {
                    arqueroInteligente.vx = -velocidadMejorada
                } else {
                    arqueroInteligente.vx = 0
                }
            } else {
                if (arqueroInteligente.vx == 0) {
                    arqueroInteligente.vx = velocidadArquero
                }
            }
        })
    }

    function registrarGameOverPorVidas(): void {
        if (eventoVidasCeroRegistrado) {
            return
        }

        eventoVidasCeroRegistrado = true

        info.onLifeZero(function () {
            if (juegoTerminado) {
                return
            }

            juegoTerminado = true
            music.wawawawaa.play()
            game.setGameOverMessage(false, "Oh no, el arquedo gano de nuevo")
            game.setGameOverEffect(false, effects.dissolve)
            game.gameOver(false)
        })
    }

    function finalizarJuegoGanado(): void {
        if (juegoTerminado) {
            return
        }

        juegoTerminado = true
        game.setGameOverMessage(true, "Ganaste la copa del mundo!!!")
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    }

    /**
     * Establece el fondo de penales.
     * También crea el arco, reinicia el puntaje en 0 y establece 3 vidas.
     */
    //% blockId=arcadefacil_establecer_fondo_penales
    //% block="establecer fondo de penales estilo $color"
    //% group="Inicializacion"
    //% color.defl=FondoPenales.CespedClasico
    export function establecerFondoDePenales(color: FondoPenales): void {
        scene.setBackgroundImage(crearFondoDePenales(color))
        crearArco()
        info.setScore(0)
        info.setLife(3)
        juegoTerminado = false
        game.setGameOverMessage(false, "Oh no, el arquedo gano de nuevo")
        game.setGameOverEffect(false, effects.dissolve)
        registrarGameOverPorVidas()
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
     * Por defecto se mueve solo de izquierda a derecha.
     * En el botón (+) se puede activar el movimiento en 4 direcciones.
     */
    //% blockId=arcadefacil_mover_con_botones
    //% block="mover $mySprite con botones || movimiento en 4 direcciones $cuatroDirecciones con velocidad $velocidad"
    //% group="Mover Sprites"
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% cuatroDirecciones.shadow=toggleOnOff
    //% cuatroDirecciones.defl=false
    //% velocidad.min=0 velocidad.max=200 velocidad.defl=100
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function moverConBotones(mySprite: Sprite, cuatroDirecciones: boolean = false, velocidad: number = 100): void {
        if (cuatroDirecciones) {
            controller.moveSprite(mySprite, velocidad, velocidad)
        } else {
            controller.moveSprite(mySprite, velocidad, 0)
        }

        mySprite.setStayInScreen(true)
    }

    /**
     * Mueve un sprite automáticamente.
     * La inteligencia del arquero queda oculta detrás del botón (+).
     */
    //% blockId=arcadefacil_mover_automatico
    //% block="mover $mySprite automáticamente con velocidad $velocidad || inteligencia del arquero $inteligencia"
    //% group="Mover Sprites"
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% velocidad.min=0 velocidad.max=200 velocidad.defl=60
    //% inteligencia.shadow=toggleOnOff
    //% inteligencia.defl=false
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function moverAutomatico(mySprite: Sprite, velocidad: number, inteligencia: boolean = false): void {
        mySprite.vx = velocidad
        mySprite.vy = 0
        mySprite.setBounceOnWall(true)
        mySprite.setStayInScreen(true)

        arqueroInteligente = mySprite
        velocidadArquero = velocidad
        inteligenciaArquero = inteligencia

        registrarActualizacionArquero()
    }

    /**
     * Crea una pelota/proyectil desde un sprite.
     * El alumno escribe VY positivo.
     * Internamente se invierte para que la pelota suba.
     * Solo puede existir una pelota al mismo tiempo.
     */
    //% blockId=arcadefacil_crear_pelota
    //% block="crear pelota con imagen $imagen desde $mySprite con VY $vy"
    //% blockSetVariable=pelota
    //% group="Proyectiles"
    //% imagen.shadow=image_picker
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% vy.min=0 vy.max=200 vy.defl=50
    //% inlineInputMode=inline
    export function crearPelota(imagen: Image, mySprite: Sprite, vy: number = 50): Sprite {
        let pelotaExistente = obtenerPelota()

        if (pelotaExistente) {
            return pelotaExistente
        }

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
    //% block="si llegas al puntaje $puntaje entonces GANASTE"
    //% group="Informacion"
    //% puntaje.min=1 puntaje.max=100 puntaje.defl=5
    //% inlineInputMode=inline
    export function siLlegasAPuntaje(puntaje: number): void {
        info.onScore(puntaje, function () {
            finalizarJuegoGanado()
        })
    }
}
