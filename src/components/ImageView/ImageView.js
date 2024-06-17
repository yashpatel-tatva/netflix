import React from 'react'
import styles from './ImageView.module.css'
import { Box, Button } from "@mui/material"
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';

const ImageView = ({ data, handlerecentplayed }) => {
    return (
        <div className={styles.maindiv}>
            <Box sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${data.ImgUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100vw 100vh',
                backgroundPosition: 'right',
            }} >
                <div className={styles.infodiv}>
                    <div className={styles.owner}>{data.Owner}</div>
                    <div className={styles.name}>{data.Name}</div>
                    <div className={styles.description}>
                        <span className={styles.rating}>{data.Rating} Match</span>
                        <span className={styles.releaseyear}>{data.ReleaseYear}</span>
                        <span className={styles.seasoncount}>{data.SeasonCount}</span>
                        <span className={styles.quality}>{data.HighestQuality}</span>
                        <span className={styles.imdb}>{data.IMDB}</span>
                    </div>
                    <div className={styles.storyline}>{data.StoryLine}</div>
                    <div className={styles.producerslist}>{data.Producerslist}</div>
                    <div className={styles.type}>{data.Type}</div>
                    {/* <div className={styles.playbtndiv}>
                        <Button className={styles.playbtn} sx={{backgroundColor : 'red' ,color : 'white'}} onClick={() => handlerecentplayed(data.Id)} startIcon={<PlayCircleFilledOutlinedIcon sx={{color : 'white'}}/>}>Play</Button>
                    </div> */}
                </div>
            </Box>
        </div>
    )
}

export default ImageView
