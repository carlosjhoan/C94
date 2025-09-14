import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useEffect } from "react"
import { CollectionCard } from "../../components/Collection"
// import config from "../../config"

const GET_MAIN_COLLECTIONS = gql`
    query MainCollections {
        collections {
            name,
            description,
            slug,
            featured_image {
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
            className="flex flex-wrap justify-center items-center m-4 gap-5"
        >
            {data && data.collections && data.collections.map((collection) => (
                <CollectionCard 
                    name={collection.name}
                    slug={collection.slug}
                    imageURL={collection.featured_image ? collection.featured_image[0].url : ''}
                    description={collection.description ? collection.description[0].children[0].text : 'No description'}
                    count={collection.tshirts ? collection.tshirts.length : 0}
                />
            ))}
        </div>
    )
}