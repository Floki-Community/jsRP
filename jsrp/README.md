# jsRP
Javascript Library for FiveM 🎮

## Important

This framework is still under development and may demonstrate instabilities. Wait for a first release to use in production

Join on Discord https://discord.gg/hy82ztER8Y

# How to import

FXServer provides its own system for including files, which we use to load this resource in the fxmanifest via

```lua
client_scripts {
    '@jsrp/$client.js', -- inject jsrp client on $
    'client.js',
}

server_scripts {
    '@jsrp/$server.js', -- inject jsrp server on $
    'server.js',
}
```