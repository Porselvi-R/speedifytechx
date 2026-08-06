import re

# 1. Update about.html
with open('about.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the new marquee track containing exactly 5 cards, duplicated for the infinite loop
new_team_html = '''                <div class="team-carousel-container marquee-container">
                    <div class="team-carousel-track-wrapper">
                        <div class="team-carousel-track marquee-track">
                            <!-- Original 5 cards -->
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Alex Chen</h3>
                                <p class="team-role">Lead Developer</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Sarah Jenkins</h3>
                                <p class="team-role">UI/UX Director</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Marcus Thorne</h3>
                                <p class="team-role">Tech Lead</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Elena Rodriguez</h3>
                                <p class="team-role">Marketing Head</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>David Kim</h3>
                                <p class="team-role">Data Scientist</p>
                            </div>
                            
                            <!-- Duplicated 5 cards for seamless infinite loop -->
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Alex Chen</h3>
                                <p class="team-role">Lead Developer</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Sarah Jenkins</h3>
                                <p class="team-role">UI/UX Director</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Marcus Thorne</h3>
                                <p class="team-role">Tech Lead</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>Elena Rodriguez</h3>
                                <p class="team-role">Marketing Head</p>
                            </div>
                            <div class="team-card glass-card hover-lift fade-in text-only-card">
                                <h3>David Kim</h3>
                                <p class="team-role">Data Scientist</p>
                            </div>
                        </div>
                    </div>
                </div>'''

# Replace everything from <div class="team-carousel-container"> to the closing </div> of that container
pattern = r'<div class="team-carousel-container">.*?<button class="carousel-btn next-btn"[^>]*>.*?</button>\s*</div>'
html = re.sub(pattern, new_team_html, html, flags=re.DOTALL)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Update css/components.css to add marquee styles
with open('css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

marquee_css = '''
/* ====================================
   TEAM MARQUEE ANIMATION
   ==================================== */
.marquee-container {
    overflow: hidden;
    position: relative;
    width: 100%;
}

.marquee-track {
    display: flex;
    gap: var(--spacing-lg);
    width: max-content;
    animation: scrollMarquee 20s linear infinite;
}

.marquee-track:hover {
    animation-play-state: paused;
}

@keyframes scrollMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - (var(--spacing-lg) / 2))); }
}

.text-only-card {
    min-width: 280px;
    padding: var(--spacing-xl) var(--spacing-lg);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.text-only-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.text-only-card .team-role {
    color: var(--silver-dark);
    font-size: 1rem;
    margin: 0;
}
'''

if 'TEAM MARQUEE ANIMATION' not in css:
    with open('css/components.css', 'a', encoding='utf-8') as f:
        f.write('\n' + marquee_css)

print("HTML and CSS updated successfully.")
