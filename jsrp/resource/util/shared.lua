exports("onLua", function(method, ...)
    return _G[method](...)
end);