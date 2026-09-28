import Rope from "./rope.js";
import { overlap } from ".././collision.js";

var rope = new Rope("black", 4, 7); // Create a new Rope instance with a maximum length of 5 units


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
            let { canvas, mousePos, board, player, camera } = args;
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
                let rect = board.getVal(Math.floor((mousePos.x + camera.x + 50) / 50), Math.floor((mousePos.y - camera.y) / 50));
                if (rect == undefined || rect == null) {
                    rope.ancor = null; // Reset the anchor if no valid entity is clicked
                    return;
                }

            document.addEventListener("keydown", (event) => {
                if (event.code === "KeyC") {
                    rope.ancor = null; // Reset the anchor when 'C' is pressed
                }
            });

                board.getAllSubjectsFromGrid().forEach(subject => {
                    if (overlap(subject, rect)) {
                        console.log("subject overlap with rect", subject, rect);
                        rope.ancor = rect;
                    }
                })

            })


        } catch (e) {
            console.log(e);
        }
    }

    //args ->  object contains entities objects
    //update -> inside timer loop
    static update(args) {

        try {

            let { ctx, player, npcs, board, camera } = args;

            rope.update(ctx, player, board, camera);

        } catch (e) {
            console.log(e);
        }

    }

}