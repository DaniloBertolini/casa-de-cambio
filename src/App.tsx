import { useEffect, useState } from "react"
import { fetchMoney } from "./utils"
import styles from './App.module.css'
import { TypeAPI } from "./types"
import Nav from "./components/Nav"

function App() {
  const [title, setTitle] = useState('')
  const [money, setMoney] = useState('')
  const [list, setList] = useState<TypeAPI[]>([])
  const [preview, setPreview] = useState<string[]>([])

  const handleClick = async (item: string = '') => {
    
    const data = (item) ? await fetchMoney(item) : await fetchMoney(money)
    if (data.base === money.toUpperCase() || data.base === item.toUpperCase()) {
      const ObjectRates = Object.entries(data.rates)
      
      setList(ObjectRates)
      setTitle((item) ? item : money.toUpperCase())
      return setMoney('')
    }

    return alert('Moeda não encontrada')
  }

  useEffect(() => {
    const fetchPreview = async () => {
      const data = await fetchMoney()
      const ObjectRates = Object.keys(data.rates)      
      setPreview(ObjectRates)
    }

    fetchPreview()
  }, [])

  return (
    <div className={ styles.container }>
      <Nav onClick={ () => window.location.reload() } />
      <header>

        <h1 className={ `${styles.title} ${styles.h1}`}>Casa de Cambio</h1>
        <div className={ styles.divForm }>
          <input
            type="text"
            placeholder="USD"
            value={ money ? money : ''}
            onChange={ ({target}) => setMoney(target.value) }
            />
          <button onClick={ () => handleClick() }>
            <img src="/lupa.svg" alt="lupa"/>
          </button>
        </div>

      </header>

      {!title ? (
      <section>
        <h2 className={ `${styles.title} ${styles.h2}` }>Moedas Disponíveis</h2>
        <ul className={ styles.ul}>
          {preview.map((item, index) => (
            <li className={ styles.tagLi} key={index} onClick={ () => handleClick(item) }>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </section>

      ) : (

      <main>
        <h2 className={ `${styles.title} ${styles.h2}` }>
          Valores Referentes a 1 {title.toUpperCase()}
        </h2>
        <ul className={ styles.ul}>
          {list.map((item, index) => (
            <li className={ styles.tagLi} key={index}>
              <p>{item[0]}</p>
              <span>{(item[1] as number).toFixed(3)}</span>
            </li>
          ))}
        </ul>
      </main>
      )}

    </div>
  )
}

export default App
