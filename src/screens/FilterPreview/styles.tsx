import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'space-between' },
  canvasContainer: { flex: 1 },
  filterBarWrapper: { paddingBottom: 10, backgroundColor: '#111' },
  filterBar: { paddingVertical: 10, paddingHorizontal: 5 },
  filterButton: {
    backgroundColor: '#222',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  selectedButton: { backgroundColor: '#444' },
  filterText: { color: '#fff', fontSize: 14 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontSize: 14 },
});
