class NavbarComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                .navbar {
                    background-color: white;
                    color: #03AED2;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
  
                .navbar .logo h1 {
                    margin: 0;
                    font-size: 24px;
                    padding: 20px 0;
                    animation: popIn 0.5s ease-out forwards;
                }
  
                @keyframes popIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
  
                nav ul {
                    list-style: none;
                    display: flex;
                }
  
                nav ul li {
                    margin-left: 20px;
                }
  
                nav ul li a {
                  color: black;
                    text-decoration: none;
                    font-size: 16px;
                    transition: color 0.3s ease;
                }
  
                nav ul li a:hover {
                    color: #1E90FF; /* DodgerBlue */
                }
            </style>
            <div class="navbar">
                <div class="logo">
                    <h1>Notes App</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">New Note</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </nav>
            </div>
        `
  }
}

window.customElements.define('navbar-component', NavbarComponent)
