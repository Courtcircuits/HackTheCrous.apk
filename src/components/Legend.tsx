import { StyleSheet, Text, View } from 'react-native';
import { colorSet } from '../styles/style';

export default function Legend(props: { children: React.ReactNode }) {
  return (
    <View style={styles.body}>
      <Text style={styles.legend}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        width: "100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:5,
    },
  legend: {
    color: colorSet.colorText,
    opacity: 0.5,
  },
});
