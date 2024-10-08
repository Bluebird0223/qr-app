import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoading(true);

    // Convert scanned data to an object
    let scannedObject;
    try {
      scannedObject = JSON.parse(data); // Assuming data is a JSON string
    } catch (error) {
      console.error("Invalid JSON:", error);
      Alert.alert("Error", "Scanned data is not valid JSON.");
      setLoading(false);
      return;
    }

    // Set scanned data to the state
    setScannedData(scannedObject);
    
    try {
      await axios.post("http://192.168.143.137:3019/qr/create-qr", {
        qrId: scannedObject.qrId, 
        productName: scannedObject.productName,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage("Scanned successfully!");
    } catch (error) {
      console.error("Error storing data:", error);
      Alert.alert("Error", `Failed to store data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const startScan = () => {
    setScanned(false);
    setScannedData(null);
    setSuccessMessage(null);
    setLoading(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <Button title="Start Scan" onPress={() => setScanned(false)} />
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </>
      ) : (
        <>
          {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
          <Button title="Scan again" onPress={startScan} />
        </>
      )}
      {loading && <Text>Loading...</Text>}
      {scannedData && <Text>QrId: {JSON.stringify(scannedData?.qrId)} - Product Name:{JSON.stringify(scannedData?.productName)} </Text>} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    color: "green",
    fontSize: 18,
    margin: 10,
  },
});
