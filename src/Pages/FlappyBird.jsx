import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FlappyBird = () => {
    const navigate = useNavigate();
    const [birdPosition, setBirdPosition] = useState(
        window.innerHeight * 0.25 - 15
    );
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        let gameInterval;
        if (isGameRunning) {
            gameInterval = setInterval(() => {
                setBirdPosition((prev) => {
                    const newPosition = prev + 2;
                    if (newPosition > window.innerHeight * 0.5 - 30 || newPosition <= 2) {
                        setIsGameRunning(false);
                        setGameOver(true);
                        return prev;
                    }
                    return newPosition;
                });
                setObstacles((prev) =>
                    prev.map((obstacle) => ({ ...obstacle, left: obstacle.left - 2 }))
                );
                setScore((prev) => prev + 1);
            }, 20);
        }
        return () => clearInterval(gameInterval);
    }, [isGameRunning]);

    useEffect(() => {
        if (isGameRunning) {
            const obstacleInterval = setInterval(() => {
                const height =
                    Math.floor(Math.random() * (window.innerHeight * 0.5 - 200)) + 50;
                setObstacles((prev) => [...prev, { height, left: window.innerWidth }]);
            }, 3000);
            return () => clearInterval(obstacleInterval);
        }
    }, [isGameRunning]);

    useEffect(() => {
        const checkCollision = () => {
            for (let obstacle of obstacles) {
                const birdLeft = window.innerWidth * 0.5 - 15;
                const birdRight = birdLeft + 30;
                const obstracleLeft = obstacle.left;
                const obstacleRight = obstacle.left + 30;
                if (
                    birdRight > obstracleLeft &&
                    birdLeft < obstacleRight &&
                    (birdPosition < obstacle.height ||
                        birdPosition > obstacle.height + 120)
                ) {
                    setIsGameRunning(false);
                    setGameOver(true);
                    return;
                }
            }
        };
        if (isGameRunning) {
            checkCollision();
        }
    }, [birdPosition, isGameRunning, obstacles]);

    const handleTap = () => {
        if (isGameRunning) {
            setBirdPosition((prev) => Math.max(prev - 30, 0));
        }
    };

    const startGame = () => {
        setBirdPosition(window.innerHeight * 0.25 - 15);
        setObstacles([]);
        setScore(0);
        setGameOver(false);
        setIsGameRunning(true);
    };

    return (
        <div
            onClick={handleTap}
            style={{
                height: "50vh",
                backgroundImage: "url(/images/flappybird/bg.png)",
                backgroundSize: "cover",
                position: "relative",
                overflow: "hidden",
                marginTop: "25vh",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: birdPosition,
                    left: "calc(50% - 15px)",
                    width: "30px",
                    height: "30px",
                    backgroundImage: "url(/images/flappybird/bird.png)",
                    backgroundSize: "cover",
                    borderRadius: "50%",
                }}
            ></div>
            {obstacles.map((obstacle, index) => (
                <div key={index}>
                    <div
                        style={{
                            position: "absolute",
                            top: `${obstacle.height - 360}px`,
                            left: obstacle.left,
                            width: "30px",
                            height: "360px",
                            backgroundImage: "url(/images/flappybird/obstacle_top.png)",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    <div
                        style={{
                            position: "absolute",
                            top: `${obstacle.height + 150}px`,
                            left: obstacle.left,
                            width: "30px",
                            height: "360px",
                            backgroundImage: "url(/images/flappybird/obstacle_bottom.png)",
                            backgroundSize: "cover",
                        }}
                    ></div>
                </div>
            ))}
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    fontSize: "24px",
                    color: "white",
                }}
            >
                Score: {score}
            </div>
            {!isGameRunning && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    {gameOver && (
                        <div
                            style={{ fontSize: "30px", color: "red" }}
                        >
                            Game Over
                        </div>
                    )}
                    <button
                        onClick={startGame}
                        style={{
                            marginTop: "20px",
                            fontSize: "24px",
                            fontWeight: "700",
                            cursor: "pointer",
                        }}
                    >
                        Start Game
                    </button>
                    {gameOver && (
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                marginTop: "20px",
                                fontSize: "24px",
                                fontWeight: "700",
                                cursor: "pointer",
                            }}
                        >
                            Go Back
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FlappyBird;
