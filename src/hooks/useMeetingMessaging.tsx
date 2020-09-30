import { useContext, useEffect } from 'react';

import getChimeContext from '../context/getChimeContext';
import getMeetingStatusContext from '../context/getMeetingStatusContext';
import { ChimeSdkWrapper } from '../providers/ChimeProvider';
import MeetingStatus from '../enums/MeetingStatus';

const useMeetingMessaging = () => {
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const { meetingStatus } = useContext(getMeetingStatusContext());

  useEffect(() => {
    console.log("useMeetingMessaging???");
    if (meetingStatus !== MeetingStatus.Succeeded) {
      console.log("useMeetingMessaging??? return");

      return;
    }

    const joinRoomMessaging = async () => {
      await chime?.joinRoomMessaging();
    };
    joinRoomMessaging();
  }, [meetingStatus]);
};

export default useMeetingMessaging;
