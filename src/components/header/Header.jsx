"use client"
import { useEffect, useState } from 'react'
import './header.css'

const BurguerMenu = ({btn})=>{
    useEffect(() => {
        document.body.style.overflow = "hidden"; 
        return () => {
        document.body.style.overflow = "auto"; 
        };
    }, []);

   
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            btn(b => !b); 
        }
    }
    return(
        <div onClick={handleBackdropClick} className='fixed inset-0 top-0 left-0 w-full h-screen bg-black/60 flex z-50'>
            <div className='w-[80%] h-full overflow-x-hidden flex flex-col bg-white'>
                
                {
                    ["Reservar", "Gestionar reserva", "Preparar el viaje", "Experiencia Iberia", "Iberia Club"].map((label, k)=>(
                        <button onClick={()=> btn(b=> !b)} key={k} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex justify-between items-center'>
                            <span className='text-[#333] text-[16px] pl-8'>{label}</span>
                            <div className='text-[#d7192d]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </div>
                        </button>
                    ))
                }
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#d7192d] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16">
                            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"/>
                        </svg>
                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>Reserva tu vuelo</span>
                </button>
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#d7192d] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pc-display-horizontal" viewBox="0 0 16 16">
                            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5M12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0M1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25"/>
                        </svg>
                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>Accede al chek-in</span>
                </button>
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#d7192d] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-easel2-fill" viewBox="0 0 16 16">
                            <path d="M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809z"/>
                            <path fillRule="evenodd" d="M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1zm3.64 2 .25-1h7.22l.25 1z"/>
                        </svg>

                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>Gestiona tu reserva</span>
                </button>
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#d7192d] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
                        </svg>
                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>Llegadas y Salida</span>
                </button>
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#666] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-americas" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
                        </svg>
                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>País/Idiomas</span>
                </button>
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#666] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                            <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
                        </svg>
                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>Información sobre nuestros programas para empresas</span>
                </button>
                <button onClick={()=> btn(b=> !b)} className='w-[90%] border-b-1 border-b-gray-300 py-4 flex items-center'>
                    <div className='text-[#666] pl-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
                    <span className='text-[#333] text-[16px] pl-4'>¿Tienes dudas?</span>
                </button>
            </div>

        </div>
    )
}


const Header =()=>{
    const [menu, setMenu] = useState(false)
    return(
        <header className="header-conteiner relative">
            {
                menu && <BurguerMenu btn={setMenu}/>
            }
            <div className='w-[98%] grid grid-cols-2'>
                <div className='flex items-center'>
                    <button onClick={()=>{setMenu(m => !m)}} className='text-white pt-2 pb-3 pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>

                    </button>
                    <div className='pl-3 h-full flex justify-center border-l-2 border-l-[#c0424f]'>
                        <img src="./assets/image/logo/logo-iberia.svg" className='w-[90px] object-contain' alt=""  />
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <div className='text-white mr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 16">
                        <path d="M22.502 1.94a.5.5 0 0 1 0 .706l-1.043 1.043-2-2L20.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L8.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l9.813-6.814z"/>
                        <rect x="1" y="3" width="18" height="10" rx="1.5" ry="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>

                    </div>
                    
                    <div className='text-white pr-1 pl-4 border-l-1 border-l-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header