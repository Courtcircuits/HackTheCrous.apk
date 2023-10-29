import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
export interface ProfilePictureProps {
  size?: number | null;
  style?: Object | null;
}

export default function ProfilePicture({ size, style }: ProfilePictureProps) {
  const { user } = useContext(UserContext);
 
  if (!size) {
    size = 45;
  } 
  let style_default = {
    width: size,
    height: size,
    borderRadius: 50,
  }

  if (style) {
    style_default = {
        ...style_default,
        ...style
    }
  }
  return <Image source={{ uri: user.avatar }} style={style_default} />;
}
