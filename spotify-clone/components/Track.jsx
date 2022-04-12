import { TouchableHighlight, ImageBackground, Text, View } from "react-native";
import styled from "rn-css";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { useParams } from "react-router-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const Track = () => {
  const { id } = useParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default Track;
