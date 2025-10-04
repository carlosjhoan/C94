import config from "../../config"

export const Banner = ({ bannerImageUrl, head, description }) => {

    const backgroundStyle = {
        backgroundImage: `url('${config.strapiApiUrl}${bannerImageUrl}')`,
    };

    return (
        <>
            <section 
                className={`relative h-50 bg-center bg-cover `}
                style={backgroundStyle}
            >
                <div className="absolute inset-0 bg-black opacity-30 hover:opacity-40 "></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-gray-100 backdrop-blur-xs">
                    <div className="max-w-2xl ">
                        <h1 className="text-5xl font-bold mb-4">{head}</h1>
                        <p className="text-xl opacity-90 leading-relaxed">{description}</p>
                    </div>
                </div>
            </section>
        </>
    )

}