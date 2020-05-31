import * as Font from 'expo-font';

const loadFonts = async () => {
    
    await Font.loadAsync({
      'SpecialElite-Regular': require('../assets/fonts/SpecialElite-Regular.ttf'),
      'Laila-SemiBold': require('../assets/fonts/Laila-SemiBold.ttf'),
      'Laila-Light': require('../assets/fonts/Laila-Light.ttf'),
      'Laila-Medium': require('../assets/fonts/Laila-Medium.ttf'),
      'Laila-Bold': require('../assets/fonts/Laila-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
      'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    });
}

    export default loadFonts;