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
  contentTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: 'white',
  },
  titleNumber:{
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginVertical: 15
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
  disagreeBtn:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 5, 
    borderColor: 'red', 
    borderRadius: 50,
    marginTop: 20
  },
  agreeBtn:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 5, 
    borderColor: 'green', 
    borderRadius: 50,
    marginTop: 20
  },
  disbtnText:{
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: 'red'
  },
  btnText:{
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: 'green'
  }
});

export default styles;
