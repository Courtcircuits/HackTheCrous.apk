import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ProfilePicture from './user/ProfilePicture';
import Export from './../../assets/icons/Export.svg';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colorSet } from '../styles/style';

export default function ShareCard() {
  const { user } = useContext(UserContext);
  console.log(user.mail)
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{flex:1}}>
            <ProfilePicture/>
        </View>
        <View style={{flex:4}}>
          <Text style={styles.primaryText}>Invite un ami sur Hack the Cr*us</Text>
          <Text style={styles.secondaryText}>htc.hack/{user.mail.split('@')[0]}</Text>
        </View>
      </View>
      <Export width={25} height={25}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        borderRadius:10,
        backgroundColor: colorSet.colorBackgroundMuter,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal:15
    },
    userInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        flex:4
    },
    primaryText :{
        color: colorSet.colorText,
        fontWeight: 'bold'
    },
    secondaryText: {
        color: colorSet.colorTextMuted,
    }
})  