import React, {useEffect, useState} from "react";
import CabinReviewComponent from "./CabinReviewComponent";
import main from "../../MainPage/mainPage.module.css";
import styles from "./cabinreview.module.css"


interface Props {
    id: number;
    isMobile: boolean;
}

interface reviews {
    username : string
    rating : number
    text : string
}

const CabinReviews: React.FC<Props> = ({id, isMobile}) => {
    const [reviews, setReviews] = React.useState<reviews[] | null>(null);
    // Assuming reviews is an array of review objects
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(2); // Start with 2 visible reviews

    const showMoreReviews = () => {
        setVisibleReviewsCount(reviews!.length);
    };

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`http://localhost:3001/rentals/reviews/${id}`);
            const resp = await response.json();
            console.log(reviews)
            setReviews(resp)
        };
        fetchItems();
    }, [id]);


    return (
            <div className={`${!isMobile ? styles.reviews : styles.reviewsMobile}`}>
            <div className={main.linebreak}/>
            <h1>Reviews</h1>
            <h2>Average rating {reviews ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : 0}</h2>
            <div className={styles.reviewGrid}>
                {reviews && reviews.slice(0, visibleReviewsCount).map((review, index) => (
                    <CabinReviewComponent key={index} rating={review.rating} text={review.text} username={review.username} isMobile={isMobile}/>
                ))}
            </div>
            {reviews && reviews.length > 2 && visibleReviewsCount < reviews.length && (
                <button className={styles.showMore} onClick={showMoreReviews}>Show more reviews</button>
            )}
        </div>
    )
}

export default CabinReviews;
