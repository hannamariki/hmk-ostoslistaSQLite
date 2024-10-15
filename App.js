import { StyleSheet, View } from 'react-native';
import Productlist from './Productlist';
import { SQLiteProvider } from 'expo-sqlite';
import { PaperProvider, Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';




export default function App() {
  const initialize = async (db) => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, amount TEXT);
      `);
      console.log("Database initialized successfully");
    } catch (error) {
      console.error('Could not initialize database', error);
    }
  }; //Autoincrement asettaa juoksevan numerosarjan

  return (
    
    <PaperProvider>
    <Appbar mode="medium" elevated>
      <Appbar.Content title="Shopping list" style={styles.container} />
    </Appbar>
    <SQLiteProvider
      databaseName='productdb.db'
      onInit={initialize}
      onError={error => console.error('Could not open database', error)}
    >
      <Productlist />
    </SQLiteProvider>
    <StatusBar style="auto" />
  </PaperProvider>

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