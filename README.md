<!--
  Title: bs_loadingscreen
  Description: Customizable RedM Loading Screen - Music, Progress, and Immersion in One.
  Author: Blaze Scripts
  -->
# 🚀 bs_loadingscreen  
Customizable RedM Loading Screen - Music, Progress, and Immersion in One.

![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
![Language](https://img.shields.io/badge/language-HTML%2FCSS%2FJS-blue.svg?style=for-the-badge&logo=javascript&logoColor=white)
![Platform](https://img.shields.io/badge/platform-FiveM%2FRedM-orange?style=for-the-badge&logo=gamejolt&logoColor=white)
![Stars](https://img.shields.io/github/stars/Blaze-Scripts/bs-loadingscreen?style=for-the-badge&logo=github&color=gold)


⭐ If you find this resource helpful, please consider starring it to show your support! ⭐

## 📌 Features
- 🎵 Music support (playlist, shuffle, volume control)
- 💦 AI generated Western Music included and ready to use
- 🖼️ Background video, youtube video or image with full customization
- 📶 Dynamic progress bar synced with client load status
- 🧑 Player Personalization: Welcome message with player's name
- ⚙️ Modular config via `config.js`
- 🧱 Easy to style and integrate with your RP server branding
- 👨‍🌾 Tips: Engaging typewriter animation for tips
- 🧪 Tested with RedM Canary latest builds


> ⚠️ **IMPORTANT**: As of May 21, 2025, the loading screen feature is **only supported in RedM Canary**. You must use the Canary branch of RedM for this resource to work properly. The loading screen feature was recently re-added to RedM Canary and is not available in the stable branch (soon.).


---

## 🎬 Preview

![Preview Screenshot](https://i.imgur.com/W312rl6.jpeg)  

<div align="center">

[![YouTube Demo](https://img.shields.io/badge/🎥_Watch_Demo-YouTube-red?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/YKOX_EpNV6Q)
[![Browser Preview](https://img.shields.io/badge/🌐_Browser_Preview-Live_Demo-blue?style=for-the-badge&logo=internetexplorer&logoColor=white)](https://blazescripts.dev/loadingscreen)

</div>


## 🧰 Compatibility

| Platform | Compatible |
|----------|------------|
| RedM     | ✅ Yes (Canary) |
| FiveM    | ✅ Yes (change fxmanifest game)|

|Frameworks| Compatible |
|----------|------------|
| VORP     | ✅ Compatible |
| RSG     | ✅ Compatible |
| QBX     | ✅ Compatible |
| QBCore   | ✅ Compatible |
| ESX      | ✅ Compatible |
| Standalone  | ✅ Compatible |

**RedM Canary**: This resource requires the Canary branch of RedM.

---

## 🔧 Installation

```bash
cd resources
git clone https://github.com/Blaze-Scripts/bs-loadingscreen.git
```

1. Add the resource to your server's resources folder
2. Add `ensure bs-loadingscreen` to your server.cfg
3. Configure the `loadingscreen:externalShutdown` convar in your `server.cfg`:
   ```
   setr loadingscreen:externalShutdown false  # For automatic shutdown
   setr loadingscreen:externalShutdown true   # For manual/external shutdown
   ```
4. Customize `config.js` to match your needs
5. Done ✅

---

## ⚙️ Configuration Overview

All configuration options are available in `html/assets/js/config.js`:
Example from `config.js`:

```js
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
```

You can customize layout in `index.html` and styles in `style.css`.

---

## 📦 Exports & Events

The loading screen can be shut down automatically or manually from another resource:

### 🔄 Automatic Shutdown

Set in your server.cfg:
```
setr loadingscreen:externalShutdown false
```

With this setting, the loading screen will automatically shut down after loading is complete.

### 🛑 Manual/External Shutdown

Set in your server.cfg:
```
setr loadingscreen:externalShutdown true
```

With this setting, you need to trigger the shutdown from another resource. The resource provides a simple export to do this:

```lua
-- In your character selection or spawn script
exports['bs-loadingscreen']:shutdownLoadingScreen()
```
Use this in client-side scripts to manually hide the loading screen if needed.

#### 👤 Example Integration with Character Selection
This approach gives you precise control over when the loading screen disappears, making it perfect for character selection screens or other custom spawn systems.

```lua
-- In your character selection script
CharacterSelect = function()
    DoScreenFadeOut(300)
    
    -- Shutdown the loading screen before showing character selection
    exports['bs-loadingscreen']:shutdownLoadingScreen()
    
    -- Continue with character selection setup
    -- ...
end
```
---

## 💡 Tips & Known Issues

- Large video files may delay screen load – optimize or compress video
- Use `.ogg` or `.mp3` audio formats for best browser compatibility
- The script doesn’t block connection – it’s purely visual
- YouTube overlay (Title) may be visible for a short time during loading

### 🖼️ Changing Background
- For video: Place MP4 files in `html/assets/video/` and update config
- For image: Place image files in `html/assets/img/` and update config
- For YouTube: Set `backgroundType` to "youtube" and provide a `YouTubeID`

### 🎵 Adding Music
1. Place MP3 files in `html/assets/music/`
2. Add entries to the `musicList` in config.js

### 🚀 How to switch to RedM Canary

1. Open the FiveM/RedM launcher
2. Go to Settings
3. Under the "Game" section, check "Enable Canary release channel"
4. Restart the launcher
5. Make sure RedM is now showing "Canary" in its version

---

## 🔗 Links

- 🧾 GitHub: [Blaze-Scripts/bs-loadingscreen](https://github.com/Blaze-Scripts/bs-loadingscreen)
- 💬 Support & Feedback: [Join our Discord](https://discord.gg/xUcj2R4ZX4)
- 👀 More Scripts: [Blaze Scripts](https://github.com/Blaze-Scripts/)
---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Attribution appreciated. Don’t resell without consent.

### ⚖️ Asset Usage Rights

- **Code**: MIT License, free to use, modify and redistribute
- **Music**: Created with SUNO AI, commercial rights owned by Blaze Scripts. Only usage rights are granted.

### 👏 Credits

- Created by Blaze Scripts
- Music created with SUNO AI (Commercial rights owned by Blaze Scripts, usage rights granted to users)
- Background video credits: Milky Way, Inc. (https://www.youtube.com/watch?v=u5IuKGp2LWY)
- Special thanks to QBOX Team for their loading screen implementation which helped understand loading processes

