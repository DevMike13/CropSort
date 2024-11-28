import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#a0ebb3'
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
      },
      accountInfo: {
        width: '90%',
        marginBottom: 20,
        alignItems: 'flex-start',
      },
      label: {
        fontFamily: FONT.bold,
        fontSize: 18,
        marginVertical: 5,
      },
      userDetailsText:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        marginLeft: SIZES.xxxLarge,
        marginBottom: 20
      },
      noUserText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20,
      },
      logoutButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
      },
      logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default styles;
