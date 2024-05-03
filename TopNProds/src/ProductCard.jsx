import React from "react";

const ProductCard = ({prod}) => {
    return (
        <div className="prod">
            <div>
                <p className="temp">Year: {prod.Year}</p>
            </div>
            <div>
                <img src={prod.Poster !=='N/A'?prod.Poster : 'https://via.placeholder.com/400'}/>
            </div>

            <div>
                <span>{prod.Type}</span>
                <h1>{prod.Title}</h1>
            </div>
        </div>
    );
}

export default ProductCard;