import React, { useEffect, useState, useRef } from 'react';
import {styles} from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { BleManager, Device, Characteristic } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type PrinterRouteProp = RouteProp<RootStackParamList, 'Printer'>;

const manager = new BleManager();

const PrinterScreen = () => {
  const route = useRoute<PrinterRouteProp>();
  const navigation = useNavigation();
  const { photoUri } = route.params;

  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [scanning, setScanning] = useState(false);

  const devicesRef = useRef<Device[]>([]);
  devicesRef.current = devices;

  useEffect(() => {
    requestPermissions().then((granted) => {
      if (granted) scanForDevices();
    });

    return () => {
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      if (Platform.Version >= 31) {
        const res = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          res[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          res[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          res[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return res === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch {
      return false;
    }
  };

  const scanForDevices = () => {
    setScanning(true);
    setDevices([]);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error('Scan error', error);
        setScanning(false);
        return;
      }

      if (
        scannedDevice &&
        scannedDevice.name &&
        !devicesRef.current.find((d) => d.id === scannedDevice.id)
      ) {
        setDevices((prev) => [...prev, scannedDevice]);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  };

  const connectToPrinter = async (device: Device) => {
    try {
      const d = await manager.connectToDevice(device.id, { timeout: 10000 });
      const ready = await d.discoverAllServicesAndCharacteristics();
      setConnectedDevice(ready);
      Alert.alert('Connected', device.name || device.id);
    } catch (err) {
      console.error(err);
      Alert.alert('Failed', 'Could not connect to device');
    }
  };

  const sendTestPrint = async () => {
    if (!connectedDevice) return Alert.alert('No printer', 'Connect first.');

    try {
      const services = await connectedDevice.services();
      for (const service of services) {
        const chars = await service.characteristics();
        for (const char of chars) {
          if (char.isWritableWithResponse || char.isWritableWithoutResponse) {
            await writeToCharacteristic(char, '\n\nHello from TabCam Printer App\n\n\n');
            Alert.alert('Success', 'Printed successfully!');
            return;
          }
        }
      }
      Alert.alert('No writable characteristic found.');
    } catch (e) {
      console.error('Print error', e);
      Alert.alert('Print error', 'Failed to print.');
    }
  };

  const writeToCharacteristic = async (char: Characteristic, text: string) => {
    const payload = base64.encode(text);
    if (char.isWritableWithResponse) {
      await char.writeWithResponse(payload);
    } else {
      await char.writeWithoutResponse(payload);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Printers</Text>
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={{ width: '100%', height: 180, resizeMode: 'contain', marginBottom: 12 }}
        />
      ) : null}

      <TouchableOpacity style={styles.scanBtn} onPress={scanForDevices} disabled={scanning}>
        <Text style={styles.scanText}>{scanning ? 'Scanning...' : 'Scan Devices'}</Text>
      </TouchableOpacity>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.deviceButton,
              connectedDevice?.id === item.id && { backgroundColor: '#005f5f' },
            ]}
            onPress={() => connectToPrinter(item)}
          >
            <Text style={styles.deviceText}>{item.name || 'Unnamed Device'}</Text>
            <Text style={styles.deviceAddress}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.printBtn, !connectedDevice && { opacity: 0.5 }]}
        onPress={sendTestPrint}
        disabled={!connectedDevice}
      >
        <Text style={styles.printText}>Print Test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrinterScreen;
