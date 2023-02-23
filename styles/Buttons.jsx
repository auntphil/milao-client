import { StyleSheet } from "react-native";

const Btn = StyleSheet.create({
    wrapper: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    default: {
        width: '49%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
        color: 'white',
    },
    ghost: {
        borderWidth: 2,
        borderColor: 'purple',
        backgroundColor: 'white',
    },
    ghost_text: {
        color: 'purple',
    },
    purple: {
        backgroundColor: 'purple',
        width: '70%',
        marginBottom: 15,
    },
    purple_text: {
        fontSize: 17,
        fontWeight: '700',
        color: 'white'
    },
    input_wrapper: {
        flexDirection: 'row',
        width: '100%', 
        marginVertical: 5
    },
    input_right: {
        width: '30%',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 0,
        justifyContent: 'center',
        height: 35,
        marginBottom: 0
    },
})

export default Btn