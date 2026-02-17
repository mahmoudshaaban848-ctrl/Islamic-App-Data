/* =====================================
   المرجعية الإسلامية 5.0
   Core Architecture
===================================== */

/* =============================
   🔷 التخزين المركزي
============================= */
const Storage = {

    get(key, defaultValue) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key) {
        localStorage.removeItem(key);
    }

};


/* =============================
   🔷 App Controller
============================= */
const App = {

    openView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
        document.getElementById(viewName + "-view").classList.add('active-view');
    },

    goHome() {
        this.openView('home');
    },

    init() {
        Settings.load();
        Tasbeeh.load();
        Prayer.loadFromStorage();
    }

};


/* =============================
   🔷 الإعدادات
============================= */
const Settings = {

    defaults: {
        darkMode: false,
        vibration: true,
        adhan: false,
        fontSize: 18
    },

    load() {
        const settings = Storage.get("settings", this.defaults);

        if (settings.darkMode) {
            document.body.classList.add("dark-mode");
        }

        document.body.style.fontSize = settings.fontSize + "px";
    },

    save(newSettings) {
        Storage.set("settings", newSettings);
    },

    toggleDarkMode(state) {
        const settings = Storage.get("settings", this.defaults);
        settings.darkMode = state;
        this.save(settings);

        document.body.classList.toggle("dark-mode", state);
    },

    toggleVibration(state) {
        const settings = Storage.get("settings", this.defaults);
        settings.vibration = state;
        this.save(settings);
    },

    toggleAdhan(state) {
        const settings = Storage.get("settings", this.defaults);
        settings.adhan = state;
        this.save(settings);
    },

    changeFontSize(size) {
        const settings = Storage.get("settings", this.defaults);
        settings.fontSize = size;
        this.save(settings);

        document.body.style.fontSize = size + "px";
    },

    resetApp() {
        localStorage.clear();
        location.reload();
    }

};


/* =============================
   🔷 التسبيح
============================= */
const Tasbeeh = {

    count: 0,

    load() {
        this.count = Storage.get("tasbeeh_count", 0);
        document.getElementById("tasbeeh-counter").innerText = this.count;
    },

    increment() {
        this.count++;
        document.getElementById("tasbeeh-counter").innerText = this.count;
        Storage.set("tasbeeh_count", this.count);

        const settings = Storage.get("settings", Settings.defaults);
        if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(30);
        }
    },

    reset() {
        this.count = 0;
        document.getElementById("tasbeeh-counter").innerText = this.count;
        Storage.set("tasbeeh_count", this.count);
    }

};


/* =============================
   🔷 المفضلة
============================= */
const Favorites = {

    toggle(item) {
        let favorites = Storage.get("favorites", []);

        const index = favorites.findIndex(f => f.id === item.id);

        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(item);
        }

        Storage.set("favorites", favorites);
    },

    load() {
        const container = document.getElementById("favorites-list");
        const favorites = Storage.get("favorites", []);

        container.innerHTML = "";

        favorites.forEach(item => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerText = item.text;
            container.appendChild(div);
        });
    }

};


/* =============================
   🔷 البحث
============================= */
const Search = {

    perform() {
        const query = document.getElementById("search-input").value.trim();
        const container = document.getElementById("search-results");
        container.innerHTML = "";

        if (!query || typeof AppData === "undefined") return;

        const results = AppData.filter(item =>
            item.text.includes(query)
        );

        results.forEach(item => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerText = item.text;
            container.appendChild(div);
        });
    }

};


/* =============================
   🔷 مواقيت الصلاة (هيكل)
============================= */
const Prayer = {

    times: {},

    loadTimes() {
        // هنا سيتم ربط API لاحقًا
        alert("سيتم ربط مواقيت الصلاة عبر API في المرحلة التالية");
    },

    loadFromStorage() {
        this.times = Storage.get("prayer_times", {});
    }

};


/* =============================
   🔷 اتجاه القبلة
============================= */
const Qibla = {

    init() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientationabsolute", this.handleOrientation, true);
        }
    },

    handleOrientation(event) {
        const heading = event.alpha;
        console.log("اتجاه الجهاز:", heading);
        // سيتم حساب اتجاه مكة بدقة في المرحلة التالية
    }

};


/* =============================
   🔷 تسجيل Service Worker
============================= */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log("SW Error:", err));
    });
}


/* =============================
   🔷 تشغيل التطبيق
============================= */
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});