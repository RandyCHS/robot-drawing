/**
 * Press the A button to see how the robot travels from the bottom left of the grid to the top right.  Then use the Robo Drawing blocks to design a new path for your robot to follow.  Start the robot anywhere on the grid by setting the coordinates in the Reset block.
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    n = 1
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < n; index++) {
            RoboDrawing.roboMoveForward()
        }
        RoboDrawing.roboTurn(RoboDrawing.TurnDirection.Left)
        for (let index = 0; index < n; index++) {
            RoboDrawing.roboMoveForward()
        }
        RoboDrawing.roboTurn(RoboDrawing.TurnDirection.Right)
        n += 1
    }
})
let n = 0
RoboDrawing.roboReset(0, 6, RoboDrawing.Direction.Right)
