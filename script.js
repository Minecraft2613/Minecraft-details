
function toggleThemePanel() {
  const panel = document.getElementById("themePanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function applyTheme() {
  const keys = [
    '--box-color',
    '--glow-color',
    '--glow-speed',
    '--glow-brightness',
    '--bg-theme',
    '--glow-enabled'
  ];
  keys.forEach(key => {
    const val = localStorage.getItem(key);
    if (val) document.documentElement.style.setProperty(key, val);
  });

  // Checkbox state
  document.getElementById("glowToggle").checked = localStorage.getItem("--glow-enabled") !== "false";
}

function saveTheme() {
  const box = document.getElementById("boxColor").value;
  const glow = document.getElementById("glowColor").value;
  const speed = document.getElementById("glowSpeed").value + "s";
  const brightness = document.getElementById("glowBrightness").value;
  const bg = document.getElementById("bgTheme").value;
  const enableGlow = document.getElementById("glowToggle").checked;

  localStorage.setItem("--box-color", box);
  localStorage.setItem("--glow-color", enableGlow ? glow : "transparent");
  localStorage.setItem("--glow-speed", speed);
  localStorage.setItem("--glow-brightness", brightness);
  localStorage.setItem("--bg-theme", bg.startsWith("http") ? `url(${bg})` : bg);
  localStorage.setItem("--glow-enabled", enableGlow);

  applyTheme();
  alert("🎨 Theme saved!");
}

function resetTheme() {
  const defaults = {
    "--box-color": "#1e1e1e",
    "--glow-color": "transparent",
    "--glow-speed": "3s",
    "--glow-brightness": "0.6",
    "--bg-theme": "linear-gradient(-45deg, #1e1e1e, #292929, #1b1b1b, #121212)",
    "--glow-enabled": "false"
  };
  for (let key in defaults) {
    document.documentElement.style.setProperty(key, defaults[key]);
    localStorage.setItem(key, defaults[key]);
  }
  document.getElementById("glowToggle").checked = false;
  alert("🔄 Theme reset to default and glow disabled.");
}

window.addEventListener("DOMContentLoaded", applyTheme);
// ✅ TOGGLE THIS TO TRUE WHEN UPDATING
const updateMode = false; // Set to true during maintenance
const allowedUsername = "26"; // Only allowed when updateMode = true

const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const mainContent = document.getElementById("main-content");

// Login Handling
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter your FreeMcServer username.");
    return;
  }

  localStorage.setItem("freemc_username", username);
  sessionStorage.setItem("loggedIn", "true");

  // Webhook
  fetch("https://discordapp.com/api/webhooks/1382996204715118622/gre3gq6QYSua-80NN7U6jZZtNZLVbTXq7fcoLcKpoLqkEwh-qHJyQa67-xYqeo2Ed4MZ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `🧑 New login: **${username}** just accessed the Minecraft server site.`
    })
  });

  if (updateMode && username !== allowedUsername) {
    document.body.innerHTML = `
      <div style="text-align:center; padding:60px;">
        <h2>🚧 Website is Under Maintenance</h2>
        <p>Please check back later.</p>
      </div>`;
    return;
  }

  // Show content
  loginSection.style.display = "none";
  mainContent.style.display = "block";
});

// Auto-login if allowed
window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("freemc_username");
  const loggedIn = sessionStorage.getItem("loggedIn");

  if (updateMode && username !== allowedUsername) {
    document.body.innerHTML = `
      <div style="text-align:center; padding:60px;">
        <h2>🚧 Website is Under Maintenance</h2>
        <p>Only staff can view this site right now.</p>
      </div>`;
    return;
  }

  if (username && loggedIn === "true") {
    loginSection.style.display = "none";
    mainContent.style.display = "block";
  } else {
    loginSection.style.display = "block";
    mainContent.style.display = "none";
  }
});

const serverIP = "mc1524209.fmcs.cloud";

async function fetchServerStatus() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await res.json();

    const statusDiv = document.getElementById("server-status");
    const playersDiv = document.getElementById("player-count");
    const offlineStart = document.getElementById("offline-start");

    if (!statusDiv || !playersDiv || !offlineStart) return;

    if (!data || typeof data.online === "undefined") {
      statusDiv.innerHTML = "⚠️ Error checking server status.";
      playersDiv.innerHTML = "";
      offlineStart.style.display = "block";
      return;
    }

    if (!data.online) {
      statusDiv.innerHTML = "🔴 Server is Offline";
      playersDiv.innerHTML = "";
      offlineStart.style.display = "block";
    } else {
      statusDiv.innerHTML = "🟢 Server is Online";
      const online = data.players?.online || 0;
      const max = data.players?.max || "?";
      let html = `👥 ${online} / ${max} Players`;

      // ✅ Add player list if available
      if (Array.isArray(data.players?.list)) {
        html += `<br><strong>Players:</strong> ${data.players.list.join(", ")}`;
      }

      playersDiv.innerHTML = html;
      offlineStart.style.display = "none";
    }
  } catch (err) {
    console.error("Status error:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchServerStatus();
  setInterval(fetchServerStatus, 3000);
});


// Copy-to-Clipboard
function copyToClipboard(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied: " + text);
  });
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  if (body.style.backgroundColor === "#ffffff") {
    body.style.backgroundColor = "#121212";
    body.style.color = "#f0f0f0";
  } else {
    body.style.backgroundColor = "#ffffff";
    body.style.color = "#000000";
  }
}

// Plugin Search Filter
const searchInput = document.getElementById("plugin-search");
const pluginList = document.getElementById("plugin-list").getElementsByTagName("li");

searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  for (let li of pluginList) {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(filter) ? "flex" : "none";
  }
});
  // Sort plugin list alphabetically on page load
window.addEventListener("DOMContentLoaded", () => {
  const pluginList = document.getElementById("plugin-list");
  const plugins = Array.from(pluginList.getElementsByTagName("li"));

  plugins.sort((a, b) => {
    const nameA = a.textContent.trim().toLowerCase();
    const nameB = b.textContent.trim().toLowerCase();
    return nameA.localeCompare(nameB);
  });

  plugins.forEach(plugin => pluginList.appendChild(plugin));
});

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const discord = document.getElementById("contact-discord").value.trim();
  const minecraft = document.getElementById("contact-minecraft").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const status = document.getElementById("contact-status");

  if (!discord || !minecraft || !message) {
    status.innerText = "⚠️ Please fill in all required fields.";
    return;
  }

  const fullMessage = `📨 **New Contact Form Submission**:
👤 Name: **${name || "Not Provided"}**
🎮 Minecraft Username: **${minecraft}**
💬 Discord ID: **${discord}**

📝 Message:
${message}`;

  fetch("https://discordapp.com/api/webhooks/1383347956182290462/b1k7PVanxmP6InWfH9k4Npj7WNP9dUM-nD6xXRZGZwFOsODahyDoBnxlmNdGCCyLDetz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content: fullMessage })
  })
  .then(res => {
    if (res.ok) {
      status.innerText = "✅ Message sent successfully!";
      document.getElementById("contact-form").reset();
    } else {
      status.innerText = "❌ Failed to send. Try again later.";
    }
  })
  .catch(error => {
    console.error("Contact form error:", error);
    status.innerText = "❌ Error sending message.";
  });
});
  function toggleLogin() {
    const checkbox = document.getElementById('agreeCheck');
    const loginBtn = document.getElementById('loginBtn');
    const label = checkbox.parentElement;

    loginBtn.disabled = !checkbox.checked;

    if (!checkbox.checked) {
      label.classList.add('blink-red');
    } else {
      label.classList.remove('blink-red');
    }
  }

