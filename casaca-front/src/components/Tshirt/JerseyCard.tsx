import { useEffect, useRef } from "react";
import config from "../../config"

export const JerseyCard = ({ jersey }) => {

    // Parámetros de cada lienzo
    // documentId: string,
    // is_available: boolean,
    // player: string,
    // team: string,
    // season: string,
    // price: number,
    // images: [{
    //     url: string,
    // }]
    // size_options: [{
    //     size: string,
    //  in_stock: boolean
    // }]


    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const imgRefHover = useRef(null);

    useEffect(()=>{
        const container = containerRef.current;
        const img = imgRef.current;
        const imgHover= imgRefHover.current;
        
        
        if (!container || !img) return;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX + left) / width;
            const y = (e.clientY - top) / height;
            const moveX = -(x - 1.1) * 20;
            const moveY = -(y - 1) * 20;
            console.log("Move in x: ", x)
            
            img.style.transform = `translate(${moveX*0.0}px, ${moveY*2.5}px)`;
            if (imgHover) {
                imgHover.style.transform = `translate(${moveX*0.0}px, ${moveY*1.7}px)`;
            }
        };

        const handleMouseLeave = () => {
            img.style.transform = 'scale(1)';
            if (imgHover) {
                imgHover.style.transform = 'scale(1)';
            }
        
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };

            // Reset on mouse leave
        //     document.getElementById('image-container').addEventListener('mouseleave', () => {
        //         const img = document.getElementById('zoom-image');
        //         img.style.transform = 'scale(1)';
        //     });
        // })

    }, [])
    //  
    return (
        <div className="group/item flex flex-col w-60 bg-white rounded-t-full cursor-pointer shadow-md hover:shadow-xl transition-all ease-in-out delay-50 duration-300">
            <div ref={containerRef} id={`div-container-photo-${jersey.index}`} className="relative overflow-hidden rounded-t-full w-auto h-60 image-container-photo">
                <img ref={imgRef}   src={`${config.strapiApiUrl}${jersey.images[0].url}`} alt={jersey.team} className={` scale-135 ${jersey.images[1] ? '': 'hover:scale-170'} transition ease-in-out object-fill w-auto h-auto transition-opacity duration-500 delay-30 ${jersey.images[1] ? 'group-hover/item:opacity-0' : ''} `} />
                {jersey.images[1] && (
                    <img ref={imgRefHover}   src={`${config.strapiApiUrl}${jersey.images[1]?.url}`} alt={jersey.team} className="absolute  scale-145 hover:scale-170 transition ease-in-out object-cover inset-0 w-auto h-auto opacity-2 z-0 transition-opacity duration-600 delay-60 group-hover/item:opacity-100" />
                )
                }
                
            </div>
            <div className=" w-auto flex flex-row justify-end px-1 items-center">
                <div className="relative py-1 bg-transparent flex flex-row justify-center">
                    <div className="absolute mt-1 bg-transparent group-hover/item:bg-black w-0 group-hover/item:w-full group-hover/item:bg-black transition-all ease-in-out duration-400 delay-50 h-6"></div>
                    <span className=" z-2 p-1 text-gray-500 md:text-gray-300 italic  group-hover/item:text-white font-medium transition-all ease-in-out duration-400 delay-150">
                        ${jersey.price}
                    </span>
                </div>
            </div>
            
            <div className="flex flex-col justify-between items-center gap-1 pt-0 pb-6 ">
                <span className="text-lg font-bold">{jersey.player}</span>
                <span className="text-md text-black">{jersey.team}</span>
                <span className="text-sm font-bold">{jersey.season}</span>
                <span className="text-xs text_gray italic">{jersey.variant}</span>
                {/* <span className="text-lg font-bold">${jersey.price}</span> */}
            </div>

            <div>
                    {/* <span>Tallas disponibles: </span> */}
                    <div
                        className="px-3 pb-3 flex flex-wrap justify-start items-center"
                    >
                        {jersey.size_options.map((sizeOption, index) => (
                            // sizeOption.in_stock && (
                                <span key={index} className={`flex flex-row justify-center rounded-md border border-gray-400 min-w-5 min- px-1 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2 ${sizeOption.in_stock ? 'bg-green-200' : 'bg-red-200 line-through'}`}>
                                    {sizeOption.size}
                                </span>
                            // ) 
                            
                        ))}
                    </div>
            </div>

            <div className="relative w-full">
                <div className="absolute border-1 bg-transparent w-0 group-hover/item:bg-black group-hover/item:w-full h-2 transition-all ease-in-out duration-400 delay-150"></div>
                <div  className="absolute w-full group-hover/item:w-0  flex transition-all ease-in-out duration-200 delay-150">
                    <div className="h-2 bg-[#ffe500] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150  w-1/4"></div>
                    <div className="h-2 bg-[#14ae5c] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/4"></div>
                    <div className="h-2 bg-[#e7191f] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/6"></div>
                    <div className="h-2 bg-[#0019f8] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/6"></div>
                    <div className="h-2 bg-[#e7191f] group-hover/item:bg-transparent transition-all ease-in-out duration-400 delay-150 w-1/6"></div>
                </div>
            </div>
            {/* <div className="flex flex-row h-2 border-solid border-1 hover:bg-black">
                <div className="w-1/5 bg-black group-hover:bg-white h-auto"></div>
                <div className="w-1/5 h-auto"></div>
                <div className="w-1/5 bg-black h-auto"></div>
                <div className="w-1/5 h-auto"></div>
                <div className="w-1/5 bg-black h-auto"></div>
            </div> */}
            {/* <button className="w-full bg-black py-3 text-white cursor-pointer hover:bg-gray-800">Me pongo esta!</button> */}
        </div>
    );
}