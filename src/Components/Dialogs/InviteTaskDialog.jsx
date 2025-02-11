import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { PointContext } from '../../state/PointContext';
import { BACKEND_URL } from "../../constants";

const InviteTaskDialog = ({ setDialogOpen }) => {
    const { setUser, setPoint } = useContext(PointContext);
    const navigate = useNavigate();

    const handleCheckInvite = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/task/invite-check`);
            if (response?.data?.status === 'success') {
                setUser(response?.data?.user);
                setPoint(response?.data?.user?.point);
            }
        }
        catch (e) {
            console.error(e.message);
        }
        finally {
            toast.error(`Task isn't completed.`)
            setDialogOpen('');
        }
    }

    return (
        <>
            <div className="bottom-sheet-scroll">
                <div className="text-center justify-center">
                    <div className="flex w-full justify-center">
                        <img src="/images/tasks/invite-task.png" alt="invite friends logo" width={120} />
                    </div>
                    <div className="text-[32px] font-semibold leading-12">Invite 3 friends</div>
                    <div className="flex justify-center gap-2 mt-4 items-center">
                        <div className="">
                            <img src='/images/y_token.png' width={36} />
                        </div>
                        <div className="text-[24px]">+25,000</div>
                    </div>
                    <div
                        onClick={() => { navigate('/friends') }}
                        rel="noopener noreferrer"
                        className="button button-primary !bg-[#FFD600] !text-black button-small mt-4"
                    >
                        Invite
                    </div>
                    <button className="button button-primary button-default mt-4" onClick={handleCheckInvite}>
                        <span>Check</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default InviteTaskDialog;
