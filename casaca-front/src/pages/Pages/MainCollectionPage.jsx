import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { CollectionCard } from "../../components/Collection"
import { collectionFields } from "../../configuration"

const GET_MAIN_COLLECTIONS = gql`
    query MainCollections {
        collections {
            name,
            description,
            documentId,
            multimedia {
                url
            },
            tshirts {
                documentId
            }
        }
    }
`

export const MainCollectionPage = () => {

    //const [mainCollections, setMainCollections] = useState([])
    const { data, loading, error } = useQuery(GET_MAIN_COLLECTIONS);


    useEffect(() => {
        document.title = "Collections - C94";
        console.log("Página de Colecciones cargada");
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
            className="
            flex flex-wrap 
            justify-center items-center 
            p-6
            gap-5
            bg-wall
        "
        >
            {data && data.collections && data.collections.map((collection) => (
                <CollectionCard 
                    name={collection[collectionFields.name]}
                    id={collection[collectionFields.id]}
                    imageURL={collection[collectionFields.images] ? collection[collectionFields.images][0].url : ''}
                    description={collection[collectionFields.description] ? collection[collectionFields.description] : 'No description'}
                    count={collection[collectionFields.tshirts] ? collection[collectionFields.tshirts].length : 0}
                />
            ))}
        </div>
    )
}