import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { PointContext } from "../state/PointContext";

import CopyIcon from "../Svg/CopyIcon";
import ArrowLeftIcon from "../Svg/ArrowLeftIcon";

import { BACKEND_URL } from "../constants";
import RefreshIcon from "../Svg/RefreshIcon";

function Friends() {
  const navigate = useNavigate();
  const { user } = useContext(PointContext);
  const [friends, setFriends] = useState([
    { username: "KKK", point: 10000 },
    { username: "KKK", point: 10000 },
    { username: "KKK", point: 10000 },
    { username: "KKK", point: 10000 },
    { username: "KKK", point: 10000 },
  ]);

  const fetchFriends = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/get/friends`);
      const { data } = response;
      const { friends } = data;
      setFriends(friends);
    } catch (e) {
      s;
      console.log("apop@userRank", e.message);
    }
  };

  // useEffect(() => {
  //     fetchFriends();
  // }, []);

  const handleCopyToClipboard = () => {
    if (!user?.tg_id) {
      return false;
    }
    var copyText = `t.me/hamster_kombat_dev_bot/hamster_local?startapp=kentId${user?.tg_id}`;
    navigator.clipboard.writeText(copyText);
    toast.success("Invite link copied!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        width: "80%",
      },
    });
  };

  return (
    <div className="page">
      <main className="main">
        <div className="inner">
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                navigate("/account");
              }}
              className="cursor-pointer w-[24px]"
            >
              <ArrowLeftIcon />
            </div>
            <div className="page-title text-2xl">Friends</div>
          </div>
          <div className="flex flex-col bg-[#271e3d] text-center p-4 w-full rounded-2xl gap-4 mt-4">
            <div className="w-full justify-center flex text-center">
              <img
                src="/images/account/friends_invite.png"
                alt="friends invite icon"
                width={128}
              />
            </div>
            <div className="font-bold text-[18px]">
              Spread the news! Invite a friend and earn more Y-Tokens
            </div>
            <div>
              Each new friend gets you 10,000 Y-Tokens plus 2.5% of all their
              rewards
            </div>
            <div className="flex items-center">
              <button className="button rounded-full button-primary text-black p-5">
                Send Invite
              </button>
              {/* <button
                                className="button button-copy button-primary button-default"
                                onClick={handleCopyToClipboard}
                                style={{ flex: '0 0 60px', marginLeft: '6px' }}
                            >
                                <CopyIcon />
                            </button> */}
            </div>
          </div>
          <div className="bg-[#271e3d] p-4 rounded-2xl mt-4">
            <div className="flex justify-between mb-4">
              <div className="text-[18px]">Your friends</div>
              {/* <button className="w-[24px]" onClick={fetchFriends}>
                <RefreshIcon />
              </button> */}
            </div>
            {friends?.length ? (
              <div className="flex flex-col gap-2">
                {friends.map((user, index) => (
                  <div
                    className="flex items-center justify-between rounded-2xl py-1 px-2"
                    key={`friend-users-${index}`}
                    style={{
                      background: index % 2 === 1 ? "#FFF2" : "",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/avatars/1.png"
                        alt="avatar img"
                        width={48}
                      />
                      <p>{user.username}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="">
                        <img
                          src="/images/y_token.png"
                          alt="y token"
                          width={24}
                        />
                      </div>
                      <div className="text-[16px]">{user.point}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex bg-[#15140C] text-center justify-center p-4">
                <p className="text-[#4e4f50] font-semibold">{`You haven't invited anyone yet`}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Friends;
