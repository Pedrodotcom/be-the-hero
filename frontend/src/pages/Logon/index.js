import React, { useState } from 'react'
import {Link , useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import { FiLogIn } from 'react-icons/fi'

export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id) //armazena localmente o id da ONG que fez o login
            localStorage.setItem('ongName', response.data.name) // armazena localmente o nome da ONG que fez o login

            history.push('/profile')
        } catch (err) {
            alert('Falha de autenticação do ID. Tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value = {id}
                        onChange = {e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register"> {/*conferir o caráter de SPA à mudança de rota no React, feita por link do react-router-dom*/}
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}