import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_URL_PRODUCT, API_URL_USER } from "../../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const User = (props) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const onDelete = (_id) => {
        fetch(`${API_URL_USER}/delete/${_id}`,{method:"post",headers:{'Content-Type': 'application/json',Authorization : `Bearer ${userInfo.token}`}})
        .then(res => {
            getData()})
        .catch(err => console.log(`Delete product ${err}`));

        // axios.post(`${API_URL_PRODUCT}/delete/${_id}`,
        // {   
        //     headers: { Authorization: `Bearer ${userInfo.token}` }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         getData()})
        //     .catch((err) => console.log(err));
    }

    const getData = () => {
        axios.get(`${API_URL_USER}`,{
            headers: {Authorization: `Bearer ${userInfo.token}`}
        })
        .then(async(res) => {
            setData(res.data.users)
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            console.log(`Get User err ${err}`)
        })
    }

    useEffect(() => {
        getData();
    }, [isFocused]);
    return (
        <SafeAreaView style={{ backgroundColor: '#E8EAED', flex: 1 }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 12, marginBottom: 16 }}>
                <View style={{ paddingHorizontal: 8, flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4, marginTop: 8, textAlign: 'center' }}>Danh sách user</Text>
                    <TouchableOpacity onPress={() =>props.navigation.navigate('FormProduct')}>
                        <View style={{ backgroundColor: "#55BCF6", padding: 4, borderRadius: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}>+Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {isLoading
                    ? <Text style={{ fontSize: 50 }}>Loading...</Text>
                    :
                    <FlatList style={{ marginBottom: 28, padding: 12 }}
                        data={data}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <View style={{ flex: 2, marginEnd: 16 }}>
                                    {
                                        item.image
                                            ? (<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: item.image }} />)
                                            : (<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={require('../../assets/user-profile.jpg')} />)
                                    }


                                </View>
                                <View style={{ flex: 4, flexDirection: "column", alignItems: 'flex-start', maxWidth: "50%", marginHorizontal: 12 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                                        <Text>{item.email} đ</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 2, alignItems: 'flex-end', marginStart: 12 }}>
                                    <TouchableOpacity style={{ marginVertical: 8 }} onPress={() => onEdit(item._id)}>
                                        <View>
                                            <Image style={{ width: 28, height: 28 }} source={require('../../assets/editing.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginVertical: 8 }} onPress={() => Alert.alert('Xóa user', 'Bạn có chắc chắn xóa user này không', [
                                        { text: "Cancel" },
                                        { text: "OK", onPress: () => onDelete(item._id) }
                                    ])
                                    }>
                                        <View>
                                            <Image style={{ width: 28, height: 28 }} source={require('../../assets/delete.png')} />
                                        </View>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item._id}
                    />
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#1f145c"
    },
    item: {
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 12,
        flexDirection: "row",
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 16
    },
});

export default User;