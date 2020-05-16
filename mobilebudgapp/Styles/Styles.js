import {Platform, StyleSheet} from 'react-native';
import { getPlatformOrientationLockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { bold } from 'ansi-colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const backgroundImage = require('./images/turquise indigo gradient.png');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5F5F5',
    },

    header: {
        paddingLeft: 0,
        paddingRight: 0,
      },

    summary_section: {
        backgroundColor: 'white',
        // borderStyle: 'solid',
        // borderTopWidth: 0, 
        // borderWidth: 5,
        // borderColor: '#ccf9fb'
    },

    summary_section_header: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 15
    },

    summary_section_header_secondary: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },

    summary_income_switcher: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderStyle: 'solid', 
        borderColor: '#40DBCE',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 20,
        margin: 5
        
    },

    summary_income_switcher_clicked: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderStyle: 'solid', 
        borderColor: '#4A0784',
        borderWidth: 1, 
        paddingVertical: 10,
        backgroundColor: '#40DBCE',
        borderRadius: 20,
        margin: 5
    },


    unplanned_section: {
        backgroundColor: 'white',
        minHeight: 100, 
        height: 'auto',
        // borderTopLeftRadius: 45,
        // borderBottomRightRadius: 45,
        width: '95%',
        borderStyle: 'solid', 
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5
    },

    planned_section: {
        backgroundColor: '#4666A5',
        minHeight: 100, 
        height: 'auto',
        // borderStyle: 'solid', 
        // borderWidth: 5,
        // borderColor: '#8C8B99',
    },

    welcome: {
      fontSize: 50,
      textAlign: 'center',
      margin: 10,
    },
    button_display: {
        width: 90,
        marginTop: 20,
    },
    secondary_header: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30,
        marginTop: 5,
    },
    income: {
        fontSize: 20,
        textAlign: 'center'
    },

//main turquious cta button
    button_style: {
        backgroundColor: '#40DBCE',
        borderRadius: 10,
        borderStyle: 'solid',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#4A0784',
        elevation: 5,
        shadowOpacity: 0.75,
        shadowRadius: 6,
        marginTop: 15,
        marginBottom: 15
    },

// small purple button
    button2_dark_style: {
        backgroundColor: '#4A0784',
        borderRadius: 10,
        borderStyle: 'solid',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#4A0784',
        elevation: 5,
        shadowOpacity: 0.75,
        shadowRadius: 6,
        marginTop: 15,
        marginBottom: 15
    },

// medium grey button
    button3_small_light_style: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderStyle: 'solid',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#4A0784',
        elevation: 5,
        shadowOpacity: 0.75,
        shadowRadius: 6,
        marginTop: 15,
        marginBottom: 15
    },

   // large grey button
    button2_light_style: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        elevation: 5,
        shadowColor: '#4A0784',
        marginTop: 15,
        marginBottom: 15

    },

    button2_cta_style: {
        backgroundColor: '#40DBCE',
        borderRadius: 10,
        borderStyle: 'solid',
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#4A0784',
        elevation: 5,
        shadowOpacity: 0.75,
        shadowRadius: 6,
        marginTop: 15,
        marginBottom: 15

    },

    button_style_form: {
        backgroundColor: '#40DBCE',
        borderRadius: 20,
        borderStyle: 'solid', 
        borderColor: '#4A0784',
        borderWidth: 1,
        width: 125,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#4A0784',
        elevation: 5,
        shadowOpacity: 0.75,
        shadowRadius: 6,
        marginTop: 15,
        marginBottom: 15

    },

  });

  export default styles;