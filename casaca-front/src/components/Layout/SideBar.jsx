import { InstagramBlackIcon, FacebookBlackIcon  } from '../../assets/index'
import { useNavigate } from 'react-router-dom';

export const SideBar = ({closeSideBar, toggle})=>{
    const navigate = useNavigate();

    const handleClick = (slug) => {
        toggle && closeSideBar(); // Close sidebar if open
        navigate(slug); // Navigate to specific route
    };

    const items = [
        {
            name: 'Inicio',
            slug: 'home',
        },
        {
            name: 'Colecciones',
            slug: 'colecciones',
        },
        {
            name: 'Catálogo',
            slug: 'catalogo',
        }
    ]
        // 'Colecciones',
        // 'Catálogo',
        // 'Blog',
        // 'Contacto'];
        // {
        //     name: 'Catálogo',
        //     slug: 'catalogo',
        // }
        
    

    return(

        <div id="searchOverlay" className={`
            flex flex-row fixed inset-0 
            backdrop-blur-sm  w-full
            ${toggle ? 'opacity-100' : 'opacity-0'}
            ${toggle ? 'max-w-full w-full' : 'max-w-0 w-0'}
            transition-all delay-50 duration-300 ease-in-out
            ${toggle ? 'z-50': '-z-1'}
        `}>
            <div className={`
                flex flex-row ml-0
                block
                ${toggle ? 'max-w-full w-full md:w-1/4' : 'max-w-0 w-0'}
                transition-all duration-200 ease-in-out
                ${toggle ? 'translate-x-0' : '-translate-x-full'}
                h-full 
                bg-black 
                p-2
            `}>
                <div className="w-full">
                    <button onClick={closeSideBar} id="closeSearch" className={`
                        p-2 rounded-full
                        ${toggle ? 'opacity-100' : 'opacity-0'}
                        transition-all  ease-in-out
                        hover:bg-gray-700 
                        cursor-pointer
                    `}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white transition-scale delay-50 duration-100 ease-in-out hover:scale-110">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div id="items-sidebar" className="flex flex-col gap-7 text-white mt-5">
                        {items.map((item, index)=>(
                            <button
                                key={`item-sidebar-${index}`}
                                className="flex flex-col group items-center cursor-pointer p-2 "
                                onClick={() => handleClick(item.slug)}
                            >
                                <span 
                                    className={`
                                        ${toggle ? 'opacity-100' : 'opacity-0'}
                                        group-hover:scale-110 group-focus:scale-130
                                        transition-all delay-50 duration-300 ease-in-out
                                    `}
                                    
                                >
                                    {item.name}
                                </span>
                                <div className="flex flex-row w-0 opacity-0 group-hover:opacity-100 group-hover:w-1/4 transition-all delay-50 duration-400">
                                    <div className="h-1 bg-[#ffe500] w-1/4"></div>
                                    <div className="h-1 bg-[#14ae5c] w-1/4"></div>
                                    <div className="h-1 bg-[#e7191f] w-1/6"></div>
                                    <div className="h-1 bg-[#0019f8] w-1/6"></div>
                                    <div className="h-1 bg-[#e7191f] w-1/6"></div>
                                </div>
                            </button>
                        ))}
                    </div>
                    {/* SOCIAL MEDIA */}
                    <div className='w-full flex flex-row justify-center mt-30'>
                        <button className='relative p-0 rounded-full cursor-pointer flex items-center justify-center group'>
                            <span class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                        before:content-[''] before:absolute before:inset-[5px] before:rounded-full before:bg-[conic-gradient(from_0deg,#ffe500_0deg_90deg,#14ae5c_90deg_180deg,#e7191f_180deg_234deg,#0019f8_234deg_306deg,#e7191f_306deg_360deg)] before:blur-[10px]">
                            </span>
                            <img src={InstagramBlackIcon} alt="instagram_logo" className='invert scale-50 group-hover:scale-65 transition-transform duration-300' />
                        </button>
                        <button className='relative p-0 rounded-full cursor-pointer flex items-center justify-center group'>
                            <span class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                        before:content-[''] before:absolute before:inset-[5px] before:rounded-full before:bg-[conic-gradient(from_0deg,#ffe500_0deg_90deg,#14ae5c_90deg_180deg,#e7191f_180deg_234deg,#0019f8_234deg_306deg,#e7191f_306deg_360deg)] before:blur-[10px]">
                            </span>
                            <img src={FacebookBlackIcon} alt="facebook_logo" className='invert scale-50 group-hover:scale-65 transition-transform duration-300' /></button>
                    </div>
                </div>
                
            </div>
            <div className={`
                ${toggle ? 'opacity-100' : 'opacity-0'}
                flex flex-col h-full w-1
            `}>
                <div className="h-1 bg-[#ffe500] h-1/4"></div>
                <div className="h-1 bg-[#14ae5c] h-1/4"></div>
                <div className="h-1 bg-[#e7191f] h-1/6"></div>
                <div className="h-1 bg-[#0019f8] h-1/6"></div>
                <div className="h-1 bg-[#e7191f] h-1/6"></div>
            </div>
        </div>
    )
}