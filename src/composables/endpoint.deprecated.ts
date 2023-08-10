import { type DrawElement, Line, Circle, Rect } from '@/types'
import {
    END_POINT_WIDTH_DEFAULT,
    END_POINT_HEIGHT_DEFAULT,
    END_POINT_STROKE_DEFAULT,
    END_POINT_STROKE_WIDTH_DEFAULT
} from '@/const'

const getFirstEndPointX = (el: DrawElement) => {
    if (el === null) return

    if (el instanceof Line) return el.x1 - END_POINT_WIDTH_DEFAULT / 2

    if (el instanceof Circle) return el.cx - END_POINT_WIDTH_DEFAULT / 2

    if (el instanceof Rect) return el.x - END_POINT_WIDTH_DEFAULT / 2
}

const getFirstEndPointY = (el: DrawElement) => {
    if (el === null) return

    if (el instanceof Line) return el.y1 - END_POINT_HEIGHT_DEFAULT / 2

    if (el instanceof Circle) return el.cy - END_POINT_HEIGHT_DEFAULT / 2

    if (el instanceof Rect) return el.y - END_POINT_HEIGHT_DEFAULT / 2
}

const getSecondEndPointX = (el: DrawElement) => {
    if (el === null) return

    if (el instanceof Line) return el.x2 - END_POINT_WIDTH_DEFAULT / 2

    if (el instanceof Circle) return el.cx + el.r - END_POINT_WIDTH_DEFAULT / 2

    if (el instanceof Rect) return el.x + el.width - END_POINT_WIDTH_DEFAULT / 2
}

const getSecondEndPointY = (el: DrawElement) => {
    if (el === null) return

    if (el instanceof Line) return el.y2 - END_POINT_HEIGHT_DEFAULT / 2

    if (el instanceof Circle) return el.cy - END_POINT_HEIGHT_DEFAULT / 2

    if (el instanceof Rect) return el.y + el.height - END_POINT_HEIGHT_DEFAULT / 2
}

// TODO: в дальнейшем брать из настроек
const getEndPointWidth = () => {
    return END_POINT_WIDTH_DEFAULT
}

// TODO: в дальнейшем брать из настроек
const getEndPointHeight = () => {
    return END_POINT_HEIGHT_DEFAULT
}

// TODO: в дальнейшем брать из настроек
const getEndPointStroke = () => {
    return END_POINT_STROKE_DEFAULT
}

// TODO: в дальнейшем брать из настроек
const getEndPointStrokeWidth = () => {
    return END_POINT_STROKE_WIDTH_DEFAULT
}

export const useEndPoints = () => {
    return {
        getFirstEndPointX,
        getFirstEndPointY,
        getEndPointWidth,
        getEndPointHeight,
        getSecondEndPointX,
        getSecondEndPointY,
        getEndPointStroke,
        getEndPointStrokeWidth
    }
}