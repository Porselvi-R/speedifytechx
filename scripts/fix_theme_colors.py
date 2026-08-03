import re

# 1. Update css/components.css
with open('css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace purple colors with theme colors in the newly added block
css = css.replace('.eyebrow-purple {', '.eyebrow-theme {')
css = css.replace('color: #a87ffb;', 'color: var(--primary-silver);')
css = css.replace('.gradient-text-purple {', '.gradient-text-theme {')
css = css.replace('background: linear-gradient(135deg, #a87ffb 0%, #6366f1 100%);', 'background: var(--gradient-silver);')

# For the button, we will just use the standard `.btn-primary` but we can add `.btn-wide`
btn_wide_css = '''
.btn-wide {
    width: 100%;
    max-width: 500px;
    justify-content: center;
    padding: 1.2rem 3rem;
    font-size: 1.1rem;
    border-radius: 50px;
}
'''
if '.btn-wide {' not in css:
    css = css + '\n' + btn_wide_css

with open('css/components.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('eyebrow-purple', 'eyebrow-theme')
html = html.replace('gradient-text-purple', 'gradient-text-theme')
html = html.replace('btn-wide-purple', 'btn-primary btn-wide')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
