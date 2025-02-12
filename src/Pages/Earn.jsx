import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { PointContext } from "../state/PointContext";

import AppBar from "../Components/AppBar";
import TaskChannelDialog from "../Components/Dialogs/TaskChannelDialog.jsx";

import DeleteIcon from "../Svg/DeleteIcon";
import CheckedIcon from "../Svg/CheckedIcon";
import ArrowRightIcon from "../Svg/ArrowRightIcon";

import { BACKEND_URL, TASK_LIST, TASK_LIST_NAME, TASK_LIST_SCORE, TASK_LIST_LINKS } from "../constants";
import InviteTaskDialog from "../Components/Dialogs/InviteTaskDialog.jsx";

function Earn() {
    const { user, setPoint, setUser } = useContext(PointContext);

    const [isDialogOpen, setDialogOpen] = useState("");
    const [days, setDays] = useState(0);
    const [available, setAvailable] = useState(true);

    const navigate = useNavigate();

    const checkTask = (name) => { return user?.tasks?.find((task) => task.name == name) ? true : false; };

    useEffect(() => {
        const fetchDailyReward = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/task/daily-task`);
                const { data } = response;
                const { days, available, point } = data;

                setAvailable(available);
                setDays(days);
                if (point != undefined) {
                    setPoint(point);
                }
            } catch (e) {
                console.log("apop@fetchDailyReward", e.message);
            } finally {
                //
            }
            return false;
        };

        fetchDailyReward();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="page">
            <main className="main">
                <div className="inner">
                    <div className="page-title">Tasks</div>
                    <div className="flex gap-2 justify-between mb-4">
                        <div className="p-4 bg-slate-900 rounded-2xl bg-opacity-50 w-[50%]">
                            <p>Task Completed</p>
                            <p className="text-[24px]">{TASK_LIST.filter(task => checkTask(task)).length}</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-2xl bg-opacity-50 w-[50%]">
                            <p>Y-TOKENS EARNED</p>
                            <div className="flex gap-2 items-center">
                                <img src="/images/y_token.png" alt="y token" width={36} />
                                <p className="text-[24px]">{TASK_LIST.filter(task => checkTask(task)).length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {
                            TASK_LIST.filter(task => !checkTask(task)).length > 0 &&
                            <div className="p-2 bg-slate-900 rounded-2xl bg-opacity-50">
                                <div className="p-2">Available</div>
                                <div className="flex flex-col gap-2">
                                    {
                                        TASK_LIST.filter(task => !checkTask(task)).map((item, i) => (
                                            <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => { setDialogOpen(item) }} key={item}>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">
                                                        <img
                                                            src={`/images/tasks/${item}.png`}
                                                            alt={`${item} icon`}
                                                            width={40}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="">
                                                            {TASK_LIST_NAME[i]}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="">
                                                                <img className="" src="/images/y_token.png" width={24} />
                                                            </div>
                                                            <div className="">+{TASK_LIST_SCORE[i].toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[24px]">
                                                    <ArrowRightIcon />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {
                            TASK_LIST.filter(task => !checkTask(task)).length > 0 &&
                            <div className="p-2 bg-slate-900 rounded-2xl bg-opacity-50">
                                <div className="p-2">Completed</div>
                                <div className="flex flex-col gap-2">
                                    {
                                        TASK_LIST.filter(task => !checkTask(task)).map((item, i) => (
                                            <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => { setDialogOpen(item) }} key={item}>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">
                                                        <img
                                                            src={`/images/tasks/${item}.png`}
                                                            alt={`${item} icon`}
                                                            width={40}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="">
                                                            {TASK_LIST_NAME[i]}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="">
                                                                <img className="" src="/images/y_token.png" width={24} />
                                                            </div>
                                                            <div className="">+{TASK_LIST_SCORE[i].toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[24px]">
                                                    <CheckedIcon />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </main >
            <AppBar />
            <div className="bottom-sheet" style={{ display: isDialogOpen ? "flex" : "none" }}>
                    <div className="bottom-sheet-bg" style={{ touchAction: "none", userSelect: "none" }} />
                    <div className="bottom-sheet-inner">
                        <div className="bottom-sheet-close" onClick={() => { setDialogOpen("") }}>
                            <DeleteIcon />
                        </div>
                        {
                            TASK_LIST.slice(0, -1).map((item, index) => (
                                isDialogOpen == item && (
                                    <TaskChannelDialog
                                        setDialogOpen={setDialogOpen}
                                        taskName={item}
                                        channelName={TASK_LIST_NAME[index]}
                                        url={TASK_LIST_LINKS[index]}
                                        score={TASK_LIST_SCORE[index]}
                                        key={item}
                                    />
                                )
                            ))
                        }
                        {
                            isDialogOpen == "invite-task" && (
                                <InviteTaskDialog
                                    setDialogOpen={setDialogOpen}
                                />
                            )
                        }
                </div>
            </div>
        </div >
    );
}

export default Earn;
