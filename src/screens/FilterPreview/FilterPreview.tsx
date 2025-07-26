import React, { useMemo } from 'react';
import {styles} from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Canvas,
  Image as SkiaImage,
  useImage,
  Group,
  ColorMatrix,
} from '@shopify/react-native-skia';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FILTER_MATRICES, FILTER_NAMES, FilterKey } from '../../components/filters';
import { RootStackParamList } from '../../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type FilterPreviewRouteParam = {
  FilterPreview: {
    photoUri: string;
    selectedFilter: FilterKey;
  };
};

type Nav = NativeStackNavigationProp<RootStackParamList, 'FilterPreview'>;

const FilterPreviewScreen = () => {
  const route = useRoute<RouteProp<FilterPreviewRouteParam, 'FilterPreview'>>();
  const navigation = useNavigation<Nav>();

  const { photoUri, selectedFilter: initialFilter } = route.params;
  const image = useImage(photoUri);
  const [selectedFilter, setSelectedFilter] = React.useState<FilterKey>(initialFilter);

  const filterMatrix = useMemo(
    () => FILTER_MATRICES[selectedFilter] || FILTER_MATRICES.none,
    [selectedFilter]
  );

  const handleRetake = () => navigation.goBack();

  const handleSave = () => {
    Alert.alert('Save', 'Image saved with applied filter.');
  };

  const handlePrint = () => {
    navigation.navigate('Printer', { photoUri });
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Canvas style={{ width, height: height - 160 }}>
          {image && (
            <Group>
              <ColorMatrix matrix={filterMatrix} />
              <SkiaImage
                image={image}
                x={0}
                y={0}
                width={width}
                height={height - 160}
                fit="contain"
              />
            </Group>
          )}
        </Canvas>
      </View>

      <View style={styles.filterBarWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {Object.keys(FILTER_NAMES).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterButton,
                selectedFilter === key && styles.selectedButton,
              ]}
              onPress={() => setSelectedFilter(key as FilterKey)}
            >
              <Text style={styles.filterText}>{FILTER_NAMES[key as FilterKey]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
            <Text style={styles.buttonText}>Print</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FilterPreviewScreen;
