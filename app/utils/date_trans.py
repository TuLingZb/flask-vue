import re
import time
from datetime import datetime


def transfor_dateformat(date):
    # print("未转换过的日期:",date)
    date = str(date).strip()
    if not date or len(str(date)) < 8:
        return None
    if re.match('\d{1,4}-\d{1,2}-\d{1,2}', date):
        date = re.match('\d{1,4}-\d{1,2}-\d{1,2}', date).group()
        date = datetime.strptime(str(date), '%Y-%m-%d')
        return date
    elif re.match('\d{1,4}/\d{1,2}/\d{1,2}', date):
        date = re.match('\d{1,4}/\d{1,2}/\d{1,2}', date).group()
        date = datetime.strptime(str(date), '%Y/%m/%d')
        return date
    elif re.match('\d{1,4}\.\d{1,2}\.\d{1,2}', date):
        date = re.match('\d{1,4}\.\d{1,2}\.\d{1,2}', date).group()
        date = datetime.strptime(str(date), '%Y.%m.%d')
    elif re.match('\d{4}\d{2}\d{2}', date):
        date = re.match('\d{1,4}\d{1,2}\d{1,2}', date).group()
        date = datetime.strptime(str(date), '%Y%m%d')
        return date
    elif re.match('\d{1,4}年\d{1,2}月\d{1,2}日', date):
        date = re.match('\d{1,4}年\d{1,2}月\d{1,2}日', date).group()
        date = datetime.strptime(str(date), '%Y年%m月%d日')
        return date
    else:
        return None


def logger():
    time_format = '%Y%m%d%H%M%S '
    time_current = time.strftime(time_format)
    return time_current


if __name__ == '__main__':
    a = '2019-10-20T15:59:17.000Z'
    b = '2020.10.29'
    c = '20201028'
    # c = '2020/10/28'
    d = '2020/7/29（7.21抽血)'
    d = '1960-01-01'
    e = '2020年7月10日'

    # transfor_dateformat(a)
    # transfor_dateformat(b)
    # transfor_dateformat(c)
    # transfor_dateformat(d)
    # transfor_dateformat(e)
    print(logger())
