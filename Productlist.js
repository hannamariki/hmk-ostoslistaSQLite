import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Productlist() {

  const [id, setId] = useState(null);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');




  return (
    <View style={styles.container}>
      <Text>testi</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
