import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

export const UserBalance = ({ point }) => {
    const [currentPoint, setCurrentPoint] = useState(point);

    const pointRef = useRef({
        value: point
    });

    useEffect(() => {
        setCurrentPoint(prev => {
            pointRef.current.value = prev;
            return point;
        });
    }, [point])

    return (
        <div className="flex items-center" style={{ transform: 'scale(1) translateZ(0px)', opacity: 1 }}>
            <div className="flex items-center gap-2 justify-center w-full">
                <div className="">
                    <img className="" src="/images/y_token.png" width={48} height={48} />
                </div>
                <CountUp
                    start={pointRef.current.value}
                    end={currentPoint}
                    duration={1}
                    decimal=","
                >
                    {({ countUpRef }) => (
                        <p className="text-[32px]" ref={countUpRef} />
                    )}
                </CountUp>
            </div>
        </div>
    )
}