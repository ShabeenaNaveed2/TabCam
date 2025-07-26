import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import FilterPreview from '../screens/FilterPreview/FilterPreview';
import { FilterKey } from '../components/filters';
import PrinterScreen from '../screens/PrinterScreen/PrinterScreen';

export type RootStackParamList = {
  Splash: undefined;
  Camera: undefined;
  Printer: { photoUri: string };
  FilterPreview: { photoUri: string; selectedFilter: FilterKey };
  PhotoPreviewScreen: { photoUri: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="FilterPreview" component={FilterPreview} />
      <Stack.Screen name="Printer" component={PrinterScreen} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
