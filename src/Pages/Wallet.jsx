import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PointContext } from "../state/PointContext";
import Proivders from "../state/WalletProvider";

import WalletConnectDialog from "../Components/Dialogs/WalletConnectDialog";
import ArrowLeftIcon from "../Svg/ArrowLeftIcon";
import DeleteIcon from "../Svg/DeleteIcon";

import { AIRDROP_TASK_NAME } from "../constants";

const Wallet = () => {
  const navigate = useNavigate();
  const { user } = useContext(PointContext);
  const [isDialogOpen, setDialogOpen] = useState("");

  const checkTask = () => {
    const task = user.tasks?.find((value) => value.name == AIRDROP_TASK_NAME);
    return !!task && user?.wallet_address;
  };

  return (
    <Proivders>
      <div className="page">
        <main className="main">
          <div className="inner">
            <div className="flex items-center gap-2 mb-4">
              <div
                onClick={() => {
                  navigate("/account");
                }}
                className="cursor-pointer w-[24px]"
              >
                <ArrowLeftIcon />
              </div>
              <div className="page-title text-2xl">Wallet</div>
            </div>
            <div className="flex flex-col bg-[#15140c] text-center p-4 w-full rounded-2xl gap-4">
              <div className="w-full justify-center flex text-center">
                <img
                  src="/images/account/wallet_connect.png"
                  alt="wallet connect icon"
                  width={128}
                />
              </div>
              <div className="font-bold py-5 text-[18px]">
                Spread the news! Invite a friend and earn more Y-Tokens
              </div>
              <div>
                Each new friend gets you 10,000 Y-Tokens plus 2.5% of all their
                rewards
              </div>
              {checkTask() && (
                <div className="button button-primary button-default mx-auto w-[90%]">
                  You connected with{" "}
                  <span>{`${user?.wallet_address?.slice(
                    0,
                    4
                  )}...${user?.wallet_address?.slice(-6)}`}</span>
                </div>
              )}
              <div
                className="button button-primary rounded-full p-4 mx-auto w-[90%]"
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                <div className="">
                  <div className="">
                    {!checkTask()
                      ? `Change  your wallet`
                      : `Connect your Solana wallet`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div
          className="bottom-sheet"
          style={{ display: isDialogOpen ? "flex" : "none" }}
        >
          <div
            className="bottom-sheet-bg"
            style={{ touchAction: "none", userSelect: "none" }}
          />
          <div className="bottom-sheet-inner !border-2 !border-cyan-500">
            <div
              className="bottom-sheet-close"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              <DeleteIcon />
            </div>
            {isDialogOpen && (
              <WalletConnectDialog user={user} setDialogOpen={setDialogOpen} />
            )}
          </div>
        </div>
      </div>
    </Proivders>
  );
};

export default Wallet;
