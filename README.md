# bs-loadingscreen

A clean and customizable RedM loading screen.

<div align="center">

<img src="https://i.imgur.com/W312rl6.jpeg" width="600" alt="Screenshot Preview">
<a href="https://youtu.be/YKOX_EpNV6Q"><img src="https://img.youtube.com/vi/YKOX_EpNV6Q/maxresdefault.jpg" width="600" alt="Video Preview"></a>
<p><em>Click the image above to watch the video preview</em></p>
</div>

. 
> ⚠️ **IMPORTANT**: As of May 21, 2025, the loading screen feature is **only supported in RedM Canary**. You must use the Canary branch of RedM for this resource to work properly. The loading screen feature was recently re-added to RedM Canary and is not available in the stable branch (soon.).

## Features

- **Elegant Design**: Clean and modern UI with smooth animations
- **Progress Bar**: Visual feedback of loading progress
- **Music Player**: Built-in music controls with playlist support
- **Background Options**: Support for video, YouTube, or static image backgrounds
- **Typewriter Effect**: Engaging typewriter animation for tips
- **Player Personalization**: Welcome message with player's name
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Easy configuration through config.js

## Installation

### Prerequisites

- **RedM Canary**: This resource requires the Canary branch of RedM.

### How to switch to RedM Canary

1. Open the FiveM/RedM launcher
2. Go to Settings
3. Under the "Game" section, check "Enable Canary release channel"
4. Restart the launcher
5. Make sure RedM is now showing "Canary" in its version

### Resource Installation

1. Add the resource to your server's resources folder
2. Add `ensure bs-loadingscreen` to your server.cfg
3. Configure the `loadingscreen:externalShutdown` convar:
   ```
   setr loadingscreen:externalShutdown false  # For automatic shutdown
   setr loadingscreen:externalShutdown true   # For manual/external shutdown
   ```

## Configuration

All configuration options are available in `html/assets/js/config.js`:

### General Settings
- `serverName`: Your server's name
- `logo`: Path to your logo image

### Background Settings
- `backgroundType`: Choose between "video", "youtube", or "image"
- `background`: Path to video file (if using video type)
- `backgroundImage`: Path to image file (if using image type)
- `YouTubeID`: YouTube video ID (if using youtube type)

### Music Configuration
- `enableMusic`: Enable/disable music player
- `defaultVolume`: Default volume (0.0 to 1.0)
- `musicList`: Array of music tracks
- `randomizeMusic`: Randomize initial track

### Text Configuration
- `loadingText`: Text shown during loading
- `welcomeText`: Welcome message (%s is replaced with player name)
- `tips`: Array of tips to display
- `tipInterval`: Time between tips in milliseconds

### Colors
- `primary`: Primary accent color
- `text`: Text color
- `background`: Background color
- `overlay`: Overlay color and opacity

## Customization

### Adding Music
1. Place MP3 files in `html/assets/music/`
2. Add entries to the `musicList` in config.js

### Changing Background
- For video: Place MP4 files in `html/assets/video/` and update config
- For image: Place image files in `html/assets/img/` and update config
- For YouTube: Set `backgroundType` to "youtube" and provide a `YouTubeID`

### Changing Logo
1. Replace `html/assets/img/logo.png` with your own logo
2. Ensure it has a transparent background for best results

## External Shutdown

The loading screen can be shut down automatically or manually from another resource:

### Automatic Shutdown

Set in your server.cfg:
```
setr loadingscreen:externalShutdown false
```

With this setting, the loading screen will automatically shut down after loading is complete.

### Manual/External Shutdown

Set in your server.cfg:
```
setr loadingscreen:externalShutdown true
```

With this setting, you need to trigger the shutdown from another resource. The resource provides a simple export to do this:

```lua
-- In your character selection or spawn script
exports['bs-loadingscreen']:shutdownLoadingScreen()
```

#### Example Integration with Character Selection

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

This approach gives you precise control over when the loading screen disappears, making it perfect for character selection screens or other custom spawn systems.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Asset Usage Rights

- **Code**: MIT License, free to use, modify and redistribute
- **Music**: Created with SUNO AI, commercial rights owned by Blaze Scripts. Only usage rights are granted.
- **Background Video**: Credits to Milky Way, Inc. (https://www.youtube.com/watch?v=u5IuKGp2LWY)

## Credits

- Created by [Blaze Scripts](https://github.com/Blaze-Scripts)
- Music created with SUNO AI (Commercial rights owned by Blaze Scripts, usage rights granted to users)
- Background video credits: Milky Way, Inc. (https://www.youtube.com/watch?v=u5IuKGp2LWY)
- Special thanks to QBOX Team for their loading screen implementation which helped understand loading processes
