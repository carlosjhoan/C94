import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { JerseyCard } from "../../components/Tshirt"
import { SideFilter } from "../../components/Layout"

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
                in_stock,
                is_available
            },
            is_available,
            bg_color,
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
        <div className="min-h-screen bg-wall">
            <section 
                    className={`relative h-50 bg-center bg-cover `}
                    // style={backgroundStyle}
                >
                    <div className="absolute inset-0 bg-black opacity-30 hover:opacity-40 "></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-gray-100 backdrop-blur-xs">
                        <div className="max-w-2xl ">
                            <h1 className="text-5xl font-bold mb-4">Catálogo</h1>
                            <p className="text-xl opacity-90 leading-relaxed">A ver hoy cómo quién quiero verme!!</p>
                        </div>
                    </div>
                </section>
            <div
                className="flex flex-row items-start gap-6 p-0 w-full mx-auto"
            >
                {/* Side filter will go here */}
                <SideFilter />

                <div
                    className="flex flex-wrap justify-center items-center gap-10 max-w-7xl mx-auto p-6"
                >
                    {data && data.tshirts && data.tshirts.map((item) => (
                        <JerseyCard
                            jersey={item}
                        />
                    ))}
                </div>
            </div>
            

        </div>
        
    )

}