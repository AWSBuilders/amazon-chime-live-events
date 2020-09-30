// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import classNames from "classnames/bind";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";

import getChimeContext from "../context/getChimeContext";
import styles from "./Chat.css";
import ChatInput from "./ChatInput";
import { ChimeSdkWrapper } from "../providers/ChimeProvider";
import { Message } from "../types/MeetingMessage";
//import getMeetingStatusContext from "../context/getMeetingStatusContext";
//import MeetingStatus from "../enums/MeetingStatus";

const cx = classNames.bind(styles);

export default function Chat() {
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomElement = useRef(null);
  //const { meetingStatus } = useContext(getMeetingStatusContext());
  /*
  useEffect(() => {
    if (meetingStatus !== MeetingStatus.Succeeded) {
      console.log("Chat return???");

      return;
    }
    const joinRoomMessaging = async () => {
      await chime?.joinRoomMessaging();
    };
    joinRoomMessaging();
  }, []);
*/
  useEffect(() => {
    const realTimeMessages: Message[] = [];
    const callback = (message: Message) => {
      console.log("chat-massage???v", message);

      if (message.name && message.type === "chat-message") {
        console.log("chat-massage???push");

        realTimeMessages.push(message);
        setMessages(realTimeMessages.slice() as Message[]);
      }
    };
    chime?.subscribeToMessageUpdate(callback);
    return () => {
      chime?.unsubscribeFromMessageUpdate(callback);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ((bottomElement.current as unknown) as HTMLDivElement).scrollIntoView({
        behavior: "smooth"
      });
    }, 10);
  }, [messages]);

  return (
    <div className={cx("chat")}>
      <div className={cx("messages")}>
        {messages.map(message => {
          console.log("message ???? = ", message.payload.message);

          let messageString;
          if (message.type === "chat-message") {
            messageString = message.payload.message;
          }
          {
            console.log("messageString =-", messageString);
          }
          return (
            <div
              key={message.timestampMs}
              className={cx("messageWrapper", { raiseHand: false })}
            >
              <div className={cx("senderWrapper")}>
                <div className={cx("senderName")}>{message.name}</div>
                <div className={cx("date")}>
                  {moment(message.timestampMs).format("h:mm A")}
                </div>
              </div>
              <div className={cx("message")}>{messageString}</div>
            </div>
          );
        })}
        <div className="bottom" ref={bottomElement} />
      </div>
      <div className={cx("chatInput")}>
        <ChatInput />
      </div>
    </div>
  );
}
