import { END_POINT_HEIGHT_DEFAULT, END_POINT_WIDTH_DEFAULT, EVENT_NAME_FOR_NAV_BUTTON_LINE } from '@/const'
import { DrawElementBase, EndPoint } from './draw'
import { getMagnetCoord } from '@/helpers'

export class Line extends DrawElementBase {
    private _x1: number = 0
    private _y1: number = 0
    private _x2: number = 0
    private _y2: number = 0

    private _calculateXEndPoint (x: number) {
        return x - END_POINT_WIDTH_DEFAULT / 2
    }

    private _calculateYEndPoint (y: number) {
        return y - END_POINT_HEIGHT_DEFAULT / 2
    }

    get x1 () {
        return this._x1
    }
    set x1 (x: number) {
        this._x1 = x
        this.endPoints[0].x = this._calculateXEndPoint(x)
    }

    get y1 () {
        return this._y1
    }
    set y1 (y: number) {
        this._y1 = y
        this.endPoints[0].y = this._calculateYEndPoint(y)
    }

    get x2 () {
        return this._x2
    }
    set x2 (x: number) {
        this._x2 = x
        this.endPoints[1].x = this._calculateXEndPoint(x)
    }

    get y2 () {
        return this._y2
    }
    set y2 (y: number) {
        this._y2 = y
        this.endPoints[1].y = this._calculateYEndPoint(y)
    }

    constructor(x: number, y: number) {
        super(EVENT_NAME_FOR_NAV_BUTTON_LINE)
        this._x1 = x
        this._y1 = y
        this._x2 = x
        this._y2 = y
        this.endPoints[0].x = this._calculateXEndPoint(x)
        this.endPoints[0].y = this._calculateYEndPoint(y)
    }

    endPoints: EndPoint[] = [
        new EndPoint(this._calculateXEndPoint(this._x1), this._calculateYEndPoint(this._y1)),
        new EndPoint(this._calculateXEndPoint(this._x2), this._calculateYEndPoint(this._y2))
    ];

    move (offsetX: number, offsetY: number, magnetValue: boolean) {
        const { x, y } = getMagnetCoord(offsetX, offsetY, magnetValue)
        this.x2 = x
        this.y2 = y
    }

}