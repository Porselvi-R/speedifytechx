import re

with open('portfolio.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_projects_html = '''
                    <div class="portfolio-card fade-in">
                        <div class="portfolio-image">
                            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800" alt="Corporate Website" loading="lazy">
                            <div class="portfolio-overlay">
                                <a href="portfolio.html" class="btn btn-primary btn-small">View Case Study</a>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <div class="portfolio-tags">
                                <span class="tag">Web Design</span>
                                <span class="tag">Corporate</span>
                            </div>
                            <h3>Nexus Enterprises</h3>
                            <p>A modern, fully responsive corporate presence designed to establish industry authority</p>
                        </div>
                    </div>
                    
                    <div class="portfolio-card fade-in">
                        <div class="portfolio-image">
                            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800" alt="SaaS Platform" loading="lazy">
                            <div class="portfolio-overlay">
                                <a href="portfolio.html" class="btn btn-primary btn-small">View Case Study</a>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <div class="portfolio-tags">
                                <span class="tag">SaaS</span>
                                <span class="tag">Cloud</span>
                            </div>
                            <h3>CloudSync AI</h3>
                            <p>An AI-powered file synchronization tool with an ultra-minimal user interface</p>
                        </div>
                    </div>
                    
                    <div class="portfolio-card fade-in">
                        <div class="portfolio-image">
                            <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800" alt="Web Platform" loading="lazy">
                            <div class="portfolio-overlay">
                                <a href="portfolio.html" class="btn btn-primary btn-small">View Case Study</a>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <div class="portfolio-tags">
                                <span class="tag">Education</span>
                                <span class="tag">Platform</span>
                            </div>
                            <h3>EduLearn Portal</h3>
                            <p>A robust e-learning platform supporting thousands of concurrent students</p>
                        </div>
                    </div>
'''

# We need to insert the new projects right before the closing div of the portfolio-grid.
# Find the end of the portfolio grid in portfolio.html.
# The portfolio grid ends with:
#                     </div>
#                 </div>
#                 
#                 <div class="center" style="margin-top: 3rem;">
#                     <a href="portfolio.html" class="btn btn-secondary">View All Projects</a>
#                 </div>

html = html.replace('''                    </div>
                </div>
                
                <div class="center" style="margin-top: 3rem;">
                    <a href="portfolio.html" class="btn btn-secondary">View All Projects</a>
                </div>''', '''                    </div>
''' + new_projects_html + '''                </div>
                
                <div class="center" style="margin-top: 3rem;">
                    <a href="portfolio.html" class="btn btn-secondary">View All Projects</a>
                </div>''')

with open('portfolio.html', 'w', encoding='utf-8') as f:
    f.write(html)
