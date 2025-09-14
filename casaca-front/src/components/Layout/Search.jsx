


export const Search = ({closeSearch, toggle})=>{

    return(
        <div id="searchOverlay" className={`
            fixed inset-0 
            backdrop-blur-sm
            ${toggle ? 'opacity-100' : 'opacity-0'}
            ${toggle ? 'max-w-full w-full' : 'max-w-0 w-0'}
            transition-all delay-50 duration-300 ease-in-out
            ${toggle ? 'z-50': '-z-1'}
        `}>
            <div class=" mt-0  w-full">
                <div class="flex bg-black px-7 py-5 w-full justify-center items-center gap-1">
                    <div class="relative w-full md:w-3/4 flex justify-center text-white">
                        <input
                            type="text" 
                            placeholder="Buscar..." 
                            className="
                                w-full p-4 pl-12 
                                rounded-lg 
                                border
                                border-t-2 border-t-[#ffe500]
                                border-r-2 border-r-[#0019f8]
                                border-b-2 border-b-[#14ae5c]
                                border-l-2 border-l-[#e7191f]
                                focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-3 top-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button onClick={closeSearch} id="closeSearch" className="p-2 rounded-full transition delay-50  ease-in-out hover:bg-gray-700 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white transition-scale delay-50 duration-100 ease-in-out hover:scale-110">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}