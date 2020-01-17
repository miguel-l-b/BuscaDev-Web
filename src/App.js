import React, {  useState, useEffect } from 'react'

import api from './services/api'

import './css/App.css'
import './css/global.css'
import './css/Sidebar.css'
import './css/Main.css'

import DevItem from "./components/devitem"
import DevForm from "./components/devform"

function App() {
   const [devs, setDevs] = useState([])
   const [github_username, setGithubUsername] = useState('')
   const [techs, setTechs] = useState('')

   useEffect(() => {
      async function loadDevs() {
         const response = await api.get('/devs')

         setDevs(response.data)
      }
      loadDevs()
   }, [])

   async function handleAddDev(data) {
      const response = await api.post('/devs', data)

      setDevs([...devs, response.data])
   }

  return (
      <div id='app'>
         <aside>
            <strong>Cadastrar</strong>
               <DevForm onSubmit={handleAddDev} />
         </aside>
         <main>
            <ul>
               {devs.map(dev => (
                   <DevItem key={dev._id} dev={dev} />
               ))}
            </ul>
         </main>
      </div>
   )
}

export default App
