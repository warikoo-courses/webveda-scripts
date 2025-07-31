//WebEngage -- Start
const webengageScript = document.createElement("script");
webengageScript.id = "_webengage_script_tag";
webengageScript.type = "text/javascript";
webengageScript.textContent = `
var webengage;
!(function (w, e, b, n, g) {
  function o(e, t) {
    e[t[t.length - 1]] = function () {
      r.__queue.push([t.join("."), arguments]);
    };
  }
  var i,
    s,
    r = w[b],
    z = " ",
    l = "init options track screen onReady".split(z),
    a =
      "webPersonalization feedback survey notification notificationInbox".split(
        z
      ),
    c = "options render clear abort".split(z),
    p = "Prepare Render Open Close Submit Complete View Click".split(z),
    u = "identify login logout setAttribute".split(z);
  if (!r || !r.__v) {
    for (
      w[b] = r = { __queue: [], __v: "6.0", user: {} }, i = 0;
      i < l.length;
      i++
    )
      o(r, [l[i]]);
    for (i = 0; i < a.length; i++) {
      for (r[a[i]] = {}, s = 0; s < c.length; s++) o(r[a[i]], [a[i], c[s]]);
      for (s = 0; s < p.length; s++) o(r[a[i]], [a[i], "on" + p[s]]);
    }
    for (i = 0; i < u.length; i++) o(r.user, ["user", u[i]]);
    setTimeout(function () {
      var f = e.createElement("script"),
        d = e.getElementById("_webengage_script_tag");
      (f.type = "text/javascript"),
        (f.async = !0),
        (f.src =
          ("https:" == e.location.protocol
            ? "https://widgets.in.webengage.com"
            : "http://widgets.in.webengage.com") +
          "/js/webengage-min-v-6.0.js"),
        d.parentNode.insertBefore(f, d);
    });
  }
})(window, document, "webengage");
webengage.init("in~aa131665");
`;
document.head.appendChild(webengageScript);
//WebEngage -- End

window.course_data = [
  {
    Title: "The Complete Guide To Starting Up",
    Category: "Money",
    Link: "https://webveda.com/courses/the-complete-guide-to-starting-up-by-webveda",
    Course_id: "wvcourse-001",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 12,
    Rating: 4.85,
    Student_Enrolled_Count: 49959,
    No_Of_Modules: 8,
    Plan_Cost: [1399, 0, 1499],
  },
  {
    Title: "Take Charge of Your Time",
    Category: "Productivity",
    Link: "https://webveda.com/courses/take-charge-of-your-time-by-webveda",
    Course_id: "wvcourse-002",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 5,
    Rating: 4.87,
    Student_Enrolled_Count: 256634,
    No_Of_Modules: 9,
    Plan_Cost: [299, 399, 699],
  },
  {
    Title: "The Ultimate Guide to Effective Communication",
    Category: "Productivity",
    Link: "https://webveda.com/courses/the-ultimate-guide-to-effective-communication-by-webveda",
    Course_id: "wvcourse-003",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 4,
    Rating: 4.9,
    Student_Enrolled_Count: 87858,
    No_Of_Modules: 5,
    Plan_Cost: [549, 649, 749],
  },
  {
    Title: "How To YouTube",
    Category: "Growth",
    Link: "https://webveda.com/courses/how-to-youtube-by-webveda",
    Course_id: "wvcourse-004",
    Source: null,
    Campaign: null,
    Medium: null,
    is_Login: true, //TODO: Ask about this
    Language: ["English", "Hindi"],
    Duration: 20,
    Rating: 4.95,
    Student_Enrolled_Count: 30231,
    No_Of_Modules: 10,
    Plan_Cost: [1299, 1699, 1999],
  },
  {
    Title: "Instagram Mastery For Creators",
    Category: "Growth",
    Link: "https://webveda.com/courses/how-to-instagram-by-webveda",
    Course_id: "wvcourse-005",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English"],
    Duration: 12,
    Rating: 4.92,
    Student_Enrolled_Count: 16040,
    No_Of_Modules: 8,
    Plan_Cost: [1449, 1549, 1749],
  },
  {
    Title: "Learn to LinkedIn",
    Category: "Growth",
    Link: "https://webveda.com/courses/how-to-linkedin-by-webveda",
    Course_id: "wvcourse-006",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English"],
    Duration: 10,
    Rating: 4.88,
    Student_Enrolled_Count: 3089,
    No_Of_Modules: 8,
    Plan_Cost: [1959, 2159, 2359],
  },
  {
    Title: "Make Writing Your Career",
    Category: "Growth",
    Link: "https://webveda.com/courses/make-writing-a-career-by-webveda",
    Course_id: "wvcourse-007",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English"],
    Duration: 8,
    Rating: 4.93,
    Student_Enrolled_Count: 5006,
    No_Of_Modules: 4,
    Plan_Cost: [1589, 1689, 1889],
  },
  {
    Title: "Take Charge of Your Money",
    Category: "Money",
    Link: "https://webveda.com/courses/take-charge-of-your-money-by-webveda",
    Course_id: "wvcourse-008",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 5,
    Rating: 4.88,
    Student_Enrolled_Count: 41073,
    No_Of_Modules: 7,
    Plan_Cost: [759, 859, 959],
  },
  {
    Title: "Build Your Online Teaching Business",
    Category: "Growth",
    Link: "https://webveda.com/courses/launching-a-courses-business-by-webveda",
    Course_id: "wvcourse-009",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English"],
    Duration: 20,
    Rating: 4.87,
    Student_Enrolled_Count: 3343,
    No_Of_Modules: 8,
    Plan_Cost: [1947, 2047, 2147],
  },
  {
    Title: "Time Management For Students",
    Category: "Productivity",
    Link: "https://webveda.com/courses/time-management-for-students-by-webveda",
    Course_id: "wvcourse-010",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English"],
    Duration: 2,
    Rating: 4.92,
    Student_Enrolled_Count: 1860,
    No_Of_Modules: 10,
    Plan_Cost: [429, 479, 499],
  },
  {
    Title: "The Art Of Cold Emailing",
    Category: "Growth",
    Link: "https://webveda.com/courses/the-art-of-cold-emailing-by-webveda",
    Course_id: "wvcourse-011",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English"],
    Duration: 1,
    Rating: 1.0,
    Student_Enrolled_Count: 84278,
    No_Of_Modules: 3,
    Plan_Cost: [397, 0, 497],
  },
  {
    Title: "The Ultimate Career Toolkit",
    Category: "Growth",
    Link: "https://webveda.com/courses/the-ultimate-career-toolkit-by-webveda",
    Course_id: "wvcourse-012",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 3,
    Rating: 1.0,
    Student_Enrolled_Count: 8587,
    No_Of_Modules: 3,
    Plan_Cost: [799, 899, 999],
  },
  {
    Title: "Time Management For Working Professionals",
    Category: "Productivity",
    Link: "https://webveda.com/courses/time-management-for-working-professionals-by-webveda",
    Course_id: "wvcourse-013",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 4,
    Rating: 4.0,
    Student_Enrolled_Count: 529,
    No_Of_Modules: 4,
    Plan_Cost: [399, 499, 699],
  },
  {
    Title: "The Ultimate Freelancing Guide",
    Category: "Growth",
    Link: "https://webveda.com/courses/the-ultimate-freelancing-guide-by-webveda",
    Course_id: "wvcourse-014",
    Source: null,
    Campaign: null,
    Medium: null,
    Language: ["English", "Hindi"],
    Duration: 1,
    Rating: 1.0,
    Student_Enrolled_Count: 0,
    No_Of_Modules: 3,
    Plan_Cost: [199, 299, 399],
  },
];

function fetchParams(type) {
  const params = new URLSearchParams(window.location.search);
  if (type === "source") {
    return params.get("utm_source") || "null";
  } else if (type === "campaign") {
    return params.get("utm_campaign") || "null";
  } else if (type === "medium") {
    return params.get("utm_medium") || "null";
  } else {
    console.error("Invalid Arguments");
    return null;
  }
}

function getCourseFromURL(courseData) {
  const currentURL = window.location.href;

  return (
    courseData.find((course) => {
      // Check if the course link matches the current URL (excluding query params)
      console.log(currentURL, course.Link);
      if (!course || !course.Link) return false;
      const isLinkMatch = currentURL.startsWith(course.Link);

      return isLinkMatch;
    }) || null
  );
}

const getCurrentUnixTimestamp = () => {
  return Math.floor(Date.now() / 1000).toString();
};

// Track if event listener has been added to prevent duplicates
let freeCourseListenerAdded = false;

const freeCourse = () => {
  console.log("🎯 freeCourse() called");
  const submitButton = document.getElementById("btn4");
  console.log("🔍 Looking for btn4, found:", submitButton ? "YES" : "NO");
  console.log("🔒 Listener already added:", freeCourseListenerAdded);

  // Only proceed if button exists and listener hasn't been added yet
  if (submitButton && !freeCourseListenerAdded) {
    console.log("✅ Button found and no listener added, proceeding...");
    // Mark that we're adding the listener
    freeCourseListenerAdded = true;
    console.log("🔒 Set freeCourseListenerAdded to true");

    // Add a custom attribute to track this button
    submitButton.setAttribute("data-free-course-initialized", "true");
    console.log("🏷️ Added tracking attribute to button");

    submitButton.addEventListener("click", async () => {
      const course = getCourseFromURL(window.course_data);
      const email = document.getElementById("free-submit-btn").value;
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      if (email && isValidEmail(email) && course) {
        window.webengage.user.setAttribute("we_email", email);
        const response = await fetch(
          `https://syncsphere-hiv6.onrender.com/api/userCheck/${course.Course_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.toLowerCase(),
            }),
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          window.webengage.track("Free Course Submitted", {
            Course: course.Title,
            Email: email,
            Course_id: course.Course_id,
          });
          submitButton.style.backgroundColor = "green";
          submitButton.style.cursor = "pointer";
          submitButton.style.pointerEvents = "auto";
          submitButton.style.opacity = "1";
          submitButton.style.border = "none";
          submitButton.style.color = "white";
          submitButton.textContent = "Submitted";
        } else {
          submitButton.style.backgroundColor = "##ab0202";
          submitButton.style.cursor = "not-allowed";
          submitButton.style.pointerEvents = "none";
          submitButton.style.opacity = "0.5";
          submitButton.style.border = "none";
          submitButton.style.color = "white";
          submitButton.textContent = "Email already exists";
        }
      } else {
        submitButton.style.backgroundColor = "##ab0202";
        submitButton.style.cursor = "not-allowed";
        submitButton.style.pointerEvents = "none";
        submitButton.style.opacity = "0.5";
        submitButton.style.border = "none";
        submitButton.style.color = "white";
        submitButton.textContent = "Email is required";
        setTimeout(() => {
          submitButton.style.backgroundColor = "#ffffff";
          submitButton.style.cursor = "pointer";
          submitButton.style.pointerEvents = "auto";
          submitButton.style.opacity = "1";
          submitButton.style.border = "none";
          submitButton.style.color = "#4169e1";
          submitButton.textContent = "Submit";
        }, 2000);
      }
    });

    console.log("Free course event listener added to button");
  }
};

// Function to reset the listener flag when DOM changes
const resetFreeCourseListener = () => {
  console.log("🔄 resetFreeCourseListener() called");
  // Check if the button with our attribute still exists
  const existingButton = document.querySelector(
    '[data-free-course-initialized="true"]'
  );
  console.log(
    "🔍 Looking for button with tracking attribute, found:",
    existingButton ? "YES" : "NO"
  );

  if (!existingButton) {
    // Button was replaced, reset the flag
    freeCourseListenerAdded = false;
    console.log("🔄 Free course button replaced, listener flag reset to false");
  } else {
    console.log(
      "✅ Button with tracking attribute still exists, keeping flag as:",
      freeCourseListenerAdded
    );
  }
};

const init = () => {
  console.log("Running init with URL:", window.location.pathname); // Debug logging

  if (
    window.location.host === "www.webveda.com" ||
    window.location.host === "webveda.com" ||
    window.location.host === "digital-reservation-141130.framer.app"
  ) {
    // Cart Page
    if (window.location.pathname === "/cart") {
      const form = document.getElementById("userDetailsForm");
      const formDetails = {};

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        formDetails.name = document.getElementById("name").value.trim();
        formDetails.whatsapp = document.getElementById("whatsapp").value.trim();
        formDetails.email = document.getElementById("email").value.trim();

        window.webengage.user.login(formDetails.email.toLowerCase());
        window.webengage.user.setAttribute("we_first_name", formDetails.name);
        formDetails.whatsapp =
          formDetails.whatsapp.length > 10
            ? formDetails.whatsapp
            : "+91" + formDetails.whatsapp;
        window.webengage.user.setAttribute("we_phone", formDetails.whatsapp);
        window.webengage.user.setAttribute("we_email", formDetails.email);
        console.log("Logged in", formDetails);

        const price1 =
          document.getElementById("testing123")?.firstElementChild
            ?.textContent || "ERROR";
        let priceNumber = parseInt(price1.replace(/[^\d]/g, ""));
        const course1 = document
          .getElementById("cartItem")
          .firstElementChild.getAttribute("data-framer-name");
        const currentUrl2 = new URL(window.location.href);
        currentUrl2.searchParams.set("course", course1);
        console.log(price1, priceNumber);
        const courseResponse = await fetch(
          `https://webveda-checkout.onrender.com/api/v1/course_full_name/${course1}`
        );
        const courseData = await courseResponse.json();
        console.log(courseData);
        let wePayload = {
          Title: courseData.full_name,
          Purchase_Link: currentUrl2.toString(),
          Plan_Name: course1.split("_")[1],
          Plan_Cost: priceNumber,
          Source: fetchParams("source"),
          Medium: fetchParams("medium"),
          Campaign: fetchParams("campaign"),
          Amount: priceNumber,
        };
        window.webengage.track("Purchase Initiated", wePayload);
        console.log("Event Init Fired", wePayload);

        async function getIPAddress() {
          const ip_data = await fetch(
            "https://ipapi.co/json/?key=BCjmIMf1YZiYOTXSDzA0qZfdLRw7BXmTTJ7MWRAI3v578IUzpS"
          );
          const ip_data_json = await ip_data.json();
          return ip_data_json;
        }
        const ip_data = await getIPAddress();
      });
    }
  }
};

// Set up MutationObserver to watch for DOM changes inside #pricingreplace
const observer = new MutationObserver((mutations) => {
  console.log(
    "🔍 MutationObserver triggered with",
    mutations.length,
    "mutations"
  );
  let shouldRunFreeCourse = false;

  for (const mutation of mutations) {
    console.log("📝 Mutation type:", mutation.type, "Target:", mutation.target);

    if (mutation.type === "childList") {
      console.log(
        "👶 Added nodes:",
        mutation.addedNodes.length,
        "Removed nodes:",
        mutation.removedNodes.length
      );

      // Check if any added nodes contain the button we're looking for
      for (const node of mutation.addedNodes) {
        console.log(
          "🔍 Checking node:",
          node.nodeType === Node.ELEMENT_NODE
            ? node.tagName + (node.id ? "#" + node.id : "")
            : "Text node"
        );

        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added element itself is the button
          if (node.id === "btn4") {
            console.log("✅ Found btn4 directly in added node");
            shouldRunFreeCourse = true;
            break;
          }
          // Check if the added element contains the button
          if (node.querySelector && node.querySelector("#btn4")) {
            console.log("✅ Found btn4 inside added node using querySelector");
            shouldRunFreeCourse = true;
            break;
          }

          // Also check for any button elements that might be btn4
          const buttons = node.querySelectorAll
            ? node.querySelectorAll("button")
            : [];
          console.log("🔘 Buttons found in node:", buttons.length);
          for (const button of buttons) {
            console.log(
              "🔘 Button:",
              button.id || "no-id",
              button.textContent?.substring(0, 20) + "..."
            );
            if (button.id === "btn4") {
              console.log("✅ Found btn4 button in added node");
              shouldRunFreeCourse = true;
              break;
            }
          }
        }
      }
    }
  }

  // Reset listener flag first to check if button was replaced
  console.log("🔄 Checking if button was replaced...");
  resetFreeCourseListener();

  // Run freeCourse if we detected relevant DOM changes
  if (shouldRunFreeCourse) {
    console.log(
      "🚀 DOM mutation detected in #pricingreplace, running freeCourse"
    );
    freeCourse();
  } else {
    console.log("❌ No relevant changes detected, skipping freeCourse");
  }
});

// Function to start observing when #pricingreplace is available
const startObserving = () => {
  console.log("🔍 Looking for #pricingreplace element...");
  const pricingReplace = document.getElementById("pricingreplace");
  if (pricingReplace) {
    console.log("✅ Found #pricingreplace, starting observation");
    console.log(
      "📍 #pricingreplace content:",
      pricingReplace.innerHTML.substring(0, 200) + "..."
    );

    // Start observing the #pricingreplace element for changes
    observer.observe(pricingReplace, {
      childList: true,
      subtree: true,
    });
    console.log("🎯 Started observing #pricingreplace for DOM changes");
  } else {
    console.log("⏳ #pricingreplace not found, retrying in 100ms...");
    // If #pricingreplace doesn't exist yet, try again in a bit
    setTimeout(startObserving, 100);
  }
};

// Start observing when DOM is ready
console.log("🚀 Starting initialization...");
startObserving();

// Initial run
if (document.readyState === "loading") {
  console.log("📄 DOM still loading, waiting for DOMContentLoaded...");
  document.addEventListener("DOMContentLoaded", () => {
    console.log("📄 DOMContentLoaded fired, running init and freeCourse");
    init();
    freeCourse(); // Initial run for freeCourse
  });
} else {
  console.log("📄 DOM already loaded, running init and freeCourse immediately");
  init();
  freeCourse(); // Initial run for freeCourse
}

// Monitor URL changes
let lastUrl = window.location.href;

// Method 1: Using popstate event (browser back/forward buttons)
window.addEventListener("popstate", () => {
  console.log("popstate detected");
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    console.log(`URL changed from ${lastUrl} to ${currentUrl}`);
    lastUrl = currentUrl;
    init();
  }
});

// Method 2: Override history methods to detect programmatic URL changes
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function () {
  originalPushState.apply(this, arguments);
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    console.log(`URL changed via pushState from ${lastUrl} to ${currentUrl}`);
    lastUrl = currentUrl;
    init();
  }
};

history.replaceState = function () {
  originalReplaceState.apply(this, arguments);
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    console.log(
      `URL changed via replaceState from ${lastUrl} to ${currentUrl}`
    );
    lastUrl = currentUrl;
    init();
  }
};
