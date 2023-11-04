import { ReactNode } from 'react';
import { Text, StyleSheet, StyleProp, View } from 'react-native';
import { colorSet } from '../styles/style';

export default function ShimerText(props: { style: any }) {
  return (
    <View style={styles.container}>
      <Text style={{ ...props.style, ...styles.title }}>title</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: colorSet.colorBackgroundSoft,
    width: '50%',
    borderRadius: 5,
  },
  title: {
    color: 'transparent',
  }
})
