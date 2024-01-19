import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  ChevronDown,
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  Github,
} from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MusicContext } from '../../contexts/music-player-context';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';

export const PlayerPage = ({ navigation }: any) => {
  const TITLE_CHARACTERS_LIMIT = 60;
  const ARTIST_CHARACTERS_LIMIT = 15;
  const { styles } = useStyles(stylesheet);
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return null;
  }

  const getPosition = (): string => {
    const selected = musicContext.selected;
    const positionSeconds = Math.floor(selected.position);
    const position = `${Math.floor(positionSeconds / 60)}:${(
      Math.floor(positionSeconds) % 60
    )
      .toString()
      .padStart(2, '0')}`;
    return position;
  };

  const getDuration = (): string => {
    const selected = musicContext.selected;
    const durationSeconds = Math.floor(selected.duration);
    const position = `${Math.floor(durationSeconds / 60)}:${(
      Math.floor(durationSeconds) % 60
    )
      .toString()
      .padStart(2, '0')}`;
    return position;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Music')}>
          <ChevronDown strokeWidth={3} color={'#FFF'} size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Musy Player</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Github strokeWidth={3} color={'#FFF'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Image
          source={require('../../assets/song-icon.png')}
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.body}>
            <Text style={styles.title}>
              {musicContext.selected.title.substring(0, TITLE_CHARACTERS_LIMIT)}
            </Text>
            <Text style={styles.text}>
              {musicContext.selected.artist.substring(
                0,
                ARTIST_CHARACTERS_LIMIT,
              )}
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Volume2 strokeWidth={2} color={'#FFF'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ListMusic strokeWidth={2} color={'#FFF'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Shuffle strokeWidth={2} color={'#FFF'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Repeat strokeWidth={2} color={'#FFF'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Heart strokeWidth={2} color={'#FFF'} size={25} />
            </TouchableOpacity>
          </View>
          <View>
            <Slider
              style={styles.progress}
              minimumTrackTintColor="#ECECEC"
              maximumTrackTintColor="#1A1A1A"
              thumbTintColor="#ECECEC"
              minimumValue={0}
              maximumValue={Math.floor(musicContext.selected.duration)}
              value={Math.floor(musicContext.selected.position)}
              onValueChange={position => {
                TrackPlayer.seekTo(Math.floor(position));
              }}
            />
            <View style={styles.timer}>
              <Text style={styles.text}>{getPosition()}</Text>
              <Text style={styles.text}>{getDuration()}</Text>
            </View>
          </View>
          <View style={styles.player}>
            <TouchableOpacity
              onPress={() => {
                musicContext.previous();
              }}>
              <SkipBack strokeWidth={3} size={45} color={'#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (musicContext.playing) {
                  TrackPlayer.stop();
                } else {
                  TrackPlayer.play();
                }
              }}>
              {musicContext.playing ? (
                <Pause strokeWidth={3} size={45} color={'#FFF'} />
              ) : (
                <Play strokeWidth={3} size={45} color={'#FFF'} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                musicContext.next();
              }}>
              <SkipForward strokeWidth={3} size={45} color={'#FFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  content: {
    width: '80%',
    height: '100%',
  },
  header: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 400,
    height: 400,
  },
  body: {
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xs,
    fontWeight: '300',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  progress: {
    height: 2,
    padding: 10,
    marginTop: 40,
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  player: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 20,
  },
}));
