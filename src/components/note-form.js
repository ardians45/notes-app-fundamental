class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <style>
              button.submit {
              display: block;
              width: 100%;
              margin-bottom: 10px;
              }
              .form-group {
                  margin-bottom: 15px;
              }
              .form-group input,
              .form-group textarea {
                  width: 100%;
                  padding: 8px;
                  box-sizing: border-box;
              }
              .form-group .error-message {
                  color: red;
                  font-size: 0.8em;
                  display: none;
              }
              button {
                padding: 10px;
                color: white;
                background-color: #31C6D4;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #03AED2;
            }
          </style>
          <form id="note-form">
              <div class="form-group">
                  <input type="text" id="note-title" placeholder="Title" required />
                  <span class="error-message" id="title-error">Title is required and must be at least 3 characters.</span>
              </div>
              <div class="form-group">
                  <textarea id="note-body" placeholder="Body" required></textarea>
                  <span class="error-message" id="body-error">Body is required and must be at least 5 characters.</span>
              </div>
              <button type="submit" class="submit">Add Note</button>
          </form>
      `;

    this.querySelector("#note-form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    this.addValidationListeners();
  }

  addValidationListeners() {
    const titleInput = this.querySelector("#note-title");
    const bodyInput = this.querySelector("#note-body");

    titleInput.addEventListener("input", () => this.validateTitle());
    titleInput.addEventListener("blur", () => this.validateTitle());

    bodyInput.addEventListener("input", () => this.validateBody());
    bodyInput.addEventListener("blur", () => this.validateBody());
  }

  validateTitle() {
    const titleInput = this.querySelector("#note-title");
    const titleError = this.querySelector("#title-error");

    if (titleInput.value.trim().length < 3) {
      titleError.style.display = "block";
      titleInput.setCustomValidity("Title must be at least 3 characters long.");
    } else {
      titleError.style.display = "none";
      titleInput.setCustomValidity("");
    }
  }

  validateBody() {
    const bodyInput = this.querySelector("#note-body");
    const bodyError = this.querySelector("#body-error");

    if (bodyInput.value.trim().length < 5) {
      bodyError.style.display = "block";
      bodyInput.setCustomValidity("Body must be at least 5 characters long.");
    } else {
      bodyError.style.display = "none";
      bodyInput.setCustomValidity("");
    }
  }

  handleSubmit() {
    const titleInput = this.querySelector("#note-title");
    const bodyInput = this.querySelector("#note-body");

    this.validateTitle();
    this.validateBody();

    if (titleInput.checkValidity() && bodyInput.checkValidity()) {
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      this.dispatchEvent(
        new CustomEvent("note-submit", {
          detail: { title, body },
          bubbles: true,
          composed: true,
        })
      );
      titleInput.value = "";
      bodyInput.value = "";
    }
  }
}

customElements.define("note-form", NoteForm);
