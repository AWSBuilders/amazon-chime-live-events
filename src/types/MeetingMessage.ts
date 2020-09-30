export enum MessageType {
  MUTE = "mute",
  UNMUTE = "unmute",
  DISABLE_VIDEO = "disable-video",
  ENABLE_VIDEO = "enable-video",
  TRANSFER_MEETING = "transfer-meeting",
  LIVE_VIDEO_FEEDS = "live-video-feeds",
  KICK = "kick",
  INIT_ATTENDEE = "init-attendee",
  CHAT = "chat-message"
}

export type AttendeeInstructionMessage = {
  targetAttendeeId: string;
};

export type LiveEventAttendeeSetupMessage = {
  liveEventAttendeeId: string;
};
export type LiveVideoFeedsMessage = string[];
export type ChatMessagePayload = any;

export type TransferMeetingMessage = {
  meetingId: string;
} & AttendeeInstructionMessage;

export type MessagePayload =
  | TransferMeetingMessage
  | LiveVideoFeedsMessage
  | AttendeeInstructionMessage
  | ChatMessagePayload
  | LiveEventAttendeeSetupMessage;

export type Message = {
  type: MessageType;
  payload?: MessagePayload;
  timestampMs?: number;
  name?: string;
};
