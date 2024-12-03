import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
  headerTitle:{
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: 'black',
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
    fontSize: SIZES.medium,
    marginVertical: 5,
  },
  titleNumber:{
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginVertical: 15
  },

  titleDev:{
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 15
  },
  devText:{
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: 'black',
    textAlign: 'center'
  },
});

export default styles;
