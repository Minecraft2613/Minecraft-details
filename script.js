/* style.css */

:root {
  --bg-light: #f5f5f5;
  --bg-dark: #121212;
  --text-light: #333;
  --text-dark: #eee;
  --accent: #00ffcc;
  --card-bg: #1f1f1f;
  --transition: 0.3s ease-in-out;
}

body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  background: var(--bg-dark);
  color: var(--text-dark);
  transition: background var(--transition), color var(--transition);
}

body.light {
  background: var(--bg-light);
  color: var(--text-light);
}

header {
  padding: 1rem;
  background: var(--card-bg);
  text-align: center;
  position: relative;
}

#theme-toggle {
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 1.5rem;
  cursor: pointer;
}

main {
  padding: 1rem;
  max-width: 1000px;
  margin: auto;
}

#server-info, #plugin-tools {
  margin-bottom: 2rem;
}

#server-status, #player-list {
  margin-top: 0.5rem;
  font-weight: bold;
}

.search-filter {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

#search-input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
}

#sort-select {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
}

.filter-controls {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-controls button {
  padding: 0.4rem 0.8rem;
  border: none;
  background: var(--accent);
  color: black;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}

.filter-controls button.active {
  background: white;
  color: black;
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.plugin-card {
  background: var(--card-bg);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transition: transform var(--transition), background var(--transition);
  position: relative;
  overflow: hidden;
}

body.light .plugin-card {
  background: white;
  color: black;
}

.plugin-card:hover {
  transform: translateY(-5px);
}

.plugin-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.plugin-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.plugin-category {
  font-size: 0.9rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.plugin-desc {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.plugin-download {
  display: inline-block;
  padding: 0.4rem 0.6rem;
  background: var(--accent);
  color: black;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}

footer {
  text-align: center;
  padding: 1rem;
  background: var(--card-bg);
  margin-top: 2rem;
}

body.light footer {
  background: #ddd;
  color: #111;
}
