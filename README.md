cat << 'EOF' > README.md
# 🧼 DRS-CleanDrop

> Minimalist & Autonomous Terminal File Sanitizer for Linux.

Organizador interactivo de directorios ultrarrápido escrito en Node.js. Ordena automáticamente descargas y carpetas caóticas por categorías sin instalar dependencias de terceros.

---

## ⚡ Características

* **Cero dependencias:** Construido exclusivamente con módulos nativos (`fs`, `path`, `os`, `readline`).
* **Inteligencia de rutas:** Detecta carpetas locales (`Downloads`), atajos del sistema (`~/`) y rutas absolutas (`/home/user/...`).
* **Categorización automática:**
  * `Code/` (`.js`, `.py`, `.c`, `.cpp`, `.html`, `.css`, `.json`, `.sh`, `.md`)
  * `Images/` (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`)
  * `Archives/` (`.zip`, `.tar`, `.gz`, `.rar`, `.7z`, `.iso`)
  * `Docs/` (`.txt`, `.pdf`, `.docx`, `.odt`, `.xlsx`, `.csv`)
  * `Audio_Video/` (`.mp3`, `.wav`, `.flac`, `.mp4`, `.mkv`, `.avi`)

---

## 🚀 Uso Rápido

```bash
node clean-drop.js

Al ejecutarse, ingresa el nombre de la carpeta a organizar (por ejemplo: Downloads) o presiona Enter para usar el directorio actual.
👥 Créditos

Desarrollado por los líderes de DRS Group:

    Arkap

    Nova

Diseñado y probado en Linux Mint.
EOF
