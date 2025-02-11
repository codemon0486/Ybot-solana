import { useContext, useEffect, useState } from "react";
import AppBar from "../Components/AppBar";
import { PointContext } from "../state/PointContext";
import { BACKEND_URL, DAILY_REWARD_LIST } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "../Components/Spinner";
import convert from "../utils/convert";

function DailyBonus() {
  const { setPoint, setUser } = useContext(PointContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState("");
  const [days, setDays] = useState(0);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const totalSteps = 7;
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
        setLoading(false);
      }
      return false;
    };
    fetchDailyReward();
    if (totalSteps < 7) {
      setInterval(() => setCurrentStep(totalSteps + 1), 86400000);
    } else {
      setCurrentStep(1);
    }
  }, [setPoint]);

  const handleClaim = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/task/claim-daily`);
      const { data } = response;
      const { days, available, user, status } = data;

      setAvailable(available);
      setDays(days);
      setDialogOpen(false);

      if (status == "success") {
        setUser(user);
        setPoint(user?.point);
        toast.success("Successfully Claimed");
      } else {
        toast.error("Claim Failed.");
      }
    } catch (e) {
      console.error(e.message);
      toast.error("Claim Failed.");
    }
    return false;
  };

  return (
    <div>
      <div className="page">
        <main className="main">
          <img
            src={`${
              available
                ? "/images/reward_open.png"
                : "/images/reward_claimed.png"
            }`}
            className="w-full absolute"
          />
          <div className="inner mt-[500px]">
            <div className="flex items-center justify-center">
              {[...Array(totalSteps)].map((_, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep >= stepNumber;
                const isCompleted = currentStep > stepNumber;
                return (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
                        isCompleted
                          ? "bg-[#FF98F2] text-black"
                          : isActive
                          ? "bg-[#FF98F2] text-black border-[6px] border-black w-10 h-10 border-double"
                          : "bg-[#0f121f]"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < totalSteps && (
                      <div
                        className={`h-1 w-5 ${
                          isCompleted ? "bg-[#FF98F2]" : "bg-[#0f121f]"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xl p-4">Daily Reward</p>
            <ul className="my-2 flex justify-center">
              {!loading ? (
                Array(1)
                  .fill(1)
                  .map((value, index) => (
                    <li
                      className={`flex items-center ${
                        days > index
                          ? ""
                          : days == index && available
                          ? "is-current"
                          : "cursor-not-allowed opacity-50"
                      } `}
                      key={`daily-reward-${index}`}
                    >
                      <div className="flex items-center !bg-[#0f121f] py-2 px-4 rounded-3xl">
                        <img
                          src="/images/y_token.png"
                          alt="y token"
                          width={36}
                        />
                        <p className="p-1">
                          {convert(DAILY_REWARD_LIST[index]?.point)}
                        </p>
                      </div>
                      <div className="flex items-center mx-4 !bg-[#0f121f] py-2 px-4 rounded-3xl">
                        <img
                          src="/images/y_crystal.png"
                          alt="y crystal"
                          width={36}
                        />
                        <p className="p-1">
                          {convert(DAILY_REWARD_LIST[index]?.crystal)}
                        </p>
                      </div>
                      <div className="flex items-center !bg-[#0f121f] py-2 px-4 rounded-3xl">
                        <img src="/images/boosts.png" alt="boosts" width={36} />
                        <p className="p-1">
                          {convert(DAILY_REWARD_LIST[index]?.boosts)}
                        </p>
                      </div>
                    </li>
                  ))
              ) : (
                <Spinner />
              )}
            </ul>
            <div className="mb-4">
              <p className="text-center text-[18px]">
                Come back tomorrow to get more rewards. Skipping a day resets
                your check-ins.
              </p>
            </div>
            <div className="w-full bottom-24">
              <button
                className="button button-primary button-default mx-auto w-[90%] mb-4"
                onClick={handleClaim}
                disabled={!available}
              >
                Claim
              </button>
            </div>
          </div>
        </main>
        <AppBar />
      </div>
    </div>
  );
}

export default DailyBonus;
