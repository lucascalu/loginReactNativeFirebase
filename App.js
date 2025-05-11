import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebase } from './firebaseConfig';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert('Erro: ' + error.message);
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
});
