import React, {useState, useEffect} from 'react';
import styles from './bedroomComponent.module.css';

interface Props {
    roomNr: number;
    singleBed: number;
    doubleBed: number;
}

const BedroomDisplay: React.FC<Props> = ({roomNr, singleBed, doubleBed}) => {
    const [singleBedImage, setSingleBedImage] = useState<string>('');
    const [doubleBedImage, setDoubleBedImage] = useState<string>('');
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (singleBed > 0) {
            import('../../assets/single-bed-icon.svg').then(image => {
                setSingleBedImage(image.default);
            });
        }
        if (doubleBed > 0) {
            import('../../assets/doubleBed.svg').then(image => {
                setDoubleBedImage(image.default);
            });
        }
    }, [singleBed, doubleBed]);

    useEffect(() => {
        if ((singleBed > 0 && singleBedImage) || (doubleBed > 0 && doubleBedImage)) {
            setImagesLoaded(true);
        }
    }, [singleBedImage, doubleBedImage]);

    return (
        <div className={styles.componentBody}>
            {imagesLoaded && (
                <div className={styles.bedImages}>
                    {Array.from({length: singleBed}).map((_, index) => (
                        <img key={`single-${index}`} src={singleBedImage} alt="Single Bed" className={styles.bedIcon}/>
                    ))}
                    {Array.from({length: doubleBed}).map((_, index) => (
                        <img key={`double-${index}`} src={doubleBedImage} alt="Double Bed" className={styles.bedIcon}/>
                    ))}
                </div>
            )}
            <h3 className={styles.numberHeadline}>Bedroom {roomNr}</h3>
            <div className={styles.bedInformation}>
                {singleBed > 0 ? <span>{singleBed} Singlebed </span> : null}
                {singleBed > 0 && doubleBed > 0 ? <span> and </span> : null}
                {doubleBed > 0 ? <span> {doubleBed} Doublebed</span> : null}
            </div>
        </div>
    );
};

export default BedroomDisplay;
