# tutorial-extension

A MakeCode Arcade extension that adds a small set of beginner-friendly blocks under the **Tutorial** category. Use it as a starting point for tutorials and as a worked example of `//%`-annotated block definitions.

for PXT/TARGET

## Blocks

### Getting started

- ``on game start`` — event block. Code inside runs once when the game starts.
- ``show message [text] for [ms] ms`` — display a message in a dialog for a fixed time.

### Sprite helpers

- ``spawn player with image [img]`` — creates a `Player` sprite at the center and stores it in the `player` variable.
- ``[sprite] step [direction]`` — moves a sprite one tile (16 px) in a direction.
- ``on [kind] overlap`` — event block. Code inside runs when two sprites of that kind overlap.

### Math

- ``clamp [value] between [min] and [max]`` — keeps a value inside a range.
- ``random integer between [low] and [high]`` — random integer in the inclusive range.

## Example

```blocks
tutorial.onStart(function () {
    let p = tutorial.spawnPlayer(sprites.castle.princessFront0)
    tutorial.showMessage("Go!", 1000)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    tutorial.step(player, Direction.Right)
})
```

## Usage

1. Import this repository into the MakeCode Arcade editor (Import URL → `https://github.com/LautaroCeballos/tutorial-extension`).
2. The **Tutorial** category appears in the toolbox.
3. Bump a release tag (`git tag v0.0.1 && git push origin v0.0.1`) so the editor can resolve a version.

For block-annotation reference see https://makecode.com/defining-blocks. For the full extension workflow see https://makecode.com/extensions/getting-started.

## License

MIT
