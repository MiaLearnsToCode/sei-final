import os

db_uri = os.getenv('DATABASE_URI', 'postgres://localhost:5432/yarnproject')
secret = os.getenv('SECRET', 'seifinalproject')
