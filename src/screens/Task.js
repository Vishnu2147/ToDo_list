import { StyleSheet, Text, Modal, View, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { counterActions } from '../redux/CounterSlice'
import CheckBox from "@react-native-community/checkbox"
// import CheckBox from 'react-native-check-box'
import PushNotification from 'react-native-push-notification'
import { LocalNotification } from '../utils/LocalPushController'


export default function Task({ navigation, route }) {

    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const [done, setdone] = useState(false)
    const [color, setcolor] = useState("white")
    const [bellTime, setBellTime] = useState('1');
    const [showBellModal, setShowBellModal] = useState(false);

    const gotTask = route.params
    console.log("gotTask", gotTask)


    const dispatch = useDispatch();
    const taskid = useSelector((state) => state.addtask.taskid)
    const alltask = useSelector((state) => state.addtask.task)
    useEffect(() => {
        getTask();
    }, [])

    const getTask = () => {
        if (gotTask) {
            settitle(gotTask.Title)
            setdesc(gotTask.Desc)
            setdone(gotTask.Done)
            setcolor(gotTask.Color)
        }
    }


    const setTaskAlarm = () => {
        if(title.length > 0){
            console.log("sdsf")
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
            title: title,
            message: desc,
            date: new Date(new Date().getTime() + parseInt(bellTime) * 60 * 1000), // in 60 secs
            allowWhileIdle: false,
          })
        }
        else{
            Alert.alert( "Attention !","please fill the title")
        }
    }

    const set_task = () => {
        if (title.length == 0) {
            Alert.alert("warning!", "please give it a title")
        } else {
            try {
                var Task = {
                    ID: taskid,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color
                }
                // console.log(Task)
                let index = -1
                if (gotTask) {
                    index = alltask.findIndex(task => task.ID == gotTask.ID)
                }

                // console.log("gotTask.ID",gotTask.ID)
                // console.log("index",index)
                // let newtask = [...alltask,Task]


                let newtask = [];
                if (index > -1) {
                    newtask = [...alltask];
                    newtask[index] = Task;
                } else {
                    newtask = [...alltask, Task];
                }




                AsyncStorage.setItem('Tasks', JSON.stringify(newtask))
                    .then(() => {
                        dispatch(counterActions.settask(newtask))
                        Alert.alert("Success", "saved successfully"),
                        
                            navigation.goBack()
console.log("alltask",alltask)

                    })

                    .catch(err => { console.log(err) })

            } catch (error) {

            }
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "teal"}}>
            <View style={{alignItems:'center'}}>
            <Modal
                visible={showBellModal}
                transparent
                onRequestClose={() => setShowBellModal(false)}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.centered_view}>
                    <View style={styles.bell_modal}>
                        <View style={styles.bell_body}>
                            <Text style={styles.text}>Remind me After</Text>
                            <TextInput
                                style={styles.bell_input}
                                keyboardType='numeric'
                                value={bellTime}
                                onChangeText={(value) => setBellTime(value)}
                            />
                            <Text style={styles.text}>minute(s)</Text>
                        </View>
                        <View style={styles.bell_buttons}>
                            <TouchableOpacity
                                style={styles.bell_cancel_button}
                                onPress={() => {
                                    setShowBellModal(false)
                                }}
                            >
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bell_ok_button}
                                onPress={() => {
                                    setShowBellModal(false)
                                    setTaskAlarm()
                                    // handleButtonPress();
                                }}
                            >
                                <Text style={styles.text}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TextInput style={styles.title} onChangeText={(value) => { settitle(value) }} placeholderTextColor="gray" value={title} placeholder="Title"></TextInput>
            <TextInput style={styles.title} onChangeText={(value) => { setdesc(value) }} value={desc} placeholderTextColor="gray" placeholder="Description" multiline></TextInput>

            <View style={styles.checkbox}>
                <CheckBox
                    disabled={false}
                    value={done}
                    onValueChange={(newValue) => setdone(newValue)}
                    
                    tintColors={{ true: 'white', false: 'white' }}
                />
                <Text style={{ fontSize: 20, marginTop: 1,color:"white" }}>Is Done</Text>
            </View>
            <View style={styles.colorbar}>
                <TouchableOpacity onPress={() => { setcolor("white") }} style={styles.white_bar}>
                    {
                        color == "white" &&
                        <Image style={styles.checkmark} source={require("../assests/check-mark.png")}></Image>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setcolor("red") }} style={styles.red_bar}>
                    {
                        color == "red" &&
                        <Image style={styles.checkmark} source={require("../assests/check-mark.png")}></Image>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setcolor("blue") }} style={styles.blue_bar}>
                    {
                        color == "blue" &&
                        <Image style={styles.checkmark} source={require("../assests/check-mark.png")}></Image>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setcolor("green") }} style={styles.green_bar}>
                    {
                        color == "green" &&
                        <Image style={styles.checkmark} source={require("../assests/check-mark.png")}></Image>
                    }
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.extra_button}
                    onPress={() => { setShowBellModal(true) }}
                >
                    <Image source={require("../assests/notification.png")} style={styles.bell}></Image>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.savebtn} onPress={set_task}><Text style={styles.savetxt}>Add Task</Text></TouchableOpacity>
       </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
    
        color:"black",
        backgroundColor: "white",
        width: '95%',
        borderWidth: 1,
        borderRadius: 30,
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingLeft:20,
        
    },
    savebtn: {
        backgroundColor: '#5caaf2',
        width: "50%",
        height:35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
bell:{
  height:20,
  width:20  
},
    savetxt: {
        color: "white",
        fontSize: 20,

    },
    checkbox: {
        flexDirection: "row",

    },
    extra_button: {
        width: 150,
        backgroundColor: "yellow",
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: "center",
        margin: 20,
    },
    colorbar: {
        height: 50,
        width: "100%",
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row"
    },
    white_bar: {
        flex: 1,
        backgroundColor: "white",
    },
    red_bar: {
        flex: 1,
        backgroundColor: "red",
    },
    blue_bar: {
        flex: 1,
        backgroundColor: "skyblue",
    },
    green_bar: {
        flex: 1,
        backgroundColor: "green",
    },
    checkmark: {
        height: 40,
        width: 40,
        marginLeft: 30,
        marginTop: 3
    },
    centered_view: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_modal: {
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000000',
    },
    bell_body: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_buttons: {
        flexDirection: 'row',
        height: 50,
        color:"black"
    },
    bell_input: {
        width: 50,
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        color:"black"
    },
    bell_cancel_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_ok_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color:"black"
    }
})