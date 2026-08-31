export default class Rope {
    constructor(color = "black", width = 4, ropeLength = 5) {
        this.color = color;
        this.width = width;
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

    ropePhisics(x1, y1, x2, y2){
        //!need to complete
        //let dist = Math.sqrt(((x1 + x2) ^ 2) + ((y1 + y2) ^ 2));
        
    }


    drawRopeBetweenEntities(ctx, entity1, entity2, camera) {
        let x1 = entity1.pos.x - camera.x;
        let y1 = entity1.pos.y + camera.y;
        let x2 = entity2.pos.x - camera.x;
        let y2 = entity2.pos.y + camera.y;

        this.drawRope(ctx, x1, y1, x2, y2);
    }

    update(ctx, player, board, camera) {
        let rect = board.getVal(5, 1);
        this.drawRopeBetweenEntities(ctx, player, rect, camera);
    }

}