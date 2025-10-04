import { SideBar } from "./SideBar"
import { Search } from "./Search"
import { useEffect, useState } from "react"
import LogoIcon from '../../assets/logo.png'
import { C94Logo, C94PNG } from "../../assets"


export const Header = ()=>{
    const [searchStatus, setSearchStatus] = useState(false);
    const [sideBarStatus, setSideBarStatus] = useState(false);
    const closeSearch = ()=>{
        setSearchStatus(false);
    }

    const closeSideBar = ()=>{
        setSideBarStatus(false);
    }

    useEffect(()=>{
        document.addEventListener('keydown', (e)=>{
                if (e.key === "Escape" && sideBarStatus===true){
                    setSideBarStatus(false);
                }

                if (e.key === "Escape" && searchStatus){
                    setSearchStatus(false);
                }
        })
    }, [sideBarStatus, searchStatus])


    return(
        <div className="flex flex-col w-full sticky top-0 z-50 ">
            <div className="flex flex-row justify-between items-center w-full p-4  bg-white/30 backdrop-blur-2xl">
                {/* SIDEBAR MENÚ */}
                <button id="searchToggle" onClick={()=>setSideBarStatus(true)} className="p-2 rounded-full transition delay-50 duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-scale delay-50 duration-100 ease-in-out hover:scale-120">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </div>
                    
                </button>
                {/* LOGO */}
                <button className="cursor-pointer">
                    <img src={C94PNG} alt="logo" className="h-15 scale-210 md:scale-250 ml-5" />
                </button>
                <div className="flex flex-row justify-between items-center mp-2 gap-0 lg:gap-2 md:gap-1">
                    {/* LUPA PARA BUSCAR */}
                    <button id="searchToggle" onClick={()=>setSearchStatus(true)} className="p-2 rounded-full transition delay-50  ease-in-out hover:bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-scale delay-50 duration-100 hover:scale-110">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    
                    {/* CARRO DE COMPRAS */}
                    <button id="cartToggle" className="p-2 rounded-full transition delay-50  ease-in-out hover:bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-scale delay-50 duration-100 hover:scale-110">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                    
                    {/* INICIAR SESIÓN */}
                    <button id="sesionToggle" className="p-2 hidden md:block rounded-full transition delay-50 ease-in-out hover:bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-scale delay-50 duration-100 ease-in-out hover:scale-110">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </button>
                </div>

            </div>
            {/* BARRA CON COLORES DE IDENTIDAD */}
            <div className="flex flex-row w-full">
                <div className="h-1 bg-[#ffe500] w-1/4"></div>
                <div className="h-1 bg-[#14ae5c] w-1/4"></div>
                <div className="h-1 bg-[#e7191f] w-1/6"></div>
                <div className="h-1 bg-[#0019f8] w-1/6"></div>
                <div className="h-1 bg-[#e7191f] w-1/6"></div>
            </div>

            {/* MODAL PARA LA BÚSQUEDA */}
            {/* { searchStatus && (
                <Search  closeSearch={closeSearch}/>
            )} */}
            <Search  closeSearch={closeSearch} toggle={searchStatus}/>
            {/* MODAL PARA EL SIDEBAR */}
            <SideBar closeSideBar={closeSideBar} toggle={sideBarStatus} />
        </div>
        
    )
}