import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { useContext } from 'react';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Ionicons from '@expo/vector-icons/Ionicons';
import Product from './src/screens/Product';
import FormProduct from './src/screens/FormProduct';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from './src/screens/User';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="FormProduct" component={FormProduct} />
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Product') {
            iconName = focused ? 'list-outline' : 'list-circle-outline';
          } else if(route.name === 'User'){
            iconName = focused ? 'people' : 'people-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Product" component={ProductStack} />
      <Tab.Screen name="User" component={User}/>
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {
        splashLoading ?
          (
            <Stack.Navigator screenOptions={{
              headerShown: false,
            }}>
              <Stack.Screen name='Splash' component={Splash} />
            </Stack.Navigator>
          ) :
          (userInfo.token ? <AppStack /> : <AuthStack />)}

    </NavigationContainer>)
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor='#06bcee' />
      <Navigation />
    </AuthProvider>
  );
}

