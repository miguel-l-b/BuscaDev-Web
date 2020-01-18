import React, {  useState, useEffect } from 'react'

import api from './services/api'

import './css/App.css'
import './css/global.css'
import './css/Sidebar.css'
import './css/Main.css'
import './css/Devs.css'

import DevItem from "./components/devitem"
import DevForm from "./components/devform"

function App() {
   const [devs, setDevs] = useState([])
   const [github_username, setGithubUsername] = useState('')
   const [techs, setTechs] = useState('')
   const [latitude, setlatitude] = useState('')
   const [longitude, setlongitude] = useState('')
   const [distancia, setdistancia] = useState('10000')
   const onSubmit = ''

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const { latitude, longitude } = position.coords
            setlatitude(latitude)
            setlongitude(longitude)
         })
   }, [])
   useEffect(() => {
      async function loadDevs() {
         const response = await api.get('/devs')
         setDevs(response.data)
      }
      loadDevs()
   }, [])
   
   async function handleAddDev(data) {
      const response = await api.post('/devs', data)

      setDevs([ response ])
   }

  return (
      <div id='app'>
         <aside>
            <strong>Cadastrar</strong>
               <DevForm onSubmit={handleAddDev} />
         </aside>
         <div className='devs'>
         <div className="pesqdevs">
               <button>&larr;</button>
               <label> Página </label>
               <button>&rarr;</button>
         </div>
         <main>
            <ul>
               {devs.map(dev => (
                   <DevItem key={dev._id} dev={dev} />
               ))}
            </ul>
         </main>
         </div>
      </div>
   )
}

export default App
