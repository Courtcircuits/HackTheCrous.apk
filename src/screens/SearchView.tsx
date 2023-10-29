import { StyleSheet, Text, View } from 'react-native';
import SearchHeader from '../components/headers/SearchHeader';
import { colorSet } from '../styles/style';
import ShareCard from '../components/ShareCard';

export default function SearchView() {
  return (
    <View style={styles.container}>
      <SearchHeader />
      <View style={styles.spacer}>
      </View>
      <ShareCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 17,
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  },
  spacer: {
    paddingVertical:2,
  }
});
