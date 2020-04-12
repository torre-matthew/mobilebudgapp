import {Platform, StyleSheet} from 'react-native';
import { getPlatformOrientationLockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { bold } from 'ansi-colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const loginScreenStyles = StyleSheet.create({
    container: {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    welcome: {
          alignItems: 'center',
        },
  });

  export default loginScreenStyles;