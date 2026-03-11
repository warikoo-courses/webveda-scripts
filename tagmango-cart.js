(function () {
  function getlocalStorageCart() {
    const cart = localStorage.getItem("cartItems");
    if (!cart) return [];
    const parsedCart = JSON.parse(cart);
    const uniqueCart = [...new Set(parsedCart)];
    console.log(uniqueCart);
    return uniqueCart;
  }

  // Check if cart contains free courses (case-insensitive)
  function hasFreeCourses(course_array) {
    return course_array.some((course) =>
      course.toUpperCase().includes("_FREE")
    );
  }

  // Only load payment scripts if cart doesn't contain free courses
  const cartItems = getlocalStorageCart();
  const isFreeCourseOnly = cartItems.length > 0 && hasFreeCourses(cartItems);

  if (!isFreeCourseOnly) {
    console.log("Loading payment scripts for paid courses");
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.head.appendChild(razorpayScript);

    const stripeScript = document.createElement("script");
    stripeScript.src = "https://js.stripe.com/v3/";
    document.head.appendChild(stripeScript);
  } else {
    console.log("Free course detected - skipping payment script loading");
  }

  let isProcessing = false; // Flag to prevent multiple submissions

  // Mount isProcessing to window for access from other scripts
  window.isProcessing = isProcessing;

  // TagMango subscription amount in INR (always 1999)
  const TAGMANGO_SUBSCRIPTION_AMOUNT_PAISE = 199900;

  // Simple function to wait for elements to be available
  function waitForElement(selector, maxAttempts = 50, interval = 300) {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const checkElement = () => {
        const element = document.querySelector(selector);

        if (element) {
          console.log(`Element ${selector} found after ${attempts} attempts`);
          resolve(element);
        } else if (attempts >= maxAttempts) {
          reject(
            new Error(
              `Element ${selector} not found after ${maxAttempts} attempts`
            )
          );
        } else {
          attempts++;
          console.log(`Element ${selector} not found, retrying...`);
          setTimeout(checkElement, interval);
        }
      };

      checkElement();
    });
  }

  async function initializePaymentForm() {
    try {
      const course_name = getlocalStorageCart();

      // Wait for elements to be available
      const submitBtn = await waitForElement("#submitform");
      const userForm = await waitForElement("#detailsform");
      let phoneInput = document.getElementsByName("phone")[0];
      let country = "IN";
      let ip_data = null;
      try {
        ip_data = await (
          await fetch(
            "https://ipapi.co/json/?key=BCjmIMf1YZiYOTXSDzA0qZfdLRw7BXmTTJ7MWRAI3v578IUzpS"
          )
        ).json();
        country = ip_data.country;
        if (
          ip_data.city &&
          ip_data.region &&
          ip_data.country &&
          ip_data.postal
        ) {
          document.cookie = `city=${ip_data.city}; path=/; max-age=1800`;
          document.cookie = `region=${ip_data.region}; path=/; max-age=1800`;
          document.cookie = `country=${ip_data.country}; path=/; max-age=1800`;
          document.cookie = `postal=${ip_data.postal}; path=/; max-age=1800`;
        }
      } catch (err) {}

      if (phoneInput) {
        console.log("Found Phone Input");
        if (ip_data.country_calling_code) {
          phoneInput = document.getElementsByName("phone")[0];
          phoneInput.value = ip_data.country_calling_code || "+91";
          console.log("Set Phone Input");
        }
      }
      // Add Event Listener to Submit Button (In Framer Override)

      // Elements are now guaranteed to be available

      // Handle free course enrollment
      async function enrollFreeCourse(course_name_array, name, email, phone) {
        try {
          // Get first free course (case-insensitive)
          const freeCourse = course_name_array.find((course) =>
            course.toUpperCase().includes("_FREE")
          );

          if (!freeCourse) {
            console.error("No free course found in cart");
            return null;
          }

          console.log(`Enrolling in free course: ${freeCourse}`);

          const response = await fetch(
            `https://webveda-be.onrender.com/api/free-course/${freeCourse}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                course: freeCourse,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            return data.redirectUrl || null;
          } else {
            console.error("Free course enrollment failed:", response.status);
            return null;
          }
        } catch (error) {
          console.error("Error enrolling in free course:", error);
          return null;
        }
      }

      async function createTagMangoSubscription(name, email, phone) {
        try {
          const url = new URL(window.location.href);
          const body = {
            name: name,
            email: email,
            phone: phone,
            customer_notify: true,
            utmSource: url.searchParams.get("utm_source") || "",
            utmMedium: url.searchParams.get("utm_medium") || "",
            utmCampaign: url.searchParams.get("utm_campaign") || "",
          };
          const response = await fetch(
            "https://webveda-be.onrender.com/api/tagmango/razorpay/create-subscription",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (!response.ok) {
            console.error("TagMango subscription failed:", response.status);
            return null;
          }
          const data = await response.json();
          return data;
        } catch (e) {
          console.error("Error creating TagMango subscription:", e);
          return null;
        }
      }

      // Function to sanitize and fix common email typos
      function sanitizeEmail(email) {
        if (!email || typeof email !== "string") return email;

        let sanitized = email.trim().toLowerCase();

        // Fix common domain typos
        const domainFixes = {
          gamil: "gmail",
          gmial: "gmail",
          gmai: "gmail",
          gmaill: "gmail",
          gmaiil: "gmail",
          gmaiil: "gmail",
          gmial: "gmail",
          yaho: "yahoo",
          yhoo: "yahoo",
          yaoo: "yahoo",
          outlok: "outlook",
          outllok: "outlook",
          hotmial: "hotmail",
          hotmai: "hotmail",
          hotmali: "hotmail",
        };

        // Split email into local and domain parts
        const parts = sanitized.split("@");
        if (parts.length === 2) {
          let [localPart, domain] = parts;

          // Fix domain typos
          for (const [typo, correct] of Object.entries(domainFixes)) {
            if (domain.includes(typo)) {
              domain = domain.replace(typo, correct);
            }
          }

          // Fix common TLD typos
          domain = domain.replace(/\.con$/i, ".com");
          domain = domain.replace(/\.co$/i, ".com");
          domain = domain.replace(/\.cmo$/i, ".com");
          domain = domain.replace(/\.ocm$/i, ".com");
          domain = domain.replace(/\.cm$/i, ".com");
          domain = domain.replace(/\.om$/i, ".com");
          domain = domain.replace(/\.cpm$/i, ".com");
          domain = domain.replace(/\.coom$/i, ".com");
          domain = domain.replace(/\.comm$/i, ".com");
          domain = domain.replace(/\.co\.co$/i, ".com");
          domain = domain.replace(/\.co\.com$/i, ".com");

          // Fix .org typos
          domain = domain.replace(/\.or$/i, ".org");
          domain = domain.replace(/\.ogr$/i, ".org");
          domain = domain.replace(/\.og$/i, ".org");

          // Fix .net typos
          domain = domain.replace(/\.ent$/i, ".net");
          domain = domain.replace(/\.nett$/i, ".net");

          // Fix .in typos
          domain = domain.replace(/\.ni$/i, ".in");
          domain = domain.replace(/\.im$/i, ".in");

          sanitized = `${localPart}@${domain}`;
        }

        return sanitized;
      }

      // Enhanced email validation with hygiene checks
      function validateEmail(email) {
        if (!email || typeof email !== "string") return false;

        const trimmedEmail = email.trim();
        if (trimmedEmail.length === 0) return false;

        // Basic email regex (RFC 5322 simplified)
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!emailRegex.test(trimmedEmail)) return false;

        // Additional hygiene checks
        const parts = trimmedEmail.split("@");
        if (parts.length !== 2) return false;

        const [localPart, domain] = parts;

        // Local part checks
        if (localPart.length === 0 || localPart.length > 64) return false;
        if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
        if (localPart.includes("..")) return false;

        // Domain checks
        if (domain.length === 0 || domain.length > 255) return false;
        if (domain.startsWith(".") || domain.endsWith(".")) return false;
        if (domain.includes("..")) return false;

        // Check for valid TLD (at least 2 characters after last dot)
        const domainParts = domain.split(".");
        if (domainParts.length < 2) return false;
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2 || tld.length > 63) return false;

        // Check for consecutive dots
        if (domain.includes("..")) return false;

        return true;
      }

      function validateForm(name, whatsapp, email) {
        let isValid = true;
        console.log("Validating Form");
        const nameerror = document.getElementById("nameerror");
        const whatsapperror = document.getElementById("whatsapperror");
        const emailerror = document.getElementById("emailerror");
        if (name.length < 2 && nameerror) {
          nameerror.textContent = "Name must be at least 2 characters long";
          nameerror.style.color = "red";
          console.log("Name must be at least 2 characters long");
          isValid = false;
        } else {
          if (nameerror) {
            nameerror.textContent = "";
          }
        }

        if (whatsapp.length < 10 && whatsapperror) {
          whatsapperror.textContent =
            "Whatsapp must be at least 10 characters long";
          whatsapperror.style.color = "red";
          console.log("Whatsapp must be at least 10 characters long");
          isValid = false;
        } else {
          if (whatsapperror) {
            whatsapperror.textContent = "";
          }
        }

        // Sanitize email first
        const sanitizedEmail = sanitizeEmail(email);
        const originalEmail = email.trim();

        // Check if email was corrected
        if (sanitizedEmail !== originalEmail.toLowerCase()) {
          console.log(
            `Email corrected: "${originalEmail}" -> "${sanitizedEmail}"`
          );
          // Update the email input field with corrected value
          const emailInput = document.getElementsByName("email")[0];
          if (emailInput) {
            emailInput.value = sanitizedEmail;
          }
        }

        // Validate sanitized email
        if (!validateEmail(sanitizedEmail) && emailerror) {
          emailerror.textContent = "Please enter a valid email address";
          emailerror.style.color = "red";
          isValid = false;
          console.log("Please enter a valid email address");
        } else {
          if (emailerror) {
            emailerror.textContent = "";
          }
        }
        console.log(name, whatsapp, sanitizedEmail, "Are Valid");
        return { isValid, sanitizedEmail };
      }

      function redirectCourse(
        course_array,
        amount,
        name,
        email,
        phone,
        payment_id
      ) {
        const link = "final-thankyou";

        const sanitizedName = name.trim().replace(/\s+/g, "");
        const sanitizedEmail = encodeURIComponent(email.trim());
        const sanitizedPhone = phone.replace(/[^0-9]/g, "");

        const course_str = course_array.join("-");
        window.location.href = `/${link}?amount=${
          amount / 100
        }&course=${course_str}&paymentId=${payment_id}&name=${sanitizedName}&email=${sanitizedEmail}&phone_number=${sanitizedPhone}&currency=INR&${new URLSearchParams(
          window.location.search
        )}`;
      }

      if (country === "IN") {
        userForm.onsubmit = async (e) => {
          e.preventDefault();

          // Set processing flag to prevent multiple submissions
          isProcessing = true;
          window.isProcessing = true;
          submitBtn.disabled = true;
          submitBtn.style.opacity = "0.5";

          // Add timeout to prevent button from being stuck
          setTimeout(() => {
            if (isProcessing) {
              console.log("Payment timeout - resetting button state");
              isProcessing = false;
              window.isProcessing = false;
              submitBtn.disabled = false;
              submitBtn.classList.remove("loading");
              submitBtn.style.opacity = "1";
            }
          }, 30000); // 30 seconds timeout

          // Get User Details From Form
          const formData = new FormData(userForm);
          console.log(formData);
          const name = formData.get("name");
          let whatsapp = formData.get("phone").replace(/\s+/g, "");
          //const countrycode = formData.get("countrycode").replace(/\s+/g, "");
          const email = formData.get("email").trim();
          const course_name_reload = getlocalStorageCart();

          //Check if cart course is loaded
          if (course_name.length < 1) {
            isProcessing = false;
            window.isProcessing = false;
            submitBtn.style.opacity = "1";
            return;
          }

          // Check for free courses EARLY - before any payment processing
          console.log("Cart contents:", course_name_reload);
          const isFreeEnrollment = hasFreeCourses(course_name_reload);
          console.log("Is free enrollment:", isFreeEnrollment);

          //Check if IP Data is Present
          if (ip_data) {
            //Check if Whatsapp is less than 10 characters add country calling code
            if (whatsapp.length <= 10) {
              if (ip_data.country_calling_code) {
                whatsapp = ip_data.country_calling_code + whatsapp;
              }
            }
          }

          //Validate Form - Show Errors if any
          const validationResult = validateForm(name, whatsapp, email);
          if (validationResult.isValid) {
            const sanitizedEmail = validationResult.sanitizedEmail;

            // Handle free course enrollment - SKIP ALL PAYMENT LOGIC
            if (isFreeEnrollment) {
              console.log("Free course detected, enrolling...");
              const redirectUrl = await enrollFreeCourse(
                course_name_reload,
                name,
                sanitizedEmail,
                whatsapp
              );

              if (redirectUrl) {
                console.log(`Redirecting to: ${redirectUrl}`);
                window.location.href = redirectUrl;
              } else {
                isProcessing = false;
                window.isProcessing = false;
                submitBtn.disabled = false;
                submitBtn.classList.remove("loading");
                submitBtn.style.opacity = "1";
                alert("Free course enrollment failed. Please try again.");
              }
              return;
            }

            // Create TagMango subscription (ONLY for paid / subscription flow)
            console.log("Creating TagMango subscription...");
            const subscriptionData = await createTagMangoSubscription(
              name,
              sanitizedEmail,
              whatsapp
            );

            if (!subscriptionData || !subscriptionData.subscriptionId) {
              isProcessing = false;
              window.isProcessing = false;
              submitBtn.disabled = false;
              submitBtn.classList.remove("loading");
              submitBtn.style.opacity = "1";
              alert("Subscription initialization failed. Please try again.");
              return;
            }

            const subscriptionId = subscriptionData.subscriptionId;
            console.log("Opening Razorpay for subscription:", subscriptionId);

            const rzp1 = new Razorpay({
              key: "rzp_test_qznxbMCkyK8R4T",
              currency: "INR",
              name: "Zaan WebVeda Pvt. Ltd.",
              description: "TagMango Subscription (₹1999)",
              subscription_id: subscriptionId,
              prefill: {
                email: sanitizedEmail,
                contact: whatsapp,
              },
              handler: (response) => {
                console.log(response);
                const paymentId =
                  response.razorpay_payment_id ||
                  response.razorpay_subscription_id ||
                  subscriptionId;
                redirectCourse(
                  course_name_reload,
                  TAGMANGO_SUBSCRIPTION_AMOUNT_PAISE,
                  name,
                  sanitizedEmail,
                  whatsapp,
                  paymentId
                );
              },
              modal: {
                ondismiss: () => {
                  isProcessing = false;
                  window.isProcessing = false;
                  submitBtn.disabled = false;
                  submitBtn.classList.remove("loading");
                  submitBtn.style.opacity = "1";
                },
              },
              theme: { color: "#3399cc" },
            });

            rzp1.on("payment.failed", (res) => {
              isProcessing = false;
              window.isProcessing = false;
              submitBtn.disabled = false;
              submitBtn.classList.remove("loading");
              submitBtn.style.opacity = "1";
              alert(res.error.description);
            });
            rzp1.open();
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            submitBtn.style.opacity = "1";
          } else {
            isProcessing = false;
            window.isProcessing = false;
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            submitBtn.style.opacity = "1";
          }
        };
      } else {
        console.log("Stripe Payment");
        //Stripe Payment
        const stripe = Stripe(
          "pk_live_51NramAIh34G26BoL2MEuQMbFzUIHGYgn9SIBs7zJmkya79BMzuxJDle7NINc2BNJRtrDjTIGJrXfTDF0ph1qeCUF00bXyEZeNb"
        );

        userForm.onsubmit = async (e) => {
          e.preventDefault();

          // Set processing flag to prevent multiple submissions
          isProcessing = true;
          window.isProcessing = true;
          submitBtn.style.opacity = "0.5";

          // Add timeout to prevent button from being stuck
          setTimeout(() => {
            if (isProcessing) {
              console.log("Payment timeout - resetting button state");
              isProcessing = false;
              window.isProcessing = false;
              submitBtn.disabled = false;
              submitBtn.classList.remove("loading");
              submitBtn.style.opacity = "1";
            }
          }, 30000); // 30 seconds timeout

          //Get User Details From Form
          const formData = new FormData(userForm);
          console.log(formData);
          const name = formData.get("name");
          let whatsapp = formData.get("phone").replace(/\s+/g, "");
          const email = formData.get("email").trim();
          const course_name_reload = getlocalStorageCart();

          // Check for free courses EARLY - before any payment processing
          console.log("Cart contents:", course_name_reload);
          const isFreeEnrollment = hasFreeCourses(course_name_reload);
          console.log("Is free enrollment:", isFreeEnrollment);

          //Validate Form - Show Errors if any
          const validationResult = validateForm(name, whatsapp, email);
          if (validationResult.isValid) {
            const sanitizedEmail = validationResult.sanitizedEmail;

            // Handle free course enrollment - SKIP ALL PAYMENT LOGIC
            if (isFreeEnrollment) {
              console.log("Free course detected, enrolling...");
              const redirectUrl = await enrollFreeCourse(
                course_name_reload,
                name,
                sanitizedEmail,
                whatsapp
              );

              if (redirectUrl) {
                console.log(`Redirecting to: ${redirectUrl}`);
                window.location.href = redirectUrl;
              } else {
                isProcessing = false;
                window.isProcessing = false;
                submitBtn.disabled = false;
                submitBtn.classList.remove("loading");
                submitBtn.style.opacity = "1";
                alert("Free course enrollment failed. Please try again.");
              }
              return;
            }

            // For non-IN: create TagMango subscription and redirect to short_url
            console.log("Creating TagMango subscription (non-IN)...");
            const subscriptionData = await createTagMangoSubscription(
              name,
              sanitizedEmail,
              whatsapp
            );

            if (subscriptionData && subscriptionData.short_url) {
              window.location.href = subscriptionData.short_url;
              return;
            }

            isProcessing = false;
            window.isProcessing = false;
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            submitBtn.style.opacity = "1";
            alert("Subscription initialization failed. Please try again.");
          } else {
            isProcessing = false;
            window.isProcessing = false;
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            submitBtn.style.opacity = "1";
            console.log("Form is not valid");
          }
        };
      }
    } catch (error) {
      console.error("Error initializing payment form:", error);
      // Retry after a delay if elements are not found
      setTimeout(() => {
        console.log("Retrying payment form initialization...");
        initializePaymentForm();
      }, 1000);
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePaymentForm);
  } else {
    initializePaymentForm();
  }
})();
