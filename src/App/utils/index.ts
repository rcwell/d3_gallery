
export const randomNum = (min: number, max: number) => Math.floor(Math.random() * max) + min;
export const getEnumKeys = <T extends object>(e: T): string[] =>
    Object.values(e)
        .filter(value => typeof value === 'string');

export const getEnumKeyValues = <T extends {}>(e: {}): T[] =>
    Object.values(e)
        .filter(value => typeof value === 'string') as T[]