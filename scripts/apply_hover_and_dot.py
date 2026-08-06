import re
import glob

# 1. Update about.html
with open('about.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the new marquee track containing exactly 5 cards with hover states, duplicated for the infinite loop
new_team_html = '''                <div class="team-carousel-container marquee-container">
                    <div class="team-carousel-track-wrapper">
                        <div class="team-carousel-track marquee-track">
                            <!-- Original 5 cards -->
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Alex Chen</h3>
                                    <p class="team-role">Lead Developer</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">10+ years of full-stack experience crafting scalable digital solutions.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Sarah Jenkins</h3>
                                    <p class="team-role">UI/UX Director</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">Award-winning designer focused on creating intuitive, human-centered interfaces.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Marcus Thorne</h3>
                                    <p class="team-role">Tech Lead</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">Systems architecture expert specializing in robust cloud infrastructure.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Elena Rodriguez</h3>
                                    <p class="team-role">Marketing Head</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">Data-driven growth hacker bridging the gap between product and market.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>David Kim</h3>
                                    <p class="team-role">Data Scientist</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">AI enthusiast transforming complex datasets into actionable business intelligence.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            
                            <!-- Duplicated 5 cards for seamless infinite loop -->
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Alex Chen</h3>
                                    <p class="team-role">Lead Developer</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">10+ years of full-stack experience crafting scalable digital solutions.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Sarah Jenkins</h3>
                                    <p class="team-role">UI/UX Director</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">Award-winning designer focused on creating intuitive, human-centered interfaces.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Marcus Thorne</h3>
                                    <p class="team-role">Tech Lead</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">Systems architecture expert specializing in robust cloud infrastructure.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>Elena Rodriguez</h3>
                                    <p class="team-role">Marketing Head</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">Data-driven growth hacker bridging the gap between product and market.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <div class="card-default-content">
                                    <h3>David Kim</h3>
                                    <p class="team-role">Data Scientist</p>
                                </div>
                                <div class="card-hover-content">
                                    <p class="team-bio">AI enthusiast transforming complex datasets into actionable business intelligence.</p>
                                    <a href="portfolio.html" class="btn btn-primary btn-small">View Portfolio</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>'''

# Replace everything from <div class="team-carousel-container marquee-container"> to the closing </div> of that container
pattern = r'<div class="team-carousel-container marquee-container">.*?</div>\s*</div>\s*</div>'
html = re.sub(pattern, new_team_html, html, flags=re.DOTALL)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Update css/components.css to add the hover states
with open('css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace existing .text-only-card rule with a more advanced one
old_text_only = r'\.text-only-card \{\s*width: 280px;\s*height: 280px;\s*flex: 0 0 auto;\s*padding: var\(--spacing-md\);\s*text-align: center;\s*display: flex;\s*flex-direction: column;\s*justify-content: center;\s*align-items: center;\s*border: 1px solid rgba\(255, 255, 255, 0\.05\);\s*\}'

new_text_only = '''.text-only-card {
    width: 280px;
    height: 280px;
    flex: 0 0 auto;
    padding: var(--spacing-md);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    background: rgba(10, 10, 10, 0.5);
}

.text-only-card:hover {
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    background: rgba(20, 20, 20, 0.9);
}

.card-default-content {
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translateY(15px);
}

.text-only-card:hover .card-default-content {
    transform: translateY(-20px);
}

.card-hover-content {
    position: absolute;
    bottom: -50px;
    left: 0;
    width: 100%;
    padding: 0 var(--spacing-md);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text-only-card:hover .card-hover-content {
    bottom: 25px;
    opacity: 1;
    visibility: visible;
}

.team-bio {
    font-size: 0.85rem;
    color: var(--silver-medium);
    margin-bottom: 1rem;
    line-height: 1.4;
}'''

css = re.sub(old_text_only, new_text_only, css)
with open('css/components.css', 'w', encoding='utf-8') as f:
    f.write(css)


# 3. Remove <span class="dot">.</span> across all HTML files
html_files = glob.glob('*.html')
for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if '<span class="dot">.</span>' in content:
            # We specifically want to remove the dot next to SpeedifyTechX in the nav
            # Just replacing all occurrences of <span class="dot">.</span> might remove it from headings
            # So let's target: <span>SpeedifyTechX<span class="dot">.</span></span>
            content = content.replace('<span>SpeedifyTechX<span class="dot">.</span></span>', '<span>SpeedifyTechX</span>')
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Removed dot in {f}')
    except Exception as e:
        print(f'Error on {f}: {e}')

print("Updates completed successfully.")
