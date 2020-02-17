from flask import Flask, jsonify
from processing import headlines

application = Flask(__name__)


@application.route('/')
def hello_world():
    return application.send_static_file("index.html")


@application.route('/headlines')
@application.route('/headline')
def send_headlines():
    return jsonify(headlines)


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
