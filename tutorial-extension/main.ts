/**
 * Tutorial helpers for MakeCode Arcade.
 */
//% color=190 weight=100 icon="\uf1ec" block="Tutorial"
namespace tutorial {
    /**
     * Return a friendly greeting.
     * @param name who to greet, eg: "Arcade"
     */
    //% blockId=tutorial_say_hello
    //% block="say hello to $name"
    //% weight=100
    export function sayHello(name: string): string {
        return "Hello, " + name + "!";
    }
}
