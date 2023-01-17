export * from "./localStorage";

var SHA256 = require("crypto-js/sha256");

export const Util = {
  hash: (input: string) => SHA256(input).toString(),
};
