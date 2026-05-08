// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fetch GitHub projects
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/techietinker1/repos');
        const repos = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        const repoDescriptions = {
            'image-inpainting': 'Built a machine learning pipeline to remove unwanted objects from images using masking and TensorFlow/Keras.',
            'phishing-url-detection': 'Developed a web-based phishing URL detector using rule-based filtering and machine learning techniques.',
            'predictive-analysis': 'Performed exploratory data analysis and predictive modeling to uncover trends and generate insights.',
            'python-calculator': 'Created a Python calculator application to demonstrate programming logic and usability.',
            'python-practice': 'Completed Python practice exercises focusing on algorithm development and coding fundamentals.',
            'news-classification-using-machine-learning': 'Built a news classifier that categorizes articles into relevant topics using NLP techniques.',
            'analysis-of-sales-in-supermarket': 'Analyzed supermarket sales data to generate business insights and improve decision-making.'
        };

        const filteredRepos = repos.filter(repo => repo.name.toLowerCase() !== 'code');
        filteredRepos.slice(0, 6).forEach(repo => {
            const repoKey = repo.name.toLowerCase();
            const description = repo.description || repoDescriptions[repoKey] || 'This project demonstrates data analysis and machine learning skills.';
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${description}</p>
                <div class="project-meta">
                    <span><strong>Primary language:</strong> ${repo.language || 'N/A'}</span>
                    <span><strong>Last updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        document.getElementById('projects-container').innerHTML = '<p>Unable to load projects at this time.</p>';
    }
}

// Contact form submission with custom popup
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showSuccessPopup();
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Unable to send message. Please try again later.');
    });
});

// Show success popup
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting me. I'll get back to you soon.</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProjects();
    initHeroCursorEffect();
    initBubbleBackground();
});

function initHeroCursorEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--hero-cursor-x', `${x}%`);
        hero.style.setProperty('--hero-cursor-y', `${y}%`);
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--hero-cursor-x', '50%');
        hero.style.setProperty('--hero-cursor-y', '50%');
    });
}

function initBubbleBackground() {
    const bubbleContainer = document.getElementById('bubble-background');
    if (!bubbleContainer) return;

    const createBubble = (x, y) => {
        const bubble = document.createElement('div');
        const size = Math.random() * 40 + 20;
        const hue = Math.random() * 40 + 200;
        bubble.className = 'bubble';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${x - size / 2}px`;
        bubble.style.top = `${y - size / 2}px`;
        bubble.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 85%, 0.9), transparent 60%)`;
        bubble.style.animationDuration = `${Math.random() * 4 + 7}s`;
        bubbleContainer.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 9000);
    };

    document.addEventListener('mousemove', (event) => {
        if (event.clientY > window.innerHeight * 0.35) {
            createBubble(event.clientX, event.clientY);
        }
    });
}
