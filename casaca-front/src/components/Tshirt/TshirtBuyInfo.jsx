import { useNavigate } from 'react-router-dom';
import { JerseyCard } from "../Tshirt";

export const TshirtBuyInfo = ({ jersey }) => {
    const navigate = useNavigate();

    const goToAnyTshirt = (tshirtId, collection, player, team, season) => {
        navigate(`/lienzo/${collection}/${player}/${team}/${season}/${tshirtId}`);
    };
    
    return (
        <div
            onClick={()=>goToAnyTshirt(jersey.documentId, jersey.collection.name, jersey.player, jersey.team, jersey.season)}
        >
            <JerseyCard
                jersey={jersey}
            />
        </div>
    )
}