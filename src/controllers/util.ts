export const d6 = () => Math.floor(Math.random() * 6) + 1;
export const d3 = () => (d6() % 3) + 1;

export const sortNumber = (a: number, b: number): number => {
    return a - b;
};
