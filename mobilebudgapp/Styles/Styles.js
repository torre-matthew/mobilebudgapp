import {Platform, StyleSheet} from 'react-native';
import { getPlatformOrientationLockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { bold } from 'ansi-colors';

const backgroundImage = require('./images/turquise indigo gradient.png');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      justifyContent: 'center',
    //   backgroundColor: '#423D43'
    },

    header: {
        // paddingTop: 24,
        // minHeight: 70,
        // backgroundColor: '#40e0d0',
      },

    summary_section: {
        // backgroundColor: 'white',
        // borderStyle: 'solid',
        // borderTopWidth: 0, 
        // borderWidth: 5,
        // borderColor: '#ccf9fb'
    },

    summary_section_header: {
        fontSize: 45,
        textAlign: 'center',
        marginTop: 25,
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
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 20,
        margin: 5
        
    },

    summary_income_switcher_clicked: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderStyle: 'solid', 
        borderWidth: 1, 
        paddingVertical: 10,
        backgroundColor: '#ccf9fb',
        borderRadius: 20,
        margin: 5
    },


    unplanned_section: {
        backgroundColor: 'white',
        minHeight: 100, 
        height: 'auto',
        // borderStyle: 'solid', 
        // borderWidth: 5,
        // borderColor: '#8C8B99',
    },

    planned_section: {
        backgroundColor: 'white',
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
        fontSize: 25,
        marginBottom: 30,
        marginTop: 30,
    },
    total: {
        fontSize: 25,
        textAlign: 'center',
    },
    income: {
        fontSize: 20,
        textAlign: 'center'
    },

    button_style: {
        backgroundColor: '#ccf9fb',
        borderRadius: 20,
        width: '45%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: 'red',
        shadowOpacity: 0.75,
        shadowRadius: 6

    },

    button_style_form: {
        backgroundColor: '#F65050',
        borderRadius: 20,
        width: 112,
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: 'red',
        shadowOpacity: 0.75,
        shadowRadius: 6,
        marginTop: 15

    },

  });

  export default styles;