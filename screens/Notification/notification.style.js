import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
      },
      header: {
        fontSize: 24,
        fontFamily: FONT.bold,
        marginBottom: 20,
      },
      notificationItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      title: {
        fontSize: 18,
        fontFamily: FONT.bold,
        marginBottom: 5,
      },
      message: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        fontFamily: FONT.regular
      },
      deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      deleteButtonText: {
        color: '#fff',
        fontFamily: FONT.bold
      },
      noNotifications: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
        color: '#777',
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: FONT.regular
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        marginRight: 10,
    },
    confirmButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default styles;
