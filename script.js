/**
 * تطبيق: المرجعية الإسلامية
 * الإصدار: 4.0 (نسخة الأداء المحسن)
 */

let activeSection = "";
let currentData = [];

/* ================================
   1️⃣ نصيحة اليوم
================================ */
const dailyWisdom = [
    "قال ﷺ: (بلغوا عني ولو آية)",
    "الاستغفار يفتح الأقفال ويشرح البال.",
    "حافظ على أذكارك، فهي حصنك الحصين.",
    "أحب الكلام إلى الله: سبحان الله وبحمده، سبحان الله العظيم.",
    "صلاة الضحى هي صدقة عن جميع مفاصل جسدك.",
    "اللهم إنك عفو تحب العفو فاعفُ عنا."
];

document.addEventListener("DOMContentLoaded", () => {

    const tipBox = document.getElementById('daily-tip');
    if (tipBox) {
        const randomTip = dailyWisdom[Math.floor(Math.random() * dailyWisdom.length)];
        tipBox.innerHTML = `💡 <b>فائدة اليوم:</b><br>${randomTip}`;
    }

});


/* ================================
   2️⃣ التنقل بين الصفحات
================================ */
function openSection(section) {

    activeSection = section;

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';

    const isZekr = ['morning','evening','sleep','wake','after_prayer'].includes(section);
    document.getElementById('reset-nav-btn').style.display = isZekr ? 'block' : 'none';

    const titles = {
        'morning': 'أذكار الصباح',
        'evening': 'أذكار المساء',
        'sleep': 'أذكار النوم',
        'wake': 'أذكار الاستيقاظ',
        'after_prayer': 'أذكار بعد الصلاة'
    };

    document.getElementById('section-title').innerText = titles[section] || "المحتوى";

    if (isZekr) {
        currentData = azkarData[activeSection] || [];
        renderAzkar();
    }
}

function goHome() {
    document.getElementById('home-view').style.display = 'grid';
    document.getElementById('section-view').style.display = 'none';
}


/* ================================
   3️⃣ عرض الأذكار (محسن)
================================ */
function renderAzkar() {

    const list = document.getElementById('azkar-list');
    list.innerHTML = '';

    currentData.forEach((item, index) => {

        const text = item.text;
        const total = item.count || 1;
        const saved = parseInt(localStorage.getItem(`${activeSection}_${index}`));
        const current = isNaN(saved) ? total : saved;

        const card = document.createElement('div');
        card.className = 'zekr-card';
        if (current === 0) card.classList.add('completed');

        card.innerHTML = `
            <p class="zekr-text">${text}</p>

            <div class="counter-wrapper">
                <div class="counter-info">
                    <span>المتبقي</span>
                </div>

                <div class="counter-circle ${current === 0 ? 'done' : ''}" 
                     data-index="${index}" 
                     data-total="${total}">
                    ${current}
                </div>
            </div>
        `;

        list.appendChild(card);
    });

    attachCounters();
}


/* ================================
   4️⃣ نظام العداد الذكي
================================ */
function attachCounters() {

    document.querySelectorAll('.counter-circle').forEach(circle => {

        circle.addEventListener('click', function () {

            const index = this.dataset.index;
            const total = parseInt(this.dataset.total);

            let current = parseInt(localStorage.getItem(`${activeSection}_${index}`));
            current = isNaN(current) ? total : current;

            if (current > 0) {
                current--;

                localStorage.setItem(`${activeSection}_${index}`, current);

                this.innerText = current;

                if (navigator.vibrate) navigator.vibrate(30);

                if (current === 0) {
                    this.classList.add('done');
                    this.closest('.zekr-card').classList.add('completed');
                    animateCompletion(this);
                }
            }

        });

    });
}


/* ================================
   5️⃣ أنيميشن عند الاكتمال
================================ */
function animateCompletion(element) {

    element.style.transform = "scale(1.2)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 200);
}


/* ================================
   6️⃣ إعادة التصفير
================================ */
function showResetModal() {
    document.getElementById('confirmModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function executeReset() {

    currentData.forEach((_, i) => {
        localStorage.removeItem(`${activeSection}_${i}`);
    });

    closeModal();
    renderAzkar();
}


/* ================================
   7️⃣ مشاركة التطبيق
================================ */
function shareApp() {

    const text = 'تطبيق المرجعية الإسلامية: أذكار ومكتبة ومواقيت في تطبيق واحد.';

    if (navigator.share) {
        navigator.share({
            title: 'المرجعية الإسلامية',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ رابط التطبيق");
    }

}