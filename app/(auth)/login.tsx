import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../utils/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/users/sign_in", {
        user: { email, password }
      });

      const { token } = response.data;

      // save jwt to storage
      await AsyncStorage.setItem("jwt", token);

      // go to the application
      router.replace("/(main)/home");
    } catch (error: any) {
      console.log("Błąd logowania:", error?.response?.data || error.message);
      alert("Niepoprawny login lub hasło");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courier App</Text>
      <TextInput
        style={styles.input}
        placeholder="Adres-email"
        keyboardType="default"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry={true}
        keyboardType="default"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
