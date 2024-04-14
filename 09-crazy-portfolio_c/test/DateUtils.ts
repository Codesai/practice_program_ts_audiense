export function createUTCDateFrom(dateAsString: string): Date {
    const [year, month, day] = dateAsString.split("/");
    if ([year, month, day].some((value) => value === undefined)) {
        throw new Error("wrong date");
    }
    return createUTCDate(year, month, day);
}

export function createUTCDate(year: string, month: string, day: string): Date {
    return new Date(
        Date.UTC(
            Number.parseInt(year),
            Number.parseInt(month) - 1,
            Number.parseInt(day),
            0, 0, 0, 0));
}