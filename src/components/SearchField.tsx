import { Text, View } from 'react-native';
import SearchIcon from '../../assets/icons/menu/Search.svg';
import { colorSet } from '../styles/style';

export default function SearchField() {
    return (
        <View style={{
            backgroundColor: colorSet.colorBackgroundMuter,
            width: "100%",
            overflow: "hidden",
            paddingHorizontal: 15,
            paddingVertical:10,
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 100,
        }}>
            <SearchIcon height={15} width={15} fill={colorSet.colorBackgroundMute}/>
            <Text numberOfLines={1} lineBreakMode="tail"  style={{
                color: colorSet.colorBackgroundMute,
                width: "85%",
                marginLeft: "5%"
            }}>Chercher un restaurant</Text>
        </View>
    )
}