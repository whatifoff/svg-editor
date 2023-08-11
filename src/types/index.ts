import { Line } from './line'
import { Circle } from './circle'
import { Rect } from './rect'

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

export type DrawElement = Line | Circle | Rect | null