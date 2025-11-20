// Submit Page JavaScript
console.log('Submit page JavaScript loaded!');

document.addEventListener('DOMContentLoaded', function () {
  console.log('📄 Submit page DOM Content Loaded!');

  // Language toggle functionality
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      langButtons.forEach((btn) => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const selectedLang = this.getAttribute('data-lang');
      console.log('🌐 Language changed to:', selectedLang);

      // Update content based on selected language
      updateContent(selectedLang);
    });
  });

  // Initialize with Korean
  updateContent('ko');

  // Form submission tracking
  trackFormSubmission();
});

function updateContent(lang) {
  console.log('🔄 Updating content for language:', lang);

  if (lang === 'ko') {
    // Korean content (default)
    updateKoreanContent();
  } else if (lang === 'en') {
    // English content
    updateEnglishContent();
  }
}

function updateKoreanContent() {
  // Korean content is already in HTML, no changes needed
  console.log('🇰🇷 Korean content loaded');
}

function updateEnglishContent() {
  // Update page content to English
  const elements = {
    'submit-header h2': 'Submit Business',
    'submit-header p': 'Register your business with the Vancouver Korean community!',
    'submit-info h3': '📋 Registration Guide',
    'submit-form-container h3': '📝 Business Information',
    'submit-tips h3': '💡 Registration Tips',
    'submit-contact h3': '📞 Contact Us',
    'submit-contact p': 'If you have any questions or need help during registration, please contact us anytime!',
  };

  Object.entries(elements).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  });

  // Update tip cards
  const tipCards = document.querySelectorAll('.tip-card h4');
  const tipTexts = ['📍 Accurate Address', '🕒 Business Hours', '📸 Photos', '📝 Detailed Description'];

  tipCards.forEach((card, index) => {
    if (tipTexts[index]) {
      card.textContent = tipTexts[index];
    }
  });

  console.log('🇺🇸 English content loaded');
}

function trackFormSubmission() {
  // Track when users interact with the form
  const formIframe = document.getElementById('googleForm');

  if (formIframe) {
    // Listen for form submission events
    formIframe.addEventListener('load', function () {
      console.log('📝 Google Form loaded successfully');

      // Add event listener for form submission
      try {
        const formDoc = formIframe.contentDocument || formIframe.contentWindow.document;
        const form = formDoc.querySelector('form');

        if (form) {
          form.addEventListener('submit', function () {
            console.log('✅ Form submitted successfully');
            showSubmissionSuccess();
          });
        }
      } catch (error) {
        // Cross-origin restrictions may prevent this
        console.log('⚠️ Cannot access form content due to CORS restrictions');
      }
    });
  }
}

function showSubmissionSuccess() {
  // Show success message after form submission
  const successMessage = document.createElement('div');
  successMessage.className = 'submission-success';
  successMessage.innerHTML = `
        <div class="success-content">
            <h3>✅ 등록 완료!</h3>
            <p>업체 등록이 성공적으로 제출되었습니다. 24시간 내에 검토 후 승인됩니다.</p>
            <button onclick="this.parentElement.parentElement.remove()">확인</button>
        </div>
    `;

  // Add styles
  successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

  const successContent = successMessage.querySelector('.success-content');
  successContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
    `;

  document.body.appendChild(successMessage);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (successMessage.parentElement) {
      successMessage.remove();
    }
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Add loading state for form
window.addEventListener('load', function () {
  const formIframe = document.getElementById('googleForm');
  if (formIframe) {
    formIframe.style.opacity = '0';
    formIframe.style.transition = 'opacity 0.5s ease';

    formIframe.addEventListener('load', function () {
      this.style.opacity = '1';
    });
  }
});
