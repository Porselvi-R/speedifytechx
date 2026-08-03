import re
import glob

# 1. Update css/components.css
with open('css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make the grid lighter
# We are looking for:
# background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
#                   linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
css = css.replace('rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.015)')

# Fix the grid column spacing
css = css.replace('grid-template-columns: 1.2fr 0.8fr;', 'grid-template-columns: 1fr 1fr;\n    max-width: 1200px;\n    margin: 0 auto;')

# Ensure .page-hero-content handles its children nicely
if '.page-hero-content {' in css:
    css = css.replace('.page-hero-content {\n    position: relative;', '.page-hero-content {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;')

with open('css/components.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Fix the HTML structure in all pages to ensure hero-badge is inside page-hero-content
html_files = glob.glob('*.html')
for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # If hero-badge is before page-hero-grid, move it inside page-hero-content
        # We need a regex for this:
        pattern = r'(<div class="hero-badge">.*?</div>)\s*(<div class="page-hero-grid">)\s*(<div class="page-hero-content">)'
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, r'\2\n                    \3\n                        \1', content, flags=re.DOTALL)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Fixed badge alignment in {f}')
    except Exception as e:
        print(f'Error on {f}: {e}')

print("CSS and HTML updated.")
