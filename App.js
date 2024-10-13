import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import Productlist from './Productlist';
import { SQLiteProvider } from 'expo-sqlite';
import Productlist from './Productlist';


export default function App() {

  const initialize = async (db) => {
    db.execAsync(`
      CREATE TABLE IF NOT EXISTS product (id INT PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
    `);
  };

  return (
    <SQLiteProvider
      databaseName='productdb.db'
      onInit={initialize}
      onError={error => console.error('Could not open database', error)}
    >
      <Productlist />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margintop: 30
  }
}
);