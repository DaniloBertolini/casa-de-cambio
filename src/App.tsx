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
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#EAEAEA" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
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
