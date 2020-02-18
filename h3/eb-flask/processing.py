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


def check_keys(article):
    if not article['source'] or not article['source']['id'] or not article['source']['name']:
        return False
    if not article['author'] or not article['title'] or not article['description'] or not article['url']:
        return False
    if not article['urlToImage'] or not article['publishedAt'] or not article['content']:
        return False
    return True


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
