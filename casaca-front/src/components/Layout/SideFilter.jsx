import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

const GET_ALL_COLLECTIONS = gql`
    query AllCollections {
        collections {
            documentId,
            name
        }
    }
`

export const SideFilter = ()=>{
    const navigate = useNavigate();

    const goToAnyCollection = (collectionId) => {
        navigate(`/colecciones/${collectionId}`);
    };

    const { data, loading, error } = useQuery(GET_ALL_COLLECTIONS);
    
    
        useEffect(() => {
            console.log("Filtro lateral cargado");
            if (data) {
                console.log("Datos extraídos con éxito");
            } else {
                console.log("Ningún dato disponible");
            }
            if (error) {
                console.error("Error fetching collections:", error);
            }
    
        }, [data, error, loading])

    return (
        <>
            <aside
                className=" w-1/5 p-2 min-h-screen bg-gray-100"
            >
                <label className="flex flex-row items-center gap-2">
                    <input 
                        type="radio" 
                        name="collection-filter" // ← Same name for all
                        value="catalog" // ← Unique value
                        className="cursor-pointer"
                        onClick={() => navigate('/catalogo')}
                    />
                    Catálogo
                </label>
                <div>
                    <span>Colecciones</span>
                    <div>
                        {data && data.collections && data.collections.map((collection)=>(
                            <label key={collection.documentId} className="flex flex-row items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="collection-filter" // ← Same name for all
                                    value={collection.documentId} // ← Unique value
                                    className="cursor-pointer"
                                    onClick={() => goToAnyCollection(collection.documentId)}
                                />
                                {collection.name}
                            </label>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}