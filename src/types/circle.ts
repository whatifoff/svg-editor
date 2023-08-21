import { END_POINT_HEIGHT_DEFAULT, END_POINT_WIDTH_DEFAULT, ENTITY_CIRCLE_NAME } from '@/const'
import { DrawElementBase, EndPoint } from './draw'
import { getMagnetCoord } from '@/helpers'

export class Circle extends DrawElementBase {
    private _cx: number = 0
    private _cy: number = 0
    private _r: number = 0

    private _calculateCXEndPoint () {
        return this._cx - END_POINT_WIDTH_DEFAULT / 2
    }

    private _calculateCYEndPoint () {
        return this._cy - END_POINT_HEIGHT_DEFAULT / 2
    }

    private _calculateRXEndPoint () {
        return this._cx + this._r - END_POINT_WIDTH_DEFAULT / 2
    }

    private _calculateRYEndPoint () {
        return this._cy - END_POINT_HEIGHT_DEFAULT / 2
    }

    constructor(x: number, y: number) {
        super(ENTITY_CIRCLE_NAME)
        this._cx = x
        this._cy = y
        this.endPoints[0].x = this._calculateCXEndPoint()
        this.endPoints[0].y = this._calculateCYEndPoint()
    }

    get cx () {
        return this._cx
    }
    set cx (x: number) {
        this._cx = x
        this.endPoints[0].x = this._calculateCXEndPoint()
    }

    get cy () {
        return this._cy
    }
    set cy (y: number) {
        this._cy = y
        this.endPoints[0].y = this._calculateCYEndPoint()
    }

    get r () {
        return this._r
    }
    set r (r: number) {
        this._r = r
        this.endPoints[1].x = this._calculateRXEndPoint()
        this.endPoints[1].y = this._calculateRYEndPoint()
    }

    endPoints: EndPoint[] = [
        new EndPoint(this._calculateCXEndPoint(), this._calculateCYEndPoint()),
        new EndPoint(this._calculateRXEndPoint(), this._calculateRYEndPoint())
    ];

    move (offsetX: number, offsetY: number, magnetValue: boolean): void {
        const { x, y } = getMagnetCoord(offsetX, offsetY, magnetValue)
        this.r = Math.sqrt(Math.pow(this._cx - x, 2) + Math.pow(this._cy - y, 2))
    }
}