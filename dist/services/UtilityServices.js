"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha3Factory = void 0;
const sha3_1 = require("sha3");
const Sha3Factory = (string) => {
    const hash = new sha3_1.SHA3(512);
    return hash.update(string).digest('hex');
};
exports.Sha3Factory = Sha3Factory;
