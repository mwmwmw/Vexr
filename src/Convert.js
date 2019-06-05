/**
 * Small library of converters needed for the various Vexr operations
 * @class Convert
 */

/**
 * @export const RadiansToDegrees = () =>  returns degrees you pass in as radians
 * @param radians {number}
 * @returns {number}
 */
export const RadiansToDegrees = (radians) => {
    return radians * (180 / Math.PI);
}

/**
 * @export const DegreesToRadians = () =>  returns returns radians you pass in as degrees
 * @param degrees {number}
 * @returns {number}
 */
export const DegreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

/**
 * MapRange takes a set of values and maps another set of values to that range.
 * @param value {number}
 * @param bottomA {number}
 * @param topA {number}
 * @param bottomB {number}
 * @param topB {number}
 * @returns {number}
 */
export const MapRange = (value, bottomA, topA, bottomB, topB) => {
    return bottomB + (topB - bottomB) * (value - bottomA) / (topA - bottomA);
}