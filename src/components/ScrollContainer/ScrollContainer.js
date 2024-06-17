import React, { useRef, useState } from 'react';
import styles from './ScrollContainer.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ScrollContainer({ children }) {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            direction === 'left' ? current.scrollBy({ left: -500, behavior: 'smooth' }) :
                current.scrollBy({ left: 500, behavior: 'smooth' });
        }
    };

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) *2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div style={{ display: 'flex', gap: '15px', position: 'relative' }}>
            <button style={{ left: '0px' }} className={styles.scrollbtns} onClick={() => scroll('left')}>
                <ArrowBackIosIcon color='white' fontSize='large'/>
            </button>
            <div
                ref={scrollRef}
                className={styles.populerscroll}
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={onDrag}
            >
                {children}
            </div>
            <button style={{ right: '0px' }} className={styles.scrollbtns} onClick={() => scroll('right')}>
                <ArrowForwardIosIcon color='white' fontSize='large'/>
            </button>
        </div>
    );
}

export default ScrollContainer;
