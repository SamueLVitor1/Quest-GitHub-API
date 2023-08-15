const screen = {
  userProfile: document.querySelector('.profile-data'),
  renderUser(user){
    this.userProfile.innerHTML = `<div class="info">
                       <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                       <div class="data"
                         <h1>${user.name ?? 'não possui nome cadastrado😥'} </h1>
                         <p> ${user.bio ?? 'não possui bio cadastrada 😥'}</p> <br>
                         <span>👥${user.followers} seguidores</span> <br>
                         <span>👥 ${user.following} seguindo </span>
                       </div>
                       </div>`
    let repositoriesItens = ''
    user.repositories.forEach(repo => repositoriesItens += 
      `<li> 
          <a href="${repo.html_url}" target="_blank"> ${repo.name} 
            <p class="box-statics"> 
              <span class="statics-repos">🍴${repo.forks_count}</span> 
              <span class="statics-repos">⭐${repo.stargazers_count}</span> 
              <span class="statics-repos">👀${repo.watchers_count}</span> 
              <span class="statics-repos">🧑‍💻${repo.language ?? ' '}</span> 
            </p> 
          </a>  
      </li>`);
    
    if(user.repositories.length > 0){
      this.userProfile.innerHTML +=`<div class="repositories section"> 
                                      <h2>Repositórios</h2>
                                      <ul> ${repositoriesItens} </ul>
                                    </div>`
    }

    
    const last10Events = user.events.slice(0,10)
    let eventsItens = ''
     last10Events.forEach((event) =>{
      if(event.type === 'PushEvent'){
        eventsItens += `<p class="name-repositorio"> <span>${event.repo.name}</span>  - ${event.payload.commits[0].message}</p>`
      }

      if(event.type === 'CreateEvent'){
        eventsItens += `<p class="name-repositorio"> <span>${event.repo.name} </span>  - Evento criado</p>`
      }
     })

     if(user.events.length){
      this.userProfile.innerHTML += `<div>
      <h2>Eventos</h2>
       ${eventsItens}   
      </div>`
     }
  
  },
  renderNotFound(){
    this.userProfile.innerHTML = "<h3>Usuario não encontrado </h3>"
  },
  
}

export{screen}