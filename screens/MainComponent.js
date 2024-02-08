import { Platform, View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ReservationScreen from './ReservationScreen';
import logo from '../assets/images/logo.png';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: '#FFF',
  headerStyle: { backgroundColor: '#5637DD' }
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => {
            <Icon
              name='home'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />;
          }
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='About'
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => {
            <Icon
              name='info-circle'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />;
          }
        })}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Contact'
        component={ContactScreen}
        options={({ navigation }) => ({
          title: 'Contact Us',
          headerLeft: () => {
            <Icon
              name='address-card'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />;
          }
        })}
      />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Reservation'
        component={ReservationScreen}
        options={({ navigation }) => ({
          title: 'Reservation Search',
          headerLeft: () => {
            <Icon
              name='tree'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />;
          }
        })}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Directory' screenOptions={screenOptions}>
      <Stack.Screen
        name='Directory'
        component={DirectoryScreen}
        options={({ navigation }) => ({
          title: 'Campsite Directory',
          headerLeft: () => {
            <Icon
              name='list'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />;
          }
        })}
      />
      <Stack.Screen
        name='CampsiteInfo'
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeaderStyle}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>NuCamp</Text>
      </View>
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
  </DrawerContentScrollView>
);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampsites());
    dispatch(fetchComments());
    dispatch(fetchPartners());
    dispatch(fetchPromotions());
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}
    >
      <Drawer.Navigator
        initialRouteName='Home'
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundCOlor: '#CEC8FF' }}
      >
        <Drawer.Screen
          name='Home'
          component={HomeNavigator}
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name='Directory'
          component={DirectoryNavigator}
          options={{
            title: 'Campsite Directory',
            drawerIcon: ({ color }) => (
              <Icon
                name='list'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name='ReserveCampsite'
          component={ReservationNavigator}
          options={{
            title: 'Reserve Campsite',
            drawerIcon: ({ color }) => (
              <Icon
                name='tree'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name='About'
          component={AboutNavigator}
          options={{
            title: 'About',
            drawerIcon: ({ color }) => (
              <Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name='Contact'
          component={ContactNavigator}
          options={{
            title: 'Contact Us',
            drawerIcon: ({ color }) => (
              <Icon
                name='address-card'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            )
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: 24
  },
  drawerHeaderStyle: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60
  }
});

export default Main;
