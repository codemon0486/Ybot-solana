import React, { useContext, useState } from 'react';
import axios from 'axios';

import { PointContext } from '../../state/PointContext';
import { BACKEND_URL } from '../../constants';

import openInNewTab from '../../utils/openInNewTab'

const TaskChannelDialog = ({ taskName, channelName, url, score, setDialogOpen }) => {
    const { setUser, setPoint } = useContext(PointContext);
    const [joined, setJoined] = useState(false);

    const handleJoin = () => {
        openInNewTab(url);
        setJoined(true);
    }

    const handleClick = async () => {
        if (!joined) {
            return false;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/task/channel-task`, {
                name: taskName
            });
            const { data } = response;
            if (data?.user) {
                setUser(data?.user);
                setPoint(data?.user?.point);
            }
        }
        catch (e) {
            console.error(e.message);
        }
        finally {
            setDialogOpen(false);
        }
    }

    return (
        <div className="bottom-sheet-scroll" key={taskName}>
            <div className="text-center justify-center">
                <div className="flex w-full justify-center">
                    <img src={`/images/tasks/${taskName}.png`} alt={`${taskName} logo`} width={120} />
                </div>
                <div className="text-[32px] font-semibold leading-12">{`Join our ${channelName} channel`}</div>
                <div className="flex justify-center mt-4">
                    <button
                        style={{ border: "3px solid white" }}
                        rel="noopener noreferrer"
                        className="button button-primary text-white rounded-full text-xl p-4 font-bold"
                        onClick={handleJoin}
                    >
                        Join
                    </button>
                </div>
                <div className="flex justify-center gap-2 mt-4 items-center">
                    <div className="">
                        <img src='/images/y_token.png' width={36} />
                    </div>
                    <div className="text-[24px]">+{score}</div>
                </div>
                <button
                    rel="noopener noreferrer"
                    style={{ border: "3px solid white" }}
                    className="button text-white bg-gradient-to-b from-[#fd55f5] to-[#a32ea3] rounded-full text-xl p-4 font-bold mt-4"
                    onClick={handleClick}
                >
                    Check
                </button>
            </div>
        </div>
    )
}

export default TaskChannelDialog
