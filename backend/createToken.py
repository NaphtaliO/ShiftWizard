import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()
def create_jwt(id, type_of_user):
    secret_key = os.getenv("SECRET_KEY")
    secret_key = secret_key.encode('utf-8')
    #Secret keys must remain secret to the server
    payload = {
        'user_id': str(id),
        'type': type_of_user,
        'exp': datetime.utcnow() + timedelta(days=30) #Token expires in 30 days
    }

    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token