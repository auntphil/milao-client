import { StyleSheet } from "react-native";

const Input = StyleSheet.create({
    default: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 0,
        paddingHorizontal: 15,
        marginVertical: 5,
        height: 35
    },
    input_btn_right: {
        width: '70%',
        marginVertical: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
        paddingRight: 7
    }
})

export default Input