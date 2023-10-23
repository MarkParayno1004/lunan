"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var action_types_1 = require("../action-types");
var initialState = {};
var reducer = function (state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case action_types_1.ActionType.UPDATE_UNREAD_MESSAGES:
            //get convo sid and messages to add from payload
            var _b = action.payload, channelSid = _b.channelSid, unreadCount = _b.unreadCount;
            //overwrite the channelSid unread count
            return Object.assign({}, state, (_a = {}, _a[channelSid] = unreadCount, _a));
        default:
            return state;
    }
};
exports.default = reducer;
