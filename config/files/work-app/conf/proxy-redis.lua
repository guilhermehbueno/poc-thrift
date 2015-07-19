-- proxy-redis.lua

local redis = require "resty.redis"
local red = redis:new()
red:set_timeout(1000)

local ok, err = red:connect("127.0.0.1", 6379)
if not ok then
    return
end

math.randomseed(os.time())
function sampling(experiment)
  x = tonumber(experiment.sampling)
  local result = "000"
  if math.random(0,100) < x
    then
      result = "yes"
      ngx.header['Set-Cookie'] = 'experiment=yes; path=/'
      chooseExperimentVersion(experiment)
      -- ngx.say(result)
    else
      result = "no"
      ngx.header['Set-Cookie'] = 'experimentVersion=; path=/'
      ngx.header['Set-Cookie'] = 'experiment=no; path=/'
      ngx.var.experiment_version=""
      -- ngx.say(result)
  end
end

function chooseExperimentVersion(experiment)
  x = 50
  local result = "000"
  if math.random(0,100) < x
    then
      ngx.header['Set-Cookie'] = {'experimentVersion=a; path=/'}
      ngx.var.experiment_version=experiment.versionA
    else
      ngx.var.experiment_version=experiment.versionB
      ngx.header['Set-Cookie'] =  {'experimentVersion=b; path=/'}
  end
end


local cjson = require "cjson"
local experimentId, err = red:srandmember("published")

local res, err = red:hmget("experiments", experimentId)
local encodedExperiment = cjson.encode(res)
local decodedExperiment = cjson.decode(encodedExperiment)
local experiment = cjson.decode(decodedExperiment[1])
-- ngx.say(teste.name)
sampling(experiment)