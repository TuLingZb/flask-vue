#!/bin/sh
#source venv/bin/activate

#https://blog.csdn.net/h1131057908/article/details/87644348
#安装Supervisor

while true; do
    flask db upgrade
    if [[ "$?" == "0" ]]; then
        break
    fi
    echo Deploy command failed, retrying in 5 secs...
    sleep 5
done
flask deploy
exec gunicorn -b :5000 --access-logfile - --error-logfile - madblog:app