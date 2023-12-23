import React, { useState } from 'react';
import { View, Image, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const App = () => { //componente funcional
  const [pesquisar, setPesquisar] = useState(''); //estado de aplicação, o pesquisar vai guardar o texto digitado pelo usuário
  const [usuarios, setUsuarios] = useState([]); //guarda a lista de usuários obtida na pesquisa da Api.

  const pesquisarUsuarios = async () => { // função para pesquisar usuário
    if (pesquisar.trim() === '') {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${pesquisar}`
      );
      setUsuarios(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const Footer = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Nikolas Martins - Senac PE</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/gith1.png')}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite o nome do usuário"
          onChangeText={text => setPesquisar(text)}
          value={pesquisar}
          style={styles.input}
        />
        <Button
          title="Pesquisar"
          onPress={pesquisarUsuarios}
        />
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
        <Text style={styles.usuarioText}>{item.login}</Text>}
      />

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A94a6',
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    padding: '20px',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20
  },
  usuarioText: {
    border: 'black',
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    margin: 20
  },

  footer: {
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'black',
    fontSize: 16,
  }
});

export default App;
