import { useEffect, useMemo, useState } from "react"
import { paginationLogic } from "../utils/pagination.js"
import axios from "axios"


const usePokedex = () => {
    const [pokemons, setPokemons] = useState([])
    /*Este es lo que aremos con la lista */
    const [types, setTypes] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    /*Es el tipo del select */
    const [selectType, setSelectType] = useState("")
    /*Estado para almacenar el dato de busqueda */
    const [pokemonName, setPokemonName] = useState("")
    /* Estado que almacena la pagina actual*/
    const [currentPage, setCurrentPage] = useState(1)

    /*Modo dark y withe */
    const [theme, setTheme] = useState("dark");
    const changeTheme = () => setTheme(theme === "dark" ? "light" : "dark")


    const handleChangeSelect = (e) => {
        setSelectType(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    //Creacion de boton para ir a la siguiente pagina
    const handleNextPage = () => {
        const newPage = currentPage + 1
        if (newPage > lastPage) {
            setCurrentPage(1)
        } else {
            setCurrentPage(newPage)
        }
    }
    //creacion del boton para ir a la pagina anterior
    const handlePreviusPage = () => {
        const newPage = currentPage - 1
        if (newPage < 1) {
            setCurrentPage(lastPage)
        } else {
            setCurrentPage(newPage)
        }
    }



    //Esta funcion hara que se ejecute en cada render y usamos UseMemo para almacenar en caché el resultado de un cálculo entre renderizaciones.
    const { pagesInBlock, lastPage, pokemonsInPage } =   useMemo(() => {
        return paginationLogic(pokemonsFilter, currentPage)

    },[pokemonsFilter, currentPage])


    /*en este mismo oock ejecutaremos el select almacenado para ejecutarlo ya que ambos endpoint son casi iguales */
    /*Como los tipos de datos tienen diferentes estructuras usamos un if y usamos map para modificar cada posicion en el arreglo y retornar todos los elementos */
    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=1279"}`
        axios.get(URL)
            .then((res) => {
                if (selectType) {
                    const pokemonByType = res.data.pokemon.map(pokemon => ({
                        name: pokemon.pokemon.name,
                        url: pokemon.pokemon.url
                    }))
                    setPokemons(pokemonByType)
                } else {
                    setPokemons(res.data.results)
                }
            })
            .catch((err) => console.log(err))

    }, [selectType])

    /*Este effect se encargara de realizar el filtrado de datos */
    useEffect(() => {
        const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
        setPokemonsFilter(pokemonByName)

    }, [pokemonName, pokemons])

    /*Este useEffect es para consumir los tipos de pokemon. no es recomendable hacer muchas peticiones en un solo hoock */

    useEffect(() => {
        const URl = "https://pokeapi.co/api/v2/type/"
        axios.get(URl)
            .then((res) => setTypes(res.data.results))
            .catch((err) => console.log(err))

    }, [])

    //cuando cambiamos de tipo volver a la pagina 1
    useEffect(() => {
        setCurrentPage(1)
    }, [pokemons])


    return {
        handleSubmit,
        handleChangeSelect,
        types,
        pokemonsInPage,
        handlePreviusPage,
        handleNextPage,
        pagesInBlock,
        changeTheme,
        theme
    }
}

export default usePokedex