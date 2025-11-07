

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#saisie-tache');
  const addBtn = document.querySelector('.icone-ajout');
  const todoContainer = document.querySelector('.liste-afaire');
  const doneContainer = document.querySelector('.liste-fait');
  const deleteBtn = document.querySelector('.icone-trash');

  if (!input) console.error('Input non trouvé: #saisie-tache');
  if (!addBtn) console.error('Icône ajout non trouvé: .icone-ajout');
  if (!todoContainer) console.error('Container TODO non trouvé: .liste-afaire');
  if (!doneContainer) console.error('Container DONE non trouvé: .liste-fait');

  function createTaskElement(text) {
    const li = document.createElement('li');
    li.className = 'tache';
    li.textContent = text;

    li.addEventListener('click', () => {
      const parent = li.parentElement;
      if (parent === todoContainer) {
        doneContainer.appendChild(li);
        li.classList.add('fait');
      } else if (parent === doneContainer) {
        todoContainer.appendChild(li);
        li.classList.remove('fait');
      }
    });

    return li;
  }

  function addTask() {
    if (!input) return;
    const text = input.value.trim();
    if (text === '') return;
    const task = createTaskElement(text);
    if (todoContainer) todoContainer.appendChild(task);
    input.value = '';
    input.focus();
  }

  function deleteCompletedTasks() {
    if (doneContainer) doneContainer.innerHTML = '';
  }

  if (addBtn) addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
  });

  if (input) input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  if (deleteBtn) deleteBtn.addEventListener('click', () => {
    deleteCompletedTasks();
  });
});


const saisieText = document.getElementById("saisie-tache")
const boutonAjout = document.querySelector(".icone-ajout")
const listeAfaire = document.querySelector(".liste-afaire")
const listeFait = document.querySelector(".liste-fait")
const iconeTrash = document.querySelector(".icone-trash")

boutonAjout.addEventListener("click", entrerInfo)

saisieText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        entrerInfo()
    }
})

iconeTrash.addEventListener("click", viderTachesFaites)

window.addEventListener("load", chargerTaches)

function entrerInfo() {
    const texte = saisieText.value.trim()
    if (texte !== "") {
        const li = document.createElement("li")
        li.className = "tache"
        li.textContent = texte
        
        li.addEventListener("click", function() {
            marquerCommeFait(li)
        })
        
        listeAfaire.appendChild(li)
        saisieText.value = "" 
        sauvegarderTaches()
    }
}

function marquerCommeFait(tacheElement) {
    tacheElement.classList.add("fait")
    tacheElement.classList.remove("tache")
    
    listeFait.appendChild(tacheElement)
    
    tacheElement.removeEventListener("click", marquerCommeFait)
    tacheElement.addEventListener("click", function() {
        remettreAFaire(tacheElement)
    })
    sauvegarderTaches()
}

function remettreAFaire(tacheElement) {
    tacheElement.classList.remove("fait")
    tacheElement.classList.add("tache")
    
    listeAfaire.appendChild(tacheElement)
    
    tacheElement.removeEventListener("click", remettreAFaire)
    tacheElement.addEventListener("click", function() {
        marquerCommeFait(tacheElement)
    })
    sauvegarderTaches()
}

function viderTachesFaites() {
    listeFait.innerHTML = ""
    sauvegarderTaches()
}

function sauvegarderTaches() {
    const tachesAfaire = []
    const tachesFaites = []
    
    listeAfaire.querySelectorAll("li").forEach(li => {
        tachesAfaire.push(li.textContent)
    })
    
    listeFait.querySelectorAll("li").forEach(li => {
        tachesFaites.push(li.textContent)
    })
    
    localStorage.setItem("tachesAfaire", JSON.stringify(tachesAfaire))
    localStorage.setItem("tachesFaites", JSON.stringify(tachesFaites))
}

function chargerTaches() {
    const tachesAfaire = JSON.parse(localStorage.getItem("tachesAfaire")) || []
    const tachesFaites = JSON.parse(localStorage.getItem("tachesFaites")) || []
    
    tachesAfaire.forEach(texte => {
        const li = document.createElement("li")
        li.className = "tache"
        li.textContent = texte
        li.addEventListener("click", function() {
            marquerCommeFait(li)
        })
        listeAfaire.appendChild(li)
    })
    
    tachesFaites.forEach(texte => {
        const li = document.createElement("li")
        li.className = "fait"
        li.textContent = texte
        li.addEventListener("click", function() {
            remettreAFaire(li)
        })
        listeFait.appendChild(li)
    })
}

S























>>>>>>> 3287e71c47a403845bf2dc8cdcb7d54425bc11e1
