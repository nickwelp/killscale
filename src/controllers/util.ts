export const d6 = () => Math.floor(Math.random() * 6) + 1;
export const d3 = () => (d6() % 3) + 1;

export const sortNumber = (a: number, b: number): number => {
    return a - b;
};

export const decodeRollsForSavingState = (a: string) => {
    switch (a) {
        case 'd6':
            return () => d6();
        case 'd3':
            return () => d3();
        default:
            return () => parseInt(a, 10);
    }
};