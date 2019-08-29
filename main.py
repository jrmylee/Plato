import requests 
from base64 import b64encode
import json

url =  'https://accounts.spotify.com/api/token'
client_id = 'a4f47ac79d87478a96739c0bb03051db'
client_secret = '7bdd0ef5cda54874bef242d35b1aca79'

def getToken():
    encoded = (client_id + ':' + client_secret).encode('ascii')
    token = b64encode(encoded).decode("ascii")
    headers = {
        'Authorization': 
            'Basic ' + token,
        
    }
    r = requests.post(url, headers = headers, data = {'grant_type': 'client_credentials'})
    tokenObj = json.loads(r.text)
    accessToken = tokenObj['access_token']
    return accessToken

print(getToken())