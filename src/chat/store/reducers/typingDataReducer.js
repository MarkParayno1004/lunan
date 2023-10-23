"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var action_types_1 = require("../action-types");
var initialState = {};
var reducer = function (state, action) {
    var _a, _b;
    var _c, _d;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case action_types_1.ActionType.TYPING_STARTED: {
            var _e = action.payload, channelSid = _e.channelSid, participant = _e.participant;
            var existedUsers = (_c = state[channelSid]) !== null && _c !== void 0 ? _c : [];
            existedUsers.push(participant);
            return Object.assign({}, state, (_a = {}, _a[channelSid] = (0, lodash_1.uniq)(existedUsers), _a));
        }
        case action_types_1.ActionType.TYPING_ENDED: {
            var _f = action.payload, channelSid = _f.channelSid, participant_1 = _f.participant;
            var filteredUsers = ((_d = state[channelSid]) !== null && _d !== void 0 ? _d : []).filter(function (user) { return user !== participant_1; });
            return Object.assign({}, state, (_b = {}, _b[channelSid] = filteredUsers, _b));
        }
        default:
            return state;
    }
};
exports.default = reducer;
