"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var action_types_1 = require("../action-types");
var initialState = "";
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case action_types_1.ActionType.LOGIN:
            return action.payload;
        default:
            return state;
    }
};
exports.default = reducer;
