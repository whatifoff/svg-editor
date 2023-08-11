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
import type { Color } from '.'

export type DrawElementType = typeof EVENT_NAME_FOR_NAV_BUTTON_CURSOR
    | typeof EVENT_NAME_FOR_NAV_BUTTON_LINE
    | typeof EVENT_NAME_FOR_NAV_BUTTON_CIRCLE
    | typeof EVENT_NAME_FOR_NAV_BUTTON_RECT

export class EndPoint {
    width: number = END_POINT_WIDTH_DEFAULT
    height: number = END_POINT_HEIGHT_DEFAULT
    stroke: string = END_POINT_STROKE_DEFAULT
    strokeWidth: number = END_POINT_STROKE_WIDTH_DEFAULT

    constructor(public x: number, public y: number) { }
}

export interface IDrawElement {
    id: number
    type: DrawElementType
    stroke: Color
    strokeWidth: number
    selected: boolean

    endPoints: Array<EndPoint>

    move: (x: number, y: number, magnetValue: boolean) => void
}

export abstract class DrawElementBase implements IDrawElement {
    id: number = Date.now()
    stroke: Color = DRAW_ELEMENT_STROKE_DEFAULT
    strokeWidth: number = DRAW_ELEMENT_STROKE_WIDTH_DEFAULT
    selected: boolean = DRAW_ELEMENT_SELECTED_DEFAULT
    endPoints: EndPoint[] = [];

    constructor(public type: DrawElementType) { }

    abstract move (offsetX: number, offsetY: number, magnetValue: boolean): void
}
