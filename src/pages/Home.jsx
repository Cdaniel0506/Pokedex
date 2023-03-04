import React from 'react'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import { useDispatch } from 'react-redux';
import "./styles/Home.css"
import ParticlesHome from '../components/Home/ParticlesHome';




const Home = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainerGlobal(nameTrainer))
    };

    return (
        <>
            <main className="home" >
                <section className="home_logOut" >
                    <div className="home_img" >
                        <img src="/imagenes/pokedex.png" alt="" />
                    </div>
                    <h2 className="home_title" >¡Hello Trainer !</h2>
                    <p className="home_txt" >Give me your name to start!</p>
                    <form className="home_handle" onSubmit={handleSubmit} >
                        <input
                            className='home_input'
                            required id="nameTrainer"
                            type="text"
                            placeholder="Your name... "

                        />
                        <button className="home_btn" >Start</button>
                    </form>
                </section>
                <div className="home-img-anime">
                    <img src="/imagenes/pokemon-anime.gif" alt="" />
                </div>
                <section className='home_bar' >
                    <div className='home_red' ></div>
                    <div className='home_black'></div>
                    <div className='home_pokeball' ></div>
                </section>
            </main>
            <ParticlesHome />
        </>

    )
}

export default Home