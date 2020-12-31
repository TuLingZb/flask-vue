import requests


def get_json():
    url = "https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json"
    js = requests.get(url)
    provinces = js['feature']
    list = []
    for p in provinces:
        p = p['properties']
        list.append({"name":p['name'],"value":p["center"][0]})
    return list

if __name__ == '__main__':
    a = get_json()
    print(a)