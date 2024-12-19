document.addEventListener('DOMContentLoaded', loadCARs);
document.getElementById('car-form').addEventListener('submit', addCAR);

// Ajouter une CAR
function addCAR(event) {
  event.preventDefault();

  const carTitle = document.getElementById('car-title').value;
  const carDate = document.getElementById('car-date').value;
  const carDesc = document.getElementById('car-desc').value;
  const priority = document.getElementById('priority').value;

  const car = { title: carTitle, date: carDate, desc: carDesc, priority: priority, completed: false };

  // Sauvegarder la CAR dans le LocalStorage
  saveCARToLocalStorage(car);

  // Afficher la CAR dans la liste
  displayCAR(car);

  // Réinitialiser le formulaire
  document.getElementById('car-form').reset();
}

// Afficher une CAR dans la liste
function displayCAR(car) {
  const carList = document.getElementById('car-list');
  const newCAR = document.createElement('li');

  newCAR.innerHTML = `
    <div class="task-title">📌 ${car.title}</div>
    <div class="task-date">📅 ${car.date}</div>
    <div class="task-desc">📝 ${car.desc}</div>
    <div class="task-priority">⚠️ Priorité : ${car.priority}</div>
  `;

  // Si la tâche est terminée, on applique le style "completed"
  if (car.completed) {
    newCAR.classList.add('completed');
  }

  // Créer un bouton pour marquer la tâche comme terminée
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Terminée';
  completeButton.classList.add('complete-btn');
  completeButton.addEventListener('click', function () {
    newCAR.classList.toggle('completed');
    toggleCompleteStatus(car);
  });

  // Créer un bouton pour supprimer la tâche
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', function () {
    deleteCAR(car, newCAR);
  });

  newCAR.appendChild(completeButton);
  newCAR.appendChild(deleteButton);
  carList.appendChild(newCAR);
}

// Charger les CAR depuis le LocalStorage
function loadCARs() {
  const cars = JSON.parse(localStorage.getItem('cars')) || [];
  cars.forEach(displayCAR);
}

// Sauvegarder une CAR dans le LocalStorage
function saveCARToLocalStorage(car) {
  const cars = JSON.parse(localStorage.getItem('cars')) || [];
  cars.push(car);
  localStorage.setItem('cars', JSON.stringify(cars));
}

// Mettre à jour le statut de complétion de la CAR dans le LocalStorage
function toggleCompleteStatus(car) {
  const cars = JSON.parse(localStorage.getItem('cars'));
  const carIndex = cars.findIndex(c => c.title === car.title && c.date === car.date);
  cars[carIndex].completed = !cars[carIndex].completed;
  localStorage.setItem('cars', JSON.stringify(cars));
}

// Supprimer une CAR
function deleteCAR(car, carElement) {
  const cars = JSON.parse(localStorage.getItem('cars'));
  // On filtre le tableau pour supprimer la CAR correspondante
  const updatedCars = cars.filter(c => c.title !== car.title || c.date !== car.date);
  // On réécrit le LocalStorage avec la version mise à jour
  localStorage.setItem('cars', JSON.stringify(updatedCars));
  // On retire l'élément de la page
  carElement.remove();
}

// Rafraîchir l'affichage des CAR
function refreshCARList() {
  document.getElementById('car-list').innerHTML = '';
  loadCARs();
}
