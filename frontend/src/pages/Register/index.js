import React, {useState} from 'react'
import { Link , useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault() //previne o comportamento padrão de que a página seja recarregada quando o formulário for submetido pelo cadastro
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post('ongs', data) //envio dos dados à tabela 'ongs'. Por padrão, o axios já envia os dados em formato JSON

            alert(`Seu ID de acesso é ${response.data.id}`) //retorna a id de acesso ao usuário

            history.push('/') //retorna o usuário, após o cadastro, para a tela de login

        } catch (err) {
            alert('Erro no cadastro. Tente novamente.')
        }
        
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/"> {/*conferir o caráter de SPA à mudança de rota no React, feita por link do react-router-dom*/}
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder = "Nome da ONG" 
                        value = {name}
                        onChange = {e => setName(e.target.value)} {/*declaração de uma arrow function que estabelece que as alterações feitas pelo input definirão um novo estado à variável*/...Comment} 
                    />
                    <input 
                        type = "email" 
                        placeholder = "E-mail"
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder = "WhatsApp"
                        value = {whatsapp}
                        onChange = {e => setWhatsapp(e.target.value)} 
                    />

                    <div className="input-group">
                        <input 
                            placeholder = "Cidade"
                            value = {city}
                            onChange = {e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder = "UF" 
                            style = {{ width: 80 }} {/*é possível trabalhar com elementos CSS, utilizando um objeto dentro da primeira chave*/...Comment}
                            value = {uf}
                            onChange = {e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}