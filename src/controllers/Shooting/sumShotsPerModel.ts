const sumShotsPerModel = (a: () => number, modelCount: number): number => {
    let sum = 0;
    for (let i = 0; i < modelCount; i++) {
        sum += a();
    }
    return sum;
};

export default sumShotsPerModel;