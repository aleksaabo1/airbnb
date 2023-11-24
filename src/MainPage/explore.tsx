import React, {useEffect, useRef, useState} from "react";
import styles from "./mainPage.module.css";
import styleExplore from "./explore.module.css";
import Preview from "../Components/RentalPreview/Preview";
import {Link} from "react-router-dom";


interface Information {
    id: number;
    imageUrl: string;
    location: string;
    price: number;
    bedrooms: number;
    baths: number;
}

export default function Explore() {
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<Information[]>([]); // Items to display in our list
    const [loading, setLoading] = useState<boolean>(false); // Track loading state
    const [pageNumber, setPageNumber] = useState<number>(1); // Track current page for API

    // Function to fetch items from the API
    const fetchItems = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/items?page=${pageNumber}`);
        const newItems = await response.json();

        // Preload images
        newItems.forEach((item: Information) => {
            const img = new Image();
            img.src = item.imageUrl;
        });

        setItems((prevItems) => [...prevItems, ...newItems]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        setLoading(false);
    };


    // Intersection Observer setup
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting) {
                    fetchItems();
                    console.log("Load more data here")
                }
            },
            {threshold: 0.1}
        );

        const currentLoaderRef = loaderRef.current;
        if (currentLoaderRef) {
            observer.observe(currentLoaderRef);
        }

        return () => {
            if (currentLoaderRef) {
                observer.unobserve(currentLoaderRef);
            }
        };
    }, [loading]); // Only re-run if loading state changes



    return (
        <div className={`${styles.mainPage} ${styleExplore.exploreGrid}`}>
            {items.map((item, index) => {
                return (
                    <Link to={`/item/${index}`} className={styleExplore.exploreItem}>
                        <div key={index} className={styleExplore.exploreItem}>
                            <Preview
                                location={item.location}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                bedrooms={item.bedrooms}
                                baths={item.baths}/>
                        </div>
                    </Link>)
            })}
            <div ref={loaderRef}/>
        </div>
    )
}
