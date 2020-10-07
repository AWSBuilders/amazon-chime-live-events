import React from 'react';

import Attendee from '../Attendee';
import Controls from '../Controls';
import MeetingStatusProvider from './MeetingStatusProvider';
import RosterProvider from '../../providers/RosterProvider';
import { ContentShareProvider } from '../../providers/ContentShareProvider';
//import { LiveAttendeesProvider } from "../../providers/LiveAttendeesProvider";
//import { VideoTileProvider } from "../../providers/VideoTileProvider";
import { LocalTileProvider } from '../../providers/LocalTileProvider';

const MeetingView = () => (
  <MeetingStatusProvider joinMuted>
    <RosterProvider>
      <LocalTileProvider>
        <ContentShareProvider>
          <Attendee
            controls={
              <Controls
                allowAudioControls
                allowVideoControls
                allowLeave
                allowEnd
              />
            }
            fullScreenVideo
          />
        </ContentShareProvider>
      </LocalTileProvider>
    </RosterProvider>
  </MeetingStatusProvider>
);

export default MeetingView;
