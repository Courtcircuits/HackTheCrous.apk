import { StyleSheet, Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();


interface ColorScheme {
  colorBackground: string;
  colorBackgroundTransparent: string;
  colorBackgroundSoft: string;
  colorBackgroundMute: string;
  colorBackgroundMuter: string;

  colorBorder: string;
  colorShadow: string;
  colorBorderHover: string;

  colorHeading: string;
  colorText: string;
  colorTextMuted: string;

  colorPrimary: string;
}

const basicColorSet = {
  white: '#FFFFFF',
  whiteTransparent: 'rgba(255, 255, 255, 0.9)',
  whiteSoft: '#F8F8F8',
  whiteMute: '#F2F2F2',
  whiteMuter: '#F1F1F1',

  black: 'rgb(12,12,12)',
  blackTransparent: 'rgba(12,12,12, 0.9)',
  blackSoft: '#222222',
  blackMute: '#282828',
  blackMuter: '#1B1B1B',

  dividerLight1: 'rgba(60, 60, 60, 0.29)',
  dividerLight2: 'rgba(60, 60, 60, 0.12)',
  dividerLight3: 'rgba(60, 60, 60, 0.04)',
  dividerDark1: 'rgba(84, 84, 84, 0.65)',
  dividerDark2: 'rgba(84, 84, 84, 0.48)',
  dividerDark3: 'rgba(84, 84, 84, 0.2)',

  textlight1: 'rgba(60, 60, 60, 1)',
  textlight2: 'rgba(60, 60, 60, 0.66)',
  textdark1: '#ffffff',
  textdark2: 'rgba(235, 235, 235, 0.64)',
  textdark3: '#f4f4f4',

  colorprimary: '#24ee76',
  colorprimaryopacity: '#24ee768a',
  colorwarning: '#ff0707',
};

let colorSet: ColorScheme;

if (colorScheme === 'dark') {
  colorSet = {
    colorBackground: basicColorSet.black,
    colorBackgroundTransparent: basicColorSet.blackTransparent,
    colorBackgroundSoft: basicColorSet.blackSoft,
    colorBackgroundMute: basicColorSet.blackMute,
    colorBackgroundMuter: basicColorSet.blackMuter,

    colorBorder: basicColorSet.dividerDark2,
    colorShadow: basicColorSet.dividerDark3,
    colorBorderHover: basicColorSet.dividerDark1,

    colorHeading: basicColorSet.textdark1,
    colorText: basicColorSet.textdark3,
    colorTextMuted: basicColorSet.textdark2,
    colorPrimary: basicColorSet.colorprimary,
  };
} else {
  colorSet = {
    colorBackground: basicColorSet.white,
    colorBackgroundTransparent: basicColorSet.whiteTransparent,
    colorBackgroundSoft: basicColorSet.whiteSoft,
    colorBackgroundMute: basicColorSet.whiteMute,
    colorBackgroundMuter: basicColorSet.whiteMuter,

    colorBorder: basicColorSet.dividerLight2,
    colorShadow: basicColorSet.dividerLight3,
    colorBorderHover: basicColorSet.dividerLight1,

    colorHeading: basicColorSet.textlight1,
    colorText: basicColorSet.textlight1,
    colorTextMuted: basicColorSet.textlight2,
    colorPrimary: basicColorSet.colorprimary,
  };
}


export { colorSet };

export const login = StyleSheet.create({
  background: {
    backgroundColor: colorSet.colorBackground,
  },
});
