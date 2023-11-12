import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SearchIcon from '../../assets/icons/menu/Search.svg';
import { colorSet } from '../styles/style';

interface PropsSearchField {
  focused: boolean;
  setSearchFocused?: (value: boolean) => void;
  setSearch?: (value: string) => void;
  search?: string;
}

export default function SearchField(props: PropsSearchField) {
  if (props.focused) {
    return (
      <View style={{
        backgroundColor: 'transparent',
        borderColor: colorSet.colorBackgroundMute,
        borderWidth: 1,
        width: "100%",
        overflow: "hidden",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
      }}>
        <SearchIcon height={15} width={15} fill={colorSet.colorBackgroundMute} />
        <TextInput autoFocus style={{
          color: colorSet.colorText,
          width: "85%",
          marginLeft: "5%"
        }}
        onChangeText={(text) => {
          props.setSearch && props.setSearch(text);
        }}
        value={props.search}
        ></TextInput>
      </View>
    )
  }
  return (
    <TouchableOpacity style={{
      backgroundColor: colorSet.colorBackgroundMuter,
      width: "100%",
      overflow: "hidden",
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 10,
      borderColor: colorSet.colorBackgroundMuter,
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 100,
    }}
      onPress={() => {
        console.log("setSearchFocused");
        props.setSearchFocused && props.setSearchFocused(true);
      }}
    >
      <SearchIcon height={15} width={15} fill={colorSet.colorBackgroundMute} />
      <Text numberOfLines={1} lineBreakMode="tail" style={{
        color: colorSet.colorBackgroundMute,
        width: "85%",
        marginLeft: "5%"
      }}>Chercher un restaurant</Text>
    </TouchableOpacity>
  )
}
