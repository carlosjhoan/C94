import { useEffect, useRef, useState } from "react";
import config from "../../config"
import { tshirtFields } from "../../configuration";

export const JerseyCard = ({ jersey }) => {

    // Parámetros de cada lienzo
    // documentId: string,
    // is_available: boolean,
    // player: string,
    // team: string,
    // season: string,
    // price: number,
    // multimedia: [{
    //     url: string,
    // }]
    // sizes: [{
    //     size: string,
    //     in_stock: number
    // }]


    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const imgRefHover = useRef(null);
    const [inStockArray, setInStockArray] = useState([])
    const [byDeliveryArray, setByDeliveryArray] = useState([])
    const [unavailableArray, setUnavailableArray] = useState([])


    const [sizeSquare, setSizeSquare] = useState(false);
    const [sizeButton, setSizeButton] = useState(true);

    const openSizeSquare = () => {
        setSizeSquare(true);
        setSizeButton(false);
    }

    const closeSizeSquare = () => {
        setSizeSquare(false);
        setSizeButton(true);
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(()=>{
        const inStock = [];
        const byDelivery = [];
        const unavailable = [];
        const container = containerRef.current;
        const img = imgRef.current;
        const imgHover= imgRefHover.current;
        console.log("sizez: ", jersey.is_available)
        

        if (jersey.is_available) {
            if (Array.isArray(jersey.sizes) && jersey.sizes.length > 0){
                Array(jersey.sizes).forEach(item=>{
                    if(Array.isArray(item)) {
                        item.forEach(sizeItem => {
                            if (sizeItem.is_available) {
                                console.log("Por aquíiiiii")
                                if (sizeItem.in_stock > 0) {
                                    
                                    inStock.push(sizeItem.size)
                                    
                                } else {
                                    byDelivery.push(sizeItem.size);
                                }
                            } else {
                                unavailable.push(sizeItem.size)
                            }
                        })
                        
                    }
                    
                })
            }
        }

        setInStockArray(inStock);
        setByDeliveryArray(byDelivery);
        setUnavailableArray(unavailable);

        console.log("Jersey Info about sizes ", inStock, " ", byDelivery, " ", unavailable)
        
        if (!isHovering) return;

        const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % jersey[tshirtFields.images].length);
        }, 2000);

        return () => clearInterval(interval);
        
        // if (!container || !img) return;

        // const handleMouseMove = (e) => {
        //     const { left, top, width, height } = container.getBoundingClientRect();
        //     const x = (e.clientX + left) / width;
        //     const y = (e.clientY - top) / height;
        //     const moveX = -(x - 1.1) * 20;
        //     const moveY = -(y - 1) * 20;
            
        //     img.style.transform = `translate(${moveX*0.0}px, ${moveY*0.0}px)`;
        //     if (imgHover) {
        //         imgHover.style.transform = `translate(${moveX*0.0}px, ${moveY*0.0}px)`;
        //     }
        // };

        // const handleMouseLeave = () => {
        //     img.style.transform = 'scale(1)';
        //     if (imgHover) {
        //         imgHover.style.transform = 'scale(1)';
        //     }
        
        // };

        // container.addEventListener('mousemove', handleMouseMove);
        // container.addEventListener('mouseleave', handleMouseLeave);

        // return () => {
        //     container.removeEventListener('mousemove', handleMouseMove);
        //     container.removeEventListener('mouseleave', handleMouseLeave);
        // };

            // Reset on mouse leave
        //     document.getElementById('image-container').addEventListener('mouseleave', () => {
        //         const img = document.getElementById('zoom-image');
        //         img.style.transform = 'scale(1)';
        //     });
        // })

    }, [isHovering, jersey[tshirtFields.images].length])

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        console.log("Touch start: ", touch.clientX)
        setStartX(touch.clientX);
        setIsDragging(true);
    };
    const handleTouchMove = (e) => {
    if (!isDragging) return;
    
        const touch = e.touches[0];
        const currentX = touch.clientX;
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 30) { // Reduced threshold for better responsiveness
            if (diffX > 0) {
                setCurrentImageIndex(prev => (prev + 1) % jersey[tshirtFields.images].length);
            } else {
                setCurrentImageIndex(prev => (prev - 1 + jersey[tshirtFields.images].length) % jersey[tshirtFields.images].length);
            }
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };
        //  
    return (
        <div className="group/item flex flex-col w-75 bg-white rounded-t-full cursor-pointer shadow-lg hover:shadow-xl transition-all ease-in-out delay-50 duration-300">
            <div 
                ref={containerRef}
                id={`div-container-photo-${jersey.index}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative  overflow-hidden rounded-t-full w-auto h-75 image-container-photo active:cursor-grabbing"
            >
                {/* {jersey[tshirtFields.images].length > 1 && jersey[tshirtFields.images].map((image, index)=> (
                    <img ref={imgRef}   src={`${config.strapiApiUrl}${jersey[tshirtFields.images][0].url}`} alt={jersey[tshirtFields.team]} className={` scale-135 ${jersey[tshirtFields.images][1] ? '': 'hover:scale-170'} transition ease-in-out object-cover w-auto h-auto transition-opacity duration-400 delay-50  ${jersey[tshirtFields.images][1] ? 'group-hover/item:opacity-0' : ''} `} />
                ))} */}
                <img ref={imgRef}   src={`${config.strapiApiUrl}${jersey[tshirtFields.images][currentImageIndex].url}`} alt={jersey[tshirtFields.team]} className={` scale-135 ${jersey[tshirtFields.images][1] ? '': 'hover:scale-170'} transition ease-in-out object-cover w-auto h-auto transition-opacity duration-400 delay-50  ${jersey[tshirtFields.images][1] ? 'group-hover/item:opacity-0' : ''} `} />
                {jersey[tshirtFields.images][1] && (
                    <img ref={imgRefHover}   src={`${config.strapiApiUrl}${jersey[tshirtFields.images][1]?.url}`} alt={jersey[tshirtFields.team]} className="absolute scale-135 transition inset-0 ease-in-out object-cover w-auto h-auto opacity-2 z-0 transition-opacity duration-350  group-hover/item:opacity-100" />
                )}
                
            </div>
            
            {/* Información de la camiseta */}
            <div className="relative flex flex-col justify-between items-start gap-1 px-3 pt-3 pb-4 bg-card">
                {/* Pagination Dots */}
                <div className="block  md:hidden xs:block bottom-3 left-1/2 transform-translate-x-1/2 flex space-x-3">
                    {jersey[tshirtFields.images].length > 0 &&  jersey[tshirtFields.images].map((_, index) => (
                        <button
                            key={`dot-${index}-${jersey.player}-${jersey.team}`}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 border-2 ${
                                currentImageIndex === index
                                ? ' scale-110' 
                                : ' hover:bg-white hover:bg-opacity-50'
                            }`}
                            style={{
                                backgroundColor: currentImageIndex === index ? jersey.bg_color : 'transparent',
                                borderColor: jersey.bg_color ? jersey.bg_color : '#000000',
                            }}
                            aria-label={`View ${index === 0 ? 'front' : 'back'} of ${jersey.team} jersey`}
                            aria-current={currentImageIndex === index}
                        />
                    ))}
                </div>
                <span className="text-md font-bold text-gray-600">{jersey[tshirtFields.player]} / {jersey[tshirtFields.team]}</span>
                <span className="text-xs text_gray italic">{jersey[tshirtFields.variant]}</span>
                <span className="text-xs text_gray font-medium italic">{jersey[tshirtFields.season]}</span>
                <span className=" p-1 mt-1 bg-gray-300 text-gray-600 italic text-sm font-medium">
                    ${jersey.price}
                </span>
                {/* Botón de mostrar cuadro de tallas */}
                {sizeButton && (
                    <div className="group/size flex flex-col items-center gap-1 absolute bottom-3 right-2">
                        <span className="rounded-xs opacity-0 group-hover/size:opacity-100 transition-all delay-50 bg-gray-600 text-white p-1 text-sm">Tallas</span>
                        <button onClick={openSizeSquare} className="group/sizeBtn p-1 rounded-sm shadow-xs bg-gray-200 transition delay-50 duration-300 ease-in-out hover:bg-gray-300 hover:shadow-xl cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 group-hover/sizeBtn:size-5 transition-all ease-in-out duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                )}
                
                {/* Indicador de tallas */}
                {sizeSquare && (
                    <div className="absolute bg-wall bottom-1 right-3 pl-1 py-1 h-16 w-50 border flex flex-col justify-between items-start text-xs font-medium italic opacity-70 ">
                        <div>
                            <span className="text-[#14ae5c] font-bold">En stock : </span>
                            {inStockArray.length > 0 ? (
                                <>
                                    
                                    {inStockArray.map((item, index)=>(
                                        // 
                                        <>
                                            <span >{item} </span>
                                            {inStockArray.length > index + 1 && (
                                                <span>- </span>
                                            )}
                                        </>
                                        
                                        
                                    ))}
                                    
                                </>
                                
                            ):(
                                <span className="text-h6">AGOTADA</span>
                            )}
                            
                        </div>
                        <div>
                            <span className="text-[#0019f8] font-bold">Por encargo : </span>
                            {byDeliveryArray.length > 0 ? (
                                    <>
                                        
                                        {byDeliveryArray.map((item, index)=>(
                                            // 
                                            <>
                                                <span >{item} </span>
                                                {byDeliveryArray.length > index + 1 && (
                                                    <span>- </span>
                                                )}
                                            </>
                                            
                                            
                                        ))}
                                        
                                    </>
                                    
                                ):(
                                    <span className="text-h6">--------</span>
                                )}
                        </div>
                        
                        <div>
                            <span className="text-[#e7191f] font-bold">No disponible : </span>
                            {unavailableArray.length > 0 ? (
                                <>
                                    
                                    {unavailableArray.map((item, index)=>(
                                        // 
                                        <>
                                            <span >{item} </span>
                                            {unavailableArray.length > index + 1 && (
                                                <span>- </span>
                                            )}
                                        </>
                                        
                                        
                                    ))}
                                    
                                </>
                                
                            ):(
                                <span className="text-h6">------</span>
                            )}
                        </div>
                        
                        <div className="absolute top-1 right-1">
                            <button onClick={closeSizeSquare} className="p-1 rounded-full shadow-sm bg-gray-200 transition delay-50 duration-300 ease-in-out hover:bg-gray-300 hover:shadow-xl cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                    </div>
                )}
                
            </div>

            

            <div>
                    {/* Tallas disponibles */}
                    {/* <div
                        className="px-3 pb-1 bg-card flex flex-wrap justify-start items-center"
                    >
                        {jersey[tshirtFields.sizes].map((sizeOption, index) => (
                            // sizeOption.in_stock && (
                                <span key={index} className={`flex flex-row justify-center rounded-md border border-gray-400 min-w-5 min- px-1 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2 ${sizeOption.in_stock > 0 ? 'bg-green-200' : 'bg-red-200 line-through'}`}>
                                    {sizeOption.size}
                                </span>
                            // ) 
                            
                        ))}
                    </div> */}
            </div>

            <div className="relative w-full">
                <div className="absolute border-1 bg-transparent w-0 group-hover/item:bg-black group-hover/item:w-full h-2 transition-all ease-in-out duration-400 delay-150"></div>
                <div  className="absolute w-full group-hover/item:w-0  flex transition-all ease-in-out duration-200 delay-150">
                    <div className="h-2 bg-[#ffe500] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/4"></div>
                    <div className="h-2 bg-[#14ae5c] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/4"></div>
                    <div className="h-2 bg-[#e7191f] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/6"></div>
                    <div className="h-2 bg-[#0019f8] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/6"></div>
                    <div className="h-2 bg-[#e7191f] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/6"></div>
                </div>
            </div>
            {/* <button className="w-full bg-black py-3 text-white cursor-pointer hover:bg-gray-800">Me pongo esta!</button> */}
        </div>
    );
}