import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import BackIcon from './../../../assets/icons/Arrow 1.svg';

export default function BackButton() {
  const navigate = useNavigation();
    return (
        <TouchableOpacity onPress={() =>navigate.goBack()}>
            <BackIcon width={20} heigght={20}/> 
        </TouchableOpacity>
    )
}
