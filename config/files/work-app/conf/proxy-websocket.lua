-- proxy-websocket.lua

local client = require "resty.websocket.client"
local wb, err = client:new()
local uri = "ws://127.0.0.1:8081/my-socket"
local ok, err = wb:connect(uri)
if not ok then
  ngx.say("failed to connect: " .. err)
  return
end

wb:send_text("Hello I\'m NginX")

local data, typ, err = wb:recv_frame()
if not data then
  ngx.say("failed to receive the frame: ", err)
  return
end

ngx.header['Set-Cookie'] = 'Foo=abc; path=/'
ngx.say("received: ", data, " (", typ, "): ", err)


local bytes, err = wb:send_text("copy: " .. data)
if not bytes then
  ngx.say("failed to send frame: ", err)
  return
end

local bytes, err = wb:send_close()
if not bytes then
  ngx.say("failed to send frame: ", err)
  return
end