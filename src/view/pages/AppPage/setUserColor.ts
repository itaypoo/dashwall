

export const setUserColor = (baseHue: number) => {
    const darkest = hslToHex(baseHue, 100, 5)
    const darker = hslToHex(baseHue, 100, 20)
    const dark = hslToHex(baseHue, 100, 30)
    const normal = hslToHex(baseHue, 100, 50)
    const light = hslToHex(baseHue, 100, 70)
    const lighter = hslToHex(baseHue, 100, 80)
    const lightest = hslToHex(baseHue, 100, 90)

    document.body.style.setProperty('--user-color-darkest', darkest)
    document.body.style.setProperty('--user-color-darker', darker)
    document.body.style.setProperty('--user-color-dark', dark)
    document.body.style.setProperty('--user-color-normal', normal)
    document.body.style.setProperty('--user-color-light', light)
    document.body.style.setProperty('--user-color-lighter', lighter)
    document.body.style.setProperty('--user-color-lightest', lightest)
}

// hue - 0-360
// saturation - 0-100
// brightness - 0-100
function hslToHex(hue: number, saturation: number, lightness: number): string {
    lightness /= 100;
    const a = saturation * Math.min(lightness, 1 - lightness) / 100;
    const f = (n: number) => {
        const k = (n + hue / 30) % 12;
        const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}