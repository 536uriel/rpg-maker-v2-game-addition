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
            let { player } = args;
            player.pos.x = 200;
            player.pos.y = 100;


        } catch (e) {
            console.log(e);
        }
    }

    //args ->  object contains entities objects
    //update -> inside timer loop
    static update(args) {

        try {

            let { player, npcs } = args;
            //example
            player.gravity = 6;

            //ground example
            for (let i = 2; i < 11; i++) {
                for (let j of ([1, 5])) {
                    window.rect(50 * i, j * 50)     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
                }
            }

        } catch (e) {
            console.log(e);
        }

    }

}