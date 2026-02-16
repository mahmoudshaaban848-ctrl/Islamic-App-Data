/**
 * تطبيق: المرجعية الإسلامية
 * المبرمج: المرجعية الإسلامية
 * النسخة: 3.0 (الإصدار الذهبي)
 */

let activeSection = "";

// 1. نظام نصيحة اليوم العشوائية
const dailyWisdom = [
    "قال ﷺ: (بلغوا عني ولو آية)",
    "الاستغفار يفتح الأقفال ويشرح البال.",
    "حافظ على أذكارك، فهي حصنك الحصين.",
    "أحب الكلام إلى الله: سبحان الله وبحمده، سبحان الله العظيم.",
    "صلاة الضحى هي صدقة عن جميع مفاصل جسدك.",
    "اللهم إنك عفو تحب العفو فاعفُ عنا."
];

document.addEventListener("DOMContentLoaded", () => {
    // عرض نصيحة عشوائية عند التحميل
    const tipBox = document.getElementById('daily-tip');
    if(tipBox) {
        const randomTip = dailyWisdom[Math.floor(Math.random() * dailyWisdom.length)];
        tipBox.innerHTML = `💡 <b>فائدة اليوم:</b> <br> ${randomTip}`;
    }
});

// 2. التنقل بين الصفحات
function openSection(section) {
    activeSection = section;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';
    
    // إخفاء زر التصفير في غير الأذكار
    const isZekr = ['morning','evening','sleep','wake','after_prayer'].includes(section);
    document.getElementById('reset-nav-btn').style.display = isZekr ? 'block' : 'none';

    const titles = {
        'morning': 'أذكار الصباح', 'evening': 'أذكار المساء', 
        'sleep': 'أذكار النوم', 'wake': 'أذكار الاستيقاظ',
        'after_prayer': 'أذكار بعد الصلاة'
    };
    document.getElementById('section-title').innerText = titles[section] || "المحتوى";
    renderAzkar();
}

function goHome() {
    document.getElementById('home-view').style.display = 'grid';
    document.getElementById('section-view').style.display = 'none';
}

// 3. محرك الأذكار والعدادات
function renderAzkar() {
    const list = document.getElementById('azkar-list');
    list.innerHTML = '';
    const data = azkarData[activeSection] || [];

    data.forEach((item, index) => {
        const text = item.content || item.text || item.zekr || "نص غير متوفر";
        const total = item.count || item.repeat || 1;
        const current = localStorage.getItem(`${activeSection}_${index}`) || total;
        
        const card = document.createElement('div');
        card.className = `zekr-card ${current == 0 ? 'completed' : ''}`;
        card.innerHTML = `
            <p>${text}</p>
            <div class="counter-box" onclick="decrement(${index}, ${total})">
                <span>المتبقي:</span>
                <div class="count-circle">${current}</div>
            </div>
        `;
        list.appendChild(card);
    });
}

function decrement(index, total) {
    let current = parseInt(localStorage.getItem(`${activeSection}_${index}`) || total);
    if (current > 0) {
        current--;
        localStorage.setItem(`${activeSection}_${index}`, current);
        if (navigator.vibrate) navigator.vibrate(40);
        renderAzkar();
    }
}

// 4. مواقيت الصلاة (تحويل 12 ساعة)
function tConvert(time) {
    let [h, m] = time.split(':');
    h = parseInt(h);
    let ampm = h >= 12 ? 'م' : 'ص';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
}

function getPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            fetch(`https://api.aladhan.com/v1/timings?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&method=5`)
                .then(r => r.json())
                .then(res => {
                    const t = res.data.timings;
                    const list = document.getElementById('azkar-list');
                    list.innerHTML = '';
                    openSection('prayers');
                    document.getElementById('section-title').innerText = "مواقيت الصلاة اليوم";
                    
                    const pNames = {'Fajr':'الفجر', 'Sunrise':'الشروق', 'Dhuhr':'الظهر', 'Asr':'العصر', 'Maghrib':'المغرب', 'Isha':'العشاء'};
                    for(let k in pNames) {
                        const c = document.createElement('div');
                        c.className = 'zekr-card';
                        c.style.display = 'flex'; c.style.justifyContent = 'space-between';
                        c.innerHTML = `<b>${pNames[k]}</b> <span style="color:#1e5631">${tConvert(t[k])}</span>`;
                        list.appendChild(c);
                    }
                });
        }, () => alert("يرجى تفعيل الموقع (GPS)"));
    }
}

// 5. القبلة والمكتبة
function getQibla() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude, lng = pos.coords.longitude;
            const kLat = 21.4225, kLng = 39.8262;
            const y = Math.sin((kLng - lng) * Math.PI / 180);
            const x = Math.cos(lat * Math.PI / 180) * Math.tan(kLat * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.cos((kLng - lng) * Math.PI / 180);
            let q = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
            
            openSection('qibla');
            document.getElementById('section-title').innerText = "اتجاه القبلة";
            document.getElementById('azkar-list').innerHTML = `
                <div class="zekr-card" style="text-align:center">
                    <h2 style="color:#1e5631">${Math.round(q)}° درجة</h2>
                    <p>انحراف القبلة من اتجاه الشمال بموقعك الحالي.</p>
                    <a href="https://qiblafinder.withgoogle.com/" target="_blank" class="nav-btn" style="display:block; text-decoration:none; margin-top:15px; background:#1e5631; color:white;">افتح بوصلة جوجل الحية</a>
                </div>`;
        });
    }
}

function openLibrary() {
    openSection('library');
    document.getElementById('section-title').innerText = "المكتبة الإسلامية";
    const books = [
        { n: "صحيح البخاري", a: "البخاري", u: "https://ia800204.us.archive.org/17/items/waq1551/1551.pdf" },
        { n: "صحيح مسلم", a: "مسلم", u: "https://ia801301.us.archive.org/21/items/ssmuslim/ssmuslim.pdf" },
        { n: "تفسير ابن كثير", a: "ابن كثير", u: "https://ia800201.us.archive.org/17/items/waq3595/3595_01.pdf" },
        { n: "رياض الصالحين", a: "النووي", u: "https://ia800701.us.archive.org/18/items/waq41940/41940.pdf" },
        { n: "تفسير السعدي", a: "السعدي", u: "https://ia800201.us.archive.org/3/items/waq63750/63750.pdf" }
    ];
    const list = document.getElementById('azkar-list');
    books.forEach(b => {
        const c = document.createElement('a');
        c.href = b.u; c.target = "_blank"; c.className = 'zekr-card';
        c.style = "display:block; text-decoration:none; color:inherit; border-right:5px solid #c5a059;";
        c.innerHTML = `<b>📖 ${b.n}</b> <br><small>المؤلف: ${b.a}</small>`;
        list.appendChild(c);
    });
}

// 6. وظائف عامة
function shareApp() {
    const text = 'تطبيق المرجعية الإسلامية: أذكار ومكتبة ومواقيت في تطبيق واحد.';
    if (navigator.share) navigator.share({ title: 'المرجعية الإسلامية', text: text, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert("تم نسخ رابط التطبيق"); }
}

function showResetModal() { document.getElementById('confirmModal').style.display = 'flex'; }
function closeModal() { document.getElementById('confirmModal').style.display = 'none'; }
function executeReset() {
    const data = azkarData[activeSection] || [];
    data.forEach((_, i) => localStorage.removeItem(`${activeSection}_${i}`));
    closeModal();
    renderAzkar();
}
