import datetime
import jwt


secret = """-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg0fz2VnHgPJIhlT7BRWkcCO2r0SI0m2Z6lgVTh77Y9+KgCgYIKoZIzj0DAQehRANCAASt9LDZgHf2rb2dER+DiJgiWYaEzxQsmulhhVOji2Isk2DEpcIqpD8+xy4xtkcDiRb2/FeeOz8x4GTLYBEZhV18
-----END PRIVATE KEY-----"""
keyId = "8R58WR55GB"
teamId = "PF9XMNWQVC"
alg = 'ES256'

time_now = datetime.datetime.now()
time_expired = datetime.datetime.now() + datetime.timedelta(hours=3600)

headers = {
	"alg": alg,
	"kid": keyId
}

payload = {
	"iss": teamId,
	"exp": int(time_expired.strftime("%s")),
	"iat": int(time_now.strftime("%s"))
}


if __name__ == "__main__":
	"""Create an auth token"""
	token = jwt.encode(payload, secret, algorithm=alg, headers=headers)

	print "----TOKEN----"
	print token

	# print "----CURL----"
	# print "curl -v -H 'Authorization: Bearer %s' \"https://api.music.apple.com/v1/catalog/us/artists/36954\" " % (token)