namespace SpriteKind {
    export const Pelota = SpriteKind.create()
    export const Arquero = SpriteKind.create()
    export const Arco = SpriteKind.create()
}

/**
 * Bloques simples para crear juegos de fútbol en MakeCode Arcade.
 */
//% color="#0F766E" weight=100 icon="\uf1e3" block="Football Game"
//% groups=['Crear Sprites', 'Mover Sprites', 'Crear Proyectiles', 'Escenarios', 'Informacion', 'Eventos']
namespace arcadeFacil {

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
     * La velocidad X siempre es 0.
     * El tipo de sprite siempre es Pelota.
     */
    //% blockId=arcadefacil_crear_pelota
    //% block="crear pelota con imagen $imagen desde $mySprite con velocidad Y $velocidadY"
    //% blockSetVariable=pelota
    //% group="Crear Proyectiles"
    //% imagen.shadow=image_picker
    //% mySprite.shadow=variables_get
    //% mySprite.defl=mySprite
    //% velocidadY.min=-200 velocidadY.max=200 velocidadY.defl=0
    //% inlineInputMode=inline
    export function crearPelota(imagen: Image, mySprite: Sprite, velocidadY: number): Sprite {
        let pelota = sprites.createProjectileFromSprite(imagen, mySprite, 0, velocidadY)
        pelota.setKind(SpriteKind.Pelota)
        return pelota
    }

    /**
     * Establece la imagen de fondo del escenario.
     */
    //% blockId=arcadefacil_establecer_fondo
    //% block="establecer imagen de fondo a $imagen"
    //% group="Escenarios"
    //% imagen.shadow=screen_image_picker
    export function establecerImagenDeFondo(imagen: Image): void {
        scene.setBackgroundImage(imagen)
    }

    /**
     * Establece las vidas y el puntaje inicial.
     */
    //% blockId=arcadefacil_establecer_vidas_y_puntaje
    //% block="establecer vidas en $vidas y puntaje en $puntaje"
    //% group="Informacion"
    //% vidas.min=1 vidas.max=10 vidas.defl=3
    //% puntaje.min=0 puntaje.max=100 puntaje.defl=0
    //% inlineInputMode=inline
    export function establecerVidasYPuntaje(vidas: number, puntaje: number): void {
        info.setLife(vidas)
        info.setScore(puntaje)
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
     * Resta vidas, reproduce sonido y opcionalmente elimina una pelota.
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
        music.wawawawaa.play()

        if (pelota) {
            pelota.destroy(effects.disintegrate, 100)
        }
    }

    /**
     * Evento para ejecutar acciones cuando se presiona el botón A.
     */
    //% blockId=arcadefacil_cuando_boton_a
    //% block="cuando se presione el botón A"
    //% group="Eventos"
    //% handlerStatement=1
    export function cuandoBotonA(handler: () => void): void {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            handler()
        })
    }

    /**
     * Evento cuando la pelota toca al arquero.
     * No suma puntos, no resta vidas y no reproduce sonidos automáticamente.
     */
    //% blockId=arcadefacil_cuando_pelota_toca_arquero
    //% block="cuando Pelota toque Arquero"
    //% group="Eventos"
    //% handlerStatement=1
    export function cuandoPelotaTocaArquero(handler: () => void): void {
        sprites.onOverlap(SpriteKind.Pelota, SpriteKind.Arquero, function (pelota, arquero) {
            handler()
        })
    }

    /**
     * Evento cuando la pelota toca el arco.
     * No suma puntos, no resta vidas y no reproduce sonidos automáticamente.
     */
    //% blockId=arcadefacil_cuando_pelota_toca_arco
    //% block="cuando Pelota toque Arco"
    //% group="Eventos"
    //% handlerStatement=1
    export function cuandoPelotaTocaArco(handler: () => void): void {
        sprites.onOverlap(SpriteKind.Pelota, SpriteKind.Arco, function (pelota, arco) {
            handler()
        })
    }
}
