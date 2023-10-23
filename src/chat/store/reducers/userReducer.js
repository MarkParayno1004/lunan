"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var action_types_1 = require("../action-types");
var conversations_objects_1 = require("../../conversations-objects");
var initialState = {};
var reduxifyUser = function (user) {
    var _a;
    return ({
        identity: user.identity,
        friendlyName: (_a = user.friendlyName) !== null && _a !== void 0 ? _a : "",
    });
};
var reducer = function (state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case action_types_1.ActionType.UPDATE_USER:
            var user = action.payload;
            conversations_objects_1.usersMap.set(user.identity, user);
            return __assign(__assign({}, state), (_a = {}, _a[user.identity] = reduxifyUser(user), _a));
        default:
            return state;
    }
};
exports.default = reducer;
