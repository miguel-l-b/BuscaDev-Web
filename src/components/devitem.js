import React from 'react'

function DevItem({ dev }) {
    return (
<li className="dev-item">
    <header>
        <img src={dev.avatar_url} class="img" alt={dev.name} />
        <div className='user-info'>
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
        </div>
        <p>{dev.bio}</p>
        <div class="btn">
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </div>
    </header>
</li>
)}

export default DevItem