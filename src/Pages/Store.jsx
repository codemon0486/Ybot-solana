import AppBar from "../Components/AppBar";
import MysteryBox from "../Components/Dialogs/MysteryBox";

function Store() {
    return (
        <div>
            <div className="page">
                <main className="main">
                    <div className="inner flex flex-col gap-2">
                        <div className="page-title">Tasks</div>
                        <p className="text-sm uppercase">BOOST</p>
                        <div className="flex">
                            <MysteryBox quantity={1} stars={1} title={"Boost"} />
                            <MysteryBox quantity={5} stars={2} title={"Boost"} />
                            <MysteryBox quantity={10} stars={5} title={"Boost"} />
                        </div>
                        <p className="text-sm uppercase">Mystery Box</p>
                        <div className="flex">
                            <MysteryBox quantity={1} stars={3} title={"MysteryBox"} />
                            <MysteryBox quantity={5} stars={5} title={"MysteryBox"} />
                            <MysteryBox quantity={10} stars={10} title={"MysteryBox"} />
                        </div>
                        <p className="text-sm uppercase">Y-crystals</p>
                        <div className="flex">
                            <MysteryBox quantity={10} stars={10} title={"Y-crystals"} />
                            <MysteryBox quantity={50} stars={50} title={"Y-crystals"} />
                            <MysteryBox quantity={100} stars={100} title={"Y-crystals"} />
                        </div>
                    </div>
                </main>
                <AppBar />
            </div>
        </div>
    );
}

export default Store;
