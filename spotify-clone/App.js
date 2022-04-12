import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Alert } from "react-native";
import { NativeRouter, Route, Routes, Link } from "react-router-native";
import styled from "rn-css";
import { Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons/faBarsStaggered";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import AppLoading from "expo-app-loading";
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
import Card from "./components/Card";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useState } from "react";
import Track from "./components/Track";
import TrackPlayer, { State } from "react-native-track-player";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const GlobalStyle = styled.View`
  flex: 1;
  background-color: #1f2633;
  justify-content: flex-start;
  padding: 0 16px 0 16px;
`;

const NavMenu = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
  left: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #ff6047;

  border-radius: 24px;

  width: ${width - 32 + "px"};
  height: 72px;

  z-index: 1005;
`;

const StyledText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const StyledHeader = styled.Text`
  color: #fff;
  font-size: 32px;
  text-align: left;
  padding-top: 48px;
`;

const StyledLink = styled.View`
  margin: 10px;
  padding: 10px;
`;

const StyledGrid = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-bottom: ${width / 2 - 64};
`;

export default function App() {
  const [track, setTrack] = useState(null);

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

  const songs = [
    {
      id: 1,
      title: "Myself",
      artist: "Bazzi",
      artwork: require("./assets/bazzi-cosmic.jpg"),
    },
    {
      id: 2,
      title: "FRIENDS",
      artist: "Marshmello",
      artwork: require("./assets/162476309_07adeb.jpg"),
    },
    {
      id: 3,
      title: "Lookdown",
      artist: "Levianth",
      artwork: require("./assets/levianth.jpg"),
      url: require("./assets/Lookdown.mp3"),
    },
    {
      id: 4,
      title: "ROXANNE",
      artist: "Arizona Zervas",
      artwork: require("./assets/arizona.jpg"),
    },
    {
      id: 5,
      title: "Find a Way",
      artist: "Vallas",
      artwork: require("./assets/vallas.jpg"),
    },
    {
      id: 6,
      title: "Ashes",
      artist: "Stellar",
      artwork: require("./assets/stellar.jpg"),
    },
    {
      id: 7,
      title: "No Type",
      artist: "Rae Sremmurd",
      artwork: require("./assets/sremmurd.jpg"),
    },
    {
      id: 8,
      title: "Not Today",
      artist: "Unlike Pluto",
      artwork: require("./assets/pluto.jpg"),
    },
    {
      id: 9,
      title: "Missed",
      artist: "Mikebøi",
      artwork: require("./assets/mikeboy.jpg"),
    },
    {
      id: 10,
      title: "Riding",
      artist: "Aries",
      artwork: require("./assets/aries.jpg"),
    },
    {
      id: 10,
      title: "A Little Messed Up",
      artist: "june",
      artwork: require("./assets/june.jpg"),
    },
  ];

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
      id: "trackId",
      url: require("./assets/Lookdown.mp3"),
      title: "Track Title",
      artist: "Track Artist",
    });

    // Start playing it
    await TrackPlayer.play();
  };
  start();

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NativeRouter>
      <StatusBar backgroundColor="transparent" translucent />
      <GlobalStyle>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <StyledHeader style={{ fontFamily: "Poppins_700Bold" }}>
                  Welcome back!
                </StyledHeader>
                <StyledGrid>
                  {songs.map((song, index) => (
                    <Card
                      key={index}
                      title={song.title}
                      artwork={song.artwork}
                      artist={song.artist}
                      id={song.id}
                    >
                      {song.title}
                    </Card>
                  ))}
                </StyledGrid>
              </ScrollView>
            }
          />
          <Route
            path="/search"
            element={
              <View>
                <StyledText>Search!</StyledText>
              </View>
            }
          />
          <Route
            path="/list"
            element={
              <View>
                <StyledText>List!</StyledText>
              </View>
            }
          />
          <Route path="/track/:id" element={<Track />} />
        </Routes>
      </GlobalStyle>
      <Shadow distance={96} startColor={"#000000"} finalColor={"#00000000"}>
        <NavMenu>
          <Text>Dummy view</Text>
        </NavMenu>
      </Shadow>
      <NavMenu>
        <StyledLink>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} size={32} color="white" />
          </Link>
        </StyledLink>
        <StyledLink>
          <Link to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} size={32} color="white" />
          </Link>
        </StyledLink>
        <StyledLink>
          <Link to="/list">
            <FontAwesomeIcon icon={faBarsStaggered} size={32} color="white" />
          </Link>
        </StyledLink>
      </NavMenu>
    </NativeRouter>
  );
}
