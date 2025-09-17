import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { JerseyCard } from "../Tshirt"
import { useParams } from "react-router-dom"

const GET_ANY_COLLECTION = gql`
    query AnyCollection($documentId: ID!) {
        collection(documentId: $documentId) {
            name,
            description,
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
                    in_stock
                },
                is_available
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
        <div
            className="flex flex-wrap justify-center items-center gap-10 w-auto p-6 bg-wall"
        >
            {data && Array(data.collection.tshirts) && data.collection.tshirts.map((item) => (
                <JerseyCard
                    jersey={item}
                />
            ))}
        </div>
    )
}