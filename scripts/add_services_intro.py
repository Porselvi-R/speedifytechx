import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

services_intro_html = '''
        <!-- Services Intro Section -->
        <section class="services-intro section-padding">
            <div class="container">
                <div class="services-intro-block fade-in">
                    <span class="eyebrow eyebrow-purple">WHAT WE DO</span>
                    <h2 class="services-intro-title">
                        <span class="gradient-text-purple">Our</span> Services
                    </h2>
                    <p class="services-intro-subtitle">
                        Comprehensive digital solutions tailored to your business needs
                    </p>
                    
                    <div class="spacer" style="height: 40px;"></div>
                    
                    <p class="services-intro-paragraph">
                        From web development and UI/UX design to software and AI solutions explore everything we offer.
                    </p>
                    
                    <a href="services.html" class="btn btn-wide-purple">
                        Explore Our Services <i data-lucide="arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
'''

# Find the "Services Preview Section" and replace it.
# The services preview section starts at <!-- Services Preview Section --> and ends right before <!-- About Preview Section -->
html = re.sub(r'<!-- Services Preview Section -->.*?<!-- About Preview Section -->', services_intro_html + '\n        <!-- About Preview Section -->', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Add CSS to css/components.css
css_addition = '''
/* Services Intro Redesign */
.services-intro-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

.eyebrow-purple {
    color: #a87ffb;
    letter-spacing: 3px;
    font-weight: 600;
}

.services-intro-title {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -1px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: var(--white);
}

.gradient-text-purple {
    background: linear-gradient(135deg, #a87ffb 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.services-intro-subtitle {
    font-size: 1.25rem;
    color: var(--silver-medium);
    margin-bottom: 2rem;
}

.services-intro-paragraph {
    font-size: clamp(1.2rem, 3vw, 1.75rem);
    line-height: 1.5;
    color: var(--silver-light);
    margin-bottom: 3rem;
    max-width: 700px;
}

.btn-wide-purple {
    background: linear-gradient(135deg, #a87ffb 0%, #8b5cf6 100%);
    color: #ffffff;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 1.2rem 3rem;
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 25px rgba(168, 127, 251, 0.3);
    width: 100%;
    max-width: 500px;
    justify-content: center;
}

.btn-wide-purple:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(168, 127, 251, 0.4);
    background: linear-gradient(135deg, #b895fc 0%, #9c73f7 100%);
}

@media (max-width: 768px) {
    .services-intro-block {
        padding: 2rem 1rem;
    }
}
'''

with open('css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.services-intro-block' not in css:
    with open('css/components.css', 'a', encoding='utf-8') as f:
        f.write('\n' + css_addition)

print("Updated index.html and css/components.css successfully.")
