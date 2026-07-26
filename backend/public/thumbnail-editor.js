(function () {
  const WIDTH = 1280;
  const HEIGHT = 720;
  const HANDLE_SIZE = 24;
  const fonts = {
    "Hero King": '"Hero King", fantasy',
    "Dragon Force": '"Dragon Force", fantasy',
    "Tribal Dragon": '"Tribal Dragon", fantasy',
    "Draconic Title": '"Copperplate Gothic Bold", Copperplate, Georgia, serif',
    "Dragon Rune": 'Papyrus, "Segoe Print", fantasy',
    "Runic Stone": '"Rockwell Extra Bold", "Arial Black", Georgia, serif',
    "Elder Script": '"Lucida Calligraphy", "Segoe Script", cursive',
    "War Banner": "Impact, Haettenschweiler, sans-serif",
    Cinzel: "Cinzel, Georgia, serif",
    Georgia: "Georgia, serif",
    Arial: "Arial, sans-serif"
  };

  class ThumbnailEditor {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector("[data-thumbnail-canvas]");
      this.shell = root.querySelector(".thumbnail-canvas-shell");
      this.context = this.canvas.getContext("2d");
      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;
      this.layers = [];
      this.selectedId = "";
      this.drag = null;
      this.editor = null;
      this.deleteButton = null;
      this.background = "";
      this.backgroundImage = null;
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
          this.stopEditing();
          this.selectedId = layerRow.dataset.thumbnailLayerId;
          this.refresh();
          return;
        }

        const toggle = event.target.closest("[data-thumbnail-toggle]");
        if (toggle) {
          const layer = this.selected();
          const key = toggle.dataset.thumbnailToggle;
          if (!layer || !key) return;
          layer[key] = !layer[key];
          toggle.classList.toggle("active", Boolean(layer[key]));
          this.updateEditorStyle();
          this.draw();
          return;
        }

        const action = event.target.closest("[data-thumbnail-action]")?.dataset.thumbnailAction;
        if (!action) return;
        if (layerRow) this.selectedId = layerRow.dataset.thumbnailLayerId;
        if (action === "add-text") this.addText("Type your message");
        if (action === "delete") this.removeSelected();
        if (action === "move-up") this.moveSelected(1);
        if (action === "move-down") this.moveSelected(-1);
      });

      this.root.addEventListener("input", (event) => {
        const key = event.target.dataset.thumbnailProperty;
        if (!key) return;
        const layer = this.selected();
        if (!layer) return;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        layer[key] = ["fontSize", "opacity"].includes(key) ? Number(value) : value;
        if (key === "text") layer.name = String(value || "Text").split("\n")[0].slice(0, 28) || "Text";
        this.updateEditorStyle();
        if (key === "fontFamily" && document.fonts?.load) {
          document.fonts.load(`32px "${value}"`).then(() => this.draw()).catch(() => this.draw());
        } else {
          this.draw();
        }
      });

      this.canvas.addEventListener("pointerdown", (event) => this.pointerDown(event));
      window.addEventListener("pointermove", (event) => this.pointerMove(event));
      window.addEventListener("pointerup", () => this.pointerUp());
      window.addEventListener("resize", () => this.positionEditor());
      window.addEventListener("keydown", (event) => {
        if (!this.root.isConnected || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) return;
        if ((event.key === "Delete" || event.key === "Backspace") && this.selectedId) this.removeSelected();
      });
    }

    id() {
      return "layer-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    selected() {
      return this.layers.find((layer) => layer.id === this.selectedId);
    }

    status(message) {
      const node = this.root.querySelector("[data-thumbnail-status]");
      if (node) node.textContent = message || "";
    }

    addText(text) {
      this.stopEditing();
      const isTitle = this.layers.filter((layer) => layer.type === "text").length === 0;
      const layer = {
        id: this.id(),
        type: "text",
        name: isTitle ? "Title" : "Text",
        text,
        x: 170,
        y: isTitle ? 170 : 380,
        width: 940,
        height: isTitle ? 120 : 100,
        fontFamily: isTitle ? "Draconic Title" : "Cinzel",
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
      requestAnimationFrame(() => this.startEditing(layer));
    }

    removeSelected() {
      if (!this.selectedId) return;
      this.stopEditing();
      this.layers = this.layers.filter((layer) => layer.id !== this.selectedId);
      this.selectedId = this.layers.at(-1)?.id || "";
      this.refresh();
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
        this.root.querySelectorAll("[data-thumbnail-background]").forEach((button) => {
          button.classList.toggle("active", button.dataset.thumbnailBackground === src);
        });
        this.draw();
      } catch {
        this.status("That background could not be loaded.");
      }
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
      return {
        x: (event.clientX - rect.left) * WIDTH / rect.width,
        y: (event.clientY - rect.top) * HEIGHT / rect.height
      };
    }

    hit(point) {
      return [...this.layers].reverse().find((layer) =>
        point.x >= layer.x &&
        point.x <= layer.x + layer.width &&
        point.y >= layer.y &&
        point.y <= layer.y + layer.height
      );
    }

    handleAt(layer, point) {
      const handles = {
        nw: { x: layer.x, y: layer.y },
        ne: { x: layer.x + layer.width, y: layer.y },
        sw: { x: layer.x, y: layer.y + layer.height },
        se: { x: layer.x + layer.width, y: layer.y + layer.height }
      };
      return Object.entries(handles).find(([, handle]) =>
        Math.abs(point.x - handle.x) <= HANDLE_SIZE &&
        Math.abs(point.y - handle.y) <= HANDLE_SIZE
      )?.[0] || "";
    }

    deleteAt(layer, point) {
      const x = layer.x + layer.width - 28;
      const y = layer.y + 28;
      return Math.hypot(point.x - x, point.y - y) <= 22;
    }

    pointerDown(event) {
      this.stopEditing();
      const point = this.canvasPoint(event);
      const selected = this.selected();
      if (selected && this.deleteAt(selected, point)) {
        this.removeSelected();
        return;
      }
      const selectedHandle = selected ? this.handleAt(selected, point) : "";
      const layer = selectedHandle ? selected : this.hit(point);

      if (!layer) {
        this.selectedId = "";
        this.refresh();
        return;
      }

      this.selectedId = layer.id;
      const handle = selectedHandle || this.handleAt(layer, point);
      this.drag = {
        id: layer.id,
        startX: point.x,
        startY: point.y,
        x: layer.x,
        y: layer.y,
        width: layer.width,
        height: layer.height,
        fontSize: layer.fontSize,
        handle,
        moved: false
      };
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
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) this.drag.moved = true;

      if (!this.drag.handle) {
        layer.x = Math.max(0, Math.min(WIDTH - layer.width, this.drag.x + dx));
        layer.y = Math.max(0, Math.min(HEIGHT - layer.height, this.drag.y + dy));
      } else {
        this.resizeLayer(layer, dx, dy, this.drag.handle);
      }
      this.draw();
    }

    resizeLayer(layer, dx, dy, handle) {
      const minWidth = 80;
      const minHeight = 46;
      let x = this.drag.x;
      let y = this.drag.y;
      let width = this.drag.width;
      let height = this.drag.height;

      if (handle.includes("e")) width = this.drag.width + dx;
      if (handle.includes("s")) height = this.drag.height + dy;
      if (handle.includes("w")) {
        x = this.drag.x + dx;
        width = this.drag.width - dx;
      }
      if (handle.includes("n")) {
        y = this.drag.y + dy;
        height = this.drag.height - dy;
      }

      if (width < minWidth) {
        if (handle.includes("w")) x -= minWidth - width;
        width = minWidth;
      }
      if (height < minHeight) {
        if (handle.includes("n")) y -= minHeight - height;
        height = minHeight;
      }

      layer.x = Math.max(0, Math.min(WIDTH - minWidth, x));
      layer.y = Math.max(0, Math.min(HEIGHT - minHeight, y));
      layer.width = Math.min(WIDTH - layer.x, width);
      layer.height = Math.min(HEIGHT - layer.y, height);
      if (layer.type === "text" && Number.isFinite(this.drag.fontSize)) {
        const scale = layer.height / Math.max(minHeight, this.drag.height);
        layer.fontSize = Math.max(12, Math.min(180, Math.round(this.drag.fontSize * scale)));
      }
    }

    pointerUp() {
      if (!this.drag) return;
      const finished = this.drag;
      const layer = this.layers.find((item) => item.id === finished.id);
      this.drag = null;
      this.canvas.dataset.dragging = "false";
      this.refresh();
      if (layer?.type === "text" && !finished.moved && !finished.handle) this.startEditing(layer);
    }

    startEditing(layer) {
      if (!layer || layer.type !== "text" || !this.shell) return;
      this.stopEditing();
      const editor = document.createElement("textarea");
      editor.className = "thumbnail-inline-editor";
      editor.value = layer.text || "";
      editor.setAttribute("aria-label", "Edit text directly on the thumbnail");
      editor.addEventListener("input", () => {
        layer.text = editor.value;
        layer.name = editor.value.split("\n")[0].slice(0, 28) || "Text";
        this.draw();
      });
      editor.addEventListener("blur", () => {
        if (this.editor === editor) this.stopEditing();
        this.refresh();
      });
      editor.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          editor.blur();
        }
      });
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "thumbnail-inline-delete";
      deleteButton.textContent = "\u00d7";
      deleteButton.title = "Delete this text box";
      deleteButton.setAttribute("aria-label", "Delete this text box");
      deleteButton.addEventListener("pointerdown", (event) => event.stopPropagation());
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.selectedId = layer.id;
        this.removeSelected();
      });
      this.shell.appendChild(editor);
      this.shell.appendChild(deleteButton);
      this.editor = editor;
      this.deleteButton = deleteButton;
      this.updateEditorStyle();
      editor.focus();
      editor.select();
      this.status("Type directly in the selected text box. Press Esc when finished.");
    }

    updateEditorStyle() {
      const layer = this.selected();
      if (!this.editor || !layer) return;
      const family = fonts[layer.fontFamily] || fonts.Cinzel;
      Object.assign(this.editor.style, {
        fontFamily: family,
        fontSize: `${layer.fontSize || 40}px`,
        fontWeight: layer.bold ? "700" : "400",
        fontStyle: layer.italic ? "italic" : "normal",
        color: layer.color || "#ffffff",
        textAlign: layer.align || "center",
        opacity: Number.isFinite(layer.opacity) ? String(layer.opacity) : "1"
      });
      this.positionEditor();
    }

    positionEditor() {
      const layer = this.selected();
      if (!this.editor || !layer) return;
      const rect = this.canvas.getBoundingClientRect();
      const shellRect = this.shell.getBoundingClientRect();
      const scaleX = rect.width / WIDTH;
      const scaleY = rect.height / HEIGHT;
      Object.assign(this.editor.style, {
        left: `${rect.left - shellRect.left + layer.x * scaleX}px`,
        top: `${rect.top - shellRect.top + layer.y * scaleY}px`,
        width: `${layer.width * scaleX}px`,
        height: `${layer.height * scaleY}px`,
        fontSize: `${(layer.fontSize || 40) * scaleY}px`
      });
      if (this.deleteButton) {
        Object.assign(this.deleteButton.style, {
          left: `${rect.left - shellRect.left + (layer.x + layer.width) * scaleX - 17}px`,
          top: `${rect.top - shellRect.top + layer.y * scaleY - 17}px`
        });
      }
    }

    stopEditing() {
      if (!this.editor) return;
      const editor = this.editor;
      this.editor = null;
      editor.remove();
      this.deleteButton?.remove();
      this.deleteButton = null;
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
          } else {
            line = candidate;
          }
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
          const anchorX = layer.align === "left"
            ? layer.x
            : layer.align === "right"
              ? layer.x + layer.width
              : layer.x + layer.width / 2;
          const lines = this.wrapText(context, layer.text, layer.width);
          const lineHeight = (layer.fontSize || 40) * 1.14;
          lines.slice(0, Math.max(1, Math.floor(layer.height / lineHeight))).forEach((line, index) => {
            context.fillText(line, anchorX, layer.y + index * lineHeight);
          });
        }

        if (!exporting && layer.id === this.selectedId && !this.editor) {
          context.globalAlpha = 1;
          context.strokeStyle = "#ffd45a";
          context.lineWidth = 3;
          context.setLineDash([10, 7]);
          context.strokeRect(layer.x, layer.y, layer.width, layer.height);
          context.setLineDash([]);
          [
            [layer.x, layer.y],
            [layer.x + layer.width, layer.y],
            [layer.x, layer.y + layer.height],
            [layer.x + layer.width, layer.y + layer.height]
          ].forEach(([x, y]) => {
            context.fillStyle = "#ffd45a";
            context.strokeStyle = "#6d4308";
            context.lineWidth = 2;
            context.fillRect(x - 10, y - 10, 20, 20);
            context.strokeRect(x - 10, y - 10, 20, 20);
          });
          const deleteX = layer.x + layer.width - 28;
          const deleteY = layer.y + 28;
          context.beginPath();
          context.fillStyle = "#8f2419";
          context.strokeStyle = "#fff1c2";
          context.lineWidth = 2;
          context.arc(deleteX, deleteY, 18, 0, Math.PI * 2);
          context.fill();
          context.stroke();
          context.beginPath();
          context.strokeStyle = "#ffffff";
          context.lineWidth = 4;
          context.moveTo(deleteX - 7, deleteY - 7);
          context.lineTo(deleteX + 7, deleteY + 7);
          context.moveTo(deleteX + 7, deleteY - 7);
          context.lineTo(deleteX - 7, deleteY + 7);
          context.stroke();
        }
        context.restore();
      });
    }

    controlsHtml(layer) {
      if (!layer) return '<p class="muted">Click a text box to type, move, or resize it.</p>';
      return [
        `<label>Font<select class="thumbnail-font-select" data-thumbnail-property="fontFamily" style="font-family:${this.escape(fonts[layer.fontFamily] || fonts.Cinzel)}">${Object.keys(fonts).map((font) => `<option value="${font}" style="font-family:${this.escape(fonts[font])}"${font === layer.fontFamily ? " selected" : ""}>${font}</option>`).join("")}</select></label>`,
        `<label>Size<input type="range" min="16" max="120" value="${layer.fontSize}" data-thumbnail-property="fontSize"></label>`,
        `<label class="thumbnail-color-label">Color<input class="thumbnail-color-wheel" type="color" value="${layer.color}" data-thumbnail-property="color" title="Choose text color"></label>`,
        `<label>Alignment<select data-thumbnail-property="align"><option value="left"${layer.align === "left" ? " selected" : ""}>Left</option><option value="center"${layer.align === "center" ? " selected" : ""}>Center</option><option value="right"${layer.align === "right" ? " selected" : ""}>Right</option></select></label>`,
        `<div class="thumbnail-format-buttons"><button class="thumbnail-format-toggle${layer.bold ? " active" : ""}" type="button" data-thumbnail-toggle="bold" aria-pressed="${layer.bold ? "true" : "false"}"><strong>Bold</strong></button><button class="thumbnail-format-toggle${layer.italic ? " active" : ""}" type="button" data-thumbnail-toggle="italic" aria-pressed="${layer.italic ? "true" : "false"}"><em>Italic</em></button></div>`
      ].join("");
    }

    escape(value) {
      return String(value || "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);
    }

    refresh(redrawLayers = true) {
      const selected = this.selected();
      const controls = this.root.querySelector("[data-thumbnail-controls]");
      if (controls) controls.innerHTML = this.controlsHtml(selected);
      this.draw();
    }

    toDataUrl() {
      this.stopEditing();
      this.draw(true);
      const dataUrl = this.canvas.toDataURL("image/png");
      this.draw(false);
      return dataUrl;
    }
  }

  window.KellaThumbnailEditor = {
    mount(root) {
      if (!root || root.__kellaThumbnailEditor) return root?.__kellaThumbnailEditor;
      root.__kellaThumbnailEditor = new ThumbnailEditor(root);
      return root.__kellaThumbnailEditor;
    },
    get(root) {
      return root?.__kellaThumbnailEditor || null;
    }
  };
})();
