import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import LocationList from './src/components/LocationList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <LocationList isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
     <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
            <AppContent />
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
