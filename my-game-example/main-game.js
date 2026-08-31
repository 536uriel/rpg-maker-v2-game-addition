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
            player.pos.x = 100;
            player.pos.y = 100;

        } catch (e) {
            console.log(e);
        }
    }

    //args ->  object contains entities objects
    //update -> inside timer loop
    static update(args) {

        try {

            let { player,npcs } = args;
            //example
            player.gravity = 0;

        } catch (e) {
            console.log(e);
        }

    }

}