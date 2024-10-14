import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

export default function Productlist() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);

  const db = useSQLiteContext();

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO product (product, amount) VALUES (?, ?)', [product, amount]);
      await updateList();
      console.log("Item saved, updating list.");
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * FROM product');
      console.log('Fetched items:', list);
      setProducts(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM product WHERE id = ?', [id]);
      await updateList();
    } catch (error) {
      console.error('Could not delete item', error);
    }
  };

  useEffect(() => {
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
      <Button onPress={saveItem} title="save" />
      <Text>Shopping list</Text>
      <FlatList
        keyExtractor={item => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.itemContainer}> 
            <Text>{item.product}, </Text> 
            <Text>{item.amount}, </Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>bought</Text>
          </View>
        )}
        data={products} 
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
    marginTop: 50,
  
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
});