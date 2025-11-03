// ...existing code...
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
// ...existing code...