//% icon="\uf201"
//% block="Robo Drawing"
namespace RoboDrawing {
    export enum Direction {
        //% block="up"
        Up = 0,
        //% block="right"
        Right = 1,
        //% block="down"
        Down = 2,
        //% block="left"
        Left = 3,
    }

    export enum TurnDirection {
        //% block="left"
        Left,
        //% block="right"
        Right,
    }

    const waitInterval = 300;
    const headingProperty = 'roboHeading';
    const roboImages = [img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . 5 5 5 5 . . . . . .
        . . . . . . 5 5 5 5 . . . . . .
        . . . . . . 5 5 5 5 . . . . . .
        . . . . . 5 5 5 5 5 5 . . . . .
        . . . . . 5 5 5 5 5 5 . . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . 5 . . . . . . . . . . . . .
        . . 5 5 5 5 . . . . . . . . . .
        . . 5 5 5 5 5 5 . . . . . . . .
        . . 5 5 5 5 5 5 5 5 5 . . . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 . . . . .
        . . 5 5 5 5 5 5 . . . . . . . .
        . . 5 5 5 5 . . . . . . . . . .
        . . 5 . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . . 5 5 5 5 5 5 . . . . .
        . . . . . 5 5 5 5 5 5 . . . . .
        . . . . . . 5 5 5 5 . . . . . .
        . . . . . . 5 5 5 5 . . . . . .
        . . . . . . 5 5 5 5 . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . 5 . .
        . . . . . . . . . . 5 5 5 5 . .
        . . . . . . . . 5 5 5 5 5 5 . .
        . . . . . 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . . . . 5 5 5 5 5 5 5 5 5 . .
        . . . . . . . . 5 5 5 5 5 5 . .
        . . . . . . . . . . 5 5 5 5 . .
        . . . . . . . . . . . . . 5 . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `];

    let robo: Sprite;
    let cellSize = 16;
    let gridSize = 7;

    //% block="reset grid with robo at %col %row facing %direction"
    //% expandableArgumentMode="toggle"
    //% col.min=0 col.max=6 col.defl=0
    //% row.min=0 row.max=6 row.defl=6
    //% direction.defl=RoboDrawing.Direction.Right
    export function roboReset(col: number, row: number, direction: Direction) {
        if (robo) {
            robo.destroy();
            scene.backgroundImage().fill(0);
        }

        robo = sprites.create(roboImages[direction]);
        robo.data[headingProperty] = direction;

        let background = scene.backgroundImage();
        const horizontalMargin = (scene.screenWidth() - gridSize * cellSize) / 2;
        const verticalMargin = (scene.screenHeight() - gridSize * cellSize) / 2;

        for (let cellEdge = 0; cellEdge <= gridSize; cellEdge++) {
            const screenX = horizontalMargin + cellEdge * cellSize;
            background.drawLine(screenX, verticalMargin, screenX, scene.screenHeight() - verticalMargin, 1);

            const screenY = verticalMargin + cellEdge * cellSize;
            background.drawLine(horizontalMargin, screenY, scene.screenWidth() - horizontalMargin, screenY, 1);
        }

        robo.setPosition(
            horizontalMargin + col * cellSize + cellSize / 2,
            verticalMargin + row * cellSize + cellSize / 2);
        pause(waitInterval);
    }

    //% block
    //% weight=52
    export function roboMoveForward() {
        const lastX = robo.x;
        const lastY = robo.y;

        switch (robo.data[headingProperty]) {
            case Direction.Up: robo.y -= cellSize; break;
            case Direction.Right: robo.x += cellSize; break;
            case Direction.Down: robo.y += cellSize; break;
            case Direction.Left: robo.x -= cellSize; break;
        }

        scene.backgroundImage().drawLine(lastX, lastY, robo.x, robo.y, 3);
        pause(waitInterval);
    }

    //% block="robo turn %left"
    //% left.defl=RoboDrawing.TurnDirection.Left
    //% weight=51
    export function roboTurn(left: TurnDirection = RoboDrawing.TurnDirection.Left) {
        turn(left);
    }

    // The following block only exists for the block toolbox;
    // I want both directions, but easy swapping with the drop-down

    //% block="robo turn %right"
    //% right.defl=RoboDrawing.TurnDirection.Right
    export function roboTurn2(right: TurnDirection = RoboDrawing.TurnDirection.Right) {
        turn(right);
    }

    function turn(direction: TurnDirection) {
        switch(direction) {
            case TurnDirection.Left:
                robo.data[headingProperty] = (robo.data[headingProperty] - 1 + 4) % 4;
                break;
            case TurnDirection.Right:
                robo.data[headingProperty] = (robo.data[headingProperty] + 1) % 4;
                break;
        }

        updateRoboImage();
        pause(waitInterval);
    }

    function updateRoboImage() {
        robo.setImage(roboImages[robo.data[headingProperty] as number]);
    }
}