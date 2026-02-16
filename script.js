/**
 * تطبيق: المرجعية الإسلامية
 * المبرمج: المرجعية الإسلامية
 * الإصدار: 2.5.0 الشامل
 */

let activeSection = "";

// --- 1. وظائف التنقل ---
function openSection(section) {
    activeSection = section;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    document.getElementById('reset-nav-btn').style.display = 'block'; // إظهار زر التصفير للأذكار
    
    const titles = {
        'morning': 'أذكار الصباح',
        'evening': 'أذكار المساء',
        'sleep': 'أذكار النوم',
        'wake': 'أذكار الاستيقاظ'
    };
    document.getElementById('section-title').innerText = titles[section] || "الأذكار";
    renderAzkar();
}

function goHome() {
    document.getElementById('home-view').style.display = 'grid';
    document.getElementById('section-view').style.display = 'none';
}

// --- 2. محرك الأذكار ---
function renderAzkar() {
    const list = document.getElementById('azkar-list');
    list.innerHTML = '';
    const data = azkarData[activeSection] || [];

    data.forEach((item, index) => {
        const savedCount = localStorage.getItem(`${activeSection}_${index}`) || item.count;
        const card = document.createElement('div');
        card.className = `zekr-card ${savedCount == 0 ? 'completed' : ''}`;
        
        card.innerHTML = `
            <p style="font-size: 20px; line-height: 1.6;">${item.content}</p>
            <div class="counter-box" onclick="decrement(${index}, ${item.count})">
                <span style="font-size: 14px; opacity: 0.8;">اضغط للتسبيح:</span>
                <div class="count-circle">${savedCount}</div>
            </div>
        `;
        list.appendChild(card);
    });
}

function decrement(index, originalCount) {
    let current = parseInt(localStorage.getItem(`${activeSection}_${index}`) || originalCount);
    if (current > 0) {
        current--;
        localStorage.setItem(`${activeSection}_${index}`, current);
        if (navigator.vibrate) navigator.vibrate(40);
        renderAzkar();
    }
}

// --- 3. مواقيت الصلاة ---
function getPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=5`)
                .then(res => res.json())
                .then(data => displayPrayerTimes(data.data.timings));
        }, () => alert("يرجى تفعيل الموقع (GPS) للمواقيت"));
    }
}

function displayPrayerTimes(times) {
    const list = document.getElementById('azkar-list');
    list.innerHTML = '';
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    document.getElementById('section-title').innerText = "مواقيت الصلاة";
    document.getElementById('reset-nav-btn').style.display = 'none';

    const prayers = { 'Fajr': 'الفجر', 'Sunrise': 'الشروق', 'Dhuhr': 'الظهر', 'Asr': 'العصر', 'Maghrib': 'المغرب', 'Isha': 'العشاء' };
    for (let key in prayers) {
        const card = document.createElement('div');
        card.className = 'zekr-card';
        card.style.display = 'flex';
        card.style.justifyContent = 'space-between';
        card.innerHTML = `<b>${prayers[key]}</b> <span style="color:var(--primary-color)">${times[key]}</span>`;
        list.appendChild(card);
    }
}

// --- 4. بوصلة القبلة ---
function getQibla() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const kLat = 21.4225, kLng = 39.8262;
            const y = Math.sin((kLng - lng) * Math.PI / 180);
            const x = Math.cos(lat * Math.PI / 180) * Math.tan(kLat * Math.PI / 180) - 
                      Math.sin(lat * Math.PI / 180) * Math.cos((kLng - lng) * Math.PI / 180);
            let qibla = Math.atan2(y, x) * 180 / Math.PI;
            qibla = (qibla + 360) % 360;
            
            const list = document.getElementById('azkar-list');
            list.innerHTML = `<div class="zekr-card" style="text-align:center">
                <h2>🧭 اتجاه القبلة</h2>
                <p style="font-size: 24px;">${Math.round(qibla)}° درجة</p>
                <p>وجه هاتفك بحيث تكون الدرجة هي اتجاه الكعبة المشرفة</p>
            </div>`;
            document.getElementById('home-view').style.display = 'none';
            document.getElementById('section-view').style.display = 'block';
            document.getElementById('section-title').innerText = "بوصلة القبلة";
            document.getElementById('reset-nav-btn').style.display = 'none';
        });
    }
}

// --- 5. المكتبة الشاملة ---
function openLibrary() {
    const list = document.getElementById('azkar-list');
    list.innerHTML = '';
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    document.getElementById('section-title').innerText = "المكتبة العلمية الموثوقة";
    document.getElementById('reset-nav-btn').style.display = 'none';

    const books = [
        { n: "صحيح البخاري", a: "الإمام البخاري", u: "https://ia800204.us.archive.org/17/items/waq1551/1551.pdf" },
        { n: "صحيح مسلم", a: "الإمام مسلم", u: "https://ia801301.us.archive.org/21/items/ssmuslim/ssmuslim.pdf" },
        { n: "موطأ الإمام مالك", a: "الإمام مالك", u: "https://ia800201.us.archive.org/24/items/waq1574/1574.pdf" },
        { n: "مسند الإمام أحمد", a: "أحمد بن حنبل", u: "https://ia800205.us.archive.org/5/items/waqmsand/msand01.pdf" },
        { n: "تفسير ابن كثير", a: "ابن كثير", u: "https://ia800201.us.archive.org/17/items/waq3595/3595_01.pdf" },
        { n: "تفسير السعدي", a: "الشيخ السعدي", u: "https://ia800201.us.archive.org/3/items/waq63750/63750.pdf" },
        { n: "رياض الصالحين", a: "الإمام النووي", u: "https://ia800701.us.archive.org/18/items/waq41940/41940.pdf" },
        { n: "شرح الأربعين النووية", a: "ابن عثيمين", u: "https://ia800205.us.archive.org/10/items/waq43445/43445.pdf" },
        { n: "فتاوى العقيدة", a: "ابن باز", u: "https://ia800204.us.archive.org/3/items/waq83324/83324.pdf" },
        { n: "صفة صلاة النبي", a: "الألباني", u: "https://ia800204.us.archive.org/15/items/waq22862/22862.pdf" }
    ];

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'zekr-card';
        card.style.cursor = 'pointer';
        card.style.borderRight = "5px solid var(--primary-color)";
        card.onclick = () => window.open(book.u, '_blank');
        card.innerHTML = `<div style="text-align:right"><b>📖 ${book.n}</b><br><small>المؤلف: ${book.a}</small></div>`;
        list.appendChild(card);
    });
}

// --- 6. وظائف إضافية ---
function shareApp() {
    const text = 'تطبيق المرجعية الإسلامية: أذكار، مواقيت، ومكتبة شاملة موثوقة.';
    if (navigator.share) {
        navigator.share({ title: 'المرجعية الإسلامية', text: text, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ رابط التطبيق بنجاح");
    }
}
function showResetModal() { document.getElementById('confirmModal').style.display = 'flex'; }
function closeModal() { document.getElementById('confirmModal').style.display = 'none'; }
function executeReset() {
    const data = azkarData[activeSection] || [];
    data.forEach((_, i) => localStorage.removeItem(`${activeSection}_${i}`));
    closeModal();
    renderAzkar();
}
