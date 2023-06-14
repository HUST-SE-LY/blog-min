import { useEffect, useRef, useState } from "react";
import getMusicAxios from "../../utils/getMusicAxios";
import pauseSVG from "/src/assets/pause.svg";
import playSVG from "/src/assets/play.svg";
import arrowSVG from "/src/assets/arrow.svg";
import { playListElement } from "../../types";
import blogConfig from "../../blog.config";

export default function MusicBar() {
  const audio = useRef<HTMLAudioElement>(null);
  const [showBar, setShowBar] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playList, setPlayList] = useState<playListElement[]>([]);
  const axios = getMusicAxios();
  async function getList() {
    const result = await axios.get(`/playlist/track/all?id=${blogConfig.neteasePlayListId}`);
    setPlayList(result.data.songs);
    setCurrentSong(result.data.songs[0].name);
    const songRes = await axios.get(`/song/url?id=${result.data.songs[0].id}`);
    setCurrentUrl(songRes.data.data[0].url);
  }
  function changePlayState() {
    if (currentUrl && currentSong && audio.current) {
      if (audio.current.paused) {
        audio.current.play();
        setPlay(true);
      } else {
        audio.current.pause();
        setPlay(false);
      }
    }
  }
  async function nextSong() {
    const newIndex =
      currentIndex + 1 === playList.length ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setPlay(false);
    setCurrentSong(playList[newIndex].name);
    setCurrentUrl("");
    const songRes = await axios.get(`/song/url?id=${playList[newIndex].id}`);
    setCurrentUrl(songRes.data.data[0].url);
  }
  async function lastSong() {
    const newIndex =
      currentIndex === 0 ? playList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setPlay(false);
    setCurrentSong(playList[newIndex].name);
    setCurrentUrl("");
    const songRes = await axios.get(
      `/song/url?id=${playList[newIndex].id}`
    );
    setCurrentUrl(songRes.data.data[0].url);
  }
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <audio src={currentUrl} loop className="hidden" ref={audio}></audio>
      <div
        className="fixed z-[901] bottom-0 h-[80px] w-full left-0"
        onMouseEnter={() => {
          setShowBar(true);
        }}
        onMouseLeave={() => {
          setShowBar(false);
        }}
      >
        <div
          className={`fixed z-[902] h-[60px] grid grid-cols-3  bg-white/80 backdrop-blur-md w-full left-0 transition-all ${
            showBar ? "bottom-0" : "bottom-[-60px]"
          }`}
        >
          <div className="flex justify-center items-center">
            {currentSong && currentUrl ? (
              <p>{currentSong}</p>
            ) : (
              <div className="w-[15rem] h-[1rem] animate-pulse bg-gray-100"></div>
            )}
          </div>
          <div className="flex justify-center gap-[100px] items-center">
            <img
              src={arrowSVG}
              onClick={() => {
                lastSong();
              }}
              className="cursor-pointer block rotate-180 self-center"
              alt=""
            />
            <img
              src={play ? pauseSVG : playSVG}
              className="cursor-pointer block"
              onClick={() => {
                changePlayState();
              }}
              alt=""
            />
            <img
              src={arrowSVG}
              onClick={() => {
                nextSong();
              }}
              alt=""
              className="cursor-pointer block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
