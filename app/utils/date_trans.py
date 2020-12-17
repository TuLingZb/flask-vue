from datetime import datetime





def transfor_dateformat(date):
    if not date or len(str(date)) < 8:
        return None
    if '-' in date:
        date = date.split('T')[0]
        date = datetime.strptime(str(date), '%Y-%m-%d')
    elif '(' in date and '/' in date:
        date = date.split('(')[0]
        date = datetime.strptime(str(date), '%Y/%m/%d')
    elif '.' in date:
        date = datetime.strptime(str(date), '%Y.%m.%d')
    elif len(str(date)) == 8:
        date = datetime.strptime(str(date), '%Y%m%d')
    print(date)
    return date

if __name__ == '__main__':
    a = '2019-10-20T15:59:17.000Z'
    b = '2020.10.29'
    c = '20201028'

    transfor_dateformat(a)
    transfor_dateformat(b)
    transfor_dateformat(c)