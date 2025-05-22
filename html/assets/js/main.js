// Background Elements
const backgroundVideo = document.getElementById('background-video');
const youtubeWrapper = document.getElementById('youtube-wrapper');
const youtubeContainer = document.getElementById('youtube-container');
const backgroundImage = document.getElementById('background-image');
const overlay = document.getElementById('overlay');

// Loading Elements
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');
const loadingStatus = document.getElementById('loading-status');
const loadingAction = document.getElementById('loading-action');
const finishingContainer = document.getElementById('finishing-container');

// UI Elements
const logo = document.getElementById('logo');
const welcomeText = document.getElementById('welcome-text');
const tipText = document.getElementById('tip-text');

// Music Controls
const musicPlayer = document.getElementById('music-player');
const musicControls = document.getElementById('music-controls');
const musicTitle = document.getElementById('music-title');
const musicToggle = document.getElementById('music-toggle');
const musicPrevBtn = document.getElementById('music-prev');
const musicPlayPauseBtn = document.getElementById('music-play-pause');
const musicNextBtn = document.getElementById('music-next');
const volumeIcon = document.getElementById('volume-icon');
const volumeSlider = document.getElementById('volume-slider');

// State Variables
let youtubePlayer = null;
let playerName = "Traveler";
let currentTipIndex = 0;
let tipInterval;
let typingInterval;
let currentMusicIndex = 0;
let isMusicPlaying = false;
let dataFileCount = 0;
let currentDataFile = 0;
let isShuttingDown = false;

/**
 * Initialize the loading screen with configuration from config.js
 */
function initializeLoadingScreen() {   
    document.body.classList.add('initialized');
    document.title = config.serverName;
    if (playerName) {
        welcomeText.textContent = config.welcomeText.replace('%s', playerName);
    }
    logo.src = config.logo;
    logo.onerror = () => {
        console.error("Error loading logo");
        logo.style.display = 'none';
        const textLogo = document.createElement('h1');
        textLogo.textContent = config.serverName;
        textLogo.style.color = 'white';
        document.getElementById('logo-container').appendChild(textLogo);
    };
    
    loadingText.textContent = config.loadingText;
    backgroundVideo.style.display = "none";
    youtubeWrapper.style.display = "none";
    backgroundImage.style.display = "none";
    
    switch (config.backgroundType) {
        case "video":
            if (config.background) {
                try {
                    backgroundVideo.src = config.background;
                    backgroundVideo.style.display = "block";
                    
                    backgroundVideo.onerror = (e) => {
                        console.error("Video error:", e);
                        useBackgroundImage();
                    };
                } catch (error) {
                    console.error("Error setting up local video:", error);
                    useBackgroundImage();
                }
            } else {
                console.error("No video source provided");
                useBackgroundImage();
            }
            break;
            
        case "youtube":
            if (config.YouTubeID) {
                youtubeWrapper.style.display = "block";
                if (typeof YT !== 'undefined' && YT.Player) {
                    createYouTubePlayer();
                } else {
                    window.onYouTubeIframeAPIReady = createYouTubePlayer;
                }
            } else {
                console.error("No YouTube ID provided");
                useBackgroundImage();
            }
            break;
            
        case "image":
        default:
            useBackgroundImage();
            break;
    }
    
    // Function to create YouTube player
    function createYouTubePlayer() {
        if (youtubePlayer) {
            youtubePlayer.destroy();
        }
        youtubeContainer.innerHTML = '';
        youtubePlayer = new YT.Player(youtubeContainer, {
            videoId: config.YouTubeID,
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                autohide: 1,
                showinfo: 0,
                loop: config.YouTubeLoop ? 1 : 0,
                playlist: config.YouTubeLoop ? config.YouTubeID : '',
                start: config.YouTubeStartTime || 0,
                mute: 1,
                rel: 0,
                iv_load_policy: 3,
                origin: window.location.origin,
                widget_referrer: window.location.origin,
                enablejsapi: 1,
                playsinline: 1,
            },
            events: {
                onReady: (event) => {
                    console.log("YouTube player ready");
                    event.target.setVolume(config.YouTubeVolume || 0);
                    event.target.playVideo();
                },
                onError: (event) => {
                    console.error("YouTube error:", event.data);
                    useBackgroundImage();
                }
            }
        });
    }
    
    function useBackgroundImage() {
        backgroundVideo.style.display = "none";
        youtubeWrapper.style.display = "none";
        backgroundImage.src = config.backgroundImage;
        backgroundImage.style.display = "block";
        console.log("Using background image:", config.backgroundImage);
    }
    
    document.documentElement.style.setProperty('--primary-color', config.colors.primary);
    document.documentElement.style.setProperty('--text-color', config.colors.text);
    document.documentElement.style.setProperty('--background-color', config.colors.background);
    document.documentElement.style.setProperty('--overlay-color', config.colors.overlay);
    
    if (config.tips && config.tips.length > 0) {
        showTip(0);
        tipInterval = setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % config.tips.length;
            showTip(currentTipIndex);
        }, config.tipInterval);
    }
    
    if (config.enableMusic && config.musicList && config.musicList.length > 0) {
        musicPlayer.volume = config.defaultVolume;
        volumeSlider.value = config.defaultVolume * 100;
        
        if (config.randomizeMusic) {
            currentMusicIndex = Math.floor(Math.random() * config.musicList.length);
        }
        
        loadMusic(currentMusicIndex);
        playMusic();
    } else {
        musicToggle.style.display = 'none';
    }
    
    simulateLoading();
}

// Show tip at specified index
function showTip(index) {
    if (!config.tips || config.tips.length === 0) return;
    
    tipText.style.opacity = '0';
    
    setTimeout(() => {
        tipText.textContent = config.tips[index];
        tipText.style.opacity = '1';
    }, 500);
}

// Load music track
function loadMusic(index) {
    const track = config.musicList[index];
    console.log("Loading music track:", track);
    
    try {
        musicPlayer.src = track.path;
        musicTitle.textContent = track.name;
        
        musicPlayer.onerror = (e) => {
            console.error("Error loading music:", e);
            console.error("Failed to load:", track.path);
            playNextTrack();
        };
    } catch (error) {
        console.error("Error setting music source:", error);
        setTimeout(playNextTrack, 1000);
    }
}

// Play music
function playMusic() {
    musicPlayer.play().then(() => {
        isMusicPlaying = true;
        musicPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
        console.error("Music playback failed:", error);
        isMusicPlaying = false;
        musicPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Pause music
function pauseMusic() {
    musicPlayer.pause();
    isMusicPlaying = false;
    musicPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Play next track
function playNextTrack() {
    currentMusicIndex = (currentMusicIndex + 1) % config.musicList.length;
    loadMusic(currentMusicIndex);
    playMusic();
}

// Play previous track
function playPreviousTrack() {
    currentMusicIndex = (currentMusicIndex - 1 + config.musicList.length) % config.musicList.length;
    loadMusic(currentMusicIndex);
    playMusic();
}

// Update volume
function updateVolume(value) {
    const volume = value / 100;
    musicPlayer.volume = volume;
    
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

/**
 * Display a tip with typewriter effect
 * @param {number} index - Index of the tip to display
 */
function showTip(index) {
    // Clear any existing typing animation
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    
    // Get the tip text
    const tip = config.tips[index];
    if (!tip) return;
    
    // Reset the tip text element
    tipText.textContent = "";
    
    // Type out the text character by character
    let charIndex = 0;
    typingInterval = setInterval(() => {
        if (charIndex < tip.length) {
            tipText.textContent += tip.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, 50);
}

let simulateLoadingInterval;
// Simulate loading progress
function simulateLoading() {
    if (simulateLoadingInterval) {
        clearInterval(simulateLoadingInterval);
    }

    let progress = 0;

    simulateLoadingInterval = setInterval(() => {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar && progressBar.value > 0) {
            progress = progressBar.value;
        } else {
            progress += Math.random() * 3;
        }
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(simulateLoadingInterval);
            // Entferne den automatischen Shutdown - wir lassen das die Lua-Seite handhaben
            // Der Ladebildschirm wird nur ausgeblendet, wenn isShuttingDown true ist
            // was nur passiert, wenn die prepareShutdown-Funktion aufgerufen wird
        }
        
        // Verwende den korrekten Fortschrittsbalken
        progressBar.style.width = `${progress}%`;
    }, 100);
}

/**
 * Event handlers for native loading screen events
 */
const handlers = {
    /**
     * Prepare for shutdown - fade out the loading screen
     */
    prepareShutdown() {
        console.log('Preparing to shut down loading screen');
        isShuttingDown = true;
        document.body.classList.add('fade-out');
        if (musicPlayer && !musicPlayer.paused) {
            const originalVolume = musicPlayer.volume;
            const fadeSteps = 20;
            const fadeInterval = setInterval(() => {
                if (musicPlayer.volume > 0.05) {
                    musicPlayer.volume -= originalVolume / fadeSteps;
                } else {
                    clearInterval(fadeInterval);
                    musicPlayer.pause();
                }
            }, 50);
        }
    },
    
    /**
     * Handle main loading progress (0.0 to 1.0)
     */
    loadProgress(data) {
        const loadFraction = data.loadFraction;
        progressBar.style.width = `${loadFraction * 100}%`;
        
        if (loadFraction === 1) {
            loadingAction.innerText = '';
            finishingContainer.style.opacity = '1';
            loadingText.style.opacity = '0';
            loadingStatus.style.opacity = '0';
        } else {
            finishingContainer.style.opacity = '0';
            loadingText.style.opacity = '1';
            loadingStatus.style.opacity = '1';
        }
    },
    
    /**
     * Handle log line from server
     */
    onLogLine(data) {
        loadingStatus.textContent = data.message;
    },
    
    /**
     * Handle start of data files loading
     */
    startDataFileEntries(data) {
        dataFileCount = data.count;
        currentDataFile = 0;
        
        loadingText.textContent = 'Loading data files...';
        loadingAction.textContent = `0/${dataFileCount}`;
    },
    
    /**
     * Handle loading of a single data file
     */
    onDataFileEntry(data) {
        currentDataFile++;
        
        loadingAction.textContent = `${currentDataFile}/${dataFileCount}: ${data.name}`;
        loadingStatus.textContent = `Loading: ${data.name}`;
    },
    
    /**
     * Handle end of data files loading
     */
    endDataFileEntries() {
        loadingAction.textContent = '';
        loadingStatus.textContent = 'Data files loaded';
    },
    
    /**
     * Handle start of initialization function
     */
    startInitFunction(data) {
        loadingText.textContent = `Initializing: ${data.type}`;
    },
    
    /**
     * Handle start of initialization function sequence
     */
    startInitFunctionOrder(data) {
        const { type, order } = data;
        loadingText.textContent = `Initializing: ${type}`;
        loadingAction.textContent = `Sequence ${order}`;
    },
    
    /**
     * Handle invoking an initialization function
     */
    initFunctionInvoking(data) {
        const { name, idx } = data;
        loadingStatus.textContent = name;
        loadingAction.textContent = `Function ${idx}`;
    }
};

/**
 * Event listener for all messages (native events and NUI messages)
 */
window.addEventListener('message', function(event) {
    const data = event.data;
    if (data.eventName && handlers[data.eventName]) {
        handlers[data.eventName](data);
        return;
    }
    
    if (data.action) {
        switch (data.action) {
            default:
                console.log("Unknown action:", data.action);
                break;
        }
    }
});

/**
 * Get player name from NUI Handover Data
 * @returns {string} Player name or fallback value
 */
function getPlayerName() {
    if (window.nuiHandoverData?.vars?.playerName) {
        return window.nuiHandoverData.vars.playerName;
    }
    
    return 'Traveler';
}

/**
 * Initialize everything when document is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLoadingScreen();
    const playerName = getPlayerName();
    welcomeText.textContent = config.welcomeText.replace('%s', playerName);
    
    setTimeout(() => {
        const logoContainer = document.getElementById('logo-container');
        logoContainer.style.opacity = '1';
        logoContainer.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            const welcomeContainer = document.getElementById('welcome-container');
            welcomeContainer.style.opacity = '1';
            welcomeContainer.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                document.getElementById('loading-container').style.opacity = '1';
            }, 200);
        }, 200);
    }, 300);
    
    initMusicControls();
});

/**
 * Initialize music control buttons and event listeners
 */
function initMusicControls() {
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            musicControls.style.opacity = '1';
            musicControls.style.transform = 'translateY(0)';
            musicControls.style.pointerEvents = 'auto';
            
            setTimeout(() => {
                if (!musicControls.matches(':hover')) {
                    musicControls.style.opacity = '';
                    musicControls.style.transform = '';
                    musicControls.style.pointerEvents = '';
                }
            }, 5000);
        });
    }
    
    // Play/Pause button
    if (musicPlayPauseBtn) {
        musicPlayPauseBtn.addEventListener('click', () => {
            console.log('Play/Pause clicked');
            isMusicPlaying ? pauseMusic() : playMusic();
        });
    }
    
    // Next track button
    if (musicNextBtn) {
        musicNextBtn.addEventListener('click', () => {
            console.log('Next clicked');
            playNextTrack();
        });
    }
    
    // Previous track button
    if (musicPrevBtn) {
        musicPrevBtn.addEventListener('click', () => {
            console.log('Previous clicked');
            playPreviousTrack();
        });
    }
    
    // Volume slider
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            console.log('Volume changed:', e.target.value);
            updateVolume(e.target.value);
        });
    }
    
    // Volume icon (Mute/Unmute)
    if (volumeIcon) {
        volumeIcon.addEventListener('click', () => {
            console.log('Mute/Unmute clicked');
            if (musicPlayer.volume > 0) {
                volumeIcon.dataset.prevVolume = volumeSlider.value;
                volumeSlider.value = 0;
                updateVolume(0);
            } else {
                const prevVolume = volumeIcon.dataset.prevVolume || 50;
                volumeSlider.value = prevVolume;
                updateVolume(prevVolume);
            }
        });
    }
    
    musicPlayer.addEventListener('ended', playNextTrack);
}
