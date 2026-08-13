// Shared theme system for the assessment platform.
// Three palettes, chosen by the viewer and remembered per browser:
//   ops   - Operations (dark). The default.
//   light - Classroom (white base, Indigo header band).
//   net   - Network Graphic (dark base + node/edge canvas).
//
// Both index.html and instructor.html load this file and render the same
// global bar markup, so Home and the theme switch sit in identical positions
// on every screen.

(function () {
    var THEMES = ['ops', 'light', 'net'];
    var STORAGE_KEY = 'assessmentTheme';
    var netCanvas = null;
    var netRaf = null;

    function currentTheme() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (THEMES.indexOf(saved) !== -1) return saved;
        } catch (e) { /* private mode - fall through to the default */ }
        return 'ops';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        document.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(btn.getAttribute('data-theme-btn') === theme));
        });

        if (theme === 'net') { startNetwork(); } else { stopNetwork(); }
    }

    window.setTheme = function (theme) {
        if (THEMES.indexOf(theme) === -1) theme = 'ops';
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* not fatal */ }
        applyTheme(theme);
    };

    // ===== Network Graphic =====
    // The brand guidelines put gradients inside the Network Graphic rather than
    // on page backgrounds, so this canvas carries the colour for that theme.
    function startNetwork() {
        if (netCanvas) return;

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

        function build() {
            var count = Math.min(70, Math.max(18, Math.round(w * h / 26000)));
            nodes = [];
            for (var i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.14,
                    vy: (Math.random() - 0.5) * 0.14,
                    r: Math.random() * 1.4 + 0.8
                });
            }
        }

        function frame() {
            ctx.clearRect(0, 0, w, h);
            var link = 140;

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
                        var t = 1 - d / link;
                        var g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                        g.addColorStop(0, 'rgba(117,25,249,' + (t * 0.42).toFixed(3) + ')');
                        g.addColorStop(1, 'rgba(125,118,242,' + (t * 0.42).toFixed(3) + ')');
                        ctx.strokeStyle = g;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (var k = 0; k < nodes.length; k++) {
                var n = nodes[k];
                ctx.fillStyle = 'rgba(159,140,255,.75)';
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
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
