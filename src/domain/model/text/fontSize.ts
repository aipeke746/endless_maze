/**
 * 文字の大きさ
 */
export const FontSize = {
    Large: 50,
    Normal: 30,
    Small: 23,
};

export type FontSize = (typeof FontSize)[keyof typeof FontSize]; // eslint-disable-line
