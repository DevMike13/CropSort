import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: SIZES.xLarge,
    },
    btn: (name, activeTab) => ({
      paddingVertical: SIZES.small,
      paddingHorizontal: SIZES.xLarge,
      backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
      borderRadius: SIZES.xLarge,
      marginLeft: 2,
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
    }),
    btnText: (name, activeTab) => ({
      fontFamily: "DMMedium",
      fontSize: SIZES.small,
      color: name === activeTab ? COLORS.lightWhite : "#AAA9B8",
    }),
});

export default styles;
