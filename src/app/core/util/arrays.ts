// shuffles array in place
export function shuffleArray<T>(arr: T[]): void {
    for (let i = 0; i < arr.length; i++) {
        const pick = i + nextNumber(arr.length - i);
        // And swap it with the current element.
        const tmp = arr[i];
        arr[i] = arr[pick];
        arr[pick] = tmp;
    }
}

function nextNumber(max: number): number {
    return Math.floor(Math.random() * max);
}