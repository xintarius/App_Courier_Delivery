import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/(main)/home");
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Courier App</Text>
        <TextInput
          placeholder="+48 555 321 123"
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
         placeholder="********"
         style={styles.input}
         keyboardType="phone-pad"
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