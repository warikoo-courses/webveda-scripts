(function () {
  const razorpayScript = document.createElement("script");
  razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.head.appendChild(razorpayScript);

  const stripeScript = document.createElement("script");
  stripeScript.src = "https://js.stripe.com/v3/";
  document.head.appendChild(stripeScript);

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
            <label for="whatsapp">WhatsApp Number* (Default Country Code is +91)</label>
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
    .wv-submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      filter: grayscale(100%);
    }
    .wv-submit-btn.loading {
      position: relative;
    }

    .wv-submit-btn.loading::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      border: 2px solid #fff;
      border-top: 2px solid #ccc;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      transform: translate(-50%, -50%);
    }

    @keyframes spin {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  `;

  function getlocalStorageCart() {
    const cart = localStorage.getItem("cartItems");
    if (!cart) return [];
    const parsedCart = JSON.parse(cart);
    const uniqueCart = [...new Set(parsedCart)];
    console.log(uniqueCart);
    return uniqueCart;
  }

  // Create and insert style element
  // const style = document.createElement("style");
  // style.textContent = styleSheet;
  // document.head.appendChild(style);

  // Insert modal HTML
  // const div = document.createElement("div");
  // div.innerHTML = modalHTML;
  // document.body.appendChild(div.firstElementChild);

  // Initialize payment form functionality
  async function initializePaymentForm() {
    const url_str = window.location.href;
    const url = new URL(url_str);
    const course_name = getlocalStorageCart();
    const submitBtn = document.querySelector(".wv-submit-btn");
    // Get modal elements
    const modal = document.getElementById("formModal");
    const closeBtn = modal.querySelector(".wv-close-btn");
    const userForm = document.getElementById("userDetailsForm");

    // Close modal function
    function closeModal() {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
      searchParams.delete("basicDetails");
      const newUrl = `${window.location.pathname}${
        searchParams.toString() ? "?" + searchParams.toString() : ""
      }`;
      history.pushState({ path: newUrl }, "", newUrl);
    }

    // Add close button event listener
    closeBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Add escape key listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    async function generatePayment(course_name_array, name, ip_data) {
      try {
        async function getIPAddress() {
          try {
            // Try IPv6 first
            const ipv6Response = await fetch(
              "https://api6.ipify.org/?format=json"
            );
            const ipv6Data = await ipv6Response.json();
            return ipv6Data.ip;
          } catch (error) {
            try {
              // Fall back to IPv4 if IPv6 request failed
              const ipv4Response = await fetch(
                "https://api.ipify.org?format=json"
              );
              const ipv4Data = await ipv4Response.json();
              return ipv4Data.ip;
            } catch (error) {
              return "";
            }
          }
        }

        const url = new URL(window.location.href);
        const timestamp = document.cookie
          .split("; ")
          .find((row) => row.startsWith("timestamp="))
          ?.split("=")[1];
        const fbc = document.cookie
          .split("; ")
          .find((row) => row.startsWith("_fbc="))
          ?.split("=")[1];
        const fbp = document.cookie
          .split("; ")
          .find((row) => row.startsWith("_fbp="))
          ?.split("=")[1];
        const ipAddress = await getIPAddress();
        const userAgent = navigator.userAgent;
        const body_rzp = JSON.stringify({
          name: name,
          course: course_name_array,
          utmSource: url.searchParams.get("utm_source"),
          utmMedium: url.searchParams.get("utm_medium"),
          utmCampaign: url.searchParams.get("utm_campaign"),
          utmContent: url.searchParams.get("utm_content"),
          utmTerm: url.searchParams.get("utm_term"),
          eventId: timestamp || "",
          fbc: fbc || "",
          fbp: fbp || "",
          ipAddress: ipAddress || "",
          userAgent: userAgent || "",
          ip_data: ip_data || "",
        });
        console.log(body_rzp);
        const response = await fetch(
          `https://webveda-checkout.onrender.com/api/v1/paymentGen`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body_rzp,
          }
        );
        return response.ok ? await response.json() : [];
      } catch (e) {
        console.error("Error generating payment:", e);
        return [];
      }
    }

    function validateForm(name, whatsapp, email) {
      let isValid = true;

      if (name.length < 2) {
        document.getElementById("nameError").textContent =
          "Name must be at least 2 characters long";
        isValid = false;
      } else {
        document.getElementById("nameError").textContent = "";
      }

      document.getElementById("whatsappError").textContent = "";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent =
          "Please enter a valid email address";
        isValid = false;
      } else {
        document.getElementById("emailError").textContent = "";
      }

      return isValid;
    }

    function redirectCourse(course_array, amount, name, email, phone) {
      const link = "final-thankyou";

      const sanitizedName = name.trim().replace(/\s+/g, "");
      const sanitizedEmail = encodeURIComponent(email.trim());
      const sanitizedPhone = phone.replace(/[^0-9]/g, "");

      const course_str = course_array.join("-");
      window.location.href = `/${link}?amount=${
        amount / 100
      }&course=${course_str}&name=${sanitizedName}&email=${sanitizedEmail}&phone_number=${sanitizedPhone}&currency=INR&${new URLSearchParams(
        window.location.search
      )}`;
    }

    let country = "IN";
    let ip_data = null;
    try {
      ip_data = await (
        await fetch(
          "https://ipapi.co/json/?key=BCjmIMf1YZiYOTXSDzA0qZfdLRw7BXmTTJ7MWRAI3v578IUzpS"
        )
      ).json();
      country = ip_data.country;
      if (ip_data.city && ip_data.region && ip_data.country && ip_data.postal) {
        document.cookie = `city=${ip_data.city}; path=/; max-age=1800`;
        document.cookie = `region=${ip_data.region}; path=/; max-age=1800`;
        document.cookie = `country=${ip_data.country}; path=/; max-age=1800`;
        document.cookie = `postal=${ip_data.postal}; path=/; max-age=1800`;
      }
    } catch (err) {}

    function checkURLAndShowForm() {
      const url = new URL(window.location.href);
      const hasBasicDetails = url.searchParams.get("basicDetails") === "true";
      const modal = document.getElementById("formModal");

      if (hasBasicDetails) {
        modal.classList.remove("wv-hidden");
      } else {
        modal.classList.add("wv-hidden");
      }
    }
    checkURLAndShowForm();

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      originalPushState.apply(this, arguments);
      checkURLAndShowForm();
    };

    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      checkURLAndShowForm();
    };

    window.addEventListener("popstate", checkURLAndShowForm);

    if (country === "IN") {
      userForm.onsubmit = async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");
        submitBtn.textContent = "Loading...";

        const name = document.getElementById("name").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();
        const email = document.getElementById("email").value.trim();
        if (course_name.length < 1) {
          return;
        }
        const paymentArray = await generatePayment(course_name, name, ip_data);
        console.log(ip_data);
        if (validateForm(name, whatsapp, email)) {
          const rzp1 = new Razorpay({
            key: "rzp_live_YZSHqiTnfwaXXt",
            currency: "INR",
            name: "Zaan WebVeda Pvt. Ltd.",
            description: "Course Transaction",
            order_id: paymentArray[0],
            prefill: {
              email: email,
              contact: whatsapp,
            },
            handler: () => {
              redirectCourse(
                course_name,
                paymentArray[1],
                name,
                email,
                whatsapp
              );
            },
            theme: { color: "#3399cc" },
          });

          rzp1.on("payment.failed", (res) => alert(res.error.description));
          modal.classList.add("wv-hidden");
          rzp1.open();
        }
      };
    } else {
      const stripe = Stripe(
        "pk_live_51NramAIh34G26BoL2MEuQMbFzUIHGYgn9SIBs7zJmkya79BMzuxJDle7NINc2BNJRtrDjTIGJrXfTDF0ph1qeCUF00bXyEZeNb"
      );

      userForm.onsubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();
        const email = document.getElementById("email").value.trim();

        if (validateForm(name, whatsapp, email)) {
          const url = new URL(window.location.href);
          const timestamp = document.cookie
            .split("; ")
            .find((row) => row.startsWith("timestamp="))
            ?.split("=")[1];
          const body_stripe = JSON.stringify({
            name: name,
            email: email,
            phone: whatsapp,
            course_array: course_name,
            utmSource: url.searchParams.get("utm_source"),
            utmMedium: url.searchParams.get("utm_medium"),
            utmCampaign: url.searchParams.get("utm_campaign"),
            utmContent: url.searchParams.get("utm_content"),
            utmTerm: url.searchParams.get("utm_term"),
            eventId: timestamp || "",
            ip_data: ip_data || "",
          });
          const response = await fetch(
            `https://webveda-checkout.onrender.com/api/v1/stripepayment/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: body_stripe,
            }
          );

          const { clientSecret } = await response.json();
          modal.classList.add("wv-hidden");
          (
            await stripe.initEmbeddedCheckout({
              fetchClientSecret: () => clientSecret,
            })
          ).mount("#checkout");
          document.getElementById("checkout").style.display = "block";
        }
      };
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePaymentForm);
  } else {
    initializePaymentForm();
  }
})();
