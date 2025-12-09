"use client"
import { useState, useEffect } from "react"

export default function SizeSelector({ product, selectedSize, setSelectedSize }) {
    const [sizesType, setSizesType] = useState([]);

    const clothSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const shoeSizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];

    useEffect(() => {
        if (product.category.includes("dresses") || product.category.includes("shirts")) {
            setSizesType(clothSizes);
        } else if (product.category.includes("shoes")) {
            setSizesType(shoeSizes);
        }
    }, [product])


    return (
        <>
            {
                sizesType.length > 0 &&
                <div className="size_selector">
                    <label htmlFor="size">Size: </label>
                    <select id="size" value={selectedSize}
                        onChange={e => setSelectedSize(e.target.value)} className="sizes_select">

                        <option value="" disabled>Select a size</option>
                        {sizesType.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}

                    </select>
                </div>
            }
        </>



    )
}
