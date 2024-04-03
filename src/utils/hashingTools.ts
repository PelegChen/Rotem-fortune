export const veryBasicHash = (str: string) =>
    str.split("").reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0);

export const basicHashToInt = (hash: number, maxInt: number = 100) =>
    Math.abs(((hash / maxInt) % 1) * maxInt) | 0;



