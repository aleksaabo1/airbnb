import React, {RefObject, useEffect, useState} from "react";
import styles from "./mainPage.module.css";
import details from "./detailRental.module.css";

import {useParams} from "react-router-dom";
import DetailDescription from "../Components/DetailDescription/DetailDescription";
import ImageCarousell from "../Components/ImageCarousell/ImageCarousell";
import {BASE_URL} from "../constants";

const BedroomComponent = React.lazy(() => import('../Components/BedroomComponent/BedroomComponent'));
const CalenderBooking = React.lazy(() => import('../Components/Calender/CalenderBooking'));
const CabinReviews = React.lazy(() => import('../Components/CabinReviews/CabinReviews'));
const MapComponent = React.lazy(() => import('../Components/MapComponent/MapComponent'));
const HostInformation = React.lazy(() => import('../Components/HostInformation/HostInformation'));

interface Details {
    id: number
    title: string
    guests: number
    bedrooms: number
    beds: number
    baths: number
    description: string
}



const DetailRental = () => {
    const BedroomComponentRef = React.useRef<HTMLDivElement>(null);
    const CalendarBookingRef = React.useRef<HTMLDivElement>(null);
    let {id} = useParams() as any;
    const ReviewsRef = React.useRef<HTMLDivElement>(null);
    const MapRef = React.useRef<HTMLDivElement>(null);
    const HostRef = React.useRef<HTMLDivElement>(null);

    const [loadBedroomComponent, setLoadBedroomComponent] = useState<boolean>(false);
    const [loadCalenderComponent, setLoadCalenderComponent] = useState<boolean>(false);
    const [loadReviewsComponent, setLoadReviewsComponent] = useState<boolean>(false);
    const [loadMapComponent, setLoadMapComponent] = useState<boolean>(false);
    const [loadHostComponent, setLoadHostComponent] = useState<boolean>(false);

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [description, setDescription] = useState<Details | null>(null)

    const useIntersectionObserver = (
        ref: RefObject<Element>, // Generic Element type for the ref
        callback: () => void, // Callback function type
        options: IntersectionObserverInit = {threshold: 1} // Default options with IntersectionObserverInit type
    ): void => {
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    const firstEntry = entries[0];
                    if (firstEntry.isIntersecting) {
                        console.log(firstEntry)
                        callback();
                        observer.disconnect();
                    }
                },
                options
            );

            const currentRef = ref.current;
            console.log(ref)
            if (currentRef) {
                observer.observe(currentRef);
            }

            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            };
        }, [description]);
    };

    useIntersectionObserver(BedroomComponentRef, () => {
        setLoadBedroomComponent(true);
    });
    useIntersectionObserver(CalendarBookingRef, () => setLoadCalenderComponent(true));
    useIntersectionObserver(ReviewsRef, () => setLoadReviewsComponent(true));
    useIntersectionObserver(MapRef, () => setLoadMapComponent(true));
    useIntersectionObserver(HostRef, () => {
        setLoadHostComponent(true)
    });

    useEffect(() => {
        const fetchItems = async () => {
            const id_mod = id % 12
            const response = await fetch(BASE_URL + `/rentals/description/${id_mod}`);
            const resp = await response.json();
            console.log(description)
            setDescription(resp)
        };
        fetchItems();
    }, [id]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mobileBreakpoint = 700;
    const isMobile = windowWidth < mobileBreakpoint;

    return (
        <div className={`${!isMobile ? styles.mainPage : styles.mainPageMobile} ${details.detailPage}`}>
            <ImageCarousell id={id} isMobile={isMobile}/>
            {description && (
                <>
                <DetailDescription
                    id={id}
                    description={description.description}
                    baths={description.baths}
                    guests={description.guests}
                    title={description.title}
                    bedrooms={description.bedrooms}
                    beds={description.beds}
                    isMobile={isMobile}
                />

                <div ref={BedroomComponentRef} className={styles.ref}/>
                {loadBedroomComponent && (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <BedroomComponent id={id} isMobile={isMobile}/>
                    </React.Suspense>
                )
                }

                <div ref={CalendarBookingRef} className={styles.ref}/>
                {
                    loadCalenderComponent && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <CalenderBooking isMobile={isMobile}/>
                        </React.Suspense>
                    )
                }
                <div ref={ReviewsRef} className={styles.ref}/>
                {
                    loadReviewsComponent && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <CabinReviews id={id} isMobile={isMobile}/>
                        </React.Suspense>
                    )
                }
                <div ref={MapRef} className={styles.ref}/>
                {
                    loadMapComponent && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <MapComponent isMobile={isMobile}/>
                        </React.Suspense>
                    )
                }
                <div ref={HostRef} className={styles.ref}/>
                {
                    loadHostComponent && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <HostInformation isMobile={isMobile}/>
                        </React.Suspense>
                    )
                }
            </>)
            }
        </div>
    );
}


export default DetailRental;
