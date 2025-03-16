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
    Plan_Cost: [1299, 1699, 1999],
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
        const overlay = document.getElementById("overlay");
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
              console.log("mutation.addedNodes", mutation.addedNodes);
              mutation.addedNodes.forEach((node) => {
                // Check if node itself or any of its children has heroVideo id
                const heroVideo =
                  node.id === "heroVideo"
                    ? node
                    : node.querySelector("#heroVideo");
                if (heroVideo) {
                  const video = heroVideo.querySelector("video");
                  console.log("video", video);
                  if (video) {
                    let startTime = 0;
                    let watchDuration = 0;
                    let totalDuration = 0;

                    // Get video duration once metadata is loaded
                    video.addEventListener("loadedmetadata", () => {
                      totalDuration = video.duration;
                    });

                    video.addEventListener("play", () => {
                      startTime = video.currentTime;
                    });

                    const trackVideoView = () => {
                      watchDuration = video.currentTime - startTime;
                      webengage.track("Homepage Video Viewed", {
                        Duration_viewed: watchDuration,
                      });
                      console.log("Event Fired");
                    };

                    video.addEventListener("pause", trackVideoView);
                    video.addEventListener("ended", trackVideoView);

                    // Track when video is unmounted
                    const videoObserver = new MutationObserver((mutations) => {
                      mutations.forEach((mutation) => {
                        if (mutation.removedNodes) {
                          mutation.removedNodes.forEach((node) => {
                            if (node === video || node.contains(video)) {
                              trackVideoView();
                              videoObserver.disconnect();
                            }
                          });
                        }
                      });
                    });

                    videoObserver.observe(heroVideo.parentNode, {
                      childList: true,
                      subtree: true,
                    });

                    observer.disconnect();
                  }
                }
              });
            }
          });
        });

        observer.observe(overlay, {
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
      //Course Hero Video Viewed
      const observeVideo = () => {
        const overlay = document.getElementById("overlay");
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
              console.log("mutation.addedNodes", mutation.addedNodes);
              mutation.addedNodes.forEach((node) => {
                // Check if node itself or any of its children has heroVideo id
                const heroVideo =
                  node.id === "heroVideo"
                    ? node
                    : node.querySelector("#heroVideo");
                if (heroVideo) {
                  const video = heroVideo.querySelector("video");
                  console.log("video", video);
                  if (video) {
                    let startTime = 0;
                    let watchDuration = 0;
                    let totalDuration = 0;

                    // Get video duration once metadata is loaded
                    video.addEventListener("loadedmetadata", () => {
                      totalDuration = video.duration;
                    });

                    video.addEventListener("play", () => {
                      startTime = video.currentTime;
                    });

                    const trackVideoView = () => {
                      watchDuration = video.currentTime - startTime;
                      const course = getCourseFromURL(window.course_data);
                      webengage.track("Course Trailer Played", {
                        Duration: watchDuration,
                        Course_id: course.Course_id,
                        Category: course.Category,
                        Link: course.Link,
                        Title: course.Title,
                        Language: course.Language,
                        Rating: course.Rating,
                        Student_Enrolled_Count: course.Student_Enrolled_Count,
                        No_Of_Modules: course.No_Of_Modules,
                      });
                      console.log("Event Fired");
                    };

                    video.addEventListener("pause", trackVideoView);
                    video.addEventListener("ended", trackVideoView);

                    // Track when video is unmounted
                    const videoObserver = new MutationObserver((mutations) => {
                      mutations.forEach((mutation) => {
                        if (mutation.removedNodes) {
                          mutation.removedNodes.forEach((node) => {
                            if (node === video || node.contains(video)) {
                              trackVideoView();
                              videoObserver.disconnect();
                            }
                          });
                        }
                      });
                    });

                    videoObserver.observe(heroVideo.parentNode, {
                      childList: true,
                      subtree: true,
                    });

                    observer.disconnect();
                  }
                }
              });
            }
          });
        });

        observer.observe(overlay, {
          childList: true,
          subtree: true,
        });
      };
      observeVideo();

      //Course Results Video Viewed
      const observeResultsVideo = () => {
        const overlay = document.getElementById("overlay");
        const results_observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
              console.log("mutation.addedNodes", mutation.addedNodes);
              mutation.addedNodes.forEach((node) => {
                // Check if node itself or any of its children has heroVideo id
                const heroVideo =
                  node.id === "resultVideo"
                    ? node
                    : node.querySelector("#resultVideo");
                if (heroVideo) {
                  const video = heroVideo.querySelector("video");
                  console.log("video", video);
                  if (video) {
                    let startTime = 0;
                    let watchDuration = 0;
                    let totalDuration = 0;

                    // Get video duration once metadata is loaded
                    video.addEventListener("loadedmetadata", () => {
                      totalDuration = video.duration;
                    });

                    video.addEventListener("play", () => {
                      startTime = video.currentTime;
                    });

                    const trackVideoView = () => {
                      watchDuration = video.currentTime - startTime;
                      const course = getCourseFromURL(window.course_data);
                      webengage.track("Course Results Video Viewed", {
                        Duration: watchDuration,
                        Course_id: course.Course_id,
                        Category: course.Category,
                        Link: course.Link,
                        Title: course.Title,
                        Language: course.Language,
                        Rating: course.Rating,
                        Student_Enrolled_Count: course.Student_Enrolled_Count,
                        No_Of_Modules: course.No_Of_Modules,
                      });
                      console.log("Event Fired");
                    };

                    video.addEventListener("pause", trackVideoView);
                    video.addEventListener("ended", trackVideoView);

                    // Track when video is unmounted
                    const videoObserver = new MutationObserver((mutations) => {
                      mutations.forEach((mutation) => {
                        if (mutation.removedNodes) {
                          mutation.removedNodes.forEach((node) => {
                            if (node === video || node.contains(video)) {
                              trackVideoView();
                              videoObserver.disconnect();
                            }
                          });
                        }
                      });
                    });

                    videoObserver.observe(heroVideo.parentNode, {
                      childList: true,
                      subtree: true,
                    });

                    results_observer.disconnect();
                  }
                }
              });
            }
          });
        });

        results_observer.observe(overlay, {
          childList: true,
          subtree: true,
        });
      };
      observeResultsVideo();
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
