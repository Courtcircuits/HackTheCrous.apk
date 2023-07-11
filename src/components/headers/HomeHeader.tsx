import HTCLogo from './../../../assets/icons/logo-hacl.svg';
import { View, StyleSheet } from 'react-native';
import LoginHeader from './LoginHeader';

export default function HomeHeader(){
  return(
    <View style={styles.header}>
      <HTCLogo width={50} height={50} />
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    },
});
