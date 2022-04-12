import { TouchableHighlight, ImageBackground, Text } from "react-native";
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
import { useNavigate } from "react-router-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const StyledCard = styled.View`
  width: ${width / 2 - 32};
  margin: 8px;
  background-color: #171c25;
  aspect-ratio: 1;
  border-radius: 16px;
`;

const StyledText = styled.Text`
  color: #fff;
  font-size: 16px;
  background-color: #00000088;
  margin-top: auto;
  width: ${width / 2 - 32};
  padding: 4px 8px;
`;

const Card = (props) => {
  const [fontsLoaded] = useFonts({
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
  });

  const image = props.artwork;
  let navigate = useNavigate();

  return (
    <TouchableHighlight
      activeOpacity={0.3}
      underlayColor="#dddddd0"
      onPress={() => navigate("/track/" + props.id, { replace: true })}
      style={{
        borderRadius: 16,
      }}
      {...props}
    >
      <StyledCard {...props}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            borderRadius: 16,
            overflow: "hidden",
          }}
          {...props}
        >
          <BlurView intensity={200} style={{ marginTop: "auto" }}>
            <StyledText
              {...props}
              style={{ fontFamily: "Poppins_500Medium" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.children}
            </StyledText>
          </BlurView>
        </ImageBackground>
      </StyledCard>
    </TouchableHighlight>
  );
};

export default Card;
