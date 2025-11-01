import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config"
import { StarRating } from "../UI";

const GET_TSHIRT_INFO = gql`
    query TshirtInfo($documentId: ID!) {
        tshirt(documentId: $documentId) {
            player,
            team,
            price,
            season,
            variant,
            story,
            details,
            seals,
            rating,
            model_images {
                url
            },
            sizes {
                size,
                in_stock,
                is_available
            },
        }
    }
`

export const JerseyBuy = () => {
    let { tshirtId } = useParams();

    const { loading, error, data } = useQuery(GET_TSHIRT_INFO, {
        variables: {
            documentId: tshirtId // This matches the variable name `$documentId`
        },
        skip: !tshirtId,
    });

    const [heroImageURL, setheroImageURL] = useState('');
    const [selectedThumbId, setSelectedThumbId] = useState('');

    const getBackgroundStyle = (imageUrl)=> {
        return {
            backgroundImage: `url('${imageUrl ? `${config.strapiApiUrl}${imageUrl}` : ""}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            
        }
    };

    const selectThumbnail = (index, url) => {
        console.log("Seleccionando miniatura:", index, url);
        setheroImageURL(url);
        const thumbElement = document.getElementById(`shirt-${index}`);
        const firstChild = thumbElement.children[0];
        if (firstChild) {
            console.log("Aplicando opacidad al primer hijo de la miniatura seleccionada", firstChild);
            firstChild.classList.add('opacity-5');
            firstChild.classList.remove('opacity-15');
        }
        if (thumbElement) {
            console.log("Aplicando estilos a la miniatura seleccionada");
            thumbElement.classList.add('border-2', 'scale-105');
        }

        if (selectedThumbId && selectedThumbId !== `shirt-${index}`) {
            const previousThumbElement = document.getElementById(selectedThumbId);
            if (previousThumbElement) {
                previousThumbElement.classList.remove('border-2', 'scale-105');
                const prevFirstChild = previousThumbElement.children[0];
                if (prevFirstChild) {
                    prevFirstChild.classList.remove('opacity-5');
                    prevFirstChild.classList.add('opacity-15');
                }
            }
        }
        setSelectedThumbId(`shirt-${index}`);
    }

    // function createStarRating(rating) {
    //     const container = document.querySelector('.star-rating');
    //     const stars = Math.floor(rating); // Full stars
    //     const partial = rating - stars; // Partial star percentage
        
    //     let starsHTML = '<div class="stars">';
        
    //     // Full stars
    //     for (let i = 0; i < stars; i++) {
    //         starsHTML += '<span class="star full">★</span>';
    //     }
        
    //     // Partial star
    //     if (partial > 0) {
    //         starsHTML += `<span class="star partial" style="--fill:${partial * 100}%">★</span>`;
    //     }
        
    //     // Empty stars
    //     const emptyStars = 5 - Math.ceil(rating);
    //     for (let i = 0; i < emptyStars; i++) {
    //         starsHTML += '<span class="star empty">★</span>';
    //     }
        
    //     starsHTML += `</div><span class="rating-text">${rating}/5</span>`;
    //     container.innerHTML = starsHTML;
    // }

    useEffect(() => {
        
        console.log("Sesión de camiseta para comprar");
        if (data) {
            console.log("Datos extraídos con éxito");
            document.title = (data.tshirt.player && data.tshirt.team && data.tshirt.season) ? `${data.tshirt.player}/${data.tshirt.team}/${data.tshirt.season}`: 'Camiseta';
            if (data.tshirt.model_images && data.tshirt.model_images.length > 0) {
                setheroImageURL(data.tshirt.model_images[0].url);
                selectThumbnail(0, data.tshirt.model_images[0].url);
            }
            console.log("Datos de la camiseta:", data.tshirt);
        } else {
            console.log("Ningún dato disponible");
        }
        if (error) {
            console.error("Error fetching collections:", error);
        }

    }, [data, error, loading])

    return(
        <div
            className="min-h-screen bg-wall p-6 flex flex-col gap-10"
        >
            {/* Images - Info - Call-To-Action */}
            <div
                className="flex flex-row gap-8"
            >
                {/* Images Section */}
                <div
                    className="flex flex-row gap-2  h-130 p-4"
                >
                    {/* Thumbnails */}
                    <div
                        className="flex flex-col justify-start gap-1 h-full mt-2"
                    >
                    {data && Array.isArray(data.tshirt.model_images) && data.tshirt.model_images.map((item, index)=>(
                        <div id={`shirt-${index}`} className="relative aspect-square w-17 border-1 hover:border-2 hover:scale-105  transition-transform duration-100 cursor-pointer ">
                            <div className="absolute inset-0 bg-black opacity-15 hover:opacity-5" onMouseEnter={()=>selectThumbnail(index, item.url)}></div>
                            <img
                                src={item.url ? `${config.strapiApiUrl}${item.url}` : ''}
                                alt={`${data.tshirt.player ? data.tshirt.player : 'player'}/${data.tshirt.team}/${data.tshirt.season}`}
                                className="h-full w-full object-center transition-transform duration-300 cursor-pointer hover:border-2 hover:border-black"
                            />
                        </div>
                    ))}
                    </div>
                    {/* Main Image */}
                    {/* <div
                        className={`relative aspect-square w-120 border-2 rounded-lg shadow-lg`}
                        style={getBackgroundStyle(heroImageURL)}
                    > */}
                    <div className="h-130 w-120 ">
                        <img
                            src={heroImageURL ? `${config.strapiApiUrl}${heroImageURL}` : ''}
                            alt={`${data && data.tshirt.player ? data.tshirt.player : 'player'}/${data && data.tshirt.team}/${data && data.tshirt.season}`}
                            className="h-full w-auto object-center"
                        />
                    </div>
                </div>
                {/* Info Section */}
                <div>
                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold">
                            {data ? `${data.tshirt.player} / ${data.tshirt.team} / ${data.tshirt.season} / ${data.tshirt.variant}` : 'Cargando...'}
                        </h1>
                    </div>
                    {/* Rating */
                    <div>
                        <StarRating rating={data ? data.tshirt.rating : 3} />
                    </div>}
                    {/* Price */}
                    <div></div>
                    {/* Size Options */}
                    <div></div>
                    {/* Quantity Selector */}
                    <div></div>
                    {/* Call-To-Action Buttons */}
                    <div></div>
                </div>
            </div>
            {/* Story Section - Authenticity */}
            <div>
                {/* Story */}
                <div></div>
                {/* Authenticity */}
                <div></div>
            </div>
            {/* Trust Badges */}
            <div></div>
            {/* Reviews Section */}
            <div></div>
        </div>
    )
};