import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.helloText}>Witaj kurierze</Text>
        <Text style={styles.status}>{isOnline ? "ONLINE" : "OFFLINE"}</Text>
        <Switch value={isOnline} onValueChange={setIsOnline} />
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
});
