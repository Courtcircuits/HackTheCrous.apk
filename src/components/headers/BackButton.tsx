import { TouchableOpacity } from "react-native";
import BackIcon from './../../../assets/icons/Arrow 1.svg';

export default function BackButton() {
    return (
        <TouchableOpacity>
            <BackIcon width={20} heigght={20}/> 
        </TouchableOpacity>
    )
}