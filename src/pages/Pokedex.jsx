import React from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'
import usePokedex from '../hooks/usePokedex'
import "./styles/Pokedex.css"

const Pokedex = () => {    

    const nameTrainer = useSelector((store) => store.nameTrainer);

    const {
        handleSubmit,
        handleChangeSelect,
        types,
        pokemonsInPage,
        handlePreviusPage,
        handleNextPage,
        pagesInBlock,
    } =usePokedex();



    return (
        <main className='pokedex' >
            <div className='pokedex_box-txt'>
                <p className='pokedex_txt' ><span className='pokedex_txt-span' >Welcome {nameTrainer}</span>, here you can find information about your favorite pokemon. </p>
            </div>
            <form className='pokedex_filter' onSubmit={handleSubmit} >
                <div  className='pokedex_Filter_container-input'>
                    <i className='pokedexFilter__icon bx bx-search-alt-2'></i>
                    <input className='pokedex_input' type="text" id='pokemonName' placeholder="Search your pokemon" />
                    <button className='pokedex_btn' >Search</button>
                </div>
                <select className='pokedex_Filter-select' onChange={handleChangeSelect} >
                    <option value="">All</option>
                    {
                        types.map(type => <option key={type.url} >{type.name}</option>)
                    }
                </select>
            </form>
            <section className="pokedex_pokemonCard">
                {
                    pokemonsInPage.map(pokemon =>
                        <PokemonCard
                            key={pokemon.url}
                            pokemonUrl={pokemon.url}
                        />
                    )
                }
            </section>
            <section className="pokedex_paginations">
                <ul>
                    <i onClick={handlePreviusPage} className='bx bxs-chevrons-left bx-tada bx-flip-vertical' ></i>
                    <li onClick={() => setCurrentPage(1)} >...</li>
                    {
                        pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
                    }
                    <li onClick={() => setCurrentPage(lastPage)}>...</li>
                    <i onClick={handleNextPage} className='bx bxs-chevrons-right bx-tada' ></i>
                </ul>
            </section>
        </main>
    )
}

export default Pokedex  