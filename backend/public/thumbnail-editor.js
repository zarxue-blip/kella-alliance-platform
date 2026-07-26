(function () {
  const WIDTH = 1280;
  const HEIGHT = 720;
  const fonts = {
    Cinzel: "Cinzel, Georgia, serif",
    Georgia: "Georgia, serif",
    Arial: "Arial, sans-serif",
    Impact: "Impact, Haettenschweiler, sans-serif",
    Verdana: "Verdana, sans-serif",
    Monospace: "monospace"
  };

  class ThumbnailEditor {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector("[data-thumbnail-canvas]");
      this.context = this.canvas.getContext("2d");
      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;
      this.layers = [];
      this.selectedId = "";
      this.mode = "select";
      this.clipboard = null;
      this.drag = null;
      this.background = "";
      this.backgroundImage = null;
      this.imageInput = root.querySelector("[data-thumbnail-image-input]");
      this.bind();
      const firstBackground = root.querySelector("[data-thumbnail-background]");
      if (firstBackground) this.setBackground(firstBackground.dataset.thumbnailBackground);
      this.addText("ALLIANCE ANNOUNCEMENT");
      this.addText("Write your message here");
    }

    bind() {
      this.root.addEventListener("click", (event) => {
        const background = event.target.closest("[data-thumbnail-background]");
        if (background) return this.setBackground(background.dataset.thumbnailBackground);
        const layerRow = event.target.closest("[data-thumbnail-layer-id]");
        if (layerRow && !event.target.closest("button")) {
          this.selectedId = layerRow.dataset.thumbnailLayerId;
          return this.refresh();
        }
        const action = event.target.closest("[data-thumbnail-action]")?.dataset.thumbnailAction;
        if (!action) return;
        if (layerRow) this.selectedId = layerRow.dataset.thumbnailLayerId;
        if (action === "select") this.setMode("select");
        if (action === "erase") this.setMode("erase");
        if (action === "add-layer") this.addText("New layer");
        if (action === "add-text") this.addText("New text");
        if (action === "add-image") this.imageInput?.click();
        if (action === "cut") this.cut();
        if (action === "copy") this.copy();
        if (action === "paste") this.paste();
        if (action === "delete") this.removeSelected();
        if (action === "move-up") this.moveSelected(1);
        if (action === "move-down") this.moveSelected(-1);
        if (action === "download") this.download();
      });
      this.root.addEventListener("input", (event) => {
        const key = event.target.dataset.thumbnailProperty;
        if (!key) return;
        const layer = this.selected();
        if (!layer) return;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        layer[key] = ["fontSize", "opacity"].includes(key) ? Number(value) : value;
        this.refresh(false);
      });
      this.imageInput?.addEventListener("change", async () => {
        const file = this.imageInput.files?.[0];
        if (!file) return;
        if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) return this.status("Choose a PNG, JPG, or WEBP image.");
        const url = await this.fileDataUrl(file);
        const image = await this.loadImage(url);
        const scale = Math.min(1, 420 / Math.max(image.naturalWidth, image.naturalHeight));
        this.layers.push({
          id: this.id(),
          type: "image",
          name: file.name.replace(/\.[^.]+$/, "") || "Picture",
          image,
          src: url,
          x: 430,
          y: 200,
          width: Math.max(60, image.naturalWidth * scale),
          height: Math.max(60, image.naturalHeight * scale),
          opacity: 1
        });
        this.selectedId = this.layers[this.layers.length - 1].id;
        this.imageInput.value = "";
        this.refresh();
      });
      this.canvas.addEventListener("pointerdown", (event) => this.pointerDown(event));
      window.addEventListener("pointermove", (event) => this.pointerMove(event));
      window.addEventListener("pointerup", () => this.pointerUp());
      window.addEventListener("keydown", (event) => {
        if (!this.root.isConnected || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) return;
        if (event.key === "Delete" || event.key === "Backspace") this.removeSelected();
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") this.copy();
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "x") this.cut();
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") this.paste();
      });
    }

    id() { return "layer-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
    selected() { return this.layers.find((layer) => layer.id === this.selectedId); }
    status(message) {
      const node = this.root.querySelector("[data-thumbnail-status]");
      if (node) node.textContent = message || "";
    }
    setMode(mode) {
      this.mode = mode;
      this.canvas.dataset.mode = mode;
      this.root.querySelectorAll("[data-thumbnail-action='select'],[data-thumbnail-action='erase']").forEach((button) => {
        button.classList.toggle("active", button.dataset.thumbnailAction === mode);
      });
      this.status(mode === "erase" ? "Click an object to erase it." : "Select and drag objects on the canvas.");
    }
    addText(text) {
      const isTitle = this.layers.filter((layer) => layer.type === "text").length === 0;
      const layer = {
        id: this.id(),
        type: "text",
        name: isTitle ? "Title" : "Text",
        text,
        x: 170,
        y: isTitle ? 180 : 390,
        width: 940,
        height: isTitle ? 110 : 80,
        fontFamily: "Cinzel",
        fontSize: isTitle ? 64 : 38,
        color: "#fff4c2",
        align: "center",
        bold: isTitle,
        italic: false,
        opacity: 1
      };
      this.layers.push(layer);
      this.selectedId = layer.id;
      this.refresh();
    }
    removeSelected() {
      if (!this.selectedId) return;
      this.layers = this.layers.filter((layer) => layer.id !== this.selectedId);
      this.selectedId = this.layers.at(-1)?.id || "";
      this.refresh();
    }
    copy() {
      const layer = this.selected();
      if (!layer) return this.status("Select an object first.");
      this.clipboard = { ...layer, image: layer.image };
      this.status("Object copied.");
    }
    cut() {
      const layer = this.selected();
      if (!layer) return this.status("Select an object first.");
      this.clipboard = { ...layer, image: layer.image };
      this.removeSelected();
      this.status("Object cut. Use Paste to restore it.");
    }
    paste() {
      if (!this.clipboard) return this.status("Nothing has been copied yet.");
      const layer = { ...this.clipboard, id: this.id(), x: this.clipboard.x + 24, y: this.clipboard.y + 24 };
      this.layers.push(layer);
      this.selectedId = layer.id;
      this.refresh();
      this.status("Object pasted.");
    }
    moveSelected(direction) {
      const index = this.layers.findIndex((layer) => layer.id === this.selectedId);
      const target = Math.max(0, Math.min(this.layers.length - 1, index + direction));
      if (index < 0 || target === index) return;
      const [layer] = this.layers.splice(index, 1);
      this.layers.splice(target, 0, layer);
      this.refresh();
    }
    async setBackground(src) {
      if (!src) return;
      try {
        this.backgroundImage = await this.loadImage(src);
        this.background = src;
        this.root.querySelectorAll("[data-thumbnail-background]").forEach((button) => button.classList.toggle("active", button.dataset.thumbnailBackground === src));
        this.draw();
      } catch {
        this.status("That background could not be loaded.");
      }
    }
    fileDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });
    }
    canvasPoint(event) {
      const rect = this.canvas.getBoundingClientRect();
      return { x: (event.clientX - rect.left) * WIDTH / rect.width, y: (event.clientY - rect.top) * HEIGHT / rect.height };
    }
    hit(point) {
      return [...this.layers].reverse().find((layer) => point.x >= layer.x && point.x <= layer.x + layer.width && point.y >= layer.y && point.y <= layer.y + layer.height);
    }
    pointerDown(event) {
      const point = this.canvasPoint(event);
      const layer = this.hit(point);
      if (this.mode === "erase") {
        if (layer) {
          this.selectedId = layer.id;
          this.removeSelected();
        }
        return;
      }
      if (!layer) {
        this.selectedId = "";
        return this.refresh();
      }
      this.selectedId = layer.id;
      const resize = point.x > layer.x + layer.width - 30 && point.y > layer.y + layer.height - 30;
      this.drag = { id: layer.id, startX: point.x, startY: point.y, x: layer.x, y: layer.y, width: layer.width, height: layer.height, resize };
      this.canvas.dataset.dragging = "true";
      this.canvas.setPointerCapture?.(event.pointerId);
      this.refresh();
    }
    pointerMove(event) {
      if (!this.drag) return;
      const layer = this.layers.find((item) => item.id === this.drag.id);
      if (!layer) return;
      const point = this.canvasPoint(event);
      const dx = point.x - this.drag.startX;
      const dy = point.y - this.drag.startY;
      if (this.drag.resize) {
        layer.width = Math.max(50, Math.min(WIDTH - layer.x, this.drag.width + dx));
        layer.height = Math.max(40, Math.min(HEIGHT - layer.y, this.drag.height + dy));
      } else {
        layer.x = Math.max(0, Math.min(WIDTH - layer.width, this.drag.x + dx));
        layer.y = Math.max(0, Math.min(HEIGHT - layer.height, this.drag.y + dy));
      }
      this.draw();
    }
    pointerUp() {
      if (!this.drag) return;
      this.drag = null;
      this.canvas.dataset.dragging = "false";
      this.refresh();
    }
    wrapText(context, text, maxWidth) {
      const paragraphs = String(text || "").split("\n");
      const lines = [];
      paragraphs.forEach((paragraph) => {
        const words = paragraph.split(/\s+/).filter(Boolean);
        if (!words.length) return lines.push("");
        let line = words.shift();
        words.forEach((word) => {
          const candidate = line + " " + word;
          if (context.measureText(candidate).width > maxWidth && line) {
            lines.push(line);
            line = word;
          } else line = candidate;
        });
        lines.push(line);
      });
      return lines;
    }
    draw(exporting) {
      const context = this.context;
      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.fillStyle = "#17130e";
      context.fillRect(0, 0, WIDTH, HEIGHT);
      if (this.backgroundImage) {
        const image = this.backgroundImage;
        const scale = Math.max(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight);
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;
        context.drawImage(image, (WIDTH - width) / 2, (HEIGHT - height) / 2, width, height);
      }
      context.fillStyle = "rgba(0,0,0,.18)";
      context.fillRect(0, 0, WIDTH, HEIGHT);
      this.layers.forEach((layer) => {
        context.save();
        context.globalAlpha = Number.isFinite(layer.opacity) ? layer.opacity : 1;
        if (layer.type === "image" && layer.image) {
          context.drawImage(layer.image, layer.x, layer.y, layer.width, layer.height);
        } else if (layer.type === "text") {
          context.fillStyle = layer.color || "#ffffff";
          const family = fonts[layer.fontFamily] || fonts.Cinzel;
          context.font = `${layer.italic ? "italic " : ""}${layer.bold ? "700 " : "400 "}${layer.fontSize || 40}px ${family}`;
          context.textAlign = layer.align || "center";
          context.textBaseline = "top";
          const anchorX = layer.align === "left" ? layer.x : layer.align === "right" ? layer.x + layer.width : layer.x + layer.width / 2;
          const lines = this.wrapText(context, layer.text, layer.width);
          const lineHeight = (layer.fontSize || 40) * 1.14;
          lines.slice(0, Math.max(1, Math.floor(layer.height / lineHeight))).forEach((line, index) => context.fillText(line, anchorX, layer.y + index * lineHeight));
        }
        if (!exporting && layer.id === this.selectedId) {
          context.globalAlpha = 1;
          context.strokeStyle = "#ffd45a";
          context.lineWidth = 3;
          context.setLineDash([10, 7]);
          context.strokeRect(layer.x, layer.y, layer.width, layer.height);
          context.setLineDash([]);
          context.fillStyle = "#ffd45a";
          context.fillRect(layer.x + layer.width - 14, layer.y + layer.height - 14, 20, 20);
        }
        context.restore();
      });
    }
    controlsHtml(layer) {
      if (!layer) return '<p class="muted">Select a text or picture on the canvas to edit it.</p>';
      if (layer.type === "image") {
        return `<label>Opacity<input type="range" min="0.1" max="1" step="0.05" value="${layer.opacity ?? 1}" data-thumbnail-property="opacity"></label>`;
      }
      return [
        `<label>Text<textarea rows="3" data-thumbnail-property="text">${this.escape(layer.text)}</textarea></label>`,
        `<label>Font<select data-thumbnail-property="fontFamily">${Object.keys(fonts).map((font) => `<option value="${font}"${font === layer.fontFamily ? " selected" : ""}>${font}</option>`).join("")}</select></label>`,
        `<label>Size<input type="range" min="16" max="110" value="${layer.fontSize}" data-thumbnail-property="fontSize"><span>${layer.fontSize}px</span></label>`,
        `<label>Color<input type="color" value="${layer.color}" data-thumbnail-property="color"></label>`,
        `<label>Alignment<select data-thumbnail-property="align"><option value="left"${layer.align === "left" ? " selected" : ""}>Left</option><option value="center"${layer.align === "center" ? " selected" : ""}>Center</option><option value="right"${layer.align === "right" ? " selected" : ""}>Right</option></select></label>`,
        `<label><input type="checkbox" data-thumbnail-property="bold"${layer.bold ? " checked" : ""}> Bold</label>`,
        `<label><input type="checkbox" data-thumbnail-property="italic"${layer.italic ? " checked" : ""}> Italic</label>`
      ].join("");
    }
    escape(value) {
      return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    }
    refresh(redrawLayers = true) {
      const selected = this.selected();
      const controls = this.root.querySelector("[data-thumbnail-controls]");
      if (controls) controls.innerHTML = this.controlsHtml(selected);
      const list = this.root.querySelector("[data-thumbnail-layer-list]");
      if (list && redrawLayers) {
        list.innerHTML = [...this.layers].reverse().map((layer) =>
          `<div class="thumbnail-layer-row${layer.id === this.selectedId ? " active" : ""}" data-thumbnail-layer-id="${layer.id}"><span class="thumbnail-layer-name">${this.escape(layer.name || layer.type)}</span><button type="button" data-thumbnail-action="move-up" title="Move up">↑</button><button type="button" data-thumbnail-action="move-down" title="Move down">↓</button><button type="button" data-thumbnail-action="delete" title="Delete">×</button></div>`
        ).join("");
      }
      this.draw();
    }
    toDataUrl() {
      this.draw(true);
      const dataUrl = this.canvas.toDataURL("image/png");
      this.draw(false);
      return dataUrl;
    }
    download() {
      const link = document.createElement("a");
      link.href = this.toDataUrl();
      link.download = "kella-announcement.png";
      link.click();
      this.status("PNG downloaded.");
    }
  }

  window.KellaThumbnailEditor = {
    mount(root) {
      if (!root || root.__kellaThumbnailEditor) return root?.__kellaThumbnailEditor;
      root.__kellaThumbnailEditor = new ThumbnailEditor(root);
      return root.__kellaThumbnailEditor;
    },
    get(root) { return root?.__kellaThumbnailEditor || null; }
  };
})();
