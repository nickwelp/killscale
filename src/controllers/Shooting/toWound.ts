const toWound = (toughness: number, strength: number) => {
    if (toughness === strength) return 4;
    else if (toughness >= (strength * 2)) return 6;
    else if (toughness > strength) return 5;
    else if ((toughness * 2) <= strength) return 2;
    else if (toughness < strength) return 3;
    throw new Error("To Wound Chart arguements are invalid");
};
export default toWound;
