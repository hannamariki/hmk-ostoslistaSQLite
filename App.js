import { StyleSheet } from 'react-native';
import Productlist from './Productlist';
import { SQLiteProvider } from 'expo-sqlite';



export default function App() {

  const initialize = async (db) => {
    db.execAsync(`
      CREATE TABLE IF NOT EXISTS product (id INT PRIMARY KEY NOT NULL, product TEXT, amount TEXT); 
    `);
  }; //id on int, product text ja amount text

  return (
    <SQLiteProvider
      databaseName='productdb.db'
      onInit={initialize} //funktio varmistaa, että tietokanta on valmis käytettäväksi heti kun sovellus käynnistyy
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