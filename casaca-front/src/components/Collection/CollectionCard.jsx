import config from "../../config"
import { useNavigate } from 'react-router-dom';

export const CollectionCard = ({name, id, imageURL, description, count}) => {
    const navigate = useNavigate();
    
    const backgroundStyle = {
        backgroundImage: `url('${config.strapiApiUrl}${imageURL}')`
    };

    const consoleSlug = (str)=>{
        console.log(str);
    }

    const goToAnyCollection = (collectionId) => {
        navigate(`/colecciones/${collectionId}`);
    };

    
    return (
        <div
            className="
                bg-cover bg-center
                h-80 w-60
                rounded-lg
                shadow-lg
                flex flex-col justify-end
                p-0
                text-white
                hover:scale-105 hover:shadow-2xl
                transition-transform duration-300 ease-in-out
                cursor-pointer
                relative
                overflow-hidden
            "
            style={backgroundStyle}
            
        >   
            <div className="absolute inset-0 bg-black opacity-15 hover:opacity-40" onClick={() => goToAnyCollection(id)}></div>
            <div
                className="relative z-0 p-4 text-white"
            >
                <h3 className="text-lg font-bold">{name}</h3>
                {/* <span className="text-sm">{description}</span> */}
                <span className="text-xs">{count} {count ===1 ? 'lienzo' : 'lienzos'}</span>
            </div>
        </div>
    )
}