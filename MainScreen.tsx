import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';

const API_URL = 'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest';

const stateImages: { [key: string]: string } = {
  "Arizona": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Arizona_state_seal.svg/1920px-Arizona_state_seal.svg.png",
  "Alabama": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Seal_of_Alabama.svg/1920px-Seal_of_Alabama.svg.png",
  "Alaska": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Seal_of_the_State_of_Alaska.svg/1920px-Seal_of_the_State_of_Alaska.svg.png",
  "Arkansas": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Seal_of_Arkansas.svg/1920px-Seal_of_Arkansas.svg.png",
  "California": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Great_Seal_of_the_State_of_California_Colored.svg/1920px-Great_Seal_of_the_State_of_California_Colored.svg.png",
  "Colorado": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Seal_of_Colorado.svg/1920px-Seal_of_Colorado.svg.png",
  "Connecticut": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Seal_of_Connecticut.svg/1280px-Seal_of_Connecticut.svg.png",
  "Delaware": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Seal_of_Delaware.svg/1920px-Seal_of_Delaware.svg.png",
  "Florida": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Seal_of_Florida.svg/1920px-Seal_of_Florida.svg.png",
  "Georgia": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Seal_of_Georgia.svg/1920px-Seal_of_Georgia.svg.png",
  "Hawaii": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Seal_of_the_State_of_Hawaii.svg/1920px-Seal_of_the_State_of_Hawaii.svg.png",
  "Idaho": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Seal_of_Idaho.svg/1920px-Seal_of_Idaho.svg.png",
  "Illinois": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Seal_of_Illinois.svg/1920px-Seal_of_Illinois.svg.png",
  "Indiana": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Seal_of_the_State_of_Indiana.svg/1920px-Seal_of_the_State_of_Indiana.svg.png",
  "Iowa": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/State_seal_of_Iowa.svg/199px-State_seal_of_Iowa.svg.png",
  "Kansas": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Great_Seal_of_the_State_of_Kansas_Colored.svg/200px-Great_Seal_of_the_State_of_Kansas_Colored.svg.png",
  "Kentucky": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Seal_of_Kentucky.svg/1920px-Seal_of_Kentucky.svg.png",
  "Louisiana": ":https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Seal_of_Louisiana.svg/1920px-Seal_of_Louisiana.svg.png",
  "Maine": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Seal_of_Maine.svg/200px-Seal_of_Maine.svg.png",
  "Maryland": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Seal_of_Maryland_%28reverse%29.svg/1920px-Seal_of_Maryland_%28reverse%29.svg.png",
  "Massachusetts": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Seal_of_Massachusetts.svg/1920px-Seal_of_Massachusetts.svg.png",
  "Michigan": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Seal_of_Michigan.svg/200px-Seal_of_Michigan.svg.png",
  "Minnesota": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Seal_of_Minnesota.svg/200px-Seal_of_Minnesota.svg.png",
  "Mississippi": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Mississippi.svg/1920px-Seal_of_Mississippi.svg.png",
  "Missouri": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Seal_of_Missouri.svg/1920px-Seal_of_Missouri.svg.png",
  "Montana": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Great_Seal_of_Montana.svg/199px-Great_Seal_of_Montana.svg.png",
  "Nebraska": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Seal_of_the_State_of_Nebraska.svg/200px-Seal_of_the_State_of_Nebraska.svg.png",
  "Nevada": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/State_Seal_of_Nevada.svg/200px-State_Seal_of_Nevada.svg.png",
  "New Hampshire": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Seal_of_New_Hampshire.svg/200px-Seal_of_New_Hampshire.svg.png",
  "New Jersey": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Seal_of_New_Jersey.svg/200px-Seal_of_New_Jersey.svg.png",
  "New Mexico": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Seal_of_New_Mexico.svg/198px-Seal_of_New_Mexico.svg.png",
  "New York": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Seal_of_New_York_%28state%29.svg/200px-Seal_of_New_York_%28state%29.svg.png",
  "North Carolina": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Seal_of_North_Carolina.svg/200px-Seal_of_North_Carolina.svg.png",
  "North Dakota": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Great_Seal_of_North_Dakota.svg/200px-Great_Seal_of_North_Dakota.svg.png",
  "Ohio": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seal_of_Ohio_%28B%26W%29.svg/200px-Seal_of_Ohio_%28B%26W%29.svg.png",
  "Oklahoma": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Seal_of_Oklahoma.svg/199px-Seal_of_Oklahoma.svg.png",
  "Oregon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Seal_of_Oregon.svg/200px-Seal_of_Oregon.svg.png",
  "Pennsylvania": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Seal_of_Pennsylvania.svg/200px-Seal_of_Pennsylvania.svg.png",
  "Rhode Island": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Seal_of_Rhode_Island_%282021%29.svg/200px-Seal_of_Rhode_Island_%282021%29.svg.png",
  "South Carolina": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Seal_of_South_Carolina.svg/199px-Seal_of_South_Carolina.svg.png",
  "South Dakota": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/State_Seal_of_South_Dakota.svg/200px-State_Seal_of_South_Dakota.svg.png",
  "Tennessee": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Seal_of_Tennessee.svg/199px-Seal_of_Tennessee.svg.png",
  "Texas": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_Texas.svg/200px-Seal_of_Texas.svg.png",
  "Utah": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Seal_of_Utah.svg/200px-Seal_of_Utah.svg.png",
  "Vermont": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/State_Seal_of_Vermont.svg/200px-State_Seal_of_Vermont.svg.png",
  "Virginia": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Seal_of_Virginia.svg/200px-Seal_of_Virginia.svg.png",
  "Washington": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Seal_of_Washington.svg/200px-Seal_of_Washington.svg.png",
  "West Virginia": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Seal_of_West_Virginia.svg/200px-Seal_of_West_Virginia.svg.png",
  "Wisconsin": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Seal_of_Wisconsin.svg/200px-Seal_of_Wisconsin.svg.png",
  "Wyoming": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Great_Seal_of_the_State_of_Wyoming.svg/200px-Great_Seal_of_the_State_of_Wyoming.svg.png",
};

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest")
      .then(response => response.json())
      .then(data => {
        const filteredData = data.data.filter(item => 
          item.State !== "Puerto Rico" && item.State !== "District of Columbia"
        ); // Puerto Rico and District of Columbia are not American States
  
        setData(filteredData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  });
  

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.State}
        renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Details', { stateName: item.State })}
        >
        <Image
        source={{ uri: stateImages[item.State] || 'https://via.placeholder.com/100' }}
        style={styles.image}
        />
        <View>
          <Text style={styles.stateName}>{item.State}</Text>
          <Text style={styles.population}>Population: {item.Population.toLocaleString()}</Text>
        </View>
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100, 
    height: 100,
    marginRight: 15,
  },
  stateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    marginLeft: 15,
  },
  population: {
    fontSize: 15,
    color: '#555',
    marginLeft: 15,
  },
});



export default MainScreen;