// Shared browser-side UI module for the assessment platform.
//   1. Theme system (three palettes + the Network Graphic canvas)
//   2. toast() - transient status messages that float above the layout
//
// Three palettes, chosen by the viewer and remembered per browser:
//   extreme - Network Graphic (dark base + animated node/edge canvas). Default.
//   ops     - Operations (flat dark, no canvas).
//   light   - Classroom (white base, Indigo global bar).
//
// Both index.html and instructor.html load this file and render the same
// global bar markup, so Home and the theme switch sit in identical positions
// on every screen.

(function () {
    var THEMES = ['extreme', 'ops', 'light'];
    var DEFAULT_THEME = 'extreme';
    var STORAGE_KEY = 'assessmentTheme';
    var netCanvas = null;
    var netRaf = null;

    function currentTheme() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'net') return 'extreme';   // renamed; migrate quietly
            if (THEMES.indexOf(saved) !== -1) return saved;
        } catch (e) { /* private mode - fall through to the default */ }
        return DEFAULT_THEME;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        document.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(btn.getAttribute('data-theme-btn') === theme));
        });

        if (theme === 'extreme') { startNetwork(); } else { stopNetwork(); }
    }

    window.setTheme = function (theme) {
        if (theme === 'net') theme = 'extreme';
        if (THEMES.indexOf(theme) === -1) theme = DEFAULT_THEME;
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* not fatal */ }
        applyTheme(theme);
    };

    // ===== Network Graphic =====
    // The brand guidelines put gradients inside the Network Graphic rather than
    // on page backgrounds, so this canvas carries the colour for that theme.
    function startNetwork() {
        if (netCanvas) return;

        // This file is loaded from <head> so the theme applies before first
        // paint, which means <body> may not exist yet. Wait for it rather than
        // throwing, which would also abort the rest of this module.
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', startNetwork, { once: true });
            return;
        }

        netCanvas = document.createElement('canvas');
        netCanvas.className = 'network-graphic';
        netCanvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(netCanvas);

        var ctx = netCanvas.getContext('2d');
        var nodes = [];
        var w = 0, h = 0;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var reduce = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function size() {
            w = window.innerWidth;
            h = window.innerHeight;
            netCanvas.width = w * dpr;
            netCanvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Brand primaries, so the graphic carries the palette rather than a
        // single flat violet. Steel and the lifted violet read best on black.
        var PALETTE = [
            [169, 139, 255],  // lifted violet
            [117, 25, 249],   // Violet
            [125, 118, 242],  // Steel
            [91, 5, 156]      // Purple
        ];

        function build() {
            // Roughly 2.5x the previous density, still capped so a large
            // display does not turn the O(n^2) link pass into a cost.
            var count = Math.min(170, Math.max(45, Math.round(w * h / 10000)));
            nodes = [];
            for (var i = 0; i < count; i++) {
                var c = PALETTE[i % PALETTE.length];
                nodes.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.16,
                    vy: (Math.random() - 0.5) * 0.16,
                    r: Math.random() * 1.5 + 0.9,
                    c: c,
                    // a few nodes are brighter hubs, which gives the field depth
                    hub: Math.random() < 0.12
                });
            }
        }

        function frame() {
            ctx.clearRect(0, 0, w, h);
            var link = 116;

            for (var i = 0; i < nodes.length; i++) {
                var a = nodes[i];
                if (!reduce) {
                    a.x += a.vx; a.y += a.vy;
                    if (a.x < 0 || a.x > w) a.vx *= -1;
                    if (a.y < 0 || a.y > h) a.vy *= -1;
                }
                for (var j = i + 1; j < nodes.length; j++) {
                    var b = nodes[j];
                    var dx = a.x - b.x, dy = a.y - b.y;
                    var d = Math.sqrt(dx * dx + dy * dy);
                    if (d < link) {
                        // each edge blends the two endpoint colours
                        var t = (1 - d / link) * 0.5;
                        var g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                        g.addColorStop(0, 'rgba(' + a.c[0] + ',' + a.c[1] + ',' + a.c[2] + ',' + t.toFixed(3) + ')');
                        g.addColorStop(1, 'rgba(' + b.c[0] + ',' + b.c[1] + ',' + b.c[2] + ',' + t.toFixed(3) + ')');
                        ctx.strokeStyle = g;
                        ctx.lineWidth = 0.75;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (var k = 0; k < nodes.length; k++) {
                var n = nodes[k];
                if (n.hub) {
                    ctx.fillStyle = 'rgba(' + n.c[0] + ',' + n.c[1] + ',' + n.c[2] + ',.22)';
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = 'rgba(' + n.c[0] + ',' + n.c[1] + ',' + n.c[2] + ',' + (n.hub ? .95 : .8) + ')';
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.hub ? n.r * 1.5 : n.r, 0, Math.PI * 2);
                ctx.fill();
            }

            if (!reduce) netRaf = requestAnimationFrame(frame);
        }

        size(); build(); frame();

        netCanvas._resize = function () {
            size(); build();
            if (reduce) frame();
        };
        window.addEventListener('resize', netCanvas._resize);
    }

    function stopNetwork() {
        if (!netCanvas) return;
        if (netRaf) cancelAnimationFrame(netRaf);
        netRaf = null;
        window.removeEventListener('resize', netCanvas._resize);
        netCanvas.remove();
        netCanvas = null;
    }

    // ===== Toasts =====
    // Status that used to render inline and shove the page around. Toasts are
    // fixed-position, so showing or hiding one never reflows the content.
    var ICONS = { info: 'ic-info', ok: 'ic-check', warn: 'ic-alert', error: 'ic-x' };
    var LIFETIMES = { info: 4200, ok: 4200, warn: 6000, error: 9000 };

    function stack() {
        var el = document.querySelector('.toast-stack');
        if (!el) {
            el = document.createElement('div');
            el.className = 'toast-stack';
            // polite: announced without interrupting whatever has focus
            el.setAttribute('role', 'status');
            el.setAttribute('aria-live', 'polite');
            document.body.appendChild(el);
        }
        return el;
    }

    // toast(message, type) - type: 'info' | 'ok' | 'warn' | 'error'
    // Errors linger longer than confirmations; nothing blocks the UI.
    window.toast = function (message, type) {
        if (!message) return;
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', function () {
                window.toast(message, type);
            }, { once: true });
            return;
        }

        var kind = LIFETIMES[type] ? type : 'info';
        var host = stack();

        // Replacing an identical message restarts its timer instead of stacking
        var existing = Array.prototype.find.call(host.children, function (t) {
            return t.dataset.msg === message;
        });
        if (existing) {
            clearTimeout(Number(existing.dataset.timer));
            existing.dataset.timer = String(setTimeout(function () { dismiss(existing); }, LIFETIMES[kind]));
            return;
        }

        var el = document.createElement('div');
        el.className = 'toast ' + kind;
        el.dataset.msg = message;
        el.innerHTML = '<svg class="ic ic-sm" aria-hidden="true"><use href="#' +
            ICONS[kind] + '"></use></svg><span></span>';
        el.querySelector('span').textContent = message;
        el.addEventListener('click', function () { dismiss(el); });
        host.appendChild(el);

        // keep at most four on screen
        while (host.children.length > 4) dismiss(host.firstElementChild, true);

        requestAnimationFrame(function () { el.classList.add('in'); });
        el.dataset.timer = String(setTimeout(function () { dismiss(el); }, LIFETIMES[kind]));
    };

    function dismiss(el, now) {
        if (!el || el.dataset.going) return;
        el.dataset.going = '1';
        clearTimeout(Number(el.dataset.timer));
        el.classList.remove('in');
        setTimeout(function () { if (el.parentNode) el.remove(); }, now ? 0 : 220);
    }

    // Apply the stored theme as early as possible so the page never flashes
    // the default palette before switching.
    applyTheme(currentTheme());

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(currentTheme());

        document.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                window.setTheme(btn.getAttribute('data-theme-btn'));
            });
        });
    });
})();
