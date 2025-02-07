const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')
let notes = JSON.parse(localStorage.getItem('notes')) || [
    {title: 'in progress',
        completed: false,
    },
    {
        title: 'done',
        completed: true,
    }
]
//web-page rendering
function render() {
    listElement.innerHTML = ''
    if(notes.length === 0) {
        listElement.innerHTML = "<p>No elements yet</p>" 
    }
    notes.forEach((note, index) => { 
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note, index))
    })
}
render()

// Adding new note to the list
createBtn.onclick = function() {
    if(inputElement.value.length === 0){ 
        return
    }
    const newNote = {   
        title: inputElement.value,
        completed: false,
    }
    notes.push(newNote)
    updateLocalStorage()
    render()
    inputElement.value = ''
}

//onclick handler
listElement.onclick = function(event) {
    if(event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if(type === 'toggle') {
            notes[index].completed = !notes[index].completed
        }else if(type === 'remove') {
            notes.splice(index, 1)
        }
    }
    updateLocalStorage()
    render()
}


function updateLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes))
}

function getNoteTemplate(note, index) { //template for new notes
    return `
        <li
            class="list-group-item d-flex justify-content-between align-items-center"
        >
            <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
            <span>
                <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'
                }" data-index="${index}" data-type="toggle">&check;</span>
                <span class="btn btn-small btn-danger" data-type="remove"
                data-index="${index}">&times;</span>
            </span>
        </li>
    `
}