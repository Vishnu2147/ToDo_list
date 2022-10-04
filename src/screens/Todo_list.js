import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
// import {  } from 'react-native-gesture-handler'
import Globalstylesheet from '../utils/Globalstylesheet'
import { useDispatch, useSelector } from 'react-redux';
// import { settask, settaskid } from "../redux/CounterSlice"
import { counterActions } from '../redux/CounterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';










export default function Todo_list({ navigation }) {
  const dispatch = useDispatch();
  // const taskid = useSelector((state)=>state.addtask.taskid)
  const taskid = useSelector((state) => state.addtask.taskid)
  const alltask = useSelector((state) => state.addtask.task)

  const deletetask = (id) => {
    console.log(id)
    const filteredTasks = alltask.filter(task => task.ID !== id);
    console.log(filteredTasks)
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(counterActions.settask(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err))
  }
  const checkTask = (id, newValue) => {
    const index = alltask.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...alltask];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(counterActions.settask(newTasks));
          // setFilteredTask(newTasks.filter(task => task.Done === false));
          Alert.alert('Success!', 'Task state is changed.');
        })
        .catch(err => console.log(err))
    }
  }
  const clear = () => {
    AsyncStorage.clear()
    dispatch(counterActions.settask([]))
  }
  const renderItem = ({ item }) => (
    <View style={styles.box}>
      <View>
      <View style={[styles.colorstrip,{
        backgroundColor:item.Color == "red"? "red":
        item.Color == "green"? "green":
        item.Color == "blue"? "skyblue":"white"
      
    }]}><CheckBox
        disabled={false}
        tintColors={{ true: 'white', false: 'black' }}
        value={item.Done}
        onValueChange={(newValue) => { checkTask(item.ID, newValue) }}
      />
</View>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Task', item)}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.desc}>{item.Desc}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.trash} onPress={() => { deletetask(item.ID) }}><Image style={styles.trashbin} source={require("../assests/trash-bin.png")}></Image></TouchableOpacity>
      
      </View>
    </View>
  );



  useEffect(() => {
    gettask();
  }, [])

  const gettask = () => {
    AsyncStorage.getItem("Tasks")
      .then(tasks => {
        const parsedtasks = JSON.parse(tasks)
        if (parsedtasks && typeof parsedtasks == 'object') {
          dispatch(counterActions.settask(parsedtasks))
        }
      })
      .catch()
  }




  const f_addbtn = () => {


    dispatch(counterActions.settaskid()),

      navigation.navigate('Task')
  }



  return (

    <>
      <View style={{ flex: 1, position: "relative", backgroundColor: "teal" }}>
        <FlatList
          data={alltask.filter((task) => task.Done === false)}
          renderItem={renderItem}
          keyExtractor={item => item.ID}
        />
        <TouchableOpacity onPress={clear} style={styles.clear}><Image style={styles.clrimg} source={require("../assests/cancel.png")}></Image></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={f_addbtn} ><Image style={styles.addlogo} source={require('../assests/add.png')}></Image></TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  box:{ position: "relative", margin:5 ,
  
  borderWidth:1,
  borderRadius:20,
  backgroundColor:"#c5d1db",
justifyContent:"center"  ,
margin:10,

},
  addlogo: {
    resizeMode: 'contain',

    height: 60,
    width: 60,
  },
  clear: {
    backgroundColor: "red",
    position: "absolute",
    left: 0, bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft:10,
    borderWidth:2,
    alignItems:"center",
    justifyContent:"center"
  },
  clrimg:{
    height:40,
    width:40
  },
  button: {
    height: 60,
    width: 60,
    alignSelf: 'flex-end',
    // marginTop:560,
    borderRadius: 28,
    // marginRight:10,
    backgroundColor: 'skyblue',
    position: "absolute",
    bottom: 10,
    right: 10

  },
  title: {
    fontSize: 25,
    color: "darkblue"},
    

  desc: {
    fontSize: 18,
    color: "black",
    // marginBottom: 20
  },
  
  trashbin: {
    height: 35,
    width: 35,
  },
  trash: {
    position: 'absolute',
    right: 15,
    top: 18

  },
  item:{
    margin:10,
    marginLeft:40,
  },
  colorstrip:{
   height:"100%",
   justifyContent:"center",
    width:33,
    position:"absolute",
    borderBottomLeftRadius:19,
    borderTopLeftRadius:19,

    
  }

})