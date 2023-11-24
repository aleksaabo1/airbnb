import React, {useEffect, useRef, useState} from "react";
import styles from "./ImageCarousell.module.css";
interface Props {
    id: number;
    isMobile: boolean
}



const ImageCarousell: React.FC<Props> = ({id, isMobile}) => {
    const [images, setImages] = useState<string[]>([]); // Items to display in our list
    const carouselRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        const fetchItems = async () => {
            const id_mod =  id % 10
            const response = await fetch(`http://localhost:3001/images/${id_mod}`);
            const resp = await response.json();
            console.log(resp)
            setImages(resp)
        };
        fetchItems();
    }, []);


    const itemRef = useRef<HTMLImageElement>(null); // Ref for a carousel item

    const scroll = (direction: 'prev' | 'next') => {
        if (carouselRef.current && itemRef.current) {
            const itemWidth = itemRef.current.offsetWidth; // Dynamically get item width
            const scrollAmount = direction === 'next' ? itemWidth : -itemWidth;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    return (
        <div style={!isMobile ? { width: "80%" } : {}}>
            <div className={`${!isMobile ? styles.carouselContainer : styles.carouselContainerMobile}`} ref={carouselRef}>
                {images.map((image, index) => (
                    <img
                        key={index} // Using the image URL as a key
                        className={`${styles.carouselItem} ${index !== 0 ? styles.loadingImage : ''}`}
                        src={image}
                        ref={index === 0 ? itemRef : null} // Attach ref to the first item
                        alt={`Carousel item ${index}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        onLoad={(e) => {
                            e.currentTarget.classList.remove(styles.loadingImage);
                        }}
                    />
                ))}
            </div>
            <button className={styles.carouselButton} onClick={() => {scroll("prev")}}>Prev</button>
            <button className={styles.carouselButton} onClick={() => {scroll("next")}}>Next</button>
        </div>
    )

}

export default ImageCarousell;
