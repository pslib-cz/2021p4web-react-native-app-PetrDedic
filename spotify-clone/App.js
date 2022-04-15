import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Alert, Button, Image } from "react-native";
import { NativeRouter, Route, Routes, Link } from "react-router-native";
import styled from "rn-css";
import { Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
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
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
var width = Dimensions.get("window").width; //full width

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

const BottomPlayer = styled.View`
  position: absolute;
  right: 16px;
  bottom: 96px;
  left: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #fff;

  border-radius: 24px;

  width: ${width - 32 + "px"};
  height: 72px;

  z-index: 1005;
`;

const StyledImage = styled.Image`
  aspect-ratio: 1;
  border-radius: 24px 0 0 24px;
  height: 72px;
  width: 72px;
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
  padding-bottom: ${width / 2};
`;

const StyledControl = styled.View`
  margin: 0px 12px 0px 16px;
`;

export const songs = [
  {
    id: 1,
    title: "Myself",
    artist: "Bazzi",
    artwork: require("./assets/bazzi-cosmic.jpg"),
    url: require("./assets/Myself.mp3"),
  },
  {
    id: 2,
    title: "FRIENDS",
    artist: "Marshmello",
    artwork: require("./assets/162476309_07adeb.jpg"),
    url: require("./assets/Friends.mp3"),
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
    url: require("./assets/Roxanne.mp3"),
  },
  {
    id: 5,
    title: "Find a Way",
    artist: "Vallas",
    artwork: require("./assets/vallas.jpg"),
    url: require("./assets/Vallas.mp3"),
  },
  {
    id: 6,
    title: "Ashes",
    artist: "Stellar",
    artwork: require("./assets/stellar.jpg"),
    url: require("./assets/Ashes.mp3"),
  },
  {
    id: 7,
    title: "No Type",
    artist: "Rae Sremmurd",
    artwork: require("./assets/sremmurd.jpg"),
    url: require("./assets/Notype.mp3"),
  },
  {
    id: 8,
    title: "Not Today",
    artist: "Unlike Pluto",
    artwork: require("./assets/pluto.jpg"),
    url: require("./assets/Today.mp3"),
  },
  {
    id: 9,
    title: "Missed",
    artist: "Mikebøi",
    artwork: require("./assets/mikeboy.jpg"),
    url: require("./assets/Missed.mp3"),
  },
  {
    id: 10,
    title: "Riding",
    artist: "Aries",
    artwork: require("./assets/aries.jpg"),
    url: require("./assets/Riding.mp3"),
  },
  {
    id: 10,
    title: "A Little Messed Up",
    artist: "june",
    artwork: require("./assets/june.jpg"),
    url: require("./assets/Messed.mp3"),
  },
];

export default function App() {
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

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false,
  });

  const [audioStatus, setAudioStatus] = useState(false);
  const [sound, setSound] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [maxSongTime, setMaxSongTime] = useState(0);
  const [currentSongTime, setCurrentSongTime] = useState(0);

  async function playSound(track, song) {
    setAudioStatus(true);
    const { sound } = await Audio.Sound.createAsync(track);
    setSound(sound);
    console.log(song);
    setCurrentSong(song);
    setCurrentSongTime(0);

    await sound.playAsync();
  }

  async function pauseSound() {
    setAudioStatus(false);
    sound.pauseAsync();
  }

  async function resumeSound() {
    setAudioStatus(true);
    sound.playAsync();
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  useEffect(() => {
    sound?.getStatusAsync().then(function (result) {
      console.log(Math.floor(result.durationMillis / 1000));
      setMaxSongTime(Math.floor(result.durationMillis / 1000));
    });

    const interval = setInterval(() => {
      sound?.getStatusAsync().then(function (result) {
        setCurrentSongTime(Math.floor(result.positionMillis / 1000));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSong]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    Audio.setIsEnabledAsync(false);
    Audio.setIsEnabledAsync(true);
  }, []);

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
                      url={song.url}
                      onPress={() => playSound(song.url, song)}
                    >
                      {song.title}
                    </Card>
                  ))}
                </StyledGrid>
              </ScrollView>
            }
          />
        </Routes>
      </GlobalStyle>
      <Shadow distance={96} startColor={"#000000"} finalColor={"#00000000"}>
        <NavMenu>
          <Text>Dummy view</Text>
        </NavMenu>
      </Shadow>
      {currentSong ? (
        <BottomPlayer>
          <StyledImage source={currentSong?.artwork}></StyledImage>
          <View style={{ marginRight: 32, width: "100%" }}>
            <Text style={{ width: "75%", textAlign: "right" }}>
              {currentSong?.artist}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 20,
                width: "75%",
                textAlign: "right",
              }}
            >
              {currentSong?.title}
            </Text>
            <Slider
              style={{ width: "80%", height: 20 }}
              minimumValue={0}
              step={1}
              maximumValue={maxSongTime}
              value={currentSongTime}
              thumbTintColor="#ff6047"
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onSlidingComplete={(value) => {
                setCurrentSongTime(value);
                sound.setPositionAsync(value * 1000);
              }}
            />
          </View>
        </BottomPlayer>
      ) : null}
      <NavMenu>
        {currentSong ? (
          <>
            <FontAwesomeIcon
              icon={faStop}
              size={32}
              color="white"
              style={{ marginLeft: 16 }}
              onPress={() => {
                Audio.setIsEnabledAsync(false);
                Audio.setIsEnabledAsync(true);
                setCurrentSong(null);
                setAudioStatus(false);
              }}
            />
            <Text style={{ color: "white", paddingLeft: 16 }}>
              {Math.floor((currentSongTime / 60) << 0)} :{" "}
              {padTo2Digits(Math.floor(currentSongTime % 60))} /{" "}
              {Math.floor((maxSongTime / 60) << 0)} :{" "}
              {padTo2Digits(Math.floor(maxSongTime % 60))}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <StyledControl>
                {sound ? (
                  !audioStatus ? (
                    <FontAwesomeIcon
                      icon={faPlay}
                      size={32}
                      color="white"
                      onPress={() => resumeSound()}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPause}
                      size={32}
                      color="white"
                      onPress={() => pauseSound()}
                    />
                  )
                ) : null}
              </StyledControl>
            </View>
          </>
        ) : (
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_600SemiBold",
              textAlign: "center",
              width: "100%",
            }}
          >
            Pick a song!
          </Text>
        )}
      </NavMenu>
    </NativeRouter>
  );
}
