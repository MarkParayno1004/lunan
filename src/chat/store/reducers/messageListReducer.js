"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = void 0;
var conversations_1 = require("@twilio/conversations");
var conversations_objects_1 = require("../../conversations-objects");
var action_types_1 = require("../action-types");
var MessageStatus;
(function (MessageStatus) {
  MessageStatus["Sending"] = "Sending";
  MessageStatus["Sent"] = "Sent";
  MessageStatus["Delivered"] = "Delivered";
  MessageStatus["Failed"] = "Failed";
  MessageStatus["None"] = "none (incoming)";
  MessageStatus["Read"] = "Read";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
var initialState = {};
var reduxifyMessage = function (message) {
  var _a, _b;
  return {
    sid: message.sid,
    index: message.index,
    body: message.body,
    author: message.author,
    participantSid: message.participantSid,
    attributes: message.attributes,
    dateCreated: message.dateCreated,
    aggregatedDeliveryReceipt: message.aggregatedDeliveryReceipt
      ? {
          total: message.aggregatedDeliveryReceipt.total,
          sent: message.aggregatedDeliveryReceipt.sent,
          delivered: message.aggregatedDeliveryReceipt.delivered,
          read: message.aggregatedDeliveryReceipt.read,
          undelivered: message.aggregatedDeliveryReceipt.undelivered,
          failed: message.aggregatedDeliveryReceipt.failed,
        }
      : null,
    attachedMedia:
      (_b =
        (_a = message.attachedMedia) === null || _a === void 0
          ? void 0
          : _a.map(function (el) {
              return {
                sid: el.sid,
                filename: el.filename,
                contentType: el.contentType,
                size: el.size,
                category: el.category,
              };
            })) !== null && _b !== void 0
        ? _b
        : null,
  };
};
var reducer = function (state, action) {
  var _a, _b, _c;
  var _d, _e, _f;
  if (state === void 0) {
    state = initialState;
  }
  switch (action.type) {
    case action_types_1.ActionType.PUSH_MESSAGES: {
      var _g = action.payload,
        channelSid = _g.channelSid,
        messagesToAdd = _g.messages;
      var existingMessages =
        (_d = state[channelSid]) !== null && _d !== void 0 ? _d : [];
      for (
        var _i = 0, messagesToAdd_1 = messagesToAdd;
        _i < messagesToAdd_1.length;
        _i++
      ) {
        var message = messagesToAdd_1[_i];
        conversations_objects_1.messagesMap.set(message.sid, message);
        if (message.attachedMedia) {
          message.attachedMedia.forEach(function (media) {
            conversations_objects_1.mediaMap.set(media.sid, media);
          });
        }
      }
      return Object.assign(
        {},
        state,
        ((_a = {}),
        (_a[channelSid] = existingMessages.concat(
          messagesToAdd.map(reduxifyMessage)
        )),
        _a)
      );
    }
    case action_types_1.ActionType.ADD_MESSAGES: {
      //get convo sid and messages to add from payload
      var _h = action.payload,
        channelSid = _h.channelSid,
        messagesToAdd_3 = _h.messages;
      //get existing messages for the convo
      var existingMessages =
        (_e = state[channelSid]) !== null && _e !== void 0 ? _e : [];
      var filteredExistingMessages = existingMessages.filter(function (
        message
      ) {
        return !messagesToAdd_3.find(function (value) {
          return (
            value.body === message.body &&
            value.author === message.author &&
            (message.index === -1 || value.index === message.index)
          );
        });
      });
      //add new messages to exisiting, ignore duplicates
      var messagesUnique = __spreadArray(
        __spreadArray([], filteredExistingMessages, true),
        messagesToAdd_3.map(reduxifyMessage),
        true
      );
      for (
        var _j = 0, messagesToAdd_2 = messagesToAdd_3;
        _j < messagesToAdd_2.length;
        _j++
      ) {
        var message = messagesToAdd_2[_j];
        if (message instanceof conversations_1.Message) {
          conversations_objects_1.messagesMap.set(message.sid, message);
          if (message.attachedMedia) {
            message.attachedMedia.forEach(function (media) {
              conversations_objects_1.mediaMap.set(media.sid, media);
            });
          }
        }
      }
      var sortedMessages = messagesUnique.sort(function (a, b) {
        return a.index - b.index;
      });
      //overwrite the channelSid messages
      return Object.assign(
        {},
        state,
        ((_b = {}), (_b[channelSid] = sortedMessages), _b)
      );
    }
    case action_types_1.ActionType.REMOVE_MESSAGES: {
      var _k = action.payload,
        channelSid = _k.channelSid,
        messagesToRemove_2 = _k.messages;
      var existingMessages =
        (_f = state[channelSid]) !== null && _f !== void 0 ? _f : [];
      var messages = existingMessages.filter(function (_a) {
        var index = _a.index;
        return !messagesToRemove_2.find(function (_a) {
          var messageIndex = _a.index;
          return messageIndex === index;
        });
      });
      for (
        var _l = 0, messagesToRemove_1 = messagesToRemove_2;
        _l < messagesToRemove_1.length;
        _l++
      ) {
        var message = messagesToRemove_1[_l];
        conversations_objects_1.messagesMap.delete(message.sid);
        if (message.attachedMedia) {
          message.attachedMedia.forEach(function (media) {
            conversations_objects_1.mediaMap.delete(media.sid);
          });
        }
      }
      return Object.assign(
        {},
        state,
        ((_c = {}), (_c[channelSid] = messages), _c)
      );
    }
    default:
      return state;
  }
};
exports.default = reducer;
