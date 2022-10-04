import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Globalstylesheet from '../utils/Globalstylesheet'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import PushNotification from 'react-native-push-notification';


export default function Splash({ navigation }) {
  const alltask = useSelector((state) => state.addtask.task)
  useEffect(() => {
    // createChannels();
    setTimeout(() => {
      navigation.replace("My Tasks")
    }, 2000);
  }, [])

  //   const createChannels = () => {
  //     PushNotification.createChannel(
  //         {
  //             channelId: "task-channel",
  //             channelName: "Task Channel"
  //         }
  //     )
  // }
  return (
    <View style={[Globalstylesheet.body, styles.body]}>
      <Image
        source={require('../assests/check-list.png')}
        style={[Globalstylesheet.logo]}
      />
      <Text style={Globalstylesheet.logotxt}>Vishnu's Todo-List</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'teal',

  },


})