from newsapi import NewsApiClient
import re


def get_freq_words():
    headlines_dict = newsapi.get_top_headlines(page_size=100)
    slides_title = []
    for article in headlines_dict['articles']:
        if article['title']:
            slides_title.append(article['title'])
    words = []
    freq_word = {}
    for slide in slides_title:
        words += re.split('[^a-z]', slide.lower())
    with open('stopwords_en.txt') as f:
        stop_words = set([i[:-1] for i in f.readlines()])
    for word in set(words):
        if word and word not in stop_words:
            freq_word[word] = words.count(word)
    return sorted(freq_word.items(), key=lambda kv: kv[1], reverse=True)[:30]


def get_everything(q, from_param, to, sources):
    if sources == 'all':
        everything_dict = newsapi.get_everything(q=q, from_param=from_param, to=to, language='en',
                                                 page_size=30, sort_by='publishedAt')
    else:
        everything_dict = newsapi.get_everything(q=q, from_param=from_param, to=to, sources=sources, language='en',
                                                 page_size=30, sort_by='publishedAt')
    result = []
    if everything_dict['status'] != 'ok' or everything_dict['totalResults'] <= 0:
        pass
    else:
        sources = everything_dict['articles']
        for source in sources:
            result.append({'urlToImage': source['urlToImage'], 'title': source['title'],
                           'description': source['description'], 'author': source['author'],
                           'source': source['source']['name'], 'date': source['publishedAt'], 'link': source['url']})
    return result


def check_keys(article):
    # if not article['source'] or not article['source']['id'] or not article['source']['name']:
    #     return False
    if not article['author'] or not article['title'] or not article['description'] or not article['url']:
        return False
    if not article['urlToImage'] or not article['publishedAt'] or not article['content']:
        return False
    return True


def get_sources(category="all"):
    sources = newsapi.get_sources(category=category, language='en', country='us') \
        if category != "all" else newsapi.get_sources(language='en', country='us')
    result = []
    if sources['status'] != 'ok':
        pass
    else:
        for source in sources['sources']:
            result.append({source['name']: source['id']})
    return result


def get_headlines(source='cnn', page_size=30):
    headlines_dict = newsapi.get_top_headlines(sources=source, page_size=page_size)
    result = []
    if headlines_dict['status'] != 'ok' or headlines_dict['totalResults'] == 0:
        pass
    else:
        for article in headlines_dict['articles']:
            if check_keys(article):
                article.pop('source')
                result.append(article)
    return result


newsapi = NewsApiClient(api_key='8f156cdcc290483d8475ee55fcc8c3d9')
cnn_headline = get_headlines(source='cnn')
fox_headline = get_headlines(source='fox-news')
slides = get_headlines(source='', page_size=100)
freq_words = get_freq_words()
headlines = {'cnn': cnn_headline[:4], 'fox-news': fox_headline[:4], 'slide': slides[:5], 'freq': freq_words}
news_sources = get_sources()
get_everything(q='test', from_param='2020-02-20', to='2020-02-21', sources='cnn')
