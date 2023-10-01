import { useFonts } from 'expo-font';
import { createContext, useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colorSet } from '../styles/style';
interface Alert {
  type: 'error' | 'success';
  message: string;
}

export const AlertContext = createContext({
   alerts: [] as Alert[],
});

export function AlertContextProvider({ children }: { children: React.ReactNode}) { 
  return (
    <AlertContext.Provider value={{ alerts: [] }}>
      {children}
    </AlertContext.Provider>
  );
}

export function Alert() {
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
  });

  const { alerts } = useContext(AlertContext);


  if (!fontsLoaded) {
    return null;
  }

  if (alerts.length > 0) {
    return (
      <Text style={styles.alert}>{alerts[0].message}</Text>
    );
  }

  return null;
}

export function AlertWraper({ children }: { children: React.ReactNode }) {
  const { alerts } = useContext(AlertContext);

  if (alerts.length > 0) {
    return (
      <View>
        <Alert />
        {children}
      </View>
    );
  }

  return children as JSX.Element;
}

const styles = StyleSheet.create({
  alert: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    fontFamily: 'Inter',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'red',
    color: colorSet.colorText,
    textAlign: 'center',
  },
});
