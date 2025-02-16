"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const index_js_1 = __importDefault(require("../contexts/index.js"));
const useOperations = (signalName) => {
    // Get Global Context
    const { signals } = (0, react_1.useContext)(index_js_1.default);
    if (!signalName || typeof signalName !== 'string') {
        throw new Error('Provide a signalName as a first argument of useOperations');
    }
    const handleFormatOperations = () => {
        const signal = signals.find((signal) => signal.name === signalName);
        if (!signal)
            throw new Error(`Signal ${signalName} not found`);
        // Get actions
        const nonFormattedOperations = signal.operations;
        // Formatted actions
        const formattedOperations = {};
        for (const operation of nonFormattedOperations) {
            // Get action name
            const operationName = operation.type.split('/')[1];
            formattedOperations[operationName] = (payload) => {
                return operation.handler(signal.state, payload);
            };
        }
        // return formattedOperations;
        return formattedOperations;
    };
    return handleFormatOperations();
};
// Définir un type générique pour représenter une fonction
// type FunctionType<T extends (payload: any) => any> = T;
// Définir un type générique pour représenter un objet contenant des fonctions
// type FunctionObject<T> = {
//   [K in keyof T]: T[K] extends Function ? FunctionType<T[K]> : never;
// };
// type FunctionObject<T> = {
//   [K in keyof T]: T[K] extends (payload: infer Arg) => infer R
//     ? (payload: Arg) => R
//     : (payload?: any) => any;
// };
// // Utilisation d'une fonction auxiliaire pour extraire le type du second paramètre
// type SecondParamType<T> = T extends (a: any, b: infer P) => any ? P : any;
// // Utilisation d'une fonction auxiliaire pour extraire le type de retour d'une fonction
// type ReturnTypeFunc<T> = T extends (...args: any[]) => infer R ? R : any;
exports.default = useOperations;
//# sourceMappingURL=useOperations.js.map