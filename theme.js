// Light and dark mode.
// Until a reader picks one, the site follows their device's setting.
// Their choice is remembered in their own browser only (nothing is sent anywhere).
(function () {
  var root = document.documentElement; // the <html> tag

  // 1. If the reader picked a mode on an earlier visit, use it straight away.
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  // Works out which mode is showing right now.
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // 2. Once the page has loaded, add the button to the header.
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector("header");
    if (!header) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";

    // The button says which mode you'd switch TO.
    function label() {
      var dark = current() === "dark";
      button.textContent = dark ? "☀ Light mode" : "☾ Dark mode";
      button.setAttribute("aria-pressed", dark ? "true" : "false"); // for screen readers
    }

    // 3. On click: flip the mode, remember it, update the label.
    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });

    label();
    header.appendChild(button);
  });
})();
