import json,re
def to_json(inst, cls):
	d = dict()
	'''
	获取表里面的列并存到字典里面
	'''
	for c in cls.__table__.columns:
		v = getattr(inst, c.name)
		d[c.name] = v
	return json.dumps(d)



def match_name_1(name_1):

	if re.match('.*\.G$', name_1):
		return "G"
	elif re.match('.*\.R$', name_1):
		return "R"
	elif re.match('.*\.EXO$', name_1):
		return "EXO"




if __name__ == "__main__":
	a = "ZHQ_CES.GC.P"
	match_name_1(a)