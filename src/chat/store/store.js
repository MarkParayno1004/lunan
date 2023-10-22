"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var redux_thunk_1 = require("redux-thunk");
exports.store = (0, redux_1.createStore)(reducers_1.default, reducers_1.initialState, (0, redux_1.applyMiddleware)(redux_thunk_1.default));
