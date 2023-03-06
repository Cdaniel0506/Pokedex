/*Aqui se iran a renderizar cada pokemon individual */

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./styles/Pokemon.css"



const Pokemon = () => {

    const [pokemon, setPokemon] = useState()

    const { id } = useParams()

    /*Funcion para obtener el porcertanje de la barra */
    const getPercentBar = (stat) =>{
        const percent = (stat * 100) / 255;
        return `${percent}%`
    }
    const navigate=useNavigate()
    const handleClickPokemon = () => {
        navigate(`/pokedex/${pokemon.id}`)        
    }

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <main>
            <article className="pokemon_container" >
                <section className={`pokemon border-${pokemon?.types[0].type.name}`}onClick={handleClickPokemon} >
                    {/*Parte superior */}
                    <section className={`pokemon_header bg-lg-${pokemon?.types[0].type.name}`}>

                    </section>
                        <div className="pokemon_img">
                            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                        </div>
                    <section className={"pokemon_body"} ></section>

                    {/*body - description*/}
                    <section className="pokemon_profile">
                        <h2 className="pokemon_id"># {pokemon?.id}</h2>
                        <h2 className="pokemon_name">{pokemon?.name} </h2>
                        

                        <div className="pokemon_descrition">
                            <div className="pokemon_descrition-weight">
                                <h5 className="pokemon_descrition-weight-one">Weight</h5>
                                <h4 className="pokemon_descrition-weight-two">{pokemon?.weight}</h4>
                            </div>
                            <div className="pokemon_descrition-height">
                                <h5 className="pokemon_descrition-height-one" >Height</h5>
                                <h4 className="pokemon_descrition-height-two">{pokemon?.height}</h4>
                            </div>
                        </div>

                        <div className="pokemon_descrition_two">
                            <div className="pokemon_descrition_two-types">
                                <h3 className="pokemon_descrition_two-one">Type</h3>
                                <div className="pokemon_descrition_two-two">
                                    {
                                        pokemon?.types.map(type => <div key={type.type.name}><span>{type.type.name}</span> </div>)
                                    }
                                </div>
                            </div>
                            <div className="pokemon_descrition_two-abilities">
                                <h3 className="pokemon_descrition_two-abilities-one">Abilities</h3>
                                <div className="pokemon_descrition_two-abilities-two">
                                    {
                                        pokemon?.abilities.map(ability => <div key={ability.ability.name} ><span>{ability.ability.name}</span></div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </section>

                    {/*Stats */}
                    <section className="pokemon_stats" >
                        <h2 className="pokemon_stats-title" >Stats</h2>
                        <section className="pokemon_stats-info" >
                            {pokemon?.stats.map(stat => (
                                <article className='pokemon_stat' key={stat.stat.name}>
                                    <div className="pokemon_stat-header" >
                                        <h4 className="pokemon_stat-name">{stat.stat.name}</h4>
                                        <h5 className="pokemon_stat-value" >{stat.base_stat}/255</h5>
                                    </div>
                                    <div className="pokemon_stat-bar" >
                                        <div className="pokemon_stat-barGray" >
                                            <div className='pokemon_stat-barprogress' style={{width: getPercentBar(stat.base_stat)}} ></div>
                                        </div>
                                    </div>
                                </article>
                            ))
                            }

                        </section>
                    </section>

                </section>
            </article>
        </main>
    )
}

export default Pokemon