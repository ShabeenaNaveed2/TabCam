import React, { useEffect, useRef, useState } from 'react';
import {styles} from './styles';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPermissionStatus,
  PhotoFile,
} from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TapGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { FILTER_OVERLAYS, FILTER_NAMES, FilterKey } from '../../components/filters';

const { width, height } = Dimensions.get('window');
const FILTER_KEYS = Object.keys(FILTER_NAMES) as FilterKey[];

const CameraScreen = () => {
  const camera = useRef<Camera>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasPermission, setHasPermission] = useState(false);
  const [devicePosition, setDevicePosition] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(devicePosition);
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>('none');
  const [filterOpacity, setFilterOpacity] = useState<number>(0.2);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission: CameraPermissionStatus = await Camera.requestCameraPermission();
      const micPermission: CameraPermissionStatus = await Camera.requestMicrophonePermission();
      if (cameraPermission === 'granted' && micPermission === 'granted') {
        setHasPermission(true);
      } else {
        Alert.alert('Permission denied', 'Please enable camera and microphone permissions.');
      }
    };
    requestPermissions();
  }, []);

  const toggleCamera = () => {
    setDevicePosition((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash((prev) => {
      if (prev === 'off') return 'on';
      if (prev === 'on') return 'auto';
      return 'off';
    });
  };

  const takePhoto = async () => {
    if (!camera.current) return;
    try {
      setIsCapturing(true);
      if (timer > 0) await new Promise((resolve) => setTimeout(resolve, timer * 1000));
      const photo: PhotoFile = await camera.current.takePhoto({ flash });
      const uri = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;
      navigation.navigate('FilterPreview', {
        photoUri: uri,
        selectedFilter,
      });
    } catch (error) {
      console.error('Photo capture failed:', error);
      Alert.alert('Error', 'Failed to capture photo.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleFocus = async (event: any) => {
    if (!camera.current || !device?.supportsFocus) return;
    const { x, y } = event.nativeEvent;
    try {
      await camera.current.focus({ x, y });
    } catch (err) {
      console.warn('Focus error:', err);
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TapGestureHandler onEnded={handleFocus}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            torch={flash === 'on' ? 'on' : 'off'}
            enableZoomGesture={true}
          />
        </TapGestureHandler>
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: FILTER_OVERLAYS[selectedFilter],
              opacity: filterOpacity,
            },
          ]}
        />
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleFlash} style={styles.iconButton}>
            <Icon
              name={flash === 'off' ? 'flash-off' : flash === 'on' ? 'flash-on' : 'flash-auto'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={styles.iconButton}>
            <Icon name="timer" size={28} color="#fff" />
            <Text style={styles.timerLabel}>{timer}s</Text>
          </View>

          <TouchableOpacity onPress={toggleCamera} style={styles.iconButton}>
            <Icon name="flip-camera-ios" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.controls}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {FILTER_KEYS.map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedFilter(key)}
                style={[
                  styles.filterButton,
                  selectedFilter === key && styles.timerButtonActive,
                ]}>
                <Text style={styles.timerText}>{FILTER_NAMES[key]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Slider
            style={{ width: '90%', marginTop: 10 }}
            minimumValue={0}
            maximumValue={1}
            value={filterOpacity}
            onValueChange={setFilterOpacity}
            minimumTrackTintColor="#00aaff"
            maximumTrackTintColor="#888"
          />
          <Text style={{ color: '#fff', marginTop: 5 }}>
            {`Filter Opacity: ${filterOpacity.toFixed(2)}`}
          </Text>

          <View style={styles.timerRow}>
            {[0, 3, 5, 10].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setTimer(t)}
                style={[styles.timerButton, timer === t && styles.timerButtonActive]}>
                <Text style={styles.timerText}>{t}s</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
            disabled={isCapturing}>
            {isCapturing ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text style={styles.captureText}>Capture</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CameraScreen;
