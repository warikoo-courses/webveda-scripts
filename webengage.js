//WebEngage -- Start
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
//WebEngage -- End

const getCurrentUnixTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

const init = () => {
  if (window.location === "https://www.webveda.com/cart") {
    const form = document.getElementById("userDetailsForm");
    const formDetails = {};

    form.addEventListener("submit", (e) => {
      const formData = new FormData(form);

      formDetails.name = formData.get("name").trim();
      formDetails.whatsapp = formData.get("whatsapp").trim();
      formDetails.email = formData.get("email").trim();

      console.log(formDetails);
    });
  }
};

window.addEventListener("DOMContentLoaded", init);
