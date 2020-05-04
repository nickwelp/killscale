
export const chartColors = (l: number, i: number) => {
    const col = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
    const sc = col.length / l;
    return col[Math.round(sc * i) % col.length];
}
