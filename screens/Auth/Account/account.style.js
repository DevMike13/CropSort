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
        borderRadius: SIZES.small,
        marginTop: 20,
      },
      logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      inputContainer:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 55,
    },
    inputWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
        marginBottom: 10,
    },
    inInput: {
        fontFamily: FONT.regular,
        width: "85%",
        height: "100%",
        color: 'black',
        paddingHorizontal: SIZES.medium,
    },
  changePasswordButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: SIZES.small
  },
  changePasswordText: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONT.bold
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: FONT.bold,
    marginBottom: 15,
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.large
  },
  cancelButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default styles;
