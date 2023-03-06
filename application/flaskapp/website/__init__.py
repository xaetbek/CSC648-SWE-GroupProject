from flask import Flask


def setup_app():
    
    app = Flask(__name__)
    
    
    from .views import views
    from .authentication import auth
    
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(views, url_prefix='/')
    
    
    
    return app