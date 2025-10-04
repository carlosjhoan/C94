import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { JerseyCard } from "../Tshirt"
import { useParams } from "react-router-dom"
import config from "../../config"
import { SideFilter } from "../Layout"

const GET_ANY_COLLECTION = gql`
    query AnyCollection($documentId: ID!) {
        collection(documentId: $documentId) {
            name,
            description,
            banner_image {
                url
            },
            tshirts {
                documentId,
                player,
                team,
                variant,
                price,
                multimedia {
                    url
                },
                season,
                sizes {
                    size,
                    in_stock,
                    is_available
                },
                is_available,
                bg_color,
            }
        }
    }
`


export const AnyCollection = () => {
    
    let { collectionId } = useParams();
    
    const { loading, error, data } = useQuery(GET_ANY_COLLECTION, {
        variables: {
            documentId: collectionId // This matches the variable name `$documentId`
        },
        skip: !collectionId,
    });

    const backgroundStyle = {
        backgroundImage: `url('${config.strapiApiUrl}${data && data.collection.banner_image[0] ? data.collection.banner_image[0].url : ''}')`,
    };

    useEffect(() => {
        document.title = `Colección - ${data ? data.collection.name : ''}`;
        console.log("Página de Colecciones cargada");
        if (data) {
            console.log("Datos extraídos con éxito", data.collection.tshirts);
        } else {
            console.log("Ningún dato disponible");
        }
        if (error) {
            console.error("Error fetching collections:", error);
        }

    }, [data, error, loading])
    
    return (
        // <div
        //     className="flex flex-wrap justify-center items-center gap-10 w-auto p-6 bg-wall"
        // >
        <div className="min-h-screen bg-wall">
            
            {data && (
                <section 
                    className={`relative h-50 bg-center bg-cover `}
                    style={backgroundStyle}
                >
                    <div className="absolute inset-0 bg-black opacity-30 hover:opacity-40 "></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-gray-100 backdrop-blur-xs">
                        <div className="max-w-2xl ">
                            <h1 className="text-5xl font-bold mb-4">{data.collection.name}</h1>
                            <p className="text-xl opacity-90 leading-relaxed">{data.collection.description}</p>
                        </div>
                    </div>
                </section>
            )}
            <div
                className="flex flex-row items-start gap-6 p-0 w-full mx-auto"
            >
                <SideFilter />
                <div className="flex flex-wrap justify-center items-start gap-6 p-6 max-w-7xl mx-auto">
                    {data && Array(data.collection.tshirts) && data.collection.tshirts.map((item) => (
                        <JerseyCard
                            jersey={item}
                        />
                    ))}
                </div>
            </div>
            
            
        </div>
    )
}