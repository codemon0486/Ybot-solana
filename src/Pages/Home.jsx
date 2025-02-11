import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { PointContext } from "../state/PointContext";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa6";

import { UserBalance } from "../Components/UserBalance";
import AppBar from "../Components/AppBar";

import { BACKEND_URL, FARMING_SECONDS, POINT_PER_FARMING, GAME_DATE } from "../constants";

function Home() {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    username,
    point,
    setPoint,
    remainTime,
    setRemainTime,
    farming,
    setFarming,
    yCrystal,
    level
  } = useContext(PointContext);

  const handleInitialize = async () => {
    console.log("initializing...");
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/initialize`);
      const { user } = response.data;
      setUser(user);
      setRemainTime(FARMING_SECONDS);
      setFarming(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStartFarm = async () => {
    console.log("requesting farm...");
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/farm`);
      const { user } = response.data;
      setUser(user);
      setPoint(user?.point);
      setRemainTime(FARMING_SECONDS);
      setFarming(true);
    } catch (e) {
      console.error(e);
    }
  };

  const defaultGradient = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500";
  const [auraGradient, setAuraGradient] = useState(
    GAME_DATE[0]?.colors?.gradient || defaultGradient
  );

  return (
    <div>
      <div className="page">
        <main className="main">
          <div className="p-4 flex justify-between items-center">
            <div className="flex cursor-pointer items-center">
              <div className="flex text-center items-center gap-2" onClick={() => { navigate("/account"); }}>
                <img src={`/images/avatars/${user.level}.png`} alt="user avatar" width={48} />
                <div className="flex flex-col gap-2">
                  <p>{username.toUpperCase()}</p>
                  <div>
                    LVL {level}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#ffffff26] flex h-[24px] gap-4 rounded-2xl items-center">
              <img src="/images/y_crystal.png" alt="y token" width={24} height={24} />
              <div>{yCrystal ?? 0}</div>
              <img src="/images/add_button.png" alt="ad button" width={24} height={24} onClick={() => { navigate("/store") }} className="cursor-pointer" />
            </div>
          </div>
          <div className="mt-4">
            <UserBalance point={point} />
          </div>
          <div className="flex-grow relative h-[500px]">
            <Swiper
              slidesPerView={1.3}
              centeredSlides={true}
              spaceBetween={20}
              className="w-full h-full"
              onSlideChangeTransitionEnd={(swiper) => {
                const activeSlide = GAME_DATE[swiper.activeIndex];
                const newGradient =
                  activeSlide?.colors?.gradient || defaultGradient;
                setAuraGradient(newGradient);
              }}
            >
              {GAME_DATE.map((game, index) => (
                <SwiperSlide key={index} className="h-full relative">
                  <div
                    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  w-80 h-80 rounded-full ${game.colors.gradient} filter blur-3xl opacity-30`}
                  ></div>
                  <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2">
                    <div
                      className="relative flex slider-cadr w-64 h-52 rounded-3xl items-end"
                      style={{
                        backgroundImage: `url(${game.backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {game.overlayImagePrimary && (
                        <img
                          src={game.overlayImagePrimary}
                          alt=""
                          className={game.overlayImagePrimaryClasses}
                        />
                      )}
                      {game.overlayImageSecondary && (
                        <img
                          src={game.overlayImageSecondary}
                          alt=""
                          className={game.overlayImageSecondaryClasses}
                        />
                      )}
                      <div className="flex items-center justify-between w-full m-4 bg-[rgba(25,24,29,0.53)] p-2 px-4 rounded-full backdrop-blur-md">
                        <h3 className="w-full">{game.title}</h3>
                        <FaArrowRight size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-4">
            {!user?.initialized || !farming ? (
              <button
                className="button button-primary button-default mx-auto w-[90%] mb-4"
                onClick={
                  !user?.initialized ? handleInitialize : handleStartFarm
                }
              >
                Tap to start farming
              </button>
            ) : (
              <div>
                <div className="button button-primary button-default mx-auto !w-[90%] mb-4">
                  {(remainTime / FARMING_SECONDS) * 100}%
                </div>
                <div className="text-center">
                  <div className="text-md font-medium text-[#8b8e93]">
                    Farming {POINT_PER_FARMING / (FARMING_SECONDS / 3600)}/hr
                  </div>
                  <div className="text-md font-medium text-[#8b8e93]">
                    {`${moment
                      .duration(remainTime, "seconds")
                      .hours()
                      ?.toString()
                      .padStart(2, "0")} : ${moment
                        .duration(remainTime, "seconds")
                        .minutes()
                        ?.toString()
                        .padStart(2, "0")} : ${moment
                          .duration(remainTime, "seconds")
                          .seconds()
                          ?.toString()
                          .padStart(2, "0")} left`}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <AppBar />
      </div>
    </div>
  );
}

export default Home;
