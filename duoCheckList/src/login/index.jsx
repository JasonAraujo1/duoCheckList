import React, { useState } from 'react'
import { fetchApiRegister } from '../assets/fetchApi'
import { useNavigate } from 'react-router'

export default function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

 async function handleClick() {
    const data = await fetchApiRegister()
    const dataFind = data.find((item)=>item.name === name && item.password === password)
    if(!dataFind){
      alert("Usuário ou senha incorretos!")
    }else{
      navigate("/home")
    }
  }

  return (
    <div>
      <div>
        <img src="" alt="imagem logo" />
        <p>título logo</p>
      </div>

      <div>
        <p className='font-bold text-xl'>Login</p>
        <span>preencha os campos para entrar</span>
      </div>

      <div>
        <span>nome de usuário: </span>
        <input onChange={(event) => setName(event.target.value)} className='border' type="text" />
      </div>

      <div>
        <span>Senha: </span>
        <input onChange={(event) => setPassword(event.target.value)} className='border' type="password" />
      </div>

      <button onClick={handleClick}>Entrar</button>
    </div>
  )
}
