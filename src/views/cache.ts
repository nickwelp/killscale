export const cacheFunction = (a: (b: any) => any, data: any): any => {
    const cache = {};
    return () => {
        const hash: string = JSON.stringify(data);
        // @ts-ignore
        if (cache[hash]) {
            // @ts-ignore
            return cache[hash];
        } else {
            const val = a.apply(null, data);
            // @ts-ignore
            cache[hash] = val;
            return val;
        }
    }

};