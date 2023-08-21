import { END_POINT_HEIGHT_DEFAULT, END_POINT_WIDTH_DEFAULT, ENTITY_RECT_NAME } from '@/const'
import { DrawElementBase, EndPoint } from './draw'
import { getMagnetCoord } from '@/helpers'

export class Rect extends DrawElementBase {
    private _width: number = 0
    private _height: number = 0
    private _x: number = 0
    private _y: number = 0

    startX: number = 0
    startY: number = 0

    private _calculateX1EndPoint () {
        return this._x - END_POINT_WIDTH_DEFAULT / 2
    }

    private _calculateY1EndPoint () {
        return this._y - END_POINT_HEIGHT_DEFAULT / 2
    }

    private _calculateX2EndPoint () {
        return this._x + this._width - END_POINT_WIDTH_DEFAULT / 2
    }

    private _calculateY2EndPoint () {
        return this._y + this._height - END_POINT_HEIGHT_DEFAULT / 2
    }

    constructor(x: number, y: number) {
        super(ENTITY_RECT_NAME)
        this.startX = x
        this.startY = y
        this.x = x
        this.y = y
        this.endPoints[0].x = this._calculateX1EndPoint()
        this.endPoints[0].y = this._calculateY1EndPoint()
    }

    get x () {
        return this._x
    }
    set x (x: number) {
        this._x = x
        this.endPoints[0].x = this._calculateX1EndPoint()
    }

    get y () {
        return this._y
    }
    set y (y: number) {
        this._y = y
        this.endPoints[0].y = this._calculateY1EndPoint()
    }

    get width () {
        return this._width
    }
    set width (w: number) {
        this._width = w
        this.endPoints[1].x = this._calculateX2EndPoint()
    }

    get height () {
        return this._height
    }
    set height (h: number) {
        this._height = h
        this.endPoints[1].y = this._calculateY2EndPoint()
    }

    endPoints: EndPoint[] = [
        new EndPoint(this._calculateX1EndPoint(), this._calculateY1EndPoint()),
        new EndPoint(this._calculateX2EndPoint(), this._calculateY2EndPoint())
    ];

    move (offsetX: number, offsetY: number, magnetValue: boolean): void {
        const { x: magnetX, y: magnetY } = getMagnetCoord(offsetX, offsetY, magnetValue)
        const x = Math.min(magnetX, this.startX)
        const y = Math.min(magnetY, this.startY)
        const width = Math.abs(magnetX - this.startX)
        const height = Math.abs(magnetY - this.startY)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}