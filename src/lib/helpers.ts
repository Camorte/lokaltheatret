export const parseToDate = (date: string) => new Date(date);

export const assertIsNode = (e: EventTarget | null) => {
    if (!e || !('nodeType' in e)) {
        throw new Error(`Node expected`);
    }
};
