import { View, Text, StyleSheet } from "react-native";
import { colorSet } from "../../styles/style";

export default function ShimerEventCard(){
  return (
      <View style={styles.cardStyle}>
        <Text style={styles.title}>title</Text>
        <Text style={styles.subtitle}>title</Text>
      </View>
      )
}

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical:3,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    borderWidth: 1,
    display: "flex",
    backgroundColor: colorSet.colorBackgroundSoft,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
    color:'transparent',
    marginBottom: 7,
    width: '70%',
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    color:'transparent',
    fontSize: 13,
    width: '30%',
  }
});
