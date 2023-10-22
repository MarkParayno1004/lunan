"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conversations_objects_1 = require("../../conversations-objects");
var action_types_1 = require("../action-types");
var initialState = {};
var reduxifyParticipant = function (participant) {
  return {
    sid: participant.sid,
    attributes: participant.attributes,
    identity: participant.identity,
    type: participant.type,
    lastReadMessageIndex: participant.lastReadMessageIndex,
  };
};
var reducer = function (state, action) {
  var _a;
  if (state === void 0) {
    state = initialState;
  }
  switch (action.type) {
    case action_types_1.ActionType.UPDATE_PARTICIPANTS:
      var _b = action.payload,
        participants = _b.participants,
        sid = _b.sid;
      for (
        var _i = 0, participants_1 = participants;
        _i < participants_1.length;
        _i++
      ) {
        var participant = participants_1[_i];
        conversations_objects_1.participantsMap.set(
          participant.sid,
          participant
        );
      }
      return Object.assign(
        {},
        state,
        ((_a = {}), (_a[sid] = participants.map(reduxifyParticipant)), _a)
      );
    default:
      return state;
  }
};
exports.default = reducer;
