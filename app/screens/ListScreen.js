import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";

export default function ListScreen({ route }) {
  const { createdById } = route.params; 
  const [scannedItems, setScannedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScannedItems = async () => {
      try {
        const response = await axios.get("http://192.168.143.137:3019/qr/qr-list", {
          params: {
            createdBy: '54654', 
          },
        });
        
        console.log('response', response.data);
        setScannedItems(response.data.qrList); 
      } catch (err) {
        setError("Failed to fetch scanned items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScannedItems();
  }, [createdById]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item._id.$oid}</Text>
      <Text style={styles.itemText}>QR ID: {item.qrId}</Text>
      <Text style={styles.itemText}>Product Name: {item.productName}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading scanned items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scanned Items by User</Text>
      <FlatList
        data={scannedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
