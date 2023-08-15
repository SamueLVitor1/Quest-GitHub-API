import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value;
  if (validateEmptyImput(userName)) return
  getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
  const userName = e.target.value;
  const key = e.wich || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyImput(userName)) return
    getUserData(userName)
  }
})

async function getUserData(userName) {

  const userResponse = await getUser(userName)
  
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return
  }

  const repositoriesResponse = await getRepositories(userName)

  const eventResponse = await getEvents(userName)

  user.setInfo(userResponse)
  user.setRepositories(repositoriesResponse)
  user.setEvents(eventResponse)

  screen.renderUser(user)
}

function validateEmptyImput(userName) {
  if (userName.length === 0) {
    alert('Preencha o campo com o nome do usuário do GitHub')
    return true;
  }
}