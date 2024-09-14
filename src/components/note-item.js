class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note
    this.render()
  }

  render() {
    const { id, title, body, createdAt, archived } = this._note
    const formattedDate = this.formatDate(createdAt)

    this.innerHTML = `
          <style>
              .note-item {
                  padding: 20px; 
                  border-radius: 8px; 
                  background-color: white; 
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
                  position: relative;
                  border: 1px solid #ccc;
                  margin: 10px 0;
                  border-radius: 4px;
              }
              .note-item h2 {
                  margin: 0 0 10px;
              }
              .note-item p {
                  margin: 0;
              }
              .note-item .date {
                  font-size: 0.8em;
                  color: #777;
                  margin-top:10px;
                  margin-bottom:10px;
              }
          </style>
          <div class="note-item">
              <h2>${title}</h2>
              <p>${body}</p>
              <p class="date">Created at: ${formattedDate}</p>
              <button class="archive-button">${
                archived ? 'Unarchive' : 'Archive'
              }</button>
              <button class="delete-button">Delete</button>
          </div>
      `

    this.querySelector('.delete-button').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: { id },
          bubbles: true,
          composed: true,
        }),
      )
    })

    this.querySelector('.archive-button').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent(archived ? 'unarchive-note' : 'archive-note', {
          detail: { id },
          bubbles: true,
          composed: true,
        }),
      )
    })
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return formatter.format(date)
  }
}

customElements.define('note-item', NoteItem)
