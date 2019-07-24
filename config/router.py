from app import app
from controllers import images, difficulties, users

app.register_blueprint(images.api, url_prefix='/api')
app.register_blueprint(difficulties.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')
