import {Platform, StyleSheet} from 'react-native';
import { getPlatformOrientationLockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { bold } from 'ansi-colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const loginScreenStyles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    welcome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
        },
    signIn: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
        },
  });

  export default loginScreenStyles;