export default class Rope {
    constructor(color = "black", width = 4, ropeMaxLength = 7) {
        this.color = color;
        this.width = width;
        this.ropeMaxLength = ropeMaxLength;
    }

    drawRope(ctx, x1, y1, x2, y2) {
        // 2. Configure the line appearance (Optional)
        ctx.strokeStyle = this.color;       // Line color
        ctx.lineWidth = this.width;             // Line width in pixels

        // 3. Define the line path
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.stroke();
    }


    drawRopeBetweenEntities(ctx, entity1, entity2, camera) {
        let x1 = entity1.pos.x - camera.x;
        let y1 = entity1.pos.y + camera.y;
        let x2 = entity2.pos.x - camera.x;
        let y2 = entity2.pos.y + camera.y;

        const dx = x2 - x1;
        const dy = y2 - y1;

        let dist = Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
        if (dist > this.ropeMaxLength * 50) {
            let angle = Math.atan2(y2 - y1, x2 - x1);
            x1 = x2 - Math.cos(angle) * this.ropeMaxLength * 50;
            y1 = y2 - Math.sin(angle) * this.ropeMaxLength * 50;


            //fix player pos by rope length
            entity1.pos.x = x1 + camera.x;


            //fix player pos by rope length
            entity1.pos.y = y1 - camera.y;

            // 2. MID-AIR PROPULSION / TENSION FORCE
            // Pull force pulling entity1 towards entity2
            const pullStrength = 1.5; // Adjust this intensity to change push/pull feel

            entity1.velocity.x += Math.cos(angle) * pullStrength;

            entity1.velocity.y -= Math.sin(angle) * pullStrength;

            // 3. DAMP OUTWARD VELOCITY (removes momentum moving AWAY from anchor)
            // Normalized direction vector from entity1 -> entity2
            const nx = dx / dist;
            const ny = dy / dist;

            // Dot product of velocity and direction vector
            let velTowardAnchor = entity1.velocity.x * nx + entity1.velocity.y * ny;

            // If moving away from anchor (velTowardAnchor < 0), cancel outward velocity component
            if (velTowardAnchor < 0) {
                entity1.velocity.x -= velTowardAnchor * nx;
                entity1.velocity.y -= velTowardAnchor * ny;
            }

            //set ropeIsBlocking to true
            entity1.ropeIsBlocking = true;


        } else {
            entity1.ropeIsBlocking = false;
        }


        this.drawRope(ctx, x1, y1, x2, y2);
    }

    update(ctx, player, board, camera) {
        let rect = board.getVal(5, 1);
        this.drawRopeBetweenEntities(ctx, player, rect, camera);
    }

}