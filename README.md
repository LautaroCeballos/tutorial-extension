# tutorial-extension

Una extensión para MakeCode Arcade pensada como punto de partida para tutoriales. Añade una categoría **Tutorial** al editor con bloques para crear un personaje con física de plataforma y moverlo con el teclado.

for PXT/TARGET

## Bloques

### Crear

- ``establecer [personaje] como objeto [imagen] de tipo [tipo]`` — crea un sprite del tipo elegido (por defecto `Player`) en el centro de la pantalla, lo sigue con la cámara y le aplica física de plataforma (gravedad + colisión con el suelo).

### Movimiento

- ``mover [personaje] a la izquierda y derecha con las flechas`` — activa el control lateral con las flechas izquierda/derecha a 80 px/frame.
- ``saltar con [personaje] al presionar el botón A o la flecha arriba`` — salta cuando el personaje está apoyado en el suelo.

## Ejemplo

```blocks
namespace tutorial {
    let nuevoPersonaje: Sprite

    tutorial.crearPersonaje(nuevoPersonaje, sprites.castle.princessFront0, SpriteKind.Player)
    tutorial.moverConFlechas(nuevoPersonaje)
    tutorial.saltarConA(nuevoPersonaje)
}
```

## Uso

1. Importar este repositorio en el editor de MakeCode Arcade (Import URL → `https://github.com/LautaroCeballos/tutorial-extension`).
2. La categoría **Tutorial** aparece en la caja de herramientas.
3. Para que el editor pueda resolver la versión, hay un tag de release: `git tag v0.0.4 && git push origin v0.0.4`.

Referencia de anotaciones: https://makecode.com/defining-blocks. Flujo completo de extensiones: https://makecode.com/extensions/getting-started.

## Licencia

MIT
