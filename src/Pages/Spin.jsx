import React, { useState } from "react";

const Spin = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [prize, setPrize] = useState(null);

    const prizes = ['10 Points', '20 Points', '50 Points', '100 Points', '200 Points', '500 Points'];
    const numSegments = prizes.length;
    const segmentAngle = 360 / numSegments;

    const handleSpin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setTimeout(() => {
            setPrize(prizes[randomIndex]);
            setIsSpinning(false);
        }, 3000); // Spin duration
    };

    const wheelStyle = {
        width: '300px',
        height: '300px',
        border: '5px solid #000',
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 3s ease-out',
        transform: isSpinning ? 'rotate(3600deg)' : 'none',
    };

    const segmentStyle = {
        position: 'absolute',
        width: '50%',
        height: '50%',
        backgroundColor: '#f0f0f0',
        border: '1px solid #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: '100% 100%',
    };

    const pointerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '20px solid red',
        transform: 'translate(-50%, -100%)',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    const prizeStyle = {
        marginTop: '20px',
        fontSize: '18px',
        color: 'green',
    };

    return (
        <div className="spin-game" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <div className="wheel-container" style={{ position: 'relative', width: '300px', height: '300px', marginBottom: '20px' }}>
                <div className="wheel" style={wheelStyle}>
                    {prizes.map((prize, index) => (
                        <div key={index} className="segment" style={{ ...segmentStyle, transform: `rotate(${index * segmentAngle}deg) translate(100%, 0)` }}>
                            <span style={{ transform: `rotate(-${index * segmentAngle}deg)` }}>{prize}</span>
                        </div>
                    ))}
                </div>
                <div className="pointer" style={pointerStyle}></div>
            </div>
            <button onClick={handleSpin} disabled={isSpinning} style={buttonStyle}>
                {isSpinning ? 'Spinning...' : 'Spin'}
            </button>
            {prize && <div className="prize" style={prizeStyle}>You won: {prize}</div>}
        </div>
    );
};

export default Spin;