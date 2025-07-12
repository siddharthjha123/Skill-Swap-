const users = [
  {
    name: 'Marc Demo',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Graceful Whale'],
    rating: '3.9/5'
  },
  {
    name: 'Michell',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: '2.5/5'
  },
  {
    name: 'Joe Wills',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: '4.0/5'
  }
];

const cardsPerPage = 3;
let currentPage = 1;

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

function renderUsers() {
  const container = document.getElementById('userCards');
  container.innerHTML = '';

  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const paginatedUsers = users.slice(start, end);

  paginatedUsers.forEach((user, index) => {
    const card = document.createElement('div');
    card.className = 'card reveal';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <div class="profile-photo"></div>
      <div class="card-details">
        <h3>${user.name}</h3>
        <p><strong>Skills Offered:</strong></p>
        <div class="skill-tags">${user.skillsOffered.map(skill => `<span>${skill}</span>`).join('')}</div>
        <p><strong>Skills Wanted:</strong></p>
        <div class="skill-tags">${user.skillsWanted.map(skill => `<span class="${skill === 'Graceful Whale' ? 'green-tag' : ''}">${skill}</span>`).join('')}</div>
        <small>Rating: ${user.rating}</small>
      </div>
      <button class="request-btn">Request</button>
    `;

    // Add click animation to request button
    const requestBtn = card.querySelector('.request-btn');
    requestBtn.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
        showNotification(`Request sent to ${user.name}!`);
      }, 150);
    });

    container.appendChild(card);
    
    // Observe card for scroll animation
    observer.observe(card);
  });

  renderPagination();
}

function renderPagination() {
  const pageSpan = document.getElementById('pageNumbers');
  const totalPages = Math.ceil(users.length / cardsPerPage);
  pageSpan.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.style.fontWeight = i === currentPage ? 'bold' : 'normal';
    btn.onclick = () => {
      currentPage = i;
      smoothPageTransition();
    };
    pageSpan.appendChild(btn);
  }
}

function smoothPageTransition() {
  const container = document.getElementById('userCards');
  
  // Fade out current cards
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    renderUsers();
    // Fade in new cards
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 300);
}

function nextPage() {
  const totalPages = Math.ceil(users.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    smoothPageTransition();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    smoothPageTransition();
  }
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 600;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Search functionality with debouncing
let searchTimeout;
function setupSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-btn');
  
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(this.value);
    }, 300);
  });
  
  searchBtn.addEventListener('click', function() {
    const searchValue = searchInput.value;
    performSearch(searchValue);
    
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
}

function performSearch(query) {
  if (!query.trim()) {
    currentPage = 1;
    renderUsers();
    return;
  }
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.skillsOffered.some(skill => skill.toLowerCase().includes(query.toLowerCase())) ||
    user.skillsWanted.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
  );
  
  // Update the displayed users (in a real app, you'd filter the actual data)
  // For now, we'll just show a notification
  if (filteredUsers.length > 0) {
    showNotification(`Found ${filteredUsers.length} matching users`);
  } else {
    showNotification('No users found matching your search');
  }
}

// Smooth scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add scroll to top button when scrolling down
function setupScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--dark-graphite) 0%, #404040 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  scrollBtn.addEventListener('click', scrollToTop);
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.transform = 'translateY(20px)';
    }
  });
}

// Add hover effects to login button
function setupLoginButton() {
  const loginBtn = document.querySelector('.login-btn');
  loginBtn.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
      showNotification('Login functionality coming soon!');
    }, 150);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  renderUsers();
  setupSearch();
  setupScrollToTop();
  setupLoginButton();
  
  // Add smooth transition to card container
  const cardContainer = document.getElementById('userCards');
  cardContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Add CSS variables to document for scroll-to-top button
document.documentElement.style.setProperty('--dark-graphite', '#2F2F2F');
