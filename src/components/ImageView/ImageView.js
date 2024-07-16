import React from 'react'
import styles from './ImageView.module.css'
import { Box , Button, Stack } from "@mui/material"
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import TheatersIcon from '@mui/icons-material/Theaters';
import InfoIcon from '@mui/icons-material/Info';

const ImageView = ({ data, handlerecentplayed ,modalShow ,getMovieHover  , isRecent}) => {
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
                </div>
                <div className={styles.actiondiv}>
                    <Stack direction={'row'} spacing={2}>
                        <Button sx={{backgroundColor : 'red' ,color : 'white'}} onClick={() => handlerecentplayed(data.Id)} startIcon={<PlayCircleFilledOutlinedIcon sx={{color : 'white'}}/>}>{isRecent ? <span>Resume</span> : <span>Play</span>}</Button>
                        <Button sx={{backgroundColor : 'white' ,color : 'black'}} onClick={() => {getMovieHover(data) ; modalShow();}} startIcon={<InfoIcon sx={{color : 'black'}}/>}>info</Button>
                        <Button sx={{backgroundColor : 'white' ,color : 'black'}} onClick={() => window.open(data.Trailer, "_blank")} startIcon={<TheatersIcon sx={{color : 'black'}}/>}>Trailer</Button>
                    </Stack>
                </div>
            </Box>
        </div>
    )
}

export default ImageView
