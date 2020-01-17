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
   const [latitude, setlatitude] = useState('')
   const [longitude, setlongitude] = useState('')
   const [distancia, setdistancia] = useState('10000')

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
         const response = await api.get(`/devs/search?longitude=${longitude}&latitude=${latitude}&techs=React,%20PHP&distancia=${distancia}`)
         console.log(response + response.data)
         setDevs(response.data)
      }
      loadDevs()
   }, [])
   async function btndistancia(e) {
      e.preventDefault();
 
      await onSubmit({
             github_username,
             techs,
             latitude,
             longitude
      })
        
      setGithubUsername('')
      setTechs('')
     }


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
               <form onSubmit={btndistancia}>
                  <input />
                  <button type="submit" />
               </form>
               {devs.map(dev => (
                   <DevItem key={dev._id} dev={dev} />
               ))}
            </ul>
         </main>
      </div>
   )
}

export default App
