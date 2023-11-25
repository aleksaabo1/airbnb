import React, {useEffect, useRef, useState} from "react";
import styles from "./ImageCarousell.module.css";
import {BASE_URL} from "../../constants";

interface Props {
    id: number;
    isMobile: boolean
}


const ImageCarousell: React.FC<Props> = ({id, isMobile}) => {
    const [images, setImages] = useState<string[]>([]); // Items to display in our list
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('/images/')) {
                console.log('Paint time for the image:', entry.startTime);
            }
        }
    });

    observer.observe({entryTypes: ['paint']});

    useEffect(() => {
        const fetchItems = async () => {
            const id_mod = id % 10
            const response = await fetch(BASE_URL + `/images/${id_mod}`);
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
            carouselRef.current.scrollBy({left: scrollAmount, behavior: 'smooth'});
        }
    };
    const [isLoading, setIsLoading] = useState(true);


    return (
        <div style={!isMobile ? {width: "80%"} : {width: "100%"}}>
            <div
                className={`${!isMobile ? styles.carouselContainer : styles.carouselContainerMobile} ${isLoading ? styles.loadingCarousel : ''}`}
                ref={carouselRef}>
                {images.map((image, index) => (
                    <img
                        key={index} // Using the image URL as a key
                        className={`${styles.carouselItem} ${index !== 0 ? styles.loadingImage : ''}`}
                        src={image}
                        ref={index === 0 ? itemRef : null} // Attach ref to the first item
                        alt={`Carousel item ${index}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        onLoad={index === 0 ? () => setIsLoading(false) : (e) => e.currentTarget.classList.remove(styles.loadingImage)} // Update state when the first image is loaded

                    />
                ))}
            </div>
            <button className={styles.carouselButton} onClick={() => {
                scroll("prev")
            }}>Prev
            </button>
            <button className={styles.carouselButton} onClick={() => {
                scroll("next")
            }}>Next
            </button>
        </div>
    )

}

export default ImageCarousell;
