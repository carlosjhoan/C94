import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { JerseyCard } from "../../components/Tshirt"

const GET_CATALOGUE_ITEMS = gql`
    query CatalogueItems {
        tshirts {
            documentId
            is_available,
            player,
            team,
            price,
            season,
            variant,
            multimedia {
                url
            },
            sizes {
                size,
                in_stock
            },
        }
    }
`

export const Catalogue = () => {

    const { data, loading, error } = useQuery(GET_CATALOGUE_ITEMS); 
    
    useEffect(() => {
        document.title = "Catalogo - C94";
        console.log("Página de Catálogo cargada");
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
        <div
            className="flex flex-wrap justify-center items-center gap-10 w-auto p-6 bg-wall"
        >
            {data && data.tshirts && data.tshirts.map((item) => (
                <JerseyCard
                    jersey={item}
                />
            ))}
        </div>
    )

}