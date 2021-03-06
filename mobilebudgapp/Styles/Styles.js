import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      zIndex: 0
    },

    summary_section: {
        backgroundColor: 'white',
        width: '95%',
        borderLeftColor: '#4A0784',
        borderStyle: 'solid',
        borderLeftWidth: 3, 
        alignSelf: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5
    },

    summary_section_header: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 15
    },

    summary_income_switcher: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderStyle: 'solid', 
        borderColor: '#4A0784',
        color: '#4A0784',
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
        color: '#f8f8ff',
        borderWidth: 1, 
        paddingVertical: 10,
        backgroundColor: '#4A0784',
        borderRadius: 20,
        margin: 5
    },

    bill_switcher: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderStyle: 'solid', 
        borderColor: '#4A0784',
        color: '#4A0784', 
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 20,
        margin: 5
        
    },

    bill_switcher_clicked: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderStyle: 'solid', 
        borderColor: '#4A0784',
        color: '#f8f8ff',
        borderWidth: 1, 
        paddingVertical: 10,
        backgroundColor: '#4A0784',
        borderRadius: 20,
        margin: 5
    },


    unplanned_section: {
        backgroundColor: 'white',
        borderLeftColor: '#4A0784',
        borderLeftWidth: 3, 
        minHeight: 100, 
        height: 'auto',
        width: '95%',
        borderStyle: 'solid', 
        alignSelf: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5,
        maxHeight: '100%'
    },

    planned_section: {
        backgroundColor: 'white',
        borderLeftColor: '#4A0784',
        borderLeftWidth: 3, 
        minHeight: 100, 
        height: 'auto',
        width: '95%',
        borderStyle: 'solid', 
        alignSelf: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5
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
        marginBottom: 30,
    },

    secondary_header_text: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: 'bold'
    },

    income: {
        fontSize: 20,
        textAlign: 'center'
    },

//main turquious cta button
    button_style: {
        backgroundColor: '#4A4A4A',
        color: '#F5F5F5',
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

    // big circular buttons
    button_circle_big: {
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

    // Quick Action buttons
    button_small_quick_actions: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderStyle: 'solid',
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 5,
        marginTop: 5,
        marginBottom: 5
    },

    button_small_quick_actions_dark: {
        backgroundColor: '#4A0784',
        borderRadius: 10,
        borderStyle: 'solid',
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 5,
        marginTop: 5,
        marginBottom: 5
    },

  });

  export default styles;