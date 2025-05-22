-- Handle resource start
AddEventHandler('onResourceStart', function(resourceName)
    if resourceName ~= GetCurrentResourceName() then return end
    if GetCurrentResourceName() ~= 'bs-loadingscreen' then
        print('^8[Warning]^0 Resource name mismatch: Expected "bs-loadingscreen", got "'..GetCurrentResourceName().. '". Please rename.')
    end
end)