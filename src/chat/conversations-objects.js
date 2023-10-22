"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdkParticipantObject = exports.getSdkMediaObject = exports.getSdkUserObject = exports.getSdkMessageObject = exports.getSdkConversationObject = exports.participantsMap = exports.mediaMap = exports.usersMap = exports.messagesMap = exports.conversationsMap = void 0;
exports.conversationsMap = new Map();
exports.messagesMap = new Map();
exports.usersMap = new Map();
exports.mediaMap = new Map();
exports.participantsMap = new Map();
var capitalize = function (string) {
    return "".concat(string[0].toUpperCase()).concat(string.substring(1));
};
var getSdkObject = function (objectMap, sid, type) {
    var sdkObject = objectMap.get(sid);
    if (!sdkObject) {
        throw new Error("".concat(capitalize(type), " with SID ").concat(sid, " was not found."));
    }
    return sdkObject;
};
var getSdkConversationObject = function (reduxConversation) {
    return getSdkObject(exports.conversationsMap, reduxConversation.sid, "conversation");
};
exports.getSdkConversationObject = getSdkConversationObject;
var getSdkMessageObject = function (reduxMessage) {
    return getSdkObject(exports.messagesMap, reduxMessage.sid, "message");
};
exports.getSdkMessageObject = getSdkMessageObject;
var getSdkUserObject = function (reduxUser) {
    return getSdkObject(exports.usersMap, reduxUser.identity, "user");
};
exports.getSdkUserObject = getSdkUserObject;
var getSdkMediaObject = function (reduxMedia) {
    return getSdkObject(exports.mediaMap, reduxMedia.sid, "media");
};
exports.getSdkMediaObject = getSdkMediaObject;
var getSdkParticipantObject = function (reduxParticipant) {
    return getSdkObject(exports.participantsMap, reduxParticipant.sid, "participant");
};
exports.getSdkParticipantObject = getSdkParticipantObject;
