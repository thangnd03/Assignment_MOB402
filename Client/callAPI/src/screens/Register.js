import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import Spinner from "react-native-loading-spinner-overlay";

const Register = (props) => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [name, setName] = useState();
    const [image, setImage] = useState(null);

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
    const {isLoading, register } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry
                    autoCapitalize="none"
                    value={pass}
                    onChangeText={(text) => setPass(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Tên"
                    secureTextEntry
                    autoCapitalize="none"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <TouchableOpacity style={{backgroundColor:'lightblue',height:40,justifyContent:'center',alignItems:'center',marginBottom:10}} onPress={pickImage}>
                    <Text>Chọn ảnh</Text>
                </TouchableOpacity>

                <Button title="Đăng ký" onPress={() => {register(email,pass,name,image)}}/>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Do you have account? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
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

export default Register;