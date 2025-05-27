import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const LocationCard = ({ item }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Text>Latitude: {item.latitude}</Text>
      <Text>Longitude: {item.longitude}</Text>
      <Text>Time: {new Date(item.timestamp).toLocaleString()}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
});

export default LocationCard;