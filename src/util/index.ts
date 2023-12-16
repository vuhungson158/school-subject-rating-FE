export * from "./localStorage";

const SHA256 = require("crypto-js/sha256");

export const Util = {
    hash: (input: string) => SHA256(input).toString(),
    formatDate: (date: Date, yearLabel: string, monthLabel: string, dayLabel: string): string => {
        date = new Date(date);
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1;
        const day: number = date.getDate();
        return `${year}${yearLabel}${month}${monthLabel}${day}${dayLabel}`
    }
};
