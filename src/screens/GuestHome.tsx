import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import GoogleIcon from './../../assets/icons/google-icon.svg';
import HomeHeader from './../components/headers/HomeHeader';
import Button from './../components/Button';
import { colorSet } from '../styles/style';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigation, AppStackParamList } from '../../App';
import { UserContext } from '../contexts/UserContext';
import { AlertContext } from '../contexts/AlertContext';
import axios, { AxiosError } from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { EXPO_PUBLIC_API_URL } from '@env';


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
    const res = await axios.post(process.env.EXPO_PUBLIC_API_URL+"/login", {
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

export default function GuestHome() {
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
  });

  const { user } = useContext(UserContext);

  const [wantsToLogin, setWantsToLogin] = useState(false);


  const { auth, setAuth } = useContext(AuthContext);

  const navigation = useNavigation<AppStackNavigation>();

  if (!fontsLoaded) {
    return null;
  }

  if (!wantsToLogin) {
    return (
      <View style={styles.body}>
        <HomeHeader />
        <View style={styles.container}>
          <View style={{ ...styles.centerContainer, flex: 1 }}>
            <Text style={styles.heading}>
              Hack The Cr*us, une plateforme par et pour les étudiants.
            </Text>
          </View>
          <View style={{ ...styles.centerContainer, flex: 2 }}>
            <Button
              text="S'inscrire avec Google"
              color={colorSet.colorText}
              action={() => {
                const res = authenticate('tristan-mihai.radulescu@etu.umontpellier.fr', '12341234', false);
                res.then(data => {
                  setAuth((auth)=>{
                    return {
                    refreshToken: data.refreshToken ? data.refreshToken : '',
                    token: data.token,
                  }});
                });
              }}>
              <GoogleIcon width={20} height={20} />
            </Button>
            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.textMuted}>OU</Text>
              <View style={styles.line} />
            </View>
            <Button
              action={() => {
                navigation.push('Register');
              }}
              text="S'inscrire sur Hack the Cr*us"
              color={colorSet.colorPrimary}
            />
            <View style={{ ...styles.paragraph, marginTop: 10 }}>
              <Text style={styles.text}>Déjà un compte ?</Text>
              <TouchableOpacity
                accessibilityLabel="Se connecter"
                onPress={() => {
                  setWantsToLogin(true);
                }}>
                <Text style={styles.link}> Connecte toi en cliquant ici.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <HomeHeader />
      <View style={styles.container}>
        <View style={{ ...styles.centerContainer, flex: 1 }}>
          <Text style={styles.heading}>
            Hack The Cr*us, une plateforme par et pour les étudiants.
          </Text>
        </View>
        <View style={{ ...styles.centerContainer, flex: 2 }}>
          <Button
            text="Se connecter avec Google"
            color={colorSet.colorText}
            action={() => {}}>
            <GoogleIcon width={20} height={20} />
          </Button>
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.textMuted}>OU</Text>
            <View style={styles.line} />
          </View>
          <Button
            action={() => {
              navigation.push('Login');
            }}
            text="Se connecter avec Hack The Cr*us"
            color={colorSet.colorPrimary}
          />
          <View style={{ ...styles.paragraph, marginTop: 10 }}>
            <Text style={styles.text}>Pas encore inscrit ? </Text>
            <TouchableOpacity
              accessibilityLabel="S'inscrire"
              onPress={() => {
                setWantsToLogin(false);
              }}>
              <Text style={styles.link}>Inscrit toi en cliquant ici.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    flexDirection: 'row',
  },
  text: {
    color: colorSet.colorText,
    fontFamily: 'Inter',
  },
  link: {
    color: colorSet.colorPrimary,
    fontFamily: 'Inter',
  },
  textMuted: {
    color: colorSet.colorTextMuted,
    fontFamily: 'Inter',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colorSet.colorTextMuted,
    marginHorizontal: 10,
  },
  buttonText: {
    color: colorSet.colorPrimary,
    fontFamily: 'Inter',
  },
  heading: {
    marginTop: 20,
    color: colorSet.colorHeading,
    fontFamily: 'Inter-Black',
    fontSize: 30,
    width: '90%',
  },
  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 17,
    backgroundColor: colorSet.colorBackground,
    height: '100%',
    justifyContent: 'flex-start',
  },
  button: {
    borderColor: colorSet.colorPrimary,
    borderWidth: 1,
    fontFamily: 'Inter',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
});
