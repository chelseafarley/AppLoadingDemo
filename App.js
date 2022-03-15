import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import React from 'react';

export default function App() {
  let [isLoaded, setIsLoaded] = React.useState(false);

  let cacheResources = async () => {
    const images = [require("./assets/background.jpg")];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  React.useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    };

    loadResources();
  }, [])

  if (!isLoaded) {
    return <AppLoading />
  }

  return (
    <ImageBackground style={styles.container} source={require("./assets/background.jpg")}>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
