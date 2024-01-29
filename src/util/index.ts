import {DateString} from "../common/DateString";

export * from "./localStorage";

const SHA256 = require("crypto-js/sha256");

export const Util = {
    hash: (input: string) => SHA256(input).toString(),
    initDate: (): DateString => {
        const now: Date = new Date();
        return now.toISOString().split('T')[0] as DateString
    },
    convertArrayToObject:
        <K extends string, V extends R[K], R extends Record<K, V>>
        (array: ReadonlyArray<K>, mapper: (value: K) => V): R => {
            return array.reduce((map: R, key: K) => {
                map[key] = mapper(key);
                return map;
            }, {} as R);
        }
};
