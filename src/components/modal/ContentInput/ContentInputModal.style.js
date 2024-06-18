import { StyleSheet ,Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding: 15,
        borderRadius: 10,
        height:deviceSize.height / 3,
    },
    ButtonDesign: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle:{
        color: 'white',
        fontWeight: 'bold',
    },
    modal:{
        justifyContent:'flex-end',
        margin:15,
    },
    inputContainer:{
        flex: 1,
        padding:4, 
    },
});