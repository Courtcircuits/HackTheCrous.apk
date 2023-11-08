import HTCLogo from './../../../assets/icons/logo-hacl.svg';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import SearchField from '../SearchField';
import ProfilePicture from '../user/ProfilePicture';

interface PropsSearchHeader {
  searchFocused: boolean;
  setSearchFocused: (value: boolean) => void;
  setSearch?: (value: string) => void;
  search?: string;
}

export default function SearchHeader(props: PropsSearchHeader) {
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
      <View style={styles.mainElement}>
        <SearchField search={props.search} setSearch={props.setSearch} focused={props.searchFocused} setSearchFocused={props.setSearchFocused} />
      </View>
      <View style={{ ...styles.element, justifyContent: 'flex-end' }}>
        {
          !props.searchFocused ? <ProfilePicture /> :
            <TouchableOpacity onPress={
              () => {
                props.setSearchFocused(false);
              }
            }>
              <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 10 }}>Annuler</Text>
            </TouchableOpacity>
        }
      </View>
    </View>)


}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  mainElement: {
    flex: 3
  },
  element: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
