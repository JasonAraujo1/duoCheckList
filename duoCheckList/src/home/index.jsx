import React, { useEffect, useState } from 'react'
import { fetchApiIdUser } from '../services/fetchApi'
import { NavLink } from 'react-router'
import plus from '../assets/plus.svg';
import search from '../assets/search.svg';
import logout from '../assets/logout.svg';

export default function Home() {

  const [dataProduct, setDataProduct] = useState([])
  const [searchProduct, setSearchProduct] = useState("")
  const [display, setDisplay] = useState([])

  useEffect(() => {
    async function onLoad() {
      const idUser = localStorage.getItem("idUser")
      console.log("idUser", idUser)
      const data = await fetchApiIdUser(idUser)
      setDataProduct(Array.isArray(data) ? data : [])
      setDisplay(data)
      //Se o usuário não tem produtos, a API pode retornar algo que não é um array (como undefined, null ou {}). Quando isso acontece, o React tenta fazer dataProduct.map(...) em algo inválido, o que gera erro e quebra a página.
      //então usamos Array.isArray() para checar se data é um array. Se for, usamos ele. Se não for, usamos um array vazio [].

    }
    onLoad()
  }, [])
  // console.log("teste", dataProduct)

  function handleChange({ target }) {
    setSearchProduct(target.value)
    const filterInput = dataProduct.filter((item) => item.product.includes(searchProduct))
    setDisplay(filterInput)
  }

  function handleSelect({ target }) {
    const filterInput = dataProduct.filter((item) => item.category === target.value)
    setDisplay(filterInput)
    
  }


  function handleClickProduct(id) {
    localStorage.setItem("idProduct", id)
    // console.log("idProduct", id)
  }

  function handleSelectStatus({ target }) {
    const filterStatus = dataProduct.filter((item) => item.status === target.value)
    setDisplay(filterStatus)
    
  }

  function handleClean(){
    setDisplay(dataProduct)
  }

  return (
    <div  className='w-full sm:w-90 md:w-200'>

      <div className='flex mb-8 justify-between items-center'>
        <NavLink to="/new">
          <img src={plus} alt="" className='size-15 hover:' />
          <span className='text-gray-400 text-sm'>Novo</span>
        </NavLink>
        <NavLink to="/login">
          <img src={logout} alt="" className='size-8 hover:' />
          <span className='text-gray-400 text-sm'>Sair</span>
        </NavLink>
        
      </div>
      <div className='flex flex-col items-center'>


        <div className='bg-neutral-100 flex p-2 rounded-lg justify-center w-full max-w-80 mt-5 mb-8 gap-4'>
          <img src={search} alt="" className='size-7 ' />
          <input value={searchProduct} onChange={handleChange} placeholder='Buscar Produto...'
            className='  outline-0' type="text" />
        </div>

        <div className='w-full text-start' onClick={handleClean}>
          <span className='underline text-sm text-gray-500'>Limpar filtro <span>x</span></span>
        </div>

        <div className=" ">
          <table className=" text-sm md:text-base md:w-200 text-start ">
            <thead className='border-b-2 border-b-red-400 '>
              <tr className=''>
                <th className=" text-start px-2 py-2 text-red-400 text-base">Todos</th>
                <th className="text-start py-2 ">
                  <select onChange={handleSelect} className="text-red-400  rounded  py-1  text-base md:text-sm outline-0 w-full md:w-36">
                    <option selected disabled value="categorias">Categorias</option>
                    <option value="Sala">Sala</option>
                    <option value="Quarto">Quarto</option>
                    <option value="Banheiro">Banheiro</option>
                    <option value="Lavanderia">Lavanderia</option>
                    <option value="Escritório">Escritório</option>
                    <option value="Quintal/Jardim">Quintal/Jardim</option>
                    <option value="Varanda/Sacada">Varanda/Sacada</option>
                    <option value="Cozinha">Cozinha</option>                   
                  </select>
                </th>
                <th className=" py-2 text-start">
                  <select onChange={handleSelectStatus} className="text-red-400 rounded px-1 py-1   text-base md:text-sm outline-0 w-full md:w-28">
                    <option className='outline-0' selected disabled value="categorias">Status</option>
                    <option className='outline-0' value="Adquirido">Adquirido</option>
                    <option className='outline-0' value="Não Adquirido">Não Adquirido</option>              
                  </select>
                </th>
              </tr>
            </thead>

            <tbody className=''>
              {display.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-2">Nenhum produto encontrado.</td>
                </tr>
              ) : (
                display.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100 ">
                    <td className='cursor-pointer px-2 py-3 border-b border-gray-300 text-base font-medium'>
                      <NavLink to="/product" onClick={() => handleClickProduct(item.id)} className=" ">
                        {item.product}
                      </NavLink>
                    </td>
                    <td className='px-2 py-1 border-b font-light text-neutral-500 border-gray-300'>{item.category}</td>
                    <td
                      className={`px-2 py-1 border-b  text-sm font-semibold border-gray-300 ${item.status === 'Não Adquirido' ? 'text-amber-500' : 'text-lime-500'
                        }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  )
}
