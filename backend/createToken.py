import jwt
from datetime import datetime, timedelta

def create_jwt(id):
    secret_key = b"jkhkgfklsbrthikelgtjg4589763596784736tewyufhsjdngitu4yerugfsd" ##Random strings so It can't be hacked,
    #Secret keys must remain secret to the server
    payload = {
        'id': str(id),
        'exp': datetime.utcnow() + timedelta(days=30) #Token expires in 30 days
    }

    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token