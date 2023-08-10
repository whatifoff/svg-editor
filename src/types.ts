import {
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    EVENT_NAME_FOR_NAV_BUTTON_LINE,
    EVENT_NAME_FOR_NAV_BUTTON_CIRCLE,
    EVENT_NAME_FOR_NAV_BUTTON_RECT,

    DRAW_ELEMENT_STROKE_DEFAULT,
    DRAW_ELEMENT_STROKE_WIDTH_DEFAULT,
    DRAW_ELEMENT_SELECTED_DEFAULT,

    END_POINT_WIDTH_DEFAULT,
    END_POINT_HEIGHT_DEFAULT,
    END_POINT_STROKE_DEFAULT,
    END_POINT_STROKE_WIDTH_DEFAULT
} from '@/const'

export type Color = string

export type Grid = {
    width: number
    height: number
    fill: Color
    stroke: Color
    strokeWidth: number
}

export type NavButton = {
    icon: string,
    eventName: string
}

export type DrawElementType = typeof EVENT_NAME_FOR_NAV_BUTTON_CURSOR
    | typeof EVENT_NAME_FOR_NAV_BUTTON_LINE
    | typeof EVENT_NAME_FOR_NAV_BUTTON_CIRCLE
    | typeof EVENT_NAME_FOR_NAV_BUTTON_RECT

export interface IEndPoint {
    x: number
    y: number
    width: number
    height: number
    stroke: string
    strokeWidth: number
}

export interface IDrawElement {
    id: number
    type: DrawElementType
    stroke: Color
    strokeWidth: number
    selected: boolean

    endPoints: Array<IEndPoint>
}

export class EndPoint implements IEndPoint {
    width: number = END_POINT_WIDTH_DEFAULT
    height: number = END_POINT_HEIGHT_DEFAULT
    stroke: string = END_POINT_STROKE_DEFAULT
    strokeWidth: number = END_POINT_STROKE_WIDTH_DEFAULT

    constructor(public x: number, public y: number) { }
}

export class DrawElementBase implements IDrawElement {
    id: number = Date.now()
    stroke: Color = DRAW_ELEMENT_STROKE_DEFAULT
    strokeWidth: number = DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
    selected: boolean = DRAW_ELEMENT_SELECTED_DEFAULT

    constructor(public type: DrawElementType) { }

    endPoints: EndPoint[] = [];
}

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
}

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
        super(EVENT_NAME_FOR_NAV_BUTTON_CIRCLE)
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
}

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
        super(EVENT_NAME_FOR_NAV_BUTTON_RECT)
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
}

export type DrawElement = Line | Circle | Rect | null