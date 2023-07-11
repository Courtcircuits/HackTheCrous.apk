import { useFonts } from 'expo-font';
import { colorSet } from '../styles/style';
import { View, StyleSheet, Text } from 'react-native';
import LoginHeader from '../components/headers/LoginHeader';
import Field from '../components/Field';
import { useState } from 'react';
import Button from '../components/Button';
import { AppStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordStep, setIsPasswordStep] = useState(false);
  const navigation = useNavigation<AppStackParamList>();

  if (!fontsLoaded) {
    return null;
  }


  if (isPasswordStep) {
    return (
    <View style={styles.body}>
      <View>
        <LoginHeader />
        <Text style={styles.heading}>Maintenant, saisis ton mot de passe</Text>
        <Field
          type="email"
          placeholder="Email"
          value={email}
          onChange={text => {
            setEmail(text);
          }}
        />
        <View style={{height:30}}></View>
        <Field
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={text => {
            setPassword(text);
          }}
        />
      </View>
      <View style={{flexDirection:'row', width:'100%', marginBottom:10,justifyContent:"flex-end"}}>
      <Button
        text="Valider"
        color={colorSet.colorText}
        style={{ width: '30%' }}
        action={() => {
        }}
      />
      </View>
    </View>
  )
  }

  return (
    <View style={styles.body}>
      <View>
        <LoginHeader />
        <Text style={styles.heading}>Pour commencer, entre ton mail</Text>
        <Field
          type="email"
          placeholder="Email"
          value={email}
          onChange={text => {
            setEmail(text);
          }}
        />
      </View>
      <View style={{flexDirection:'row', width:'100%', marginBottom:10,justifyContent:"flex-end"}}>
      <Button
        text="Valider"
        color={colorSet.colorText}
        style={{ width: '30%' }}
        action={() => {
          setIsPasswordStep(true);
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 17,
    backgroundColor: colorSet.colorBackground,
    height: '100%',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: 'Inter-Black',
    fontSize: 30,
    marginBottom: 40,
    color: colorSet.colorHeading,
    width: '80%',
  },
});
