import './styles/styles.css'
import './components/navbar-component'
import './components/note-item'
import './components/note-list'
import './components/archived-note-list'
import './components/note-form'
import './components/loading-indicator'
import { gsap } from 'gsap'

const API_URL = 'https://notes-api.dicoding.dev/v2'

document.addEventListener('DOMContentLoaded', async () => {
  const noteListElement = document.querySelector('note-list')
  const archivedNoteListElement = document.querySelector('archived-note-list')
  const loadingIndicator = document.querySelector('loading-indicator')

  const fetchNotes = async () => {
    loadingIndicator.show()
    const [notesResponse, archivedNotesResponse] = await Promise.all([
      fetch(`${API_URL}/notes`),
      fetch(`${API_URL}/notes/archived`),
    ])

    const notesData = await notesResponse.json()
    const archivedNotesData = await archivedNotesResponse.json()

    noteListElement.notes = notesData.data
    archivedNoteListElement.notes = archivedNotesData.data

    // Animasi munculnya catatan
    gsap.from('.note-item', {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.1,
    })

    loadingIndicator.hide()
  }

  document.addEventListener('note-submit', async (e) => {
    const { title, body } = e.detail

    if (!title || !body) {
      alert('Title and body are required')
      return
    }

    loadingIndicator.show()
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    })

    const data = await response.json()
    if (data.status === 'success') {
      alert('Note added successfully')
      fetchNotes()
    } else {
      alert('Error: ' + data.message)
    }
  })

  document.addEventListener('delete-note', async (e) => {
    loadingIndicator.show()
    const response = await fetch(`${API_URL}/notes/${e.detail.id}`, {
      method: 'DELETE',
    })

    const data = await response.json()
    if (data.status === 'success') {
      alert('Note deleted successfully')
      fetchNotes()
    } else {
      alert('Error: ' + data.message)
    }
  })

  document.addEventListener('archive-note', async (e) => {
    loadingIndicator.show()
    const response = await fetch(`${API_URL}/notes/${e.detail.id}/archive`, {
      method: 'POST',
    })

    const data = await response.json()
    if (data.status === 'success') {
      alert('Note archived successfully')
      fetchNotes()
    } else {
      alert('Error: ' + data.message)
    }
  })

  document.addEventListener('unarchive-note', async (e) => {
    loadingIndicator.show()
    const response = await fetch(`${API_URL}/notes/${e.detail.id}/unarchive`, {
      method: 'POST',
    })

    const data = await response.json()
    if (data.status === 'success') {
      alert('Note unarchived successfully')
      fetchNotes()
    } else {
      alert('Error: ' + data.message)
    }
  })

  fetchNotes()
})
