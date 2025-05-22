local externalShutdown = GetConvarInt('loadingscreen:externalShutdown', 0) == 1
local isLoaded = false

-- Send message to loading screen
local function sendMessage(message)
    SendLoadingScreenMessage(json.encode(message))
end

-- Perform shutdown with animation
local function performShutdown()
    sendMessage({eventName = 'prepareShutdown'})
    Wait(1000)
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end

CreateThread(function()
    Wait(500)
    if not externalShutdown then
        Wait(1000)
        performShutdown()
    end
end)

-- Shutdown function
local function shutdownLoadingScreen()
    performShutdown()
end
exports('shutdownLoadingScreen', shutdownLoadingScreen)
RegisterNetEvent('bs-loadingscreen:shutdown', shutdownLoadingScreen)

-- Handle loading complete callback
RegisterNUICallback('loadingComplete', function(data, cb)
    if not isLoaded then
        isLoaded = true
        
        if not externalShutdown then
            performShutdown()
        else
            sendMessage({customEvent = 'finishedLoading'})
        end
    end
    cb('ok')
end)
