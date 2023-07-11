import { useFonts } from 'expo-font';
import { colorSet } from '../styles/style';
import { View, StyleSheet, Text } from 'react-native';
import LoginHeader from '../components/headers/LoginHeader';
import Field from '../components/Field';
import { useState } from 'react';

export default function Login() {
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
  });

  const [email, setEmail] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.body}>
      <LoginHeader />
      <Text style={styles.heading}>Pour commencer, entre ton mail</Text>
      <Field
        placeholder="Email"
        value={email}
        onChange={(text) => {
          setEmail(text);
        }}
        />
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
    justifyContent: 'flex-start',
  },
  heading: {
    fontFamily: 'Inter-Black',
    fontSize: 30,
    marginBottom: 40,
    color: colorSet.colorHeading,
    width: '80%',
  }
});
