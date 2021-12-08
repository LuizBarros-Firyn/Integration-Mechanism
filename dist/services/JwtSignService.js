"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtSecret_1 = __importDefault(require("../config/JwtSecret"));
const JwtSign = (claims) => {
    const authorizationKey = jsonwebtoken_1.default.sign({ claims }, JwtSecret_1.default || 'test', {
        expiresIn: 10000000
    });
    return authorizationKey;
};
exports.default = JwtSign;
