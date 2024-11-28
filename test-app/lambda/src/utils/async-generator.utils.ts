export function map<T, R>(mapper: (item: T, index: number) => R | Promise<R>) {
    return (items: AsyncGenerator<T, void, undefined>) => map_(items, mapper);
}

async function* map_<T, R>(
    items: AsyncGenerator<T, void, undefined>,
    mapper: (item: T, index: number) => R | Promise<R>
): AsyncGenerator<R, void, undefined> {
    let index: number = 0;
    for await (const item of items) {
        yield await mapper(item, index++);
    }
}

export function flatMap<T, R>(mapper: (item: T) => R[] | Promise<R[]>) {
    return (items: AsyncGenerator<T, void, undefined>) =>
        flatMap_(items, mapper);
}

async function* flatMap_<T, R>(
    items: AsyncGenerator<T, void, undefined>,
    mapper: (item: T) => R[] | Promise<R[]>
): AsyncGenerator<R, void, undefined> {
    for await (const item of items) {
        for (const flatItem of await mapper(item)) {
            yield flatItem;
        }
    }
}

export function forEach<T>(action: (item: T) => void | Promise<void>) {
    return (items: AsyncGenerator<T, void, undefined>) =>
        forEach_(items, action);
}

async function* forEach_<T>(
    items: AsyncGenerator<T, void, undefined>,
    action: (item: T) => void | Promise<void>
) {
    for await (const item of items) {
        await action(item);
    }
}

export function filter<T>(filter: (item: T) => boolean | Promise<boolean>) {
    return (items: AsyncGenerator<T, void, undefined>) =>
        filter_(items, filter);
}

async function* filter_<T>(
    items: AsyncGenerator<T, void, undefined>,
    filter: (item: T) => boolean | Promise<boolean>
): AsyncGenerator<T, void, undefined> {
    for await (const item of items) {
        if (await filter(item)) {
            yield item;
        }
    }
}

export function peek<T>(action: (item: T) => void | Promise<void>) {
    return (items: AsyncGenerator<T, void, undefined>) => peek_(items, action);
}

async function* peek_<T>(
    items: AsyncGenerator<T, void, undefined>,
    action: (item: T) => void | Promise<void>
): AsyncGenerator<T, void, undefined> {
    for await (const item of items) {
        await action(item);
        yield item;
    }
}

export function toArray<T>() {
    return (items: AsyncGenerator<T, void, undefined>) => toArray_(items);
}

async function toArray_<T>(items: AsyncGenerator<T, void, undefined>) {
    const array: T[] = [];
    for await (const item of items) {
        array.push(item);
    }
    return array;
}

export function toMap<T, R>(key: (item: T) => R | Promise<R>) {
    return (items: AsyncGenerator<T, void, undefined>) => toMap_(items, key);
}

async function toMap_<T, R>(
    items: AsyncGenerator<T, void, undefined>,
    key: (item: T) => R | Promise<R>
) {
    const map = new Map<R, T>();
    for await (const item of items) {
        map.set(await key(item), item);
    }
    return map;
}
