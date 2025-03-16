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
webengage.init("in~~47b66760");
`;
document.head.appendChild(webengageScript);
//WebEngage -- End

window.course_data = [
  {
    Title: "How To YouTube",
    Category: "Growth",
    Link: "https://digital-reservation-141130.framer.app/courses/how-to-youtube-by-webveda",
    Course_id: "WV001",
    Source: null,
    Campaign: null,
    Medium: null,
    is_Login: true, //TODO: Ask about this
    Language: ["English", "Hindi"],
    Duration: 20,
    Rating: 4.95,
    Student_Enrolled_Count: 27000,
    No_Of_Modules: 10,
  },
];

const getCurrentUnixTimestamp = () => {
  return Math.floor(Date.now() / 1000).toString();
};

const init = () => {
  if (
    window.location.host === "www.webveda.com" ||
    window.location.host === "webveda.com" ||
    window.location.host === "digital-reservation-141130.framer.app"
  ) {
    // Home Page
    if (window.location.pathname === "/") {
      // Home Page Viewed
      window.addEventListener("DOMContentLoaded", () => {
        console.log("Home Page Viewed");
        const utm_source = window.location.search.split("utm_source=")[1];
        const utm_medium = window.location.search.split("utm_medium=")[1];
        const utm_campaign = window.location.search.split("utm_campaign=")[1];
        webengage.track("Home Page Viewed", {
          Source: utm_source,
          Medium: utm_medium,
          Campaign: utm_campaign,
          is_Login: false,
        });
      });

      // Login Button Clicked
      const loginButton = document.getElementById("login-button");
      loginButton.addEventListener("click", () => {
        webengage.track("Login Click");
      });

      //Navbar items
      const navbarItems = document.getElementsByClassName("navbar-item");
      for (let i = 0; i < navbarItems.length; i++) {
        navbarItems[i].addEventListener("click", () => {
          webengage.track("Navbar Item Clicked", {
            Selection: navbarItems[i].textContent,
          });
        });
      }

      // Homepage Video Viewed
      const observeVideo = () => {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
              mutation.addedNodes.forEach((node) => {
                if (node.id === "overlay") {
                  const heroVideoDiv = node.querySelector("#heroVideo");
                  if (heroVideoDiv) {
                    const video = heroVideoDiv.querySelector("video");
                    console.log("video", video);
                    if (video) {
                      let startTime = 0;
                      let watchDuration = 0;

                      video.addEventListener("play", () => {
                        startTime = video.currentTime;
                      });

                      video.addEventListener("pause", () => {
                        watchDuration = video.currentTime - startTime;
                        webengage.track("Homepage Video Viewed", {
                          Duration: watchDuration,
                        });
                        console.log("Event Fired");
                      });

                      video.addEventListener("ended", () => {
                        watchDuration = video.currentTime - startTime;
                        webengage.track("Homepage Video Viewed", {
                          Duration: watchDuration,
                        });
                      });

                      observer.disconnect();
                    }
                  }
                }
              });
            }
          });
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      };
      observeVideo();

      // WA Support Clicked
      const waSupportButtons = document.getElementsByClassName("WAsupport");
      for (let i = 0; i < waSupportButtons.length; i++) {
        waSupportButtons[i].addEventListener("click", () => {
          webengage.track("WA Support Clicked");
        });
      }
    }

    //CoursePages
    if (window.location.pathname.includes("/course")) {
      //Course Page Viewed
      const observeVideo = () => {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
              mutation.addedNodes.forEach((node) => {
                if (node.id === "heroVideo") {
                  const video = node;
                  let startTime = 0;
                  let watchDuration = 0;

                  video.addEventListener("play", () => {
                    startTime = video.currentTime;
                  });

                  video.addEventListener("pause", () => {
                    watchDuration = video.currentTime - startTime;
                    webengage.track("Homepage Video Viewed", {
                      Duration: watchDuration,
                    });
                  });

                  video.addEventListener("ended", () => {
                    watchDuration = video.currentTime - startTime;
                    webengage.track("Homepage Video Viewed", {
                      Duration: watchDuration,
                    });
                  });

                  observer.disconnect();
                }
              });
            }
          });
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      };
      observeVideo();
    }

    // Cart Page
    if (window.location.pathname === "/cart") {
      const form = document.getElementById("userDetailsForm");
      const formDetails = {};

      form.addEventListener("submit", (e) => {
        formDetails.name = document.getElementById("name").value.trim();
        formDetails.whatsapp = document.getElementById("whatsapp").value.trim();
        formDetails.email = document.getElementById("email").value.trim();

        console.log(formDetails);

        webengage.user.login();
        webengage.user.setAttribute("we_first_name", formDetails.name);
        webengage.user.setAttribute("we_phone", formDetails.whatsapp);
        webengage.user.setAttribute("we_email", formDetails.email);
      });
    }
  }
};

window.addEventListener("DOMContentLoaded", init);
