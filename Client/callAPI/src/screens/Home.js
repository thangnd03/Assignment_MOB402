import React, { useContext } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView, Image, ImageBackground } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";


const Home = () => {
    const { isLoading, logout, userInfo } = useContext(AuthContext);
    console.log(userInfo.image.contentType);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{padding:20}}>
                <View style={{ flexDirection: 'row',marginBottom:20,justifyContent:'space-between' }}>
                    <Text style={{fontSize:16,fontWeight:'600'}}>Hello {userInfo.name} </Text>
                    
                    {
                        userInfo.image.contentType
                            ? (<Image style={{ width: 40, height: 40,borderRadius:50 }} source={{ uri: `data:${userInfo.image.contentType};base64,${userInfo.image.data}` }} />)
                            : (<Image style={{ width: 40, height: 40,borderRadius:50 }} source={require('../../assets/user-profile.jpg')} />)
                    }
                </View>
            </ScrollView>
            <Button title="Logout" onPress={logout} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default Home;