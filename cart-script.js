(function() {
  // Dynamically add Razorpay and Stripe scripts
  const razorpayScript = document.createElement('script');
  razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.head.appendChild(razorpayScript);

  const stripeScript = document.createElement('script');
  stripeScript.src = 'https://js.stripe.com/v3/';
  document.head.appendChild(stripeScript);

  // Rest of your modal and payment code...
})();

(function() {
  // Insert modal HTML into document
  const modalHTML = `
    <div id="formModal" class="wv-modal wv-hidden">
      <div class="wv-modal-content">
        <button type="button" class="wv-close-btn">&times;</button>
        <h2>Enter Your Details</h2>
        <form id="userDetailsForm">
          <div class="wv-form-group">
            <label for="name">Name*</label>
            <input type="text" id="name" required>
            <span class="wv-error-message" id="nameError"></span>
          </div>
          <div class="wv-form-group">
            <label for="whatsapp">WhatsApp Number*</label>
            <input type="tel" id="whatsapp" required>
            <span class="wv-error-message" id="whatsappError"></span>
          </div>
          <div class="wv-form-group">
            <label for="email">Email*</label>
            <input type="email" id="email" required>
            <span class="wv-error-message" id="emailError"></span>
          </div>
          <button type="submit" class="wv-submit-btn">Proceed to Purchase</button>
        </form>
      </div>
    </div>
  `;

  // Insert CSS into document
  const styleSheet = `
    .wv-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }
    .wv-hidden {
      opacity: 0;
      pointer-events: none;
    }
    .wv-modal-content {
      position: relative;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .wv-close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 5px 10px;
      color: #666;
      transition: color 0.2s;
    }
    .wv-close-btn:hover {
      color: #333;
    }
    .wv-form-group {
      margin-bottom: 1.5rem;
    }
    .wv-form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .wv-form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .wv-form-group input:focus {
      outline: none;
      border-color: #3399cc;
      box-shadow: 0 0 0 2px rgba(51, 153, 204, 0.2);
    }
    .wv-error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
    .wv-submit-btn {
      width: 100%;
      padding: 0.75rem;
      background: #3399cc;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .wv-submit-btn:hover {
      background: #2d88b9;
    }
    .wv-modal-content h2 {
      margin: 0 0 1.5rem;
      text-align: center;
      color: #333;
    }
  `;

  // Create and insert style element
  const style = document.createElement('style');
  style.textContent = styleSheet;
  document.head.appendChild(style);

  // Insert modal HTML
  const div = document.createElement('div');
  div.innerHTML = modalHTML;
  document.body.appendChild(div.firstElementChild);

  // Initialize payment form functionality
  async function initializePaymentForm() {
    const url_str = window.location.href;
    const url = new URL(url_str);
    const course_name = url.searchParams.get('course');

    // Get modal elements
    const modal = document.getElementById('formModal');
    const closeBtn = modal.querySelector('.wv-close-btn');
    const userForm = document.getElementById('userDetailsForm');

    // Close modal function
    function closeModal() {
      modal.classList.add('wv-hidden');
    }

    // Add close button event listener
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Add escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    async function generatePayment(course_name) {
      try {
        const response = await fetch(`https://webveda-checkout.onrender.com/api/v1/paymentGen/${course_name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        return response.ok ? await response.json() : [];
      } catch (e) {
        console.error('Error generating payment:', e);
        return [];
      }
    }

    function validateForm(name, whatsapp, email) {
      let isValid = true;
      
      if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
        isValid = false;
      } else {
        document.getElementById('nameError').textContent = '';
      }
      
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(whatsapp)) {
        document.getElementById('whatsappError').textContent = 'Please enter a valid 10-digit mobile number';
        isValid = false;
      } else {
        document.getElementById('whatsappError').textContent = '';
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
      } else {
        document.getElementById('emailError').textContent = '';
      }
      
      return isValid;
    }

    function redirectCourse(course) {
      const courses = {
        LACB_Premium: ['thank-you-launching-a-courses-business', 214700],
        LACB_Standard: ['thank-you-launching-a-courses-business', 204700],
        LACB_Basic: ['thank-you-launching-a-courses-business', 194700],
        MWAC_Premium: ['thank-you-make-writing-a-career', 188900],
        MWAC_Standard: ['thank-you-make-writing-a-career', 168900],
        MWAC_Basic: ['thank-you-make-writing-a-career', 158900],
        TCOYM_Premium: ['thank-you-take-charge-of-your-money', 95900],
        TCOYM_Standard: ['thank-you-take-charge-of-your-money', 85900],
        TCOYM_Basic: ['thank-you-take-charge-of-your-money', 75900],
        TCOYT_Premium: ['time-management-thankyou', 69900],
        TCOYT_Standard: ['time-management-thankyou', 39900],
        TCOYT_Basic: ['time-management-thankyou', 29900],
        TUGTEC_Premium: ['communication-thankyou', 74900],
        TUGTEC_Standard: ['communication-thankyou', 64900],
        TUGTEC_Basic: ['communication-thankyou', 54900],
        HTY_Premium: ['youtube-thankyou', 199900],
        HTY_Standard: ['youtube-thankyou', 169900],
        HTY_Basic: ['youtube-thankyou', 129900],
        HTI_Premium: ['instagram-thankyou', 174900],
        HTI_Standard: ['instagram-thankyou', 154900],
        HTI_Basic: ['instagram-thankyou', 144900],
        HTL_Premium: ['thankyou-htl', 235900],
        HTL_Standard: ['thankyou-htl', 215900],
        HTL_Basic: ['thankyou-htl', 195900],
        TCGTSU_English: ['starting-up-thankyou', 149900],
        TCGTSU_Hindi: ['starting-up-thankyou', 139900],
        TCGTSU_Both: ['starting-up-thankyou', 149900],
      };
      
      if (courses[course]) {
        const [link, amt] = courses[course];
        window.location.href = `/${link}?amount=${amt}&${new URLSearchParams(window.location.search)}`;
      } else {
        console.log('Course not found.');
      }
    }

    const country = (await (await fetch('https://ipapi.co/json/')).json()).country;

    window.initializePaymentModal = function(e) {
      if (e) e.preventDefault();
      const modal = document.getElementById('formModal');
      modal.classList.remove('wv-hidden');
    };

    if (country === 'IN') {
      const paymentArray = await generatePayment(course_name);

      userForm.onsubmit = async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (validateForm(name, whatsapp, email)) {
          const rzp1 = new Razorpay({
            key: 'rzp_test_qznxbMCkyK8R4T',
            currency: 'INR',
            name: 'Zaan WebVeda Pvt. Ltd.',
            description: 'Test Transaction',
            order_id: paymentArray[0],
            prefill: {
              email: email,
              contact: whatsapp
            },
            notes: {
              name: name,
              address: 'TEST'
            },
            handler: res => {
              const course_param = new URLSearchParams(window.location.search).get('course');
              course_param ? redirectCourse(course_param) : alert('ERROR');
            },
            theme: { color: '#3399cc' },
          });
          
          rzp1.on('payment.failed', res => alert(res.error.description));
          modal.classList.add('wv-hidden');
          rzp1.open();
        }
      };
    } else {
      const stripe = Stripe('pk_test_51NramAIh34G26BoLsAPEYWa9Q0hh6hIjhAqCNdhUcZcU5ZmL0odpH9b9lt4xpUNARB4VAXRLPzMKj86YhRT0fBJb00YVptVyRu');

      userForm.onsubmit = async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (validateForm(name, whatsapp, email)) {
          const response = await fetch(`https://webveda-checkout.onrender.com/api/v1/stripepayment/${course_name}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              phone: whatsapp
            })
          });
          
          const { clientSecret } = await response.json();
          modal.classList.add('wv-hidden');
          (await stripe.initEmbeddedCheckout({ fetchClientSecret: () => clientSecret })).mount('#checkout');
          document.getElementById('checkout').style.display = 'block';
        }
      };
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePaymentForm);
  } else {
    initializePaymentForm();
  }
})();