import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import {Icon} from 'react-native-elements'

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions : {
      drawerIcon: <Icon name='home' type='fontawesome5' />
    }
    },
  MyDonations : {
    screen : MyDonationScreen,
    navigationOptions : {
      drawerIcon: <Icon name='gift' type='font-awesome' />,
      drawerLabel: 'My Donations'
    } 
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions: {
      drawerIcon: <Icon name='settings' type='fontawesome5' />
    }
  },
  Notifications: {
    screen : NotificationScreen,
    navigationOptions : {
      drawerIcon: <Icon name='bell' type='font-awesome' />
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
