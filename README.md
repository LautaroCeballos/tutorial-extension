# tutorial-extension

MakeCode Arcade extension with simple Spanish blocks for building football games. Adds the **Football Game** category to the toolbox, with sprite/projectile/background helpers, score and life management, and event handlers for the `Pelota`/`Arquero`/`Arco` sprite kinds.

for PXT/TARGET

## Bloques

### Crear Sprites

- ``crear sprite con imagen [imagen] en x [x] y [y] de tipo [tipo]`` — crea un sprite del tipo elegido y lo mantiene dentro de la pantalla.

### Mover Sprites

- ``mover [mySprite] con botones`` — activa el control horizontal con las flechas (velocidad opcional detrás del `+`).
- ``mover [mySprite] automáticamente con velocidad [velocidad]`` — movimiento horizontal con rebote en las paredes.

### Crear Proyectiles

- ``crear pelota con imagen [imagen] desde [mySprite] con velocidad Y [velocidadY]`` — dispara un proyectil de tipo `Pelota` con velocidad X en 0.

### Escenarios

- ``establecer imagen de fondo a [imagen]`` — define la imagen de fondo del escenario.

### Información

- ``establecer vidas en [vidas] y puntaje en [puntaje]`` — fija vidas y puntaje iniciales.
- ``sumar puntos por [puntos]`` — suma puntos, reproduce `baDing` y, opcionalmente, elimina una pelota con confeti.
- ``restar vidas en [vidas]`` — resta vidas, reproduce `wawawawaa` y, opcionalmente, elimina una pelota con desintegración.

### Eventos

- ``cuando se presione el botón A`` — handler para el botón A.
- ``cuando Pelota toque Arquero`` — handler de overlap entre `Pelota` y `Arquero`.
- ``cuando Pelota toque Arco`` — handler de overlap entre `Pelota` y `Arco`.

## Tipos de sprite

La extensión añade tres tipos de sprite propios: `Pelota`, `Arquero` y `Arco`.

## Ejemplo

```blocks
namespace football {
    let arquero: Sprite
    let pelota: Sprite
    let arco: Sprite

    arcadeFacil.establecerImagenDeFondo(scene.backgroundImage())
    arcadeFacil.establecerVidasYPuntaje(3, 0)

    arquero = arcadeFacil.crearSprite(sprites.duck, 80, 100, SpriteKind.Arquero)
    arco = arcadeFacil.crearSprite(sprites.castle.selkieFlag0, 80, 20, SpriteKind.Arco)

    arcadeFacil.moverConBotones(arquero)

    arcadeFacil.cuandoBotonA(function () {
        pelota = arcadeFacil.crearPelota(sprites.ball, arquero, -80)
    })

    arcadeFacil.cuandoPelotaTocaArquero(function () {
        arcadeFacil.restarVidas(1, pelota)
    })

    arcadeFacil.cuandoPelotaTocaArco(function () {
        arcadeFacil.sumarPuntos(1, pelota)
    })
}
```

## Uso

1. Importar este repositorio en el editor de MakeCode Arcade (Import URL → `https://github.com/LautaroCeballos/tutorial-extension`).
2. La categoría **Football Game** aparece en la caja de herramientas.
3. Para que el editor pueda resolver la versión, hay un tag de release: `git tag v0.1.1 && git push origin v0.1.1`.

Referencia de anotaciones: https://makecode.com/defining-blocks. Flujo completo de extensiones: https://makecode.com/extensions/getting-started.

## Licencia

MIT
