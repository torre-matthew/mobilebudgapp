import {Platform, StyleSheet} from 'react-native';
// import { getPlatformOrientationLockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { bold } from 'ansi-colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const loginScreenStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    welcome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25
        },
    signIn: {
        flex: 1,
        justifyContent: 'flex-start',
        },
  });

  export default loginScreenStyles;