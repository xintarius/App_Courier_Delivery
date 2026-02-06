import { createConsumer } from '@rails/actioncable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

if (typeof global.addEventListener === 'undefined') { global.addEventListener = () => {}; }
if (typeof global.removeEventListener === 'undefined') { global.removeEventListener = () => {}; }

const CABLE_URL = 'ws://138.2.157.249:3001/cable'; 

let consumer = null;
let lastUsedToken = null;

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
};

export const getConsumer = async () => {
  try {
    const token = await AsyncStorage.getItem('jwt');

    if (!token) {
      console.warn('Brak tokena JWT.');
      return null;
    }

    if (isTokenExpired(token)) {
      await AsyncStorage.removeItem('jwt');
      return null;
    }

    if (consumer && token !== lastUsedToken) {
      console.log('Token się zmienił, restartuję połączenie...');
      disconnectCable();
    }

    if (!consumer) {
      lastUsedToken = token;
      consumer = createConsumer(`${CABLE_URL}?token=${token}`);
      console.log('ActionCable: Nowy konsument utworzony.');
    }

    return consumer;
  } catch (error) {
    console.error('Błąd inicjalizacji ActionCable:', error);
    return null;
  }
};

export const disconnectCable = () => {
  if (consumer) {
    try {
      consumer.disconnect();
    } catch (e) {
      console.warn("Błąd podczas disconnect:", e);
    }
    consumer = null;
    lastUsedToken = null;
  }
};