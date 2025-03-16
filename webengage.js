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
      window.addEventListener("DOMContentLoaded", () => {
        const utm_source = window.location.search.split("utm_source=")[1];
        const utm_medium = window.location.search.split("utm_medium=")[1];
        const utm_campaign = window.location.search.split("utm_campaign=")[1];
        webengage.track("Home Page Viewed", {
          Source: utm_source,
          Medium: utm_medium,
          Campaign: utm_campaign,
        });
      });
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

        webengage.user.setAttribute("we_first_name", formDetails.name);
        webengage.user.setAttribute("we_phone", formDetails.whatsapp);
        webengage.user.setAttribute("we_email", formDetails.email);

        webengage.user.login(getCurrentUnixTimestamp());
      });
    }
  }
};

window.addEventListener("DOMContentLoaded", init);
