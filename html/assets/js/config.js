const config = {
    // General Settings
    serverName: "Blaze Scripts",
    logo: "assets/img/logo.png",
    
    // Background Settings
    backgroundType: "video", // Options: "video", "youtube", "image"
    background: "assets/video/background-video.mp4",
    backgroundImage: "assets/img/background.png",
    
    // YouTube-specific Configuration
    YouTubeID: "u5IuKGp2LWY",
    YouTubeStartTime: 0,
    YouTubeVolume: 0,
    YouTubeLoop: true,
    
    // Music Configuration
    enableMusic: true,
    defaultVolume: 0.1,
    musicList: [
        {name: "Western 1", path: "assets/music/western_1.mp3"},
        {name: "Western 2", path: "assets/music/western_2.mp3"},
        {name: "Western 3", path: "assets/music/western_3.mp3"},
        {name: "Western 4", path: "assets/music/western_4.mp3"},
        {name: "Western 5", path: "assets/music/western_5.mp3"},
        {name: "Western Main 1", path: "assets/music/western_main_1.mp3"},
        {name: "Western Main 2", path: "assets/music/western_main_2.mp3"},
        {name: "Western Native 1", path: "assets/music/western_native_1.mp3"},
        {name: "Western Native 2", path: "assets/music/western_native_2.mp3"},
        {name: "Western Native 3", path: "assets/music/western_native_3.mp3"},
        {name: "Main 1", path: "assets/music/main_1.mp3"}
    ],
    randomizeMusic: true,
    
    // Text Configuration
    loadingText: "Loading Server...",
    welcomeText: "Welcome, %s",
    tips: [
        "Press I to open your inventory.",
        "Use T to open the chat.",
        "Visit our Discord for help and updates.",
        "Respect other players and follow server rules.",
        "Find work in towns to earn money.",
        "Explore the world and discover hidden secrets.",
        "Horses are your most loyal companions in the Wild West."
    ],
    tipInterval: 4000,
    
    // Colors
    colors: {
        primary: "#B12A2A",
        text: "#FFFFFF",
        background: "#000000",
        overlay: "rgba(0, 0, 0, 0.1)"
    }
};
