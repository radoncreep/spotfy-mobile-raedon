import { extendTheme, NativeBaseProvider } from "native-base";


export const appTheme = extendTheme({
    colors: {
        primary: {
            grey: '#B3B3B3',
            green: '#57B65F' ,
            darkGrey: '#282828',
            darkestGrey: '#121212',
            white: '#FFFFFF',
        }
    }
})

type CustomThemeType = typeof appTheme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}