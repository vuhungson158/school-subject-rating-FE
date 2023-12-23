import {DateString} from "../common/DateString";

export * from "./localStorage";

const SHA256 = require("crypto-js/sha256");

export const Util = {
    hash: (input: string) => SHA256(input).toString(),
    // formatDate: (date: DateString, dateFormat: [string, string, string]): string => {
    //     const year: number = date.getFullYear();
    //     const month: number = date.getMonth() + 1;
    //     const day: number = date.getDate();
    //     return `${year}${dateFormat[0]}/${month}${dateFormat[1]}/${day}${dateFormat[2]}`
    // },
    initDate: (): DateString => {
        const now: Date = new Date();
        return now.toISOString().split('T')[0] as DateString
    }
};
