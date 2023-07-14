import HTCLogo from './../../../assets/icons/logo-hacl.svg';
import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function HomeHeader() {
  const {user, setUser} = useContext(UserContext);

  if (user.logged) {
    return (
      <View style={styles.header}>
        <View style={styles.element}></View>
        <View style={{...styles.element, justifyContent: 'center'}}>
          <HTCLogo width={50} height={50} />
        </View>
        <View style={{...styles.element, justifyContent: 'flex-end'}}>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.header}>
      <HTCLogo width={50} height={50} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  element: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
