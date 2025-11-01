import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useFilter } from "../../context/useFilter";

const GET_ALL_COLLECTIONS = gql`
    query AllCollections {
        collections {
            documentId,
            name
        }
    }
`

export const SideFilter = ({optValue})=>{
    const navigate = useNavigate();

    const { filters, updateFilter } = useFilter();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [openCollections, setOpenCollections] = useState(true);

    const goToAnyCollection = (collectionId) => {
        navigate(`/colecciones/${collectionId}`);

        if (window.innerWidth < 768) {
            setIsMobileOpen(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsMobileOpen(false);
        }
    };

    const { data, loading, error } = useQuery(GET_ALL_COLLECTIONS);

    
    const toggleCollections = () => {
        setOpenCollections(!openCollections);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMobileOpen) {
                setIsMobileOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileOpen]);

    useEffect(() => {
        setSelectedCollection(optValue);
        console.log("Filtro lateral cargado");
        if (data) {
            console.log("Datos extraídos con éxito");
        } else {
            console.log("Ningún dato disponible");
        }
        if (error) {
            console.error("Error fetching collections:", error);
        }

    }, [data, error, loading, optValue])

    return (
        <>
            {/* Mobile Filter Trigger Button */}
            <div className={`
                md:hidden
                fixed
                ${!isMobileOpen ? 'bottom-6 right-5' : 'bottom-6 left-5'}
                z-40
            `}>
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="
                        bg-black
                        text-gray-100
                        p-4 rounded-full shadow-lg
                        hover:bg-gray-700 active:bg-gray-800 transition-all duration-200
                        flex items-center justify-center
                        cursor-pointer"
                    aria-label="Abrir filtros"
                >
                    {/* Filter Icon */}
                    {!isMobileOpen ? (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" 
                            />
                        </svg>
                    ) : (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div 
                    className="md:hidden fixed inset-0 backdrop-blur-sm bg-opacity-50 z-30 transition-opacity duration-300"
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />
            )}
            {/* <aside
                className=" w-1/5 px-0 min-h-screen bg-gray-100"
            > */}
            <aside
                className={`
                    fixed md:relative  md:top-0 top-24 left-0 z-30
                    h-screen md:h-auto md:min-h-screen
                    w-full sm:w-1/2 md:w-1/2 lg:w-1/4
                    bg-white md:bg-gray-100
                    shadow-xl md:shadow-none
                    transform transition-transform duration-300 ease-in-out
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    overflow-y-auto md:overflow-visible
                `}
            >
                <h2 className="text-xl font-bold pt-4 pb-2 px-2 border-b border-gray-300">
                    Filtros
                </h2>
                {/* In Stock Filter */}
                <div className="mt-4 mb-2 border-b  border-gray-300">
                    <div className="flex flex-row items-center justify-between px-4">
                        <h3 className="text-lg font-semibold">Disponibilidad</h3>
                    </div>
                    <div className="flex flex-col gap-2 px-2 mt-2">
                    <label className="flex flex-row items-center gap-2 cursor-pointer pb-3 px-6">
                        <input
                            type="checkbox"
                            checked={filters.inStockOnly}
                            onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                            className="cursor-pointer"
                        />
                        Entrega inmediata
                    </label>
                    </div>
                </div>
                {/* Catalogo Filter */}
                <label key={"label-catalogo"} className="flex flex-row items-center gap-2 border-b  border-gray-300 px-4 pb-3">
                    <input
                        type="radio" 
                        name="collection-filter" // ← Same name for all
                        value="catalogo" // ← Unique value
                        checked={selectedCollection === 'catalogo'}
                        onChange={(e) => {
                            setSelectedCollection(e.target.value);
                            navigate('/catalogo');
                        }}
                        className="cursor-pointer"
                        
                    />
                    <h3 className="text-lg font-semibold mt-2 mb-2">Catálogo</h3>
                </label>
                {/* Collections Filter */}
                <div>
                    <div
                        className={`px-4 border-b  border-gray-300 mb-2 flex flex-row items-center justify-between hover:bg-gray-200 active:bg-gray-300  transition duration-200 ease-in-out cursor-pointer ${loading ? 'animate-pulse' : ''}`}
                        onClick={toggleCollections}
                    >
                        {/* <h2 className="text-lg font-semibold mt-4 mb-2">Colecciones</h2> */}
                        <h3 className="text-lg font-semibold mt-2 mb-2">Colecciones</h3>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`
                                size-5 transition-transform duration-300 ease-in-out ${
                                openCollections ? 'rotate-180' : 'rotate-0'
                            }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>

                    </div>
                    
                    {/* <div className={`
                        flex flex-col gap-2 px-2 mb-4
                        ${openCollections ? ' max-h-96 border-b pb-2' : 'h-0 overflow-hidden border-none'}
                        transition-all duration-300 ease-in-out
                    `}> */}
                    <div className={`
                        grid gap-2 px-4 mb-4 pb-3
                        ${openCollections ? 'grid-rows-[1fr] border-b border-gray-400' : 'grid-rows-[0fr] border-none'}
                        transition-all duration-500 ease-out
                    `}>
                        <div className="overflow-hidden">
                            <div className="flex flex-col gap-2 px-2 mb-0">
                        {data && data.collections && data.collections.map((collection)=>(
                            <label key={`label-collection-${collection.documentId}`} className={`flex flex-row items-center gap-2 transition duration-400 ease-in-out ${openCollections ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                                <input 
                                    type="radio" 
                                    name="collection-filter" // ← Same name for all
                                    value={collection.documentId} // ← Unique value
                                    className="cursor-pointer"
                                    checked={selectedCollection === collection.documentId}
                                    onChange={(e) => {
                                        setSelectedCollection(e.target.value);
                                        goToAnyCollection(collection.documentId);
                                    }}
                                />
                                {collection.name}
                            </label>
                        ))}
                        </div>
                        </div>
                    </div>
                    {/* <p>HOLA</p> */}
                </div>
            </aside>
        </>
    )
}