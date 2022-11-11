import os
from pydantic import BaseSettings
from functools import lru_cache
from app.utils import get_logger

logger = get_logger(__name__)

environ = os.getenv("ENVIRONMENT", "dev")
if environ == "dev":
    cred_file = '/Users/spencer.trinhkinnate.com/Documents/security_files/oracle2'
    cred_dct = {}
    with open(cred_file, 'r') as f:
        lines = f.readlines()
    for line in lines:
        str_split = line.split(',')
        key = str_split[0].strip()
        value = str_split[1].strip()
        cred_dct[key] = value

class Settings(BaseSettings):

    testing: str = os.getenv("TESTING", "0")
    environment: str = environ
    if environment == "dev":
        oracle_host: str = cred_dct["HOST-PROD"]
        oracle_password: str = cred_dct["PASSWORD"]
        oracle_username: str = cred_dct["USERNAME"]
        oracle_sid: str = cred_dct["SID"]
        oracle_port: int = int(cred_dct["PORT"])
    else:
        oracle_host: str = os.environ.get("ORACLE_HOST", "host")
        oracle_password: str = os.getenv("ORACLE_PASSWORD", "pass")
        oracle_username: str = os.getenv("ORACLE_USERNAME", "user")
        oracle_sid: str = os.getenv("ORACLE_SID", "sid")
        oracle_port: int = int(os.getenv("ORACLE_PORT", 1500))


@lru_cache()
def get_settings() -> BaseSettings:
    environment = os.getenv("ENVIRONMENT", "dev")
    logger.info(f"Loading config settings from the environment... {environment}")
    return Settings()
