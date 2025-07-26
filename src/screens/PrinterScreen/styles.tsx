import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { color: '#fff', fontSize: 18, marginBottom: 10, textAlign: 'center' },
  scanBtn: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  scanText: { color: '#fff', textAlign: 'center' },
  deviceButton: {
    padding: 15,
    backgroundColor: '#222',
    marginVertical: 5,
    borderRadius: 8,
  },
  deviceText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  deviceAddress: { color: '#bbb', fontSize: 12, marginTop: 4 },
  printBtn: {
    backgroundColor: '#0a84ff',
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
  printText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  backBtn: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  backText: { color: '#fff', textAlign: 'center' },
});
