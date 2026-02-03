import { useState, useEffect } from "react";
import { StyleSheet, Switch, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setErrMsg('Odmówiono dostępu do lokalizacji');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
        
        }
      );
    })();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View style={styles.topBar}>
        <Text style={styles.helloText}>Witaj kurierze</Text>
        <Text style={styles.status}>{isOnline ? "ONLINE" : "OFFLINE"}</Text>
        <Switch value={isOnline} onValueChange={setIsOnline} />
        <TouchableOpacity
    style={styles.menuIcon}
    onPress={() => setMenuVisible(!isMenuVisible)}
  >
    <View style={styles.iconContainer}>
    <Text style={{ fontSize: 28 }}>☰</Text>
    </View>
  </TouchableOpacity>
  {/* Panel menu */}
  {isMenuVisible && (
    <View style={styles.menuPanel}>
      <Text>Profil</Text>
      <Text>Historia zamówień</Text>
      <Text>Ustawienia</Text>
      <TouchableOpacity onPress={() => setMenuVisible(false)}>
        <Text>Zamknij</Text>
      </TouchableOpacity>
    </View>
  )}
      </View>
      <View style={styles.midContext}>
      <Text style={styles.balance}>Saldo gotówkowe: 0 zł</Text>
      <Text style={styles.earnings}>Zarobki: 0 zł</Text>
      </View>

      <View style={styles.searchOrderFooter}>
        <Text style={styles.searchText}>Szukam zamówień...</Text>
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {location && (
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude 
          }}
        />
        )}
      </MapView>
      {errMsg && (
        <View style={styles.errorBanner}>
          <Text style={{ color: 'white' }}>{errMsg}</Text>
        </View>
        )}
        </View>
      );
      }

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  status: { fontSize: 18, fontWeight: "bold" },
  helloText: { fontSize: 16, fontWeight: "bold" },
  midContext: {display: 'flex', flexDirection: 'column', backgroundColor: 'white'},
  balance: {fontWeight: 'bold'},
  earnings: {fontWeight: 'bold'},
  menuIcon: {
    zIndex: 10
  },
  menuPanel: {
    position: 'absolute',
    top: 90,
    right: 20,
    width: 200,
    height: 300,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: '#FFF',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  searchOrderFooter: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    bottom: 0,
    width: '100%',
    paddingBottom: 80 
  },
  searchText: {
    paddingTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errorBanner: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'red',
    padding: 10,
    width: '100%',
    zIndex: 2000
  }
});
