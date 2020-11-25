import React, { useState, useEffect, createContext, FunctionComponent } from 'react';


export const NotificationContext = createContext({
  supportNotificatoin: false,
  sendNotification: (message: string): Notification | undefined => { return undefined; }
})
export const NotificationContextProvider: FunctionComponent = (props) => {
  const [supportNoti, setSupportNoti] = useState<boolean>(false);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          setSupportNoti(true);
        }
      });
    }
  }, []);

  const sendNoti = supportNoti ?
    (message: string) => { return new Notification(message); } :
    (message: string) => { return undefined; };

  return (
    <NotificationContext.Provider value={{
      supportNotificatoin: supportNoti,
      sendNotification: sendNoti
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
}


