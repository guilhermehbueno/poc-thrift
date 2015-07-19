# /usr/local/openresty/nginx/sbin/nginx -s stop
kill -QUIT $( cat logs/nginx.pid )