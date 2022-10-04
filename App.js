import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash.js'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Todo_list from './src/screens/Todo_list.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Done from './src/screens/Done.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Task from './src/screens/Task.js';
import { Provider } from 'react-redux';
import store from './src/redux/Index.js';



const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator
      // screenOptions={
      //   ({ route }) => ({
      //     tabBarIcon: ({ focused, size, color }) => {
      //       let iconName;
      //       if (route.name === 'Todo_list') {
      //         iconName = 'clipboard-list';
      //         size = focused ? 25 : 20;
      //       } else if (route.name === 'Done') {
      //         iconName = 'clipboard-check';
      //         size = focused ? 25 : 20;
      //       }
      //       return (
      //         <FontAwesome5
      //         name={iconName}
      //         size={size}
      //         color={color}>
      //         </FontAwesome5>
      //       );
      //     }
      //   })
      // }

      screenOptions={{
        headerStyle: {backgroundColor: '#0ba5b3'},
        headerTintColor: 'white',
        headerTitleAlign:"center",
        headerTitleStyle:{ fontSize: 25 ,},
        // alignItems:"center",
        tabBarActiveBackgroundColor: '#b33204',
        tabBarInactiveBackgroundColor: '#0ba5b3',
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: { fontSize: 20 }
      }}
    >
      <Tab.Screen options={{
         tabBarIcon: () => {
          return (<Image style={{ height: 25, width: 25 }} source={require("./src/assests/check-list.png")}></Image>)
        }
      }}  name={'ToDo List'} tabBarIcon component={Todo_list} />
      <Tab.Screen options={{
        tabBarIcon: () => {
          return (<Image style={{ height: 25, width: 25 }} source={require("./src/assests/check-mark.png")}></Image>)

        }}}  name={'Done'} component={Done} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0ba585'
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,

            }
          }}
        >
          <RootStack.Screen options={{
            headerShown: false,
          }} name='Spalsh' component={Splash} />
          <RootStack.Screen
         options={{
            headerShown: false,
          }}
            name="My Tasks"
            component={HomeTabs}
          />
          <RootStack.Screen

            name="Task"
            component={Task}
          />
        </RootStack.Navigator>



      </NavigationContainer>
    </Provider>


  );
}

const styles = StyleSheet.create({
})