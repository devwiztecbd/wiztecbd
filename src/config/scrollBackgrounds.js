// Shared with the home page so scroll transitions use the same site palette.
export const SCROLL_BACKGROUNDS = Object.freeze({
    green: "#8BC240",
    dark: "#55594C",
    light: "#F8F9FB",
});

export const resolveScrollBackground = (color, fallback = SCROLL_BACKGROUNDS.light) =>
    Object.values(SCROLL_BACKGROUNDS).includes(color) ? color : fallback;
