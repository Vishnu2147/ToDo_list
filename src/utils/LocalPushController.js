
import PushNotification, { PushNotificationObject } from 'react-native-push-notification'
import { useDispatch, useSelector } from 'react-redux'





export const LocalNotification = () => {

  // const dispatch = useDispatch
  PushNotification.createChannel(
    {
      channelId: "task", // (required)
      channelName: "My channel", // (required)

    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );




  PushNotification.localNotificationSchedule(
    
    {
    
    channelId: "task",
    // autoCancel: true,
    // bigText:
    //   'This is local notification demo in React Native app. Only shown, when expanded.',
    // subText: 'Local Notification Demo',
    // title: 'Local Notification Title',
    // message: 'Expand me to see more',
    // vibrate: true,
    // vibration: 300,
    // playSound: true,
    // soundName: 'default',
    // actions: '["Yes", "No"]'
    title: "hh",
    message: "hh",
    date: new Date(new Date().getTime() + 1000), // in 60 secs
    allowWhileIdle: false,
  })
}