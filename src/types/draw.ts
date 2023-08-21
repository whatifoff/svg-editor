import {
    ENTITY_CURSOR_NAME,
    ENTITY_LINE_NAME,
    ENTITY_CIRCLE_NAME,
    ENTITY_RECT_NAME,

    DRAW_ELEMENT_STROKE_DEFAULT,
    DRAW_ELEMENT_STROKE_WIDTH_DEFAULT,
    DRAW_ELEMENT_SELECTED_DEFAULT,

    END_POINT_WIDTH_DEFAULT,
    END_POINT_HEIGHT_DEFAULT,
    END_POINT_STROKE_DEFAULT,
    END_POINT_STROKE_WIDTH_DEFAULT
} from '@/const'
import type { Color } from '.'

export type DrawElementType = typeof ENTITY_CURSOR_NAME
    | typeof ENTITY_LINE_NAME
    | typeof ENTITY_CIRCLE_NAME
    | typeof ENTITY_RECT_NAME

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
