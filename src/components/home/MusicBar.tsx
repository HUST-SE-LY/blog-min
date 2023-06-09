import { useEffect, useState } from "react";
import getMusicAxios from "../../utils/getMusicAxios";
import pauseSVG from "/src/assets/pause.svg";
import playSVG from "/src/assets/play.svg";
import arrowSVG from "/src/assets/arrow.svg";
import { playListElement } from "../../types";

export default function MusicBar() {
  const [showBar, setShowBar] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [playList, setPlayList] = useState<playListElement[]>([]);
  const axios = getMusicAxios();
  async function getList() {
    const result = await axios.get(`/playlist/track/all?id=2517473337`);
    console.log(result.data.songs)
    setPlayList(result.data.songs);
    setCurrentSong(result.data.songs[0].name);
  }
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
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
          className={`fixed z-[902] h-[80px] grid grid-cols-3  bg-white/80 backdrop-blur-md w-full left-0 transition-all ${
            showBar ? "bottom-0" : "bottom-0"
          }`}
        >
          <div className="absolute h-[5px] w-full bg-blue-400 top-[-5px]"></div>
          <div>
            {
              
            }
          </div>
          <div className="flex justify-center gap-[100px] items-center">
            <img
              src={arrowSVG}
              className="block rotate-180 self-center"
              alt=""
            />
            <img src={play ? pauseSVG : playSVG} className="block" alt="" />
            <img src={arrowSVG} alt="" className="block" />
          </div>
        </div>
      </div>
    </>
  );
}
