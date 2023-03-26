import CardList from './CardList'
import { useEffect, useState } from 'react';
import logo from '../assets/icons/logo.ico'


const FindProduct = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            setLoading(true)
            fetch(`/find/search?q=${searchQuery}`)
                .then(response => {
                    return response
                })
                .then(json => {
                    setProducts(json.results)
                    setLoading(false)
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                })
        }
    }, [searchQuery])

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div>
            <div className='Logo-Icono'>
                <img src={logo} alt='Lonne Open' />
            </div>
            <h1>Busqueda</h1>
            <div className='Input'>
                <form onSubmit={handleSubmit}>
                    <input name="search" value={searchQuery} onChange={handleInputChange} />
                    <button>Buscar</button>
                </form>
            </div>
            {loading && <p>Cargando...</p>}
            <CardList products={ products } />
        </div>
    )
}

export default FindProduct
