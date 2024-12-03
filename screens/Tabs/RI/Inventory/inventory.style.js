import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        paddingTop: 30,
        height: 300,
    },
    scrollView:{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15,
        height: 500
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        width: 100,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 10
    },
});

export default styles;