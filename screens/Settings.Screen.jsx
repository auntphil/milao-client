/**
 * For Creating a random encryption string
 */
const handleRandomKey = () => {
    setEKey(randomString(128))
}

<View style={[styles.enc_wrapper]}>
    <TextInput
        style={[Input.input, Btn.input_btn_right]}
        placeholder='Encryption Key'
        value={eKey}
        onChange={text => setEKey(text)}
    />
    <TouchableOpacity
        style={[Btn.btn, Btn.btn_purple, Btn.btn_right]}
        onPress={handleRandomKey}
    >
        <Text style={[Btn.btn_purple_text]}>Random</Text>
    </TouchableOpacity>
</View>