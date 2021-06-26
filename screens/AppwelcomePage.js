import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
    ImageBackground,
    Image
} from "react-native";

export default class HomeScreen extends Component {


    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require('../assets/bg.jpeg')} style={styles.backgroundImage}>
                     <View style={styles.titleBar}>
                        <Image source={require("../assets/note-taking.png")} style={{ width: 150, height: 150 }}></Image>
                        <Text style={styles.titleText}>ToDo List App</Text>
                        
                    </View>

                    <TouchableOpacity style={styles.routeCard} onPress={() =>
                        this.props.navigation.navigate("AddTask")
                    }>
                        <Text style={styles.routeText}>Add TASK</Text>
                        <Image source={require("../assets/addtask.jpeg")} style={styles.routeImage}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.routeCard} onPress={() =>
                        this.props.navigation.navigate("TaskList")
                    }>
                        <Text style={styles.routeText}>Tasks Todo</Text>
                        <Image source={require("../assets/todolist.jpeg")} style={styles.routeImage}></Image>
                    </TouchableOpacity>

                     <TouchableOpacity style={styles.routeCard} onPress={() =>
                        this.props.navigation.navigate("CompletedTaskList")
                    }>
                        <Text style={styles.routeText}>Completed Tasks</Text>
                        <Image source={require("../assets/todolist.jpeg")} style={styles.routeImage}></Image>
                    </TouchableOpacity>


                    
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    routeCard: {
        flex: 0.12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 100,
        height:180,
        backgroundColor: "white"
    },
    titleBar: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "red"
    },
    routeText: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#D11583',
        justifyContent: "center",
        alignItems: "center"
    },
    routeImage: {
        position: "absolute",
        top: -20,
        right: -15,
        height: 80,
        width: 80,
        resizeMode: "contain"
    }
});