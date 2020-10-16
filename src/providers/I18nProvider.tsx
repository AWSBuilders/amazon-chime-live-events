import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import enUS from "../i18n/en-US";
import koKR from "../i18n/ko-KR";

const DEFAULT_LOCALE = 'en-US';

const messages = {
  enUS,
  koKR
};

type Props = {
  children: ReactNode;
};

let msg = messages.koKR;
if (navigator.language === "ko-KR") {
  msg = messages.koKR;
} else {
  msg = messages.enUS;
}

export default function I18nProvider(props: Props) {
  const { children } = props;
  return (
    <IntlProvider
      locale={
        (navigator.languages && navigator.languages[0]) || navigator.language
      }
      defaultLocale={navigator.language}
      messages={msg}
    >
      {children}
    </IntlProvider>
  );
}
