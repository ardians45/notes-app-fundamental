import './note-item.js'

class ArchivedNoteList extends HTMLElement {
  set notes(notes) {
    this._notes = notes
    this.render()
  }

  render() {
    this.innerHTML = ''
    this._notes.forEach((note) => {
      const noteElement = document.createElement('note-item')
      noteElement.note = note
      this.appendChild(noteElement)
    })
  }
}

customElements.define('archived-note-list', ArchivedNoteList)
