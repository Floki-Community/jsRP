fx_version 'cerulean'
game 'gta5'

author 'FlokiTV'
version '1.0.0'
resource_type 'gametype' { name = 'jsrp' }

-- https://github.com/citizenfx/fivem/issues/1696
dependencies {
	'/server:5894',
    '/onesync',
}

files {
	"index.html"
}

ui_page "index.html"

shared_script 'resource/init.js' -- shared $lib

files{
    '$client.js', -- inject jsrp on $
    '$server.js', -- inject jsrp on $
    '$class.js', -- jsrp class helpers
}

shared_scripts {
    'resource/**/shared.lua',
    'resource/**/shared/*.lua',
    'resource/**/shared.js',
    'resource/**/shared/*.js'
}

client_scripts {
	'core/controllers/**/client.js',
	'core/rpc/client.js',
	'core/request/client.js',
    'resource/**/client.js',
    'resource/**/client/*.js',
    'resource/done.js'
}

server_scripts {
	'core/controllers/**/server.js',
	'core/managers/*.js',
	'core/rpc/server.js',
	'core/request/server.js',
    'resource/**/server.lua',
    'resource/**/server.js',
    'resource/**/server/*.js',
    'resource/done.js'
}
