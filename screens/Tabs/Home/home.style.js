import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    backgroundColor: "#a0ebb3"
  },
  headerContainer:{
    alignItems: "center",
    height: "auto",
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  btnContainer:{
    width: '90%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  btn:{
    width: '60%',
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    marginTop: 15
  },
  btnText:{
    fontFamily: FONT.bold,
    textAlign: 'center',
    fontSize: SIZES.large
  }
});

export default styles;
