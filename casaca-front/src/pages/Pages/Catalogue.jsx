import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { JerseyCard, TshirtBuyInfo } from "../../components/Tshirt";
import { SideFilter } from "../../components/Layout";
import { Banner } from "../../components/UI";
import { useFilter } from "../../context/useFilter";
import { verifyInStock } from "../../utils";

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
            collection {
                name
            }
        }
    }
`
export const Catalogue = () => {
    const { data, loading, error } = useQuery(GET_CATALOGUE_ITEMS);

    const { filters, updateFilter } = useFilter();
    
    useEffect(() => {
        document.title = "Catálogo - C94";
        updateFilter('inStockOnly', false);
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
            <Banner
                head={"Catálogo"}
                description={"A ver hoy cómo quién quiero verme!!"}
            />
            <div
                className="flex flex-row items-start gap-6 p-0 w-full mx-auto"
            >
                {/* Side filter will go here */}
                <SideFilter optValue={'catalogo'} />
                {/* Catalogue items will go here */}
                <div
                    className="flex flex-wrap justify-center items-center gap-10 max-w-7xl mx-auto p-6 w-full"
                >
                    {data && Array(data.tshirts)  && data.tshirts.map((item) => (
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