import React from 'react';

const MysteryBox = ({ quantity, stars, title }) => {
    const imageUrl = `./images/new/${title}.png`;
    const Images = (
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-2/3 translate-y-2">
            {stars >= 50 && <img src={imageUrl} alt={title} className="rotate-45" />}
            {stars === 100 && <img src={imageUrl} alt={title} className="absolute top-0 -rotate-45" />}
        </div>
    );
    return (
        <div className="items-center bg-[#18161f] rounded-md p-2 w-1/3 m-2">
            <div className="rounded-lg shadow-md relative justify-items-center">
                <img src='./images/Frame.png' alt='back' className='absolute' />
                <img src={imageUrl} alt={title} className="w-2/3 pt-1" />
                {title === "Y-crystals" && Images}
            </div>
            <div className="flex flex-col items-center gap-2 mt-5">
                <p className='text-white font-semibold'>{title}</p>
                <p>{`x${quantity}`}</p>
                <div className="flex w-full justify-center font-semibold bg-gradient-to-b rounded-full text-black p-1 from-[#f39eec] to-[#8290fa]">
                    <p>{stars}</p>
                    <img src="./images/star.png" className='w-3 h-3 ml-1' alt="" />
                </div>
            </div>
        </div>
    );
}

export default MysteryBox