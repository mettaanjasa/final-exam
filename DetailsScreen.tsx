import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function DetailsScreen({ route }) {
  const { stateName } = route.params;

  const stateCoordinates = {
    "Alabama": { latitude: 32.806671, longitude: -86.791130 },
    "Alaska": { latitude: 61.370716, longitude: -152.404419 },
    "Arizona": { latitude: 33.729759, longitude: -111.431221 },
    "Arkansas": { latitude: 34.969704, longitude: -92.373123 },
    "California": { latitude: 36.778259, longitude: -119.417931 },
    "Colorado": { latitude: 39.550051, longitude: -105.782067 },
    "Connecticut": { latitude: 41.603221, longitude: -73.087749 },
    "Delaware": { latitude: 38.910832, longitude: -75.527670 },
    "Florida": { latitude: 27.994402, longitude: -81.760254 },
    "Georgia": { latitude: 32.165623, longitude: -82.900078 },
    "Hawaii": { latitude: 20.796179, longitude: -156.331925 },
    "Idaho": { latitude: 44.068203, longitude: -114.742043 },
    "Illinois": { latitude: 40.633125, longitude: -89.398529 },
    "Indiana": { latitude: 39.849426, longitude: -86.258278 },
    "Iowa": { latitude: 42.011539, longitude: -93.210526 },
    "Kansas": { latitude: 38.526600, longitude: -96.726486 },
    "Kentucky": { latitude: 37.668140, longitude: -84.670067 },
    "Louisiana": { latitude: 31.169546, longitude: -91.867805 },
    "Maine": { latitude: 45.253783, longitude: -69.445469 },
    "Maryland": { latitude: 39.045753, longitude: -76.641273 },
    "Massachusetts": { latitude: 42.407211, longitude: -71.382439 },
    "Michigan": { latitude: 44.314844, longitude: -85.602364 },
    "Minnesota": { latitude: 46.729553, longitude: -94.685898 },
    "Mississippi": { latitude: 32.354668, longitude: -89.398528 },
    "Missouri": { latitude: 37.964253, longitude: -91.831833 },
    "Montana": { latitude: 46.879682, longitude: -110.362566 },
    "Nebraska": { latitude: 41.492537, longitude: -99.901813 },
    "Nevada": { latitude: 38.802610, longitude: -116.419389 },
    "New Hampshire": { latitude: 43.193852, longitude: -71.572395 },
    "New Jersey": { latitude: 40.058324, longitude: -74.405661 },
    "New Mexico": { latitude: 34.972730, longitude: -105.032363 },
    "New York": { latitude: 40.712776, longitude: -74.005974 },
    "North Carolina": { latitude: 35.759573, longitude: -79.019300 },
    "North Dakota": { latitude: 47.551493, longitude: -101.002012 },
    "Ohio": { latitude: 40.417287, longitude: -82.907123 },
    "Oklahoma": { latitude: 35.467560, longitude: -97.516428 },
    "Oregon": { latitude: 43.804133, longitude: -120.554201 },
    "Pennsylvania": { latitude: 41.203323, longitude: -77.194527 },
    "Rhode Island": { latitude: 41.580095, longitude: -71.477429 },
    "South Carolina": { latitude: 33.836081, longitude: -81.163725 },
    "South Dakota": { latitude: 43.969515, longitude: -99.901813 },
    "Tennessee": { latitude: 35.517491, longitude: -86.580447 },
    "Texas": { latitude: 31.968599, longitude: -99.901810 },
    "Utah": { latitude: 39.320980, longitude: -111.093731 },
    "Vermont": { latitude: 44.558803, longitude: -72.577841 },
    "Virginia": { latitude: 37.431573, longitude: -78.656894 },
    "Washington": { latitude: 47.751076, longitude: -120.740135 },
    "West Virginia": { latitude: 38.597626, longitude: -80.454903 },
    "Wisconsin": { latitude: 43.784439, longitude: -88.787868 },
    "Wyoming": { latitude: 43.075968, longitude: -107.290284 }
  };

  const coordinates = stateCoordinates[stateName]

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>{stateName}</Text>
        <Text> Map Details </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}>
          <Marker coordinate={coordinates} title={stateName} />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleCard: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  mapContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    flex: 1,
    marginBottom: 50,
  },
  map: {
    flex: 1,
  },
});
