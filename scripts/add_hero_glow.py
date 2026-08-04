import re

css_glow = '''
/* ====================================
   HERO GLOW EFFECT
   ==================================== */
@keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hero-section::before,
.page-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 50%, rgba(200, 200, 200, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 30%);
    animation: rotateGlow 40s linear infinite;
    z-index: 0;
    pointer-events: none;
}

.hero-section > *,
.page-hero > * {
    position: relative;
    z-index: 1;
}
'''

# 1. Update css/components.css
with open('css/components.css', 'r', encoding='utf-8') as f:
    components_css = f.read()

if 'HERO GLOW EFFECT' not in components_css:
    with open('css/components.css', 'a', encoding='utf-8') as f:
        f.write('\n' + css_glow)
        
print("Added glow effect successfully.")
