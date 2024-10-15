import { StyleSheet, View, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Button, TextInput, Text, IconButton, Divider} from 'react-native-paper';

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
          style={styles.input}
          label="PRODUCT" 
          placeholder='Product'
          value={product}
          onChangeText={text => setProduct(text)}
        />
         
        <TextInput
          style={styles.input}
          label="AMOUNT" 
          placeholder='Amount'
          value={amount}
          onChangeText={text => setAmount(text)}
        />
      
        <Button mode="contained" onPress={saveItem} style={styles.button} icon='content-save'>
          SAVE
        </Button>
        
        <FlatList
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.itemContainer}> 
              <View >
              <Text variant="titleLarge">{item.product}</Text> 
              <Text variant="bodyLarge">{item.amount}</Text>
              
              </View>
              
              <IconButton icon="delete" onPress={() => deleteItem(item.id)} iconColor = '#FF4500' size={35} />
             
            </View>
          )}
          data={products} 
          ItemSeparatorComponent={() => <Divider bold />}
        />
        <Divider bold />
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
        justifyContent: 'space-between', // Tämä sijoittaa delete-napin oikealle
        width: '100%',
        padding: 10,
        
      },
      input: {
        width: '90%',
        marginBottom: 10,
      },
    });
    