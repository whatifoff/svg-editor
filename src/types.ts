import {
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    EVENT_NAME_FOR_NAV_BUTTON_LINE,
    EVENT_NAME_FOR_NAV_BUTTON_CIRCLE,
    EVENT_NAME_FOR_NAV_BUTTON_RECT,

    DRAW_ELEMENT_STROKE_DEFAULT,
    DRAW_ELEMENT_STROKE_WIDTH_DEFAULT,
    DRAW_ELEMENT_SELECTED
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

export interface IDrawElement {
    id: number
    type: DrawElementType
    stroke: Color
    strokeWidth: number
    selected: boolean
}

export class DrawElementBase implements IDrawElement {
    id: number = Date.now()
    stroke: Color = DRAW_ELEMENT_STROKE_DEFAULT
    strokeWidth: number = DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
    selected: boolean = DRAW_ELEMENT_SELECTED

    constructor(public type: DrawElementType) { }
}

export class Line extends DrawElementBase {
    x1: number = 0
    y1: number = 0
    x2: number = 0
    y2: number = 0

    constructor(x: number, y: number) {
        super(EVENT_NAME_FOR_NAV_BUTTON_LINE)
        this.x1 = x
        this.y1 = y
        this.x2 = x
        this.y2 = y
    }
}

export class Circle extends DrawElementBase {
    cx: number = 0
    cy: number = 0
    r: number = 0

    constructor(x: number, y: number) {
        super(EVENT_NAME_FOR_NAV_BUTTON_CIRCLE)
        this.cx = x
        this.cy = y
    }
}

export class Rect extends DrawElementBase {
    width: number = 0
    height: number = 0
    startX: number = 0
    startY: number = 0

    constructor(public x: number, public y: number) {
        super(EVENT_NAME_FOR_NAV_BUTTON_RECT)
        this.startX = x
        this.startY = y
    }
}

export type DrawElement = Line | Circle | Rect | null