import AddIcon from './../../../assets/icons/menu/Add.svg';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colorSet } from '../../styles/style';
import ProfilePicture from '../user/ProfilePicture';

type AgendaHeaderProps = {
  date: Date;
};

function getMonth(date: Date): string {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  return months[date.getMonth()];
}

export default function AgendaHeader({ date }: AgendaHeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.element}>
        <AddIcon width={20} height={20} />
      </View>
      <View style={{ ...styles.element, alignItems:'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 20,
            fontWeight: 'bold',
            color: colorSet.colorText,
          }}>
          {getMonth(date)}
        </Text>
        <TouchableOpacity>
          <Text style={{
            transform: [{ rotate: '90deg' }],
            fontFamily: 'DarkerGrotesque',
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 10,
            color: colorSet.colorText,
          }}>&gt;</Text>
        </TouchableOpacity>
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
    alignItems: 'flex-start',
    paddingVertical: 2
  },
  element: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
