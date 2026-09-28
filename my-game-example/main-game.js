import Rope from "./rope.js";
import { overlap } from ".././collision.js";

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
                    return;
                }

                board.getAllSubjectsFromGrid().forEach(subject => {
                    if (overlap(subject, rect)) {
                        console.log("subject overlap with rect", subject, rect);
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

            let rope = new Rope("black", 4);

            rope.update(ctx, player, board, camera);

        } catch (e) {
            console.log(e);
        }

    }

}