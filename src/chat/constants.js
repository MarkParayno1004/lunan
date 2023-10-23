"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_MESSAGE_LINE_WIDTH = exports.NOTIFICATION_LEVEL = exports.CONVERSATION_PAGE_SIZE = exports.USER_PROFILE_MESSAGES = exports.PARTICIPANT_MESSAGES = exports.CONVERSATION_MESSAGES = exports.ERROR_MODAL_MESSAGES = exports.NOTIFICATION_TIMEOUT = exports.CONNECTION_ERROR_MESSAGE = exports.COPY_SUCCESS_MESSAGE = exports.MAX_FILE_SIZE = exports.SMS_PREFIX = exports.WHATSAPP_PREFIX = void 0;
exports.WHATSAPP_PREFIX = "whatsapp:+";
exports.SMS_PREFIX = "+";
exports.MAX_FILE_SIZE = 52428800;
exports.COPY_SUCCESS_MESSAGE = "Message copied.";
exports.CONNECTION_ERROR_MESSAGE = "No internet connection.";
exports.NOTIFICATION_TIMEOUT = 4000;
exports.ERROR_MODAL_MESSAGES = {
    ADD_PARTICIPANT: {
        title: "Unable to add participant",
        description: "There is an error while adding participant to conversation",
    },
    CHANGE_CONVERSATION_NAME: {
        title: "Unable to save Conversation name",
        description: "Only creators of the Conversation can edit the Conversation name.",
    },
};
exports.CONVERSATION_MESSAGES = {
    CREATED: "Conversation created.",
    NAME_CHANGED: "Conversation name changed.",
    LEFT: "You left the conversation.",
};
exports.PARTICIPANT_MESSAGES = {
    ADDED: "Participant added.",
    REMOVED: "Participant removed.",
};
exports.USER_PROFILE_MESSAGES = {
    FRIENDLY_NAME_UPDATED: "User profile friendly name updated.",
};
exports.CONVERSATION_PAGE_SIZE = 30;
exports.NOTIFICATION_LEVEL = {
    DEFAULT: "default",
    MUTED: "muted",
};
exports.MAX_MESSAGE_LINE_WIDTH = 75;
