import { useContext, useEffect, useState } from "react";
import AppBar from "../Components/AppBar";
import { PointContext } from "../state/PointContext";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { Spinner } from "../Components/Spinner";
import convert from "../utils/convert";

function League() {
  const { user } = useContext(PointContext);
  const [userRank, setUserRank] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const players = [
    {
      rank: 1,
      name: "Raquel",
      points: 550000,
      avatar: "./images/avatars/1.png",
      isChampion: true,
    },
    {
      rank: 2,
      name: "Maria",
      points: 400000,
      avatar: "./images/avatars/2.png",
    },
    {
      rank: 3,
      name: "Draco",
      points: 320000,
      avatar: "./images/avatars/3.png",
    },
  ];
  useEffect(() => {
    const fetchUserRank = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/user/get/all`);
        const { data } = response;
        const { users } = data;
        const sortedUsers = users.sort((a, b) => (b.point > a.point ? 1 : -1));
        setUserRank(sortedUsers);
      } catch (e) {
        console.log("apop@userRank", e.message);
      } finally {
        setLoading(false);
      }
      return false;
    };
    fetchUserRank();
  }, []);

  return (
    <div className="page ">
      <main className="main">
        <div className="inner">
          <p className="page-title text-2xl">Leaderboard</p>
          <div className="app-bar-nav mt-36 flex justify-around gap-2 relative p-2">
            <div
              className={`p-2 bg-[#1A1822] h-24  rounded-2xl flex justify-start w-full`}
            >
              <div>
                <img
                  className="absolute bottom-20 right-8 border-4 border-[#934C27] rounded-full"
                  src="/images/avatars/2.png"
                  alt="task logo"
                  width={90}
                />
                <img
                  src="./images/league/badge (2).png"
                  className="right-[60px] bottom-[62px] absolute z-50"
                  alt="badge"
                ></img>
                <p className="absolute z-50 p-9">Maria</p>
                <div className="flex absolute z-50 left-10 top-[74px] bg-[#333139] p-1 rounded-2xl gap-1">
                  <div className="">
                    <img src="/images/y_crystal.png" alt="y token" width={16} />
                  </div>
                  <div className="">400K</div>
                </div>
              </div>
              <div className={`rounded-2xl bg-[#211F28]`}>
                <img
                  src="./images/league/vector.png"
                  className="absolute left-[134px] bottom-[196px]"
                  alt="vector"
                ></img>
                <img
                  src="/images/avatars/1.png"
                  className="absolute right-[148px] bottom-32 z-50 border-4 border-[#FFFCA8] rounded-full"
                  alt="store logo"
                  width={90}
                />
                <img
                  src="./images/league/badge.png"
                  className="left-[180px] bottom-[108px] absolute z-50"
                  alt="badge"
                ></img>
                <p className="absolute left-44 z-50">Raqel</p>
                <div className="flex absolute left-[166px] z-50 top-10 bg-[#333139] p-1 rounded-2xl gap-1">
                  <div className="">
                    <img src="/images/y_crystal.png" alt="y token" width={16} />
                  </div>
                  <div className="">550K</div>
                </div>
              </div>

              <div className="bg-[#211F28] rounded-t-full absolute h-40 w-32 m-auto left-[135px] bottom-2"></div>

              <div>
                <img
                  src="/images/avatars/3.png"
                  className="bottom-20 absolute left-8 border-4 border-[#D6D6D6] rounded-full"
                  alt="daily bonus"
                  width={90}
                />
                <img
                  src="./images/league/badge (1).png"
                  className="left-[54px] bottom-[62px] absolute z-50"
                  alt="badge"
                ></img>
                <p className="absolute right-14 top-[50px]">Draco</p>
                <div className="flex right-[42px] top-[72px] absolute gap-1 bg-[#333139] p-1 rounded-2xl">
                  <div className="">
                    <img src="/images/y_crystal.png" alt="y token" width={16} />
                  </div>
                  <div className="">320K</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 bg-[#14121C] p-4 rounded-2xl">
            {!isLoading ? (
              userRank.map((_user, index) => (
                <div
                  className={`bg-[#333139] flex rounded-3xl justify-between items-center py-2 px-4`}
                  key={`level-users-${index}`}
                >
                  <div className="flex items-center">
                    <div className="">{index + 1}</div>
                    <div className="px-2">
                      <img
                        src={`/images/avatars/${_user.level}.png`}
                        alt={`avatar ${_user.level}`}
                        width={48}
                      />
                    </div>
                    <div className="">{_user.username}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="">
                      <img src="/images/y_token.png" alt="y token" width={36} />
                    </div>
                    <div className="">{_user.point.toLocaleString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </main>
      <AppBar />
    </div>
  );
}

export default League;
