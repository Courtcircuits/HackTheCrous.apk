import { useFonts } from 'expo-font';
import { colorSet } from '../styles/style';
import { View, StyleSheet, Text } from 'react-native';
import LoginHeader from '../components/headers/LoginHeader';
import Field from '../components/Field';
import { useState } from 'react';
import Button from '../components/Button';
import { AppStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { AuthContext } from '../contexts/AuthContext';

interface AuthResponse {
  type: string;
  messsage: string;
  token: string;
  refreshToken?: string;
  mail: string;
}

async function authenticate(
  email: string,
  password: string,
  remember: boolean,
): Promise<AuthResponse> {
  try {
    const res = await axios.post(`${EXPO_PUBLIC_API_URL}/login`, {
      mail: email,
      password: password,
      remember: remember,
    });

    return res.data;
  } catch (error: any) {
    console.error(JSON.stringify(error));
    return {
      type: 'error',
      messsage: 'Une erreur est survenue',
      token: '',
      mail: '',
    };
  }
}

export default function Login() {
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordStep, setIsPasswordStep] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const navigation = useNavigation<AppStackParamList>();

  if (!fontsLoaded) {
    return null;
  }

  if (isPasswordStep) {
    return (
      <View style={styles.body}>
        <View>
          <LoginHeader />
          <Text style={styles.heading}>
            Maintenant, saisis ton mot de passe
          </Text>
          <Field
            type="emailAddress"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={text => {
              setEmail(text);
            }}
          />
          <View style={{ height: 30 }}></View>
          <Field
            type="password"
            autoComplete="password"
            placeholder="Mot de passe"
            value={password}
            onChange={text => {
              setPassword(text);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginBottom: 10,
            justifyContent: 'flex-end',
          }}>
          <Button
            text="Valider"
            color={colorSet.colorText}
            style={{ width: '30%' }}
            action={() => {
              const res = authenticate(email, password, false);
              res.then(data => {
                setAuth({
                  refreshToken: data.refreshToken ? data.refreshToken : '',
                  token: data.token,
                });
                navigation.navigate('UserSpace');
              });
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <View>
        <LoginHeader />
        <Text style={styles.heading}>Pour commencer, entre ton mail</Text>
        <Field
          autoComplete="email"
          type="emailAddress"
          placeholder="Email"
          value={email}
          onChange={text => {
            setEmail(text);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginBottom: 10,
          justifyContent: 'flex-end',
        }}>
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
