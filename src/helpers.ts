import {
    SMALL_GRID_WIDTH_DEFAULT,
    SMALL_GRID_HEIGHT_DEFAULT,
} from './const'

// TODO: брать величины сторон сетки из настроек, а не по умолчанию
export const getMagnetCoord = (x: number, y: number, magnet: boolean): { x: number, y: number } => {
    if (!magnet) return { x, y }

    const deltaX = x % SMALL_GRID_WIDTH_DEFAULT
    const deltaY = y % SMALL_GRID_HEIGHT_DEFAULT

    return {
        x: deltaX < SMALL_GRID_WIDTH_DEFAULT / 2 ? x - deltaX : x + (SMALL_GRID_WIDTH_DEFAULT - deltaX),
        y: deltaY < SMALL_GRID_HEIGHT_DEFAULT / 2 ? y - deltaY : y + (SMALL_GRID_HEIGHT_DEFAULT - deltaY)
    }
}
