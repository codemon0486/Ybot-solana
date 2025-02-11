import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { retrieveLaunchParams, initSwipeBehavior } from "@telegram-apps/sdk";

import { BACKEND_URL, IS_PRODUCTION } from "../constants";

if (IS_PRODUCTION) {
    try {
        const { initDataRaw } = retrieveLaunchParams();
        console.log(initDataRaw);
        axios.defaults.headers.Authorization = `tma ${initDataRaw}`;
    } catch (e) {
        console.log(e.message);
    }
} else {
    axios.defaults.headers.Authorization = `tma user=%7B%22id%22%3A7483219571%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Gig%22%2C%22username%22%3A%22crypos0319%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5685883691974505385&chat_type=private&auth_date=1721573593&hash=2deeed63ff5c53699feaafaa02eb5b0b3dcca9376d0bdaac560f52e22cbaa9d2`;
}

export const PointContext = createContext({
    point: 1000,
    setPoint: () => { },
});

let lastUpdatedTime = 0;
let remainTimeInterval = 0;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log("Query variable %s not found", variable);
}

export const PointContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "unknown",
        point: 2000,
        level: 1,
    });

    const [level, setLevel] = useState(1);
    const [point, setPoint] = useState(0);
    const [mysteryBox, setMysteryBox] = useState(0)
    const [yCrystal, setYCrystal] = useState(0)
    const [boosts, setBoosts] = useState(0)

    const [initialized, setInitialized] = useState(true);
    const [farming, setFarming] = useState(false)
    const [remainTime, setRemainTime] = useState(0);

    const [username, setUserName] = useState("unknown");

    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const startParam = getQueryVariable("tgWebAppStartParam");
                const response = await axios.post(`${BACKEND_URL}/api/auth`, {
                    startParam: IS_PRODUCTION ? startParam : "kentId7483219571",
                });

                const { data } = response;
                setUser(data.user);

                let {
                    level,
                    point,
                    username,
                    tasks,
                    mystery_box,
                    boosts,
                    y_crystal
                } = data.user;

                setLevel(level);
                setPoint(point);
                setMysteryBox(mystery_box);
                setBoosts(boosts);
                setYCrystal(y_crystal);
                setUserName(username);
                setTasks(tasks);

                if (data?.remainTime > 0) {
                    setRemainTime(data?.remainTime);
                    setFarming(data?.remainTime > 0);
                }
            } catch (e) {
                console.log("app@autherror", e.message);
            } finally {
                setLoading(false);
                if (IS_PRODUCTION) {
                    const [response] = initSwipeBehavior();
                    const swipe = await response;
                    swipe.disableVerticalSwipe();
                }
            }
        };

        const updateUser = async (userData) => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/update`, {
                    ...userData,
                });
                const { data } = response;
                return data.user;
            } catch (e) {
                console.log("app@updateUser", e.message);
            }
        };

        const lastSyncAt = localStorage.getItem("app@sync_at");
        const localUserData = localStorage.getItem("app@user_info");
        if (localUserData) {
            const userData = JSON.parse(localUserData);
            if (+lastSyncAt <= +userData.updated_at) {
                updateUser({ ...userData }).then(() => {
                    fetchUserData();
                    lastUpdatedTime = new Date().getTime();
                    localStorage.setItem("app@sync_at", lastUpdatedTime);
                });
            } else {
                fetchUserData();
            }
        } else {
            fetchUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const updateUser = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/update`, {
                    level,
                    exchange,
                    profitPerHour,
                    point,
                    energyLimit,
                    pointPerClick,
                    energyLimitLevel,
                    multiTapLevel,
                });
                const { data } = response;
                return data.user;
            } catch (e) {
                console.log("app@updateUser", e.message);
            }
        };

        const currentTime = new Date().getTime();

        // check if synced before 5s
        if (currentTime - lastUpdatedTime > 5000 && !loading) {
            updateUser().then((_user) => {
                if (_user) {
                    setUser(_user);
                    let {
                        level,
                        point,
                        username,
                        tasks,
                    } = _user;

                    setLevel(level);
                    setPoint(point);
                    setUserName(username);
                    setTasks(tasks);
                }

                lastUpdatedTime = new Date().getTime();
                localStorage.setItem("app@sync_at", lastUpdatedTime);
            });
        } else {
            let userData = {
                point,
                level,
            };
            userData.updated_at = new Date().getTime();

            if (user?.tg_id) {
                localStorage.setItem("app@user_info", JSON.stringify(userData));
            }
        }

    }, [level, point, loading, user?.tg_id]);

    useEffect(() => {
        clearInterval(remainTimeInterval);
        remainTimeInterval = setInterval(() => {
            setRemainTime(prev => {
                if (prev <= 0) {
                    setRemainTime(0);
                    setFarming(false);
                    clearInterval(remainTimeInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000)
    }, [farming])

    return (
        <PointContext.Provider
            value={{
                point,
                setPoint,
                level,
                setLevel,
                user,
                setUser,
                initialized,
                setInitialized,
                username,
                tasks,
                setTasks,
                remainTime,
                setRemainTime,
                farming,
                setFarming,
                yCrystal,
                setYCrystal,
                boosts,
                setBoosts,
                mysteryBox,
                setMysteryBox
            }}
        >
            {children}
        </PointContext.Provider>
    );
};


