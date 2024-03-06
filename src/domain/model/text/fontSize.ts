/**
 * 文字の大きさ
 */
export const FontSize = {
    Large: 50,
    Normal: 30,
    Small: 20,
};

export type FontSize = (typeof FontSize)[keyof typeof FontSize]; // eslint-disable-line
