import { useState } from "react";
import { StyleSheet, Switch, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View style={styles.topBar}>
        <Text style={styles.helloText}>Witaj kurierze</Text>
        <Text style={styles.status}>{isOnline ? "ONLINE" : "OFFLINE"}</Text>
        <Switch value={isOnline} onValueChange={setIsOnline} />
        <TouchableOpacity
    style={styles.menuIcon}
    onPress={() => setMenuVisible(true)}
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

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 52.2297, longitude: 21.0122 }}
          title="Ty"
        />
      </MapView>
</View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  status: { fontSize: 18, fontWeight: "bold" },
  helloText: { fontSize: 16, fontWeight: "bold" },
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
  },
  iconContainer: {
    backgroundColor: '#FFF',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8,
  }

});
