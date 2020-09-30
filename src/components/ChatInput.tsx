// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import classNames from "classnames/bind";
import React, { useContext, useState } from "react";

import getChimeContext from "../context/getChimeContext";
import styles from "./ChatInput.css";
import { ChimeSdkWrapper } from "../providers/ChimeProvider";
import { MessageType } from "../types/MeetingMessage";
//import getOneOnOneAttendeeContext from "../context/getOneOnOneAttendeeContext";

const cx = classNames.bind(styles);

export default React.memo(function ChatInput() {
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const [inputText, setInputText] = useState("");
  //const rosterAttendee = useContext(getOneOnOneAttendeeContext());
  //const attendeeId = rosterAttendee?.id;

  return (
    <div className={cx("chatInput")}>
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
        className={cx("form")}
      >
        <input
          className={cx("input")}
          value={inputText}
          onChange={event => {
            setInputText(event.target.value);
          }}
          onKeyUp={event => {
            event.preventDefault();

            if (event.keyCode === 13) {
              const sendingMessage = inputText.trim();
              const attendeeId = chime?.configuration?.credentials?.attendeeId;
              console.log("attendeeId???= ", attendeeId);
              if (sendingMessage !== "" && attendeeId) {
                chime?.sendMessage(MessageType.CHAT, {
                  targetAttendeeId: attendeeId,
                  message: sendingMessage
                });
                setInputText("");
              }
            }
          }}
        />
      </form>
    </div>
  );
});
