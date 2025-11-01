import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { TshirtBuyInfo } from "../Tshirt";
import { useParams } from "react-router-dom";
import { SideFilter } from "../Layout";
import { Banner } from "../UI";
import { useFilter } from "../../context/useFilter";
import { verifyInStock } from "../../utils";

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
                is_available,
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
                bg_color,
                collection {
                    name
                }
            }
        }
    }
`


export const AnyCollection = () => {
    let { collectionId } = useParams();

    const { filters, updateFilter } = useFilter();
    
    const { loading, error, data } = useQuery(GET_ANY_COLLECTION, {
        variables: {
            documentId: collectionId // This matches the variable name `$documentId`
        },
        skip: !collectionId,
    });

    useEffect(() => {
        document.title = `Colección - ${data ? data.collection.name : ''}`;
        updateFilter('inStockOnly', false);
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
        <div className="min-h-screen bg-wall">
            
            {data &&  (
                <Banner
                    bannerImageUrl={data.collection.banner_image && data.collection.banner_image[0] ? data.collection.banner_image[0].url : ''}
                    head={data.collection.name}
                    description={data.collection.description}
                />
            )}
            <div
                className="flex flex-row items-start gap-6 p-0 w-full mx-auto"
            >
                {/* Side filter will go here */}
                <SideFilter optValue={collectionId} />
                <div className="flex flex-wrap justify-center items-start gap-6 p-6 max-w-7xl mx-auto w-full">
                    {data && Array(data.collection.tshirts) && data.collection.tshirts.map((item) => (
                        item.is_available && (
                            filters.inStockOnly ? (
                                verifyInStock(item.sizes) && (
                                    <TshirtBuyInfo
                                        jersey={item}
                                    />
                                )
                            ) : (
                                <TshirtBuyInfo
                                    jersey={item}
                                />
                            )
                        )
                    ))}
                </div>
            </div>
            
            
        </div>
    )
}