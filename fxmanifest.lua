fx_version 'cerulean'
game 'rdr3'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'Blaze Scripts'
version '1.0.1'
description 'Clean and modern loading screen for RedM'
lua54 'yes'

client_scripts {
    'client/main.lua',
}

server_scripts {
    'server/main.lua',
    'server/handover.js',
}

files {
    'html/index.html',
    'html/assets/css/*.css',
    'html/assets/js/*.js',
    'html/assets/img/*.png',
    'html/assets/img/*.jpg',
    'html/assets/img/*.webm',
    'html/assets/music/*.mp3',
    'html/assets/video/*.mp4',
    'html/assets/video/*.webm',
    'html/assets/fonts/*.ttf'
}

loadscreen 'html/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'