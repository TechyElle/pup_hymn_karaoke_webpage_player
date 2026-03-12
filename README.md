<div align="center">

# 🎵 PUP Hymn Karaoke Web Player

### *Play the hymn. Follow the lyrics. Sing in sync.*

![HTML5](https://img.shields.io/badge/HTML5-Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Interactive-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Active-00C853?style=for-the-badge)

> A single-page web app that plays the **PUP Hymn** with synchronized lyric highlighting,  
> smooth auto-scroll, and quick skip controls for a karaoke-like experience.

</div>

---

## 🌟 What It Does

| Feature | Description |
|--------|-------------|
| 🎼 **Lyric Sync** | Highlights active lyric lines and **individual words** in real-time |
| 🔽 **Auto-Scroll Lyrics** | Smoothly scrolls the lyric panel to keep the current line centered |
| ⏩ **Skip Controls** | Jumps backward or forward by 10 seconds |
| 🖱️ **Clickable Lyrics** | Click any lyric line to seek playback to that timestamp |
| 📱 **Responsive Layout** | Optimized for desktop and mobile screen sizes |

---

## 📁 Project Structure

```text
.
|-- index.html      # Main page layout and lyrics content
|-- style.css       # Visual design, responsive styling, and controls UI
|-- script.js       # Audio timing logic, lyric highlight, and auto-scroll behavior
|-- background.png  # Background image
|-- pup_logo.png    # Header logo
|-- pup_hymn.mp3    # Hymn audio source
|-- reference.jpg   # Reference image from professor
`-- README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd pup-hymn-karaoke-webpage-player
```

### 2. Open the project
Use either option:

```bash
# Option A: Open directly
start index.html

# Option B: Run with VS Code Live Server (recommended)
# Right-click index.html > Open with Live Server
```

---

## 🚀 Run the Project

```bash
# If using Live Server
# open the local server URL shown in VS Code

# If opening directly
# launch index.html in your browser
```

Playback controls:
- `-10s` rewinds by 10 seconds
- `+10s` forwards by 10 seconds
- Click a lyric line to jump to that part of the song

---

## ✅ Implementation Notes

```text
✔ Per-word timing mapping -> each lyric word is synced with audio
✔ Dynamic highlight state  -> .active class applied to current word and line
✔ Scroll synchronization   -> centers active lyric in container
✔ Bounded skip behavior    -> prevents seeking below 0 or beyond duration
✔ Mobile responsiveness    -> media queries adjust controls and spacing
```

---

## 🧩 Tech Stack

- HTML5
- CSS3 (custom properties, gradients, responsive media queries)
- Vanilla JavaScript (DOM events, audio APIs, smooth scrolling)

---

<div align="center">

⚠️ *For educational purposes only. Assets and lyrics belong to their respective owners.*

</div>
