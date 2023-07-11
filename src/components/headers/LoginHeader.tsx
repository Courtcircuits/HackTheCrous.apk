import HTCLogo from './../../../assets/icons/logo-hacl.svg';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { colorSet } from '../../styles/style';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../../App';


export default function LoginHeader(){
  const [fontsLoaded] = useFonts({
    Inter: require('./../../../assets/fonts/Inter-Regular.ttf'),
  });

  const navigation = useNavigation<AppStackParamList>();

  if(!fontsLoaded){
    return null;
  }

  return(
    <View style={styles.header}>
      <TouchableOpacity style={{flex:1}} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
      <View style={{flex:1, alignItems: 'center'}}>
        <HTCLogo width={50} height={50} />
      </View>
      <View style={{flex:1}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Inter',
    color: colorSet.colorText,
    fontSize: 17,
  },
});
