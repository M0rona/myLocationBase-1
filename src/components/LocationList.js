import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as Location from 'expo-location';
import { useTheme } from 'react-native-paper';
import { initDatabase, saveLocation, getLocations } from '../database/database';
import LocationCard from './LocationCard';

export default function LocationList({ isDarkMode, toggleTheme }) {
  const [locations, setLocations] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    initDatabase();
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const savedLocations = await getLocations();
      console.log('Localizações carregadas:', savedLocations); 
      
      setLocations(savedLocations);
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to track your location.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    try {
      const location = await Location.getCurrentPositionAsync({});
      await saveLocation(location.coords.latitude, location.coords.longitude);
      loadLocations();
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get current location.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Button mode="contained" onPress={toggleTheme} style={styles.themeButton}>
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </Button>
      <Button mode="contained" onPress={getCurrentLocation} style={styles.locationButton}>
        Get Current Location
      </Button>
      <FlatList
        data={locations}
        renderItem={({ item }) => <LocationCard item={item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  themeButton: {
    marginBottom: 16,
  },
  locationButton: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
});