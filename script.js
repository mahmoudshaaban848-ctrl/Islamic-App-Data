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
}
