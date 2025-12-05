from fastapi import Depends, HTTPException, status, Request
from firebase_admin import auth as firebase_auth, credentials, initialize_app
import firebase_admin
import os
import json
from typing import Optional

# Firebase Admin 初期化
service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")

if not service_account_json:
    raise RuntimeError(
        "FIREBASE_SERVICE_ACCOUNT が設定されていません。"
    )
service_account_info = json.loads(service_account_json)

if not firebase_admin._apps:
    cred = credentials.Certificate(service_account_info)
    initialize_app(cred)

# フロントからのAuthorization header から Bearer token 抽出
def get_bearer_token_from_header(request: Request) -> Optional[str]:
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return None
    parts = auth_header.split()
    if len(parts) != 2:
        return None
    scheme, token = parts
    if scheme.lower() != "bearer":
        return None
    return token

# Firebase Token 検証
def verify_firebase_token(request: Request):
    token = get_bearer_token_from_header(request)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Authorization header missing")

    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except firebase_auth.InvalidIdTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid ID token")
    except firebase_auth.ExpiredIdTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Token expired")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate credentials")
