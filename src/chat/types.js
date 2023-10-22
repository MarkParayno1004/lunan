"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.InputType = exports.ActionName = void 0;
var ActionName;
(function (ActionName) {
    ActionName["Save"] = "Save";
    ActionName["Create"] = "Create";
    ActionName["Manage"] = "Manage";
})(ActionName || (exports.ActionName = ActionName = {}));
var InputType;
(function (InputType) {
    InputType["Text"] = "text";
    InputType["Password"] = "password";
})(InputType || (exports.InputType = InputType = {}));
var Content;
(function (Content) {
    Content["AddChat"] = "Add chat participant";
    Content["AddSMS"] = "Add SMS participant";
    Content["AddWhatsApp"] = "Add WhatsApp participant";
})(Content || (exports.Content = Content = {}));
