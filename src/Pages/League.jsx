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

    useEffect(() => {
        const fetchUserRank = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/get/all`);
                const { data } = response;
                const { users } = data;
                const sortedUsers = users.sort((a, b) => (b.point > a.point ? 1 : -1))
                setUserRank(sortedUsers)
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
        <div className="page">
            <main className="main">
                <div className="inner">
                    <p className="page-title">Leaderboard</p>
                    <div className="mt-4 flex flex-col gap-2">
                        {!isLoading ?
                            userRank.map((_user, index) => (
                                <div
                                    className={`bg-[#15140C] flex rounded-2xl justify-between items-center p-2`}
                                    key={`level-users-${index}`}
                                >
                                    <div className="flex items-center">
                                        <div className="">{index + 1}</div>
                                        <div className="">
                                            <img src={`/images/avatars/${_user.level}.png`} alt={`avatar ${_user.level}`} width={48} />
                                        </div>
                                        <div className="">
                                            {_user.username}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="">
                                            <img src="/images/y_token.png" alt="y token" width={36} />
                                        </div>
                                        <div className="">{_user.point.toLocaleString()}</div>
                                    </div>
                                </div>
                            )
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <Spinner />
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>
            <AppBar />
        </div>
    );
}

export default League;
