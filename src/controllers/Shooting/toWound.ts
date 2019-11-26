const toWound = (toughness: number, strength: number) => {
    if (toughness === strength) return 4;
    else if (toughness >= strength * 2) return 6;
    else if (toughness > strength) return 5;
    else if (toughness <= strength * 2) return 2;
    else if (toughness < strength) return 3;
    return 100;
};
export default toWound;