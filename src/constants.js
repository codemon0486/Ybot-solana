export const IS_PRODUCTION = false;

export const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const TOP_LEVEL = LEVELS.length + 1;
export const LEVEL_POINTS = [
  0, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 100000000,
];

export const BACKEND_URL = IS_PRODUCTION
  ? "https://monster-kombat-backend.onrender.com"
  : "http://153.92.211.162:8080";
export const FRONTEND_URL = IS_PRODUCTION
  ? "https://monster-kombat-frontend.onrender.com"
  : "http://localhost:5173";
export const FRONTEND_DOMAIN = IS_PRODUCTION
  ? "monster-kombat-frontend.onrender.com"
  : "localhost:5173";

export const DAILY_REWARD_LIST = [
  { point: 500, crystal: 0, boosts: 0 },
  { point: 1000, crystal: 0, boosts: 0 },
  { point: 1500, crystal: 0, boosts: 0 },
  { point: 2000, crystal: 0, boosts: 0 },
  { point: 2500, crystal: 0, boosts: 0 },
  { point: 3000, crystal: 0, boosts: 0 },
  { point: 3500, crystal: 0, boosts: 0 },
  { point: 4000, crystal: 0, boosts: 0 },
  { point: 4500, crystal: 0, boosts: 0 },
  { point: 5000, crystal: 0, boosts: 0 },
  { point: 5500, crystal: 0, boosts: 0 },
  { point: 6000, crystal: 0, boosts: 0 },
];

export const MAINNET_RPC_ENDPOINT =
  "https://rpc.shyft.to?api_key=PxS3KZVzhndyCMWb";

export const FARMING_SECONDS = 86400;
export const POINT_PER_FARMING = 10000;

export const AIRDROP_TASK_NAME = "airdrop-task";

export const TASK_LIST_NAME = [
  "Youtube",
  "Instagram",
  "Telegram",
  "X",
  "Invite Task",
];
export const TASK_LIST = [
  "youtube-channel",
  "instagram-channel",
  "tg-channel",
  "x-channel",
  "invite-task",
];
export const TASK_LIST_SCORE = [10000, 10000, 5000, 10000, 5000];
export const TASK_LIST_LINKS = [
  "https://youtube.com/@pupilz404?si=6npHM8969Z5zH23N",
  "https://www.instagram.com/pupilz404?igsh=MXF2NnNiZHZnd2M0dA%3D%3D&utm_source=qr",
  "https://t.me/pupilz404",
  "https://x.com/pupilz404",
  "",
];

export const GAME_DATE = [
  {
    title: "Roulette",
    link: "/roulette",
    backgroundImage: "/images/slider/roulette.png",
    overlayImagePrimary: "/images/slider/1K_chip1.svg",
    overlayImagePrimaryClasses: "absolute -top-8 -left-8 w-34 h-34",
    overlayImageSecondary: "/images/slider/10K_chip2.svg",
    overlayImageSecondaryClasses:
      "absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16",
    colors: {
      gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    },
  },
  {
    title: "Flappy Bird",
    link: "/flappy-bird",
    backgroundImage: "/images/slider/flappy_bird.png",
    overlayImagePrimary: "/images/slider/fpap_1.svg",
    overlayImagePrimaryClasses: "absolute -top-4 -left-8 w-14 h-14",
    overlayImageSecondary: "/images/slider/fpap_2.svg",
    overlayImageSecondaryClasses:
      "absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16",
    colors: {
      gradient: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
    },
  },
  {
    title: "Red Light - Green Light",
    link: "/red-light-green-light",
    backgroundImage: "/images/slider/image13.png",
    overlayImagePrimary: "/images/slider/red head (1).png",
    overlayImagePrimaryClasses: "absolute -top-4 -left-8 w-18 h-18",
    overlayImageSecondary: "/images/slider/red head.png",
    overlayImageSecondaryClasses:
      "absolute -right-14 top-1/2 -translate-y-1/2 w-22 h-22",
    colors: {
      gradient: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
    },
  },
];
