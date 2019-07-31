import os
from app import app
from controllers import images, difficulties, users

app.register_blueprint(images.api, url_prefix='/api')
app.register_blueprint(difficulties.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')

def catch_all(path):
    if os.path.isfile('dist/' + path):
        return app.send_static_file(path)
    return app.send_static_file('index.html')
