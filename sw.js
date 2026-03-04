<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>المكتبة الإسلامية - كتاب أونلاين</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #1a4d3e;
            --accent-color: #d4af37;
            --bg-color: #f8f9fa;
            --white: #ffffff;
        }

        body {
            font-family: 'Cairo', sans-serif;
            background-color: var(--bg-color);
            margin: 0; padding: 0;
            color: #333;
        }

        header {
            background-color: var(--primary-color);
            color: var(--white);
            padding: 30px 15px;
            text-align: center;
            border-bottom: 5px solid var(--accent-color);
        }

        .main-link {
            display: block;
            background: var(--accent-color);
            color: #fff;
            text-align: center;
            padding: 15px;
            margin: 15px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .category-title {
            background: #eee;
            padding: 10px 15px;
            font-weight: bold;
            color: var(--primary-color);
            border-right: 4px solid var(--accent-color);
            margin: 20px 0 10px 0;
        }

        .container {
            padding: 0 15px 100px 15px;
            max-width: 800px;
            margin: 0 auto;
        }

        .book-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .book-item {
            background: var(--white);
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: 0.2s;
            border: 1px solid #ddd;
        }

        .book-item:active { background: #f0f0f0; transform: scale(0.98); }

        .book-name { font-weight: bold; color: var(--primary-color); font-size: 0.95rem; display: block; }
        .book-author { font-size: 0.75rem; color: #666; margin-top: 5px; display: block; }

        nav.bottom-nav {
            background: var(--white);
            display: flex;
            justify-content: space-around;
            padding: 12px;
            position: fixed;
            bottom: 0; width: 100%;
            box-shadow: 0 -2px 15px rgba(0,0,0,0.1);
            box-sizing: border-box;
        }

        .nav-btn {
            background: #f0f0f0;
            padding: 8px 15px;
            border-radius: 20px;
            font-family: 'Cairo';
            font-weight: bold;
            text-decoration: none;
            color: var(--primary-color);
            font-size: 0.85rem;
        }

        .nav-btn.active { background: var(--primary-color); color: white; }
    </style>
</head>
<body>

<header>
    <h1>المكتبة الإسلامية الكبرى</h1>
    <p>بالتعاون مع مرجع "كتاب أونلاين"</p>
</header>

<div class="container">
    
    <a href="https://ketabonline.com/ar" class="main-link">🔍 ابحث عن أي كتاب في المكتبة الشاملة</a>

    <div class="category-title">📚 السنة النبوية الشريفة</div>
    <div class="book-list">
        <a href="https://ketabonline.com/ar/books/11" class="book-item">
            <span class="book-name">صحيح البخاري</span>
            <span class="book-author">الإمام البخاري</span>
        </a>
        <a href="https://ketabonline.com/ar/books/12" class="book-item">
            <span class="book-name">صحيح مسلم</span>
            <span class="book-author">الإمام مسلم</span>
        </a>
        <a href="https://ketabonline.com/ar/books/42" class="book-item">
            <span class="book-name">سنن النسائي</span>
            <span class="book-author">الإمام النسائي</span>
        </a>
        <a href="https://ketabonline.com/ar/books/28" class="book-item">
            <span class="book-name">سنن أبي داود</span>
            <span class="book-author">الإمام أبو داود</span>
        </a>
    </div>

    <div class="category-title">📖 التفسير والعقيدة</div>
    <div class="book-list">
        <a href="https://ketabonline.com/ar/books/17" class="book-item">
            <span class="book-name">تفسير ابن كثير</span>
            <span class="book-author">الإمام ابن كثير</span>
        </a>
        <a href="https://ketabonline.com/ar/books/24" class="book-item">
            <span class="book-name">تفسير الطبري</span>
            <span class="book-author">الإمام الطبري</span>
        </a>
        <a href="https://ketabonline.com/ar/books/142" class="book-item">
            <span class="book-name">تفسير السعدي</span>
            <span class="book-author">الشيخ عبد الرحمن السعدي</span>
        </a>
        <a href="https://ketabonline.com/ar/books/34" class="book-item">
            <span class="book-name">فتح الباري</span>
            <span class="book-author">ابن حجر العسقلاني</span>
        </a>
    </div>

    <div class="category-title">💡 من درر العلماء</div>
    <div class="book-list">
        <a href="https://ketabonline.com/ar/books/7" class="book-item">
            <span class="book-name">مجموع الفتاوى</span>
            <span class="book-author">شيخ الإسلام ابن تيمية</span>
        </a>
        <a href="https://ketabonline.com/ar/books/13" class="book-item">
            <span class="book-name">زاد المعاد</span>
            <span class="book-author">الإمام ابن القيم</span>
        </a>
        <a href="https://ketabonline.com/ar/books/293" class="book-item">
            <span class="book-name">الداء والدواء</span>
            <span class="book-author">الإمام ابن القيم</span>
        </a>
        <a href="https://ketabonline.com/ar/books/21" class="book-item">
            <span class="book-name">رياض الصالحين</span>
            <span class="book-author">الإمام النووي</span>
        </a>
    </div>

    <div class="category-title">📜 السيرة والقصص التاريخية</div>
    <div class="book-list" style="grid-template-columns: 1fr;">
        <a href="https://ketabonline.com/ar/books/18" class="book-item">
            <span class="book-name">البداية والنهاية</span>
            <span class="book-author">الإمام ابن كثير</span>
        </a>
        <a href="https://ketabonline.com/ar/books/22" class="book-item">
            <span class="book-name">سير أعلام النبلاء</span>
            <span class="book-author">الإمام الذهبي</span>
        </a>
    </div>

</div>

<nav class="bottom-nav">
    <a href="index.html" class="nav-btn">📖 الأذكار</a>
    <a href="times.html" class="nav-btn">🕋 المواقيت</a>
    <a href="#" class="nav-btn active">📚 المكتبة</a>
</nav>

</body>
</html>
