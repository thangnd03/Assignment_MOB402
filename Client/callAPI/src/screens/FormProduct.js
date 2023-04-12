import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import Spinner from "react-native-loading-spinner-overlay";

const FormProduct = (props) => {
    const [color, setColor] = useState();
    const [price, setPrice] = useState();
    const [name, setName] = useState();
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState();
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };
    const { isLoading, register } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="none"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    
                    autoCapitalize="none"
                    value={color}
                    onChangeText={(text) => setColor(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    
                    autoCapitalize="none"
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                />

                <Image source={{uri:image}}/>

                <TouchableOpacity style={{ backgroundColor: 'lightblue', height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} onPress={pickImage}>
                    <Text>Chọn ảnh</Text>
                </TouchableOpacity>

                <Button title="Thêm Sản Phẩm" onPress={() => onAddSP()} />
                
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: "80%"
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    link: {
        color: 'blue'
    }
});

export default FormProduct;