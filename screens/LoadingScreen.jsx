import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

const Loading = () => {
    return(
        <View style={[styles.container]}>
            <Text style={styles.title}>Mílao Agápi</Text>
            <ActivityIndicator size='large' />
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 54,
      fontWeight: '700',
      marginBottom: 15
  },
  });

export default Loading