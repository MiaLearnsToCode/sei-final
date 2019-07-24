from app import app
from controllers import images, difficulties

app.register_blueprint(images.api, url_prefix='/api')
app.register_blueprint(difficulties.api, url_prefix='/api')
