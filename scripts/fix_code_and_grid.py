import glob

# 1. Fix stray </div> in all HTML files
html_files = glob.glob('*.html')
for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        old_str = '<a href="#main-content" class="skip-link">Skip to main content</a>\n    </div>'
        new_str = '<a href="#main-content" class="skip-link">Skip to main content</a>'
        
        if old_str in content:
            content = content.replace(old_str, new_str)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Fixed stray div in {f}')
    except Exception as e:
        print(f'Error on {f}: {e}')

# 2. Revert the aurora glow effect to restore the original simple grid pattern
try:
    with open('css/components.css', 'r', encoding='utf-8') as f:
        css = f.read()
    
    if '/* ====================================\n   HERO GLOW EFFECT' in css:
        # We know exactly how it was appended
        parts = css.split('/* ====================================\n   HERO GLOW EFFECT')
        if len(parts) == 2:
            new_css = parts[0]
            with open('css/components.css', 'w', encoding='utf-8') as f:
                f.write(new_css)
            print('Removed hero glow effect to restore simple grid.')
except Exception as e:
    print(f'Error on css: {e}')
