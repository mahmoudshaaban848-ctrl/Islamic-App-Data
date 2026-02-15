let activeSection = '';

function openSection(section) {
    activeSection = section;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    window.scrollTo(0,0);
    
    const titles = {
        morning: 'أذكار الصباح',
        evening: 'أذكار المساء',
        sleep: 'أذكار النوم',
        wake: 'أذكار الاستيقاظ',
        prayer: 'أذكار ما بعد الصلاة'
    };
    document.getElementById('section-title').innerText = titles[section];
    renderAzkar();
}

function goHome() {
    document.getElementById('home-view').style.display = 'grid';
    document.getElementById('section-view').style.display = 'none';
}

function renderAzkar() {
    const list = document.getElementById('azkar-list');
    list.innerHTML = '';
    const data = azkarData[activeSection];

    data.forEach(item => {
        const storageKey = `zekr_${item.id}`;
        let saved = localStorage.getItem(storageKey);
        
        if (saved === null) {
            saved = item.count;
        } else {
            saved = parseInt(saved);
        }

        const isDone = saved === 0;
        
        const card = document.createElement('div');
        card.className = `zekr-card ${isDone ? 'completed' : ''}`;
        card.onclick = () => decrement(item.id, item.count);
        
        card.innerHTML = `
            <span class="zekr-text">${item.text}</span>
            <div class="counter-footer">
                <span style="color: #64748b; font-weight: bold;">${isDone ? '✓ اكتمل الذكر' : 'المتبقي'}</span>
                <div class="count-circle">${isDone ? '✓' : saved}</div>
            </div>
        `;
        list.appendChild(card);
    });
}

function decrement(id, originalCount) {
    const storageKey = `zekr_${id}`;
    let current = localStorage.getItem(storageKey);
    if (current === null) current = originalCount;
    current = parseInt(current);

    if (current > 0) {
        current--;
        localStorage.setItem(storageKey, current);
        renderAzkar();
        if (current === 0 && window.navigator.vibrate) window.navigator.vibrate(50);
    }
}

function showResetModal() { document.getElementById('confirmModal').style.display = 'flex'; }
function closeModal() { document.getElementById('confirmModal').style.display = 'none'; }

function executeReset() {
    if (activeSection && azkarData[activeSection]) {
        azkarData[activeSection].forEach(item => localStorage.removeItem(`zekr_${item.id}`));
        renderAzkar();
    }
    closeModal();
}

// دالة المشاركة برابط محمود شعبان الخاص
function shareApp() {
    const appUrl = 'https://mahmoudshaaban848-ctrl.github.io/Islamic-App-Data/';
    if (navigator.share) {
        navigator.share({
            title: 'تطبيق المرجعية الإسلامية',
            text: 'حصنك اليومي من الأذكار - تطبيق خفيف يعمل بدون إنترنت',
            url: appUrl
        });
    } else {
        navigator.clipboard.writeText(appUrl);
        alert("تم نسخ رابط التطبيق، يمكنك إرساله الآن لأصدقائك.");
    }
}
// دالة جلب مواقيت الصلاة
function getPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // رابط API لجلب المواقيت بناءً على موقعك
            const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=5`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const times = data.data.timings;
                    displayPrayerTimes(times);
                })
                .catch(err => alert("حدث خطأ في الاتصال بالمواقيت"));
        }, () => {
            alert("يرجى تفعيل الـ GPS في هاتفك لعرض المواقيت");
        });
    }
}

// دالة عرض المواقيت في الصفحة
function displayPrayerTimes(times) {
    const list = document.getElementById('azkar-list');
    list.innerHTML = '';
    
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    document.getElementById('section-title').innerText = 'مواقيت الصلاة';

    const prayers = {
        'Fajr': 'الفجر',
        'Sunrise': 'الشروق',
        'Dhuhr': 'الظهر',
        'Asr': 'العصر',
        'Maghrib': 'المغرب',
        'Isha': 'العشاء'
    };

    for (let key in prayers) {
        const card = document.createElement('div');
        card.className = 'zekr-card';
        card.style.display = 'flex';
        card.style.justifyContent = 'space-between';
        card.style.padding = '15px 25px';
        
        card.innerHTML = `
            <span style="font-weight: bold;">${prayers[key]}</span>
            <span style="color: var(--primary-color); font-weight: bold;">${times[key]}</span>
        `;
        list.appendChild(card);
    }
// دالة المكتبة الإسلامية الشاملة - الإصدار الموسوعي الضخم
function openLibrary() {
    const list = document.getElementById('azkar-list');
    list.innerHTML = ''; 
    
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    document.getElementById('section-title').innerText = 'المكتبة المرجعية الشاملة';

    // قائمة الكتب الموسعة (السنة، التفسير، العقيدة، الفقه، السيرة)
    const books = [
        // دواوين السنة
        { name: "صحيح البخاري", author: "الإمام البخاري", url: "https://ia800204.us.archive.org/17/items/waq1551/1551.pdf" },
        { name: "صحيح مسلم", author: "الإمام مسلم", url: "https://ia801301.us.archive.org/21/items/ssmuslim/ssmuslim.pdf" },
        { name: "موطأ الإمام مالك", author: "الإمام مالك بن أنس", url: "https://ia800201.us.archive.org/24/items/waq1574/1574.pdf" },
        { name: "مسند الإمام أحمد", author: "الإمام أحمد بن حنبل", url: "https://ia800205.us.archive.org/5/items/waqmsand/msand01.pdf" },
        { name: "سنن أبي داود", author: "الإمام أبو داود", url: "https://ia800204.us.archive.org/15/items/waq4937/4937.pdf" },
        { name: "سنن الترمذي", author: "الإمام الترمذي", url: "https://ia800203.us.archive.org/11/items/waq2517/2517.pdf" },
        
        // التفسير وعلوم القرآن
        { name: "تفسير القرآن العظيم", author: "الإمام ابن كثير", url: "https://ia800201.us.archive.org/17/items/waq3595/3595_01.pdf" },
        { name: "تيسير الكريم الرحمن", author: "الشيخ عبد الرحمن السعدي", url: "https://ia800201.us.archive.org/3/items/waq63750/63750.pdf" },
        { name: "تفسير الجلالين", author: "السيوطي والمحلي", url: "https://ia800205.us.archive.org/11/items/waq14681/14681.pdf" },

        // شروح ومؤلفات منوعة
        { name: "فتح الباري شرح البخاري", author: "ابن حجر العسقلاني", url: "https://ia800201.us.archive.org/18/items/waq2871/01_2871.pdf" },
        { name: "رياض الصالحين", author: "الإمام النووي", url: "https://ia800701.us.archive.org/18/items/waq41940/41940.pdf" },
        { name: "شرح الأربعين النووية", author: "الشيخ ابن عثيمين", url: "https://ia800205.us.archive.org/10/items/waq43445/43445.pdf" },
        { name: "عقيدة أهل السنة والجماعة", author: "الشيخ ابن عثيمين", url: "https://ia800203.us.archive.org/15/items/waq21238/21238.pdf" },
        { name: "فتاوى العقيدة", author: "الشيخ ابن باز", url: "https://ia800204.us.archive.org/3/items/waq83324/83324.pdf" },
        { name: "صفة صلاة النبي", author: "الشيخ ناصر الدين الألباني", url: "https://ia800204.us.archive.org/15/items/waq22862/22862.pdf" },
        { name: "كتاب التوحيد", author: "الإمام محمد بن عبدالوهاب", url: "https://ia800205.us.archive.org/14/items/waq15077/15077.pdf" },
        { name: "الرحيق المختوم (سيرة)", author: "صفي الرحمن المباركفوري", url: "https://ia800202.us.archive.org/4/items/waq21035/21035.pdf" },
        { name: "الآداب الشرعية", author: "ابن مفلح المقدسي", url: "https://ia800201.us.archive.org/1/items/waq18290/18290.pdf" }
    ];

    // عرض الكتب في الواجهة
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'zekr-card';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'right';
        card.style.borderRight = '5px solid #8e44ad';
        
        card.onclick = () => window.open(book.url, '_blank');
        
        card.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-weight: bold; font-size: 18px; color: var(--primary-color);">📖 ${book.name}</span>
                <span style="color: #636e72; font-size: 13px;">المؤلف: ${book.author}</span>
                <span style="color: #8e44ad; font-size: 11px; font-weight: bold;">اضغط لفتح المرجع PDF</span>
            </div>
        `;
        list.appendChild(card);
    });
}
