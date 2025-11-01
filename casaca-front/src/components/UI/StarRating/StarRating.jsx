import  './StarRating.modules.css';

export const StarRating = ({ rating = 4.0 }) => { 
    const validRating = Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(validRating);
    const hasPartialStar = validRating % 1 !== 0;
    const partialPercentage = (validRating - fullStars) * 100;
    const emptyStarsCount = Math.max(0, 5 - Math.ceil(validRating));

    const Star = ({ filled, percentage = 100 }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" className="inline">
            <defs>
                <linearGradient id={`grad-${percentage}`}>
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset={`${percentage}%`} stopColor="#fbbf24" />
                    <stop offset={`${percentage}%`} stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
            </defs>
            <path 
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? 
                    (percentage < 100 ? `url(#grad-${percentage})` : '#fbbf24') : 
                    '#d1d5db'
                }
            />
        </svg>
    );

    return(
        <div className="flex items-center gap-2">
            <div className="flex">
                {Array.from({ length: fullStars }, (_, i) => (
                    //<span key={`full-${i}`} className="text-yellow-400 text-xl">★</span>
                    <Star key={`full-${i}`} filled={true} />
                ))}
                
                {hasPartialStar && (
                // <span 
                //     className="text-xl"
                //     style={{
                //         background: `linear-gradient(90deg, #fbbf24 0% ${partialPercentage}%, #d1d5db ${partialPercentage}% 100%)`,
                //         WebkitBackgroundClip: 'text',
                //         WebkitTextFillColor: 'transparent'
                //     }}
                // >
                //     ★
                // </span>
                    // <span 
                    //         className="text-xl relative"
                    // >
                    //     {/* Yellow part */}
                    //     <span 
                    //         className="absolute top-0 left-0 overflow-hidden z-10 text-yellow-400"
                    //         style={{ width: '80%' }}
                    //     >
                    //         ★
                    //     </span>
                    //     {/* Gray part */}
                    //     <span className="text-gray-300">★</span>
                    // </span>
                    <Star key="partial" filled={true} percentage={partialPercentage} />
                )}
                
                {Array.from({ length: emptyStarsCount }, (_, i) => (
                    <Star key={`empty-${i}`} filled={false}  />
                ))}
            </div>
            <span className="text-sm text-gray-600">{validRating.toFixed(1)}/5</span>
        </div>
    );

    // return (
    //     <div className='starRating'>
    //         <div className='stars'>
    //             {Array.from({ length: fullStars }, (_, i) => (
    //                 <span key={`full-${i}`} className="text-yellow-400 text-xl">★</span>
    //             ))}
                
    //             {partialPercentage > 0 && (
    //             <span 
    //                 className='star partial'
    //                 style={{ '--fill': `${partialPercentage}%` }}
    //             >
    //                 ★
    //             </span>
    //             )}
                
    //             {/* {Array.from({length : 5 - Math.ceil(rating) }, (_, i) => (
    //             <span key={i} className='star'>★</span>
    //             ))} */}
    //             {Array.from({ length: emptyStarsCount }, (_, i) => (
    //             <span key={`empty-${i}`} className='star'>★</span>
    //             ))}
    //         </div>
    //         <span className="text-sm text-gray-600">{validRating}/5</span>
    //     </div>
    // );
}