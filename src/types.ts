import {
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    EVENT_NAME_FOR_NAV_BUTTON_LINE,
    EVENT_NAME_FOR_NAV_BUTTON_CIRCLE,
    EVENT_NAME_FOR_NAV_BUTTON_RECT,

    DRAW_ELEMENT_STROKE_DEFAULT,
    DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
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
}

// TODO: создать родительский класс DrawElement для Line, Circle, Rect

export class Line implements IDrawElement {
    id: number = Date.now()
    type: DrawElementType = EVENT_NAME_FOR_NAV_BUTTON_LINE
    stroke: Color = DRAW_ELEMENT_STROKE_DEFAULT
    strokeWidth: number = DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
    x1: number = 0
    y1: number = 0
    x2: number = 0
    y2: number = 0

    constructor(x: number, y: number) {
        this.x1 = x
        this.y1 = y
        this.x2 = x
        this.y2 = y
    }
}

export class Circle implements IDrawElement {
    id: number = Date.now()
    type: DrawElementType = EVENT_NAME_FOR_NAV_BUTTON_CIRCLE
    stroke: Color = DRAW_ELEMENT_STROKE_DEFAULT
    strokeWidth: number = DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
    cx: number = 0
    cy: number = 0
    r: number = 0

    constructor(x: number, y: number) {
        this.cx = x
        this.cy = y
    }
}

export class Rect implements IDrawElement {
    id: number = Date.now()
    type: DrawElementType = EVENT_NAME_FOR_NAV_BUTTON_RECT
    stroke: Color = DRAW_ELEMENT_STROKE_DEFAULT
    strokeWidth: number = DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
    width: number = 0
    height: number = 0
    startX: number = 0
    startY: number = 0

    constructor(public x: number, public y: number) {
        this.startX = x
        this.startY = y
    }
}

export type DrawElement = Line | Circle | Rect | null