from flask import Flask, jsonify, request
from processing import headlines, get_sources, get_everything

application = Flask(__name__)


@application.route('/')
def hello_world():
    return application.send_static_file("index.html")


@application.route('/headlines')
@application.route('/headline')
def send_headlines():
    return jsonify(headlines)


@application.route('/search')
def search():
    keyword = request.args.get('keyword')
    from_date = request.args.get('from')
    to_date = request.args.get('to')
    source = request.args.get('source')
    return jsonify({'everything': get_everything(q=keyword, from_param=from_date, to=to_date, sources=source)})


@application.route('/sources')
@application.route('/source')
def send_source():
    category = request.args.get('category')
    news_sources = get_sources(category=category)
    return jsonify({'sources': news_sources[:10]})


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
