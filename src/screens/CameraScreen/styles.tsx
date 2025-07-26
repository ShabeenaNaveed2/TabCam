import { StyleSheet,} from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { color: '#fff', fontSize: 18 },

  topBar: {
    position: 'absolute',
    top: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 2,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },

  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: '#222',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  timerRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  timerButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  timerButtonActive: { backgroundColor: '#00aaff' },
  timerText: { color: '#fff', fontSize: 16 },
  captureButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 50,
    width: 120,
    alignItems: 'center',
    marginTop: 10,
  },
  captureText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});