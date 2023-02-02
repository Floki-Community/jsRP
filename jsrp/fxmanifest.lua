fx_version 'bodacious'
game 'gta5'

author 'FlokiTV'
version '1.0.0'
resource_type 'gametype' { name = 'jsrp' }

-- https://github.com/citizenfx/fivem/issues/1696
dependencies {
	'/server:5894',
    '/onesync',
}

shared_script 'resource/init.js' -- shared $lib

files{
    '$client.js', -- inject jsrp on $
    '$server.js' -- inject jsrp on $
}

shared_scripts {
    'resource/**/shared.js',
    'resource/**/shared/*.js'
}

client_scripts {
	'import/controllers/**/client.js',
	'import/rpc/client.js',
	'import/request/client.js',
	-- 'import/requestModel/client.js',
	-- 'import/requestAnimDict/client.js',
    'resource/**/client.js',
    'resource/**/client/*.js'
}

server_scripts {
	'import/controllers/**/server.js',
	'import/managers/*.js',
	'import/rpc/server.js',
	'import/request/server.js',
    'resource/**/server.js',
    'resource/**/server/*.js'
}