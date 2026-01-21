# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify  
import logging

app = Flask(__name__)
app.secret_key = 'my_studio_secret_key' # フラッシュメッセージ用

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- データベース代わりのモックデータ ---
# これにより Python 側で自由に実績やニュースを管理できます
PROJECT_DATA = [
    {
        "title": "空色のアルバ",
        "category": "劇場短編アニメーション",
        "description": "説明説明説明。。。",
        "year": "2025",
        "image" : "assets/images/works/soraironoaruba.jpg"
    },
    {
        "title": "ループサイド・タイムカプセル",
        "category": "劇場短編アニメーション",
        "description": "説明説明説明。。。",
        "year": "2024",
        "image" : "assets/images/works/loopsidetimecapsule.jpg"
    }
]

NEWS_DATA = [
    {"date": "202x.xx.xx", "title": "何かした", "tag": "Information"},
    {"date": "202x.xx.xx", "title": "面白いことあった", "tag": "Interview"},
    {"date": "202x.xx.xx", "title": "いいことあった", "tag": "Activity"}
]

@app.route('/')
def index():
    """
    メインページ。
    Python 側のデータを HTML (Jinja2) に渡して動的にレンダリングします。
    """
    return render_template(
        'index.html', 
        projects=PROJECT_DATA, 
        news_list=NEWS_DATA
    )

@app.route('/api/more_projects')
def more_projects():
    extra_projects = [
        {
            "title": "となりの世界",
            "category": "劇場短編アニメーション",
            "description": "説明説明説明。。。",
            "year": "2023",
            "image" : "assets/images/works/tonarinosekai.jpg"
        },
        {
            "title": "僕らの地球研究",
            "category": "劇場短編アニメーション",
            "description": "説明説明説明。。。",
            "year": "2022",
            "image" : "assets/images/works/bokuranochikyukennkyuu.jpg"
        },
        {
            "title": "Drive and Drop",
            "category": "劇場短編アニメーション",
            "description": "説明説明説明。。。",
            "year": "2021",
            "image" : "assets/images/works/driveanddrop.jpg"
        }
    ]
    return jsonify(extra_projects) 

@app.route('/api/more_news')
def more_news():
    extra_news = [
        {"date": "20xx.xx.xx", "title": "楽しいお知らせです", "tag": "Info"},
        {"date": "20xx.xx.xx", "title": "おもしろいイベントあります", "tag": "Activity"}
    ]
    return jsonify(extra_news)

@app.route('/api/contact', methods=['POST'])
def contact():
    """
    お問い合わせフォームの処理。
    HTMLの <form action="/api/contact" method="POST"> から呼び出されます。
    """
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        if not name or not email or not message:
            return "Missing required fields", 400

        logger.info(f"Contact Form Received: {name} ({email})")
        logger.info(f"Content: {message}")

        return redirect(url_for('index', _anchor='contact'))

    except Exception as e:
        logger.error(f"Error: {e}")
        return "Internal Server Error", 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)