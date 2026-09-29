import Rope from "./rope.js";
import { overlap } from ".././collision.js";
import Rect from ".././Rect.js";

window.rope = new Rope("black", 4, 7); // Create a new Rope instance with a maximum length of 5 units
window.rope.ancorDisabled = false; // Initialize the ancorDisabled property to false

export default class MainGameExample {
    constructor() {
    }

    //@ option for overriding inheritence (from window object) of cleancode
    static cleanCode() {

        clearBackground()      /* נקה רקע */
        bg("aliceblue")     /* צבע רקע בצבע */

    }

    //args ->  object contains entities objects
    static precode(args) {

        try {

            MainGameExample.cleanCode();
            let { canvas, mousePos, board, player, camera, sprite } = args;
            player.pos.x = 200;
            player.pos.y = 100;

            //example
            player.gravity = 6;

            //ground example
            for (let i = 2; i < 11; i++) {
                for (let j of ([1, 5])) {
                    window.rect(50 * i, j * 50)     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
                }
            }


            canvas.addEventListener("click", (e) => {
                if (window.rope.ancorDisabled) {
                    window.rope.ancor = null;
                    return;
                }   

                let ancor = new Rect(Math.floor(mousePos.x + camera.x), Math.floor(mousePos.y - camera.y), 10, 10, sprite.sprites.get('ground'), camera);

                board.getAllSubjectsFromGrid().forEach(subject => {
                    if (overlap(subject, ancor)) {
                        console.log("subject overlap with ancor", subject, ancor);
                        window.rope.ancor = ancor;
                    }
                })

            });

            document.addEventListener("keydown", (e) => {

                if (e.code === "KeyC") {
                    window.rope.ancorDisabled = !window.rope.ancorDisabled;
                    
                }

            });


        } catch (e) {
            console.log(e);
        }
    }

    //args ->  object contains entities objects
    //update -> inside timer loop
    static update(args) {

        try {

            let { ctx, player, npcs, board, camera } = args;

            window.rope.update(ctx, player, board, camera);

        } catch (e) {
            console.log(e);
        }

    }

}