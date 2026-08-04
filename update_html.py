import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace data-animate with data-aos
html = html.replace('data-animate', 'data-aos="fade-up"')

# Add AOS CSS to head
if 'aos.css' not in html:
    html = html.replace('</head>', '  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>')

# Add AOS JS to body
if 'aos.js' not in html:
    html = html.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({duration: 800, once: true});</script>\n</body>')

# Create 10 more poster cards
new_posters = ''
for i in range(4, 14):
    new_posters += f'''        <div class="project-card" data-aos="fade-up">
          <div class="project-image">
            <img src="images/poster_{i}.png" alt="Movie Poster {i}" loading="lazy" />
            <div class="project-overlay">
              <a href="#" class="project-link"><i class="fas fa-eye"></i> View Detail</a>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">Movie Poster {i}</h3>
            <p class="project-desc">Professional movie poster design.</p>
          </div>
        </div>\n'''

# Create 10 more thumb cards
new_thumbs = ''
for i in range(4, 14):
    new_thumbs += f'''        <div class="project-card" data-aos="fade-up">
          <div class="project-image">
            <img src="images/thumb_{i}.png" alt="YouTube Thumbnail {i}" loading="lazy" />
            <div class="project-overlay">
              <a href="#" class="project-link"><i class="fas fa-eye"></i> View Detail</a>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">YouTube Thumbnail {i}</h3>
            <p class="project-desc">Engaging and high CTR YouTube thumbnail.</p>
          </div>
        </div>\n'''

# We inject the new posters before the first closing `</div>\n      <div class="section-header"`
# There are two `</div>\n      </div>` sequences for grid ends.
# We can find the insertion points by splitting.
html = html.replace(
    '      </div>\n\n      <div class="section-header" data-aos="fade-up" style="margin-top: 80px;">',
    new_posters + '      </div>\n\n      <div class="section-header" data-aos="fade-up" style="margin-top: 80px;">'
)

html = html.replace(
    '      </div>\n    </div>\n  </section>\n\n  <!-- ===== SKILLS ===== -->',
    new_thumbs + '      </div>\n    </div>\n  </section>\n\n  <!-- ===== SKILLS ===== -->'
)

# Update the form action to open mailto link on submit.
# Let's remove the script.js logic later and just put it straight in HTML.
# Actually, the user said "when I message on email, I am not getting any message on email, correct it"
# We can just change the form to use Formsubmit.co properly and tell the user they need to click the activation link.
# Or better, we can use a direct mailto action in the form tag to completely bypass third-party services.
# Let's use Formsubmit but configure it better, or use mailto. 
# Mailto is completely reliable. 
html = html.replace(
    '<form class="contact-form" id="contactForm">',
    '<form class="contact-form" id="contactForm" action="mailto:shahzaibsohail0800@gmail.com" method="POST" enctype="text/plain">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
