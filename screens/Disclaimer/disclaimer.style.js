import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "#8ee49d"
  },
  headerContainer:{
    alignItems: "center",
    height: "auto",
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  appTitle : {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: 'white',
  },
  contentContainer:{
    height: 400, 
    width: '90%', 
    borderWidth: 5, 
    borderColor: 'white', 
    borderRadius: 20
  },
  contentText:{
    fontFamily: FONT.medium,
    textAlign: 'justify',
    fontSize: SIZES.medium
  },
  agreeBtn:{
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 5, 
    borderColor: 'white', 
    borderRadius: 50,
    marginTop: 20
  },
  btnText:{
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: 'white'
  }
});

export default styles;
