import re
import glob

html_files = glob.glob('*.html')
# We exclude index.html because it's already correct.
if 'index.html' in html_files:
    html_files.remove('index.html')

for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        if 'class="page-hero' in content and 'class="page-hero-grid"' in content:
            # 1. Update the section, container, and content wrappers
            # We match from <section class="page-hero to <div class="page-hero-content">
            # Using regex to handle variable whitespace or additional classes
            
            # Step 1: Section
            content = re.sub(r'<section class="page-hero[^"]*">', r'<section class="hero-section">', content)
            
            # Step 2: Container (we just look for the first container after heroCanvas)
            content = re.sub(r'(<canvas id="heroCanvas" class="hero-canvas"></canvas>)\s*<div class="container">', r'\1\n            <div class="container hero-container">', content)
            
            # Step 3: Grid & Content
            content = content.replace('<div class="page-hero-grid">', '')
            content = content.replace('<div class="page-hero-content">', '<div class="hero-content">')
            
            # Step 4: Mascot to Visual Wrapper
            # We need to capture the inner img or video tag
            mascot_pattern = r'<div class="page-hero-mascot">\s*(<(?:img|video)[^>]+>(?:</video>)?)\s*</div>'
            replacement = r'''<div class="hero-visual">
                    <div class="hero-image-wrapper">
                        \1
                        <div class="hero-glow"></div>
                    </div>
                </div>'''
            
            content = re.sub(mascot_pattern, replacement, content)
            
            # Since we removed <div class="page-hero-grid">, we need to remove one closing </div> tag.
            # But wait, replacing <div class="page-hero-grid"> with nothing means we have an extra </div> at the end of the section.
            # Let's fix that by replacing the sequence that closes it.
            # The structure was:
            #                     </div> (closes mascot)
            #                 </div> (closes grid)
            #             </div> (closes container)
            #         </section>
            # Since we replaced mascot entirely and removed the grid opening, the closing sequence:
            #             </div>
            #         </section>
            # will have an extra </div> above it. Let's just do a string replace for the specific tail block.
            
            tail_block = '''                </div>
            </div>
        </section>'''
            
            new_tail = '''            </div>
        </section>'''
            content = content.replace(tail_block, new_tail)

            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Standardized {f}')
    except Exception as e:
        print(f'Error on {f}: {e}')

print("Standardization complete.")
