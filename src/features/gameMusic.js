import { Howl } from "howler";
import backgroundMusicPath from "../assets/audio/background1.wav";
import chooseMusicPath from "../assets/audio/choose.mp3";
import flipMusicPath from "../assets/audio/flip.mp3";
import matchMusicPath from "../assets/audio/match.mp3";

export const backgroundMusic = new Howl({
  src: [backgroundMusicPath],
  loop: true,
  volume: 0.7,
});
export const chooseMusic = new Howl({
  src: [chooseMusicPath],
  volume: 0.8,
});
export const flipMusic = new Howl({
  src: [flipMusicPath],
  volume: 0.8,
});
export const matchMusic = new Howl({
  src: [matchMusicPath],
  volume: 0.8,
});
