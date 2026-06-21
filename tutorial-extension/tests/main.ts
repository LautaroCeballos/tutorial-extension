// Smoke test for the tutorial extension. Run from the extension folder with `pxt test`.
namespace tests {
    export function runSayHello(): boolean {
        const got = tutorial.sayHello("Arcade");
        return got === "Hello, Arcade!";
    }
}
