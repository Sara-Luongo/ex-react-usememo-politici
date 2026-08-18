import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Card from './Card'
import './App.css'



/* Milestone 1: Recuperare e visualizzare i dati
Effettua una chiamata API a
http://localhost:3333/politicians

Salva la risposta in uno stato React (useState).

Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

Nome (name)
Immagine (image)
Posizione (position)
Breve biografia (biography)

Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.

📌 Milestone 2: Implementare la ricerca ottimizzata
Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: 
Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.

📌 Milestone 3: Ottimizzare il rendering delle card con React.memo
Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle 
che non sono cambiate.
Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono 
in memoria senza essere ridisegnate.
 */


function App() {
  const API_URL = "http://localhost:3333/politicians";

  const [politicans, setPoliticans] = useState([]);
  const [politicanSearch, setPoliticanSearch] = useState('');
  const politicanFiltered = useMemo(() => {
    return politicans.filter(p => {
      if (p.name.toLowerCase().includes(politicanSearch.toLowerCase()) || p.biography.toLowerCase().includes(politicanSearch.toLowerCase())) {
        return p
      }
    })
  }, [politicans, politicanSearch]);



  const fetchPolitican = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPoliticans(data);
    } catch (error) {
      console.error('errore nel recupero dei dati')
    }
  }

  useEffect(() => {
    fetchPolitican()
  }, [])


  return (
    <>
      <section>
        <div>
          <label htmlFor="ricerca-politici"> cerca politico  </label>
          <input onChange={(e) => { setPoliticanSearch(e.target.value) }} id='ricerca-politici' type="text" />
          <p>{politicanSearch}</p>
        </div>
      </section>
      <section className='section-card'>
        {politicanFiltered.map((p) => (
          <Card key={p.id} politican={p} />
        ))}
      </section>
    </>)
}

export default App
