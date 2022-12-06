import * as React from 'react';
import { firebase } from '@react-native-firebase/database';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function ScanScreen({navigation, route}) {
    const [canScan, setCanScan] = React.useState(false)
    const [scannedData, setScannedData] = React.useState("")

    React.useEffect(() => {
        console.log(scannedData);
    }, [scannedData])

    const handleQRCodeScan = (type) => {
        setCanScan(type);
    }

    const handleQRCodeData = (data) => {
        setScannedData(data.data);
        setCanScan(false);
    }
    
    const handleDataUpload = async() => {
        const databaseRef = firebase.app().database("https://programa4-83a54-default-rtdb.europe-west1.firebasedatabase.app/");
        let recordId = 0;
        databaseRef.ref("scans").once("value", (snapshot) => {
            recordId = snapshot.numChildren();
        }).then(() => {
            databaseRef.ref("scans/" + recordId).set({
                itemId: recordId,
                description: scannedData,
            })
        })

        setScannedData("");
        alert("Scanned Content Saved!");
    } 

    return (
        <ScrollView contentContainerStyle = {{ paddingTop: 50, paddingHorizontal: 20 }}>
            <TouchableOpacity style = {styles.button} onPress = {() => handleQRCodeScan(true)}>
                <Text style = {styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
            {canScan && 
                <QRCodeScanner
                    reactivate = {true}
                    showMarker = {true}
                    onRead = {(e) => handleQRCodeData(e)}
                    cameraContainerStyle = {{alignSelf: "center"}}
                />
            }
            <View style = {{paddingBottom: 40}}/>
            {scannedData.length != 0 ?
                <View>
                    <Text style = {{fontSize: 20, fontWeight: "500"}}>QR Content:</Text>
                    <View style = {{paddingBottom: 15}}/>
                    <View style = {styles.dataBox}>
                        <Text style = {{fontSize: 18}}>{scannedData}</Text>
                    </View>
                    <View style = {{paddingBottom: 35}}/>
                    <TouchableOpacity style = {styles.button} onPress = {() => handleDataUpload()}>
                        <Text style = {styles.buttonText}>Save Contents</Text>
                    </TouchableOpacity>
                </View>
            : null}
        </ScrollView>
    );
}

let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    dataBox: {
        justifyContent: "center",
        width: screenWidth - 40,
        flexBasis: "auto",
        padding: 15,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 12,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        height: 50,
        width: screenWidth - 40,
        alignSelf: "center",
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 12,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
    },
})