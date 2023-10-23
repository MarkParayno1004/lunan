import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

import { useToaster } from "@twilio-paste/core";
import { Toaster } from "@twilio-paste/toast";

import { actionCreators } from "../store";

const Notifications = () => {
  const toaster = useToaster();
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const { removeNotifications } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!notifications.length) {
      return;
    }
    notifications.forEach((notification) => toaster.push(notification));
    removeNotifications(notifications.length);
  }, [notifications]);

  return <Toaster {...toaster} />;
};

export default Notifications;
