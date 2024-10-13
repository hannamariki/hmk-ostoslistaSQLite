import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

export default function Productlist() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');

  const db = useSQLiteContext(); //hook, joka tarjoaa pääsyn SQLite-tietokannan kontekstiin

  const saveItem = async () => { //lisätään tuotteet tietokantaan
    try {
      await db.runAsync('INSERT INTO product (product, amount) VALUES (?, ?)', [product, amount]);
      await updateList();
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const updateList = async () => { //näyttää tietokannassa olevat tuotteet
    try {
      const list = await db.getAllAsync('SELECT * FROM product');
      setProduct(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  };

  const deleteItem = async (id) => { //tämän avulla poistetaan tuotteet tietokannasta
    try {
      await db.runAsync('DELETE FROM product WHERE id = ?', [id]);
      await updateList();
    } catch (error) {
      console.error('Could not delete item', error);
    }
  };

  useEffect(() => { //varmistaa, että kun komponentti ladataan, updateList-funktio suoritetaan, ja ostoslista päivitetään tietokannan tiedoilla.
    updateList();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Product' 
        onChangeText={text => setProduct(text)}
        value={product} 
      /> 
      <TextInput 
        placeholder='Amount' 
        onChangeText={text => setAmount(text)}
        value={amount} 
      /> 
      <Button onPress={saveItem} title="bought" />
      <FlatList
        keyExtractor={item => item.id.toString()} //funktio, joka ottaa vastaan jokaisen listan kohteen ja palauttaa sen ainutlaatuisen avaimen.
        renderItem={({ item }) => ( //funktio, joka määrittelee, miltä jokainen lista-elementti näyttää.
          <View style={styles.itemContainer}> 
            <Text>{item.product}</Text> 
            <Text>{item.amount}</Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>done</Text>
          </View> //ylläoleva näyttää tuotteen nimen ja määrän mitkä on tallennettu listalle
        )}
        data={product} //määrittää, mistä tiedoista lista rakennetaan. . product on tila, joka sisältää kaikki tuotteet, jotka on haettu tietokannasta. Tämä on se data, jota FlatList käyttää näyttääkseen jokaisen ostoksen listassa.
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});