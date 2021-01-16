export class Canvas {

    private canvas: HTMLCanvasElement;
    private canvasRendering: CanvasRenderingContext2D;

    constructor() { }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    setCanvas(canvas): void {
        this.canvas = canvas;
    }


    getCanvasRendering(): CanvasRenderingContext2D {
        return this.canvasRendering;
    }

    setCanvasRendering(canvasRendering): void {
        this.canvasRendering = canvasRendering;
    }

}