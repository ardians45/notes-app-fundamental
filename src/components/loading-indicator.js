class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
    .loading {
      text-align: center;
      font-size: 3rem;
    }
    </style>
    <div class="loading">Loading...</div>
    `;
  }

  show() {
    this.querySelector(".loading").classList.add("active");
  }

  hide() {
    this.querySelector(".loading").classList.remove("active");
  }
}

customElements.define("loading-indicator", LoadingIndicator);
