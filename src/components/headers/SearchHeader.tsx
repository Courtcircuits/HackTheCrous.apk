import HTCLogo from './../../../assets/icons/logo-hacl.svg';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Image, StyleSheet, View } from 'react-native';
import BackButton from './BackButton';
import SearchField from '../SearchField';
import ProfilePicture from '../user/ProfilePicture';

export default function SearchHeader() {
  const { user } = useContext(UserContext);

  if (!user.logged) {
    return (
      <View style={styles.header}>
        <HTCLogo with={50} height={50} />
      </View>
    );
  }
  return (
    <View style={styles.header}>
      <View style={styles.element}>
        <BackButton></BackButton>
      </View>
      <View style={{
        ...styles.mainElement
      }}>
        <SearchField/>
      </View>
      <View style={{ ...styles.element, justifyContent: 'flex-end' }}>
        <ProfilePicture/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  mainElement : {
    flex:3
  },
  element: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
