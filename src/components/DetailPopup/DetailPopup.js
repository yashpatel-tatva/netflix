import appstyles from '../ImageView/ImageView.module.css'
import styles from './DetailPopup.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack } from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import TheatersIcon from '@mui/icons-material/Theaters';
import Tooltip from '@mui/material/Tooltip';

const DetailPopup = ({ movie, modalshow, isMute, toggleMute, handlerecentplayed, handleliked, handlewatchlist, isRecent, isLiked, isInWatchlist }) => {
    const seasoncount = movie.SeasonCount.match(/\d+/g);
    const count = seasoncount ? parseInt(seasoncount[0], 10) : 0;

    return (<>
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={true}
            onClose={() => modalshow(false)}
        >
            <DialogContent sx={{ background: 'black', padding: '0px' }}>
                <Box>
                    <Stack>
                        <Stack sx={{ height: '50vh', position: 'relative' }} >
                            <div className={styles.player}>
                                <video style={{ height: '100%', width: '100%', objectFit: 'cover', backdropFilter: 'inherit' }} autoPlay muted={isMute} loop={true}>
                                    <source src={movie.Trailer} type="video/mp4" />
                                </video>
                            </div>
                            <div style={{ position: 'absolute', bottom: '0%', padding: '0.5% 0.5%', display: 'flex', justifyContent: 'space-around', width: '100%', backdropFilter: 'brightness(0.8)' }}>
                                <div>
                                    <Stack spacing={2} direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <div>
                                            <Button sx={{ backgroundColor: 'red', color: 'white' }} onClick={() => handlerecentplayed(movie.Id)} startIcon={<PlayCircleFilledOutlinedIcon sx={{ color: 'white' }} />}>
                                                {isRecent ? "Resume" : "Play"}
                                            </Button>
                                        </div>
                                        <Tooltip title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
                                            <IconButton sx={ !isInWatchlist ? { color: 'white', border: '1px solid white' } : {color: 'black', border: '1px solid white', backgroundColor: 'white' }} onClick={() => handlewatchlist(movie.Id)}>
                                                <CheckIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={isLiked ? "Unlike" : "Like"}>
                                            <IconButton sx={!isLiked ? { color: 'white', border: '1px solid white' } : {color: 'black', border: '1px solid white', backgroundColor: 'white' }} onClick={() => handleliked(movie.Id)}>
                                                <ThumbUpAltIcon></ThumbUpAltIcon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Watch Trailer">
                                            <IconButton sx={{ color: 'white', border: '1px solid white' }} onClick={() => window.open(movie.Trailer, "_blank")}>
                                                <TheatersIcon ></TheatersIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </div>
                                <div>
                                    <Tooltip title={isMute ? "Unmute" : "Mute"}>
                                        <IconButton onClick={() => toggleMute(!isMute)} sx={{ color: 'white', border: '1px solid white  ' }}>
                                            {isMute ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </Stack>
                        <Stack sx={{ padding: '3%' }}>
                            <Grid container spacing={2} sx={{ color: 'white' }}>
                                <Grid item md={8}>
                                    <Stack spacing={2}>
                                        <Stack direction={'row'} className={appstyles.description}>
                                            <span className={appstyles.rating}>{movie.Rating} Match</span>
                                            <span className={appstyles.releaseyear}>{movie.ReleaseYear}</span>
                                            <span className={appstyles.seasoncount}>{movie.SeasonCount}</span>
                                            <span className={appstyles.quality}>{movie.HighestQuality}</span>
                                            <span className={appstyles.imdb}>{movie.IMDB}</span>
                                        </Stack>
                                        <Stack><h3>{movie.Name}</h3></Stack>
                                        <Stack spacing={1}>
                                            {Array.from({ length: count }, (_, i) => (
                                                <div style={{ fontWeight: 'bolder' }} key={i}>Season:{i + 1}</div>
                                            ))}
                                        </Stack>
                                        <Stack style={{ paddingRight: '10%' }}>{movie.StoryLine}</Stack>
                                    </Stack>
                                </Grid>
                                <Grid item md={4}>
                                    <Stack spacing={4}>
                                        <Stack direction={'row'}>
                                            <span style={{ opacity: '0.7' }}>Directors : </span><span style={{ paddingLeft: '3px' }}> {movie.Producerslist}</span>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <span style={{ opacity: '0.7' }}>Genres : </span><span style={{ paddingLeft: '3px' }}> {movie.Type}</span>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <span style={{ opacity: '0.7' }}>Produced By : </span><span style={{ paddingLeft: '3px' }}> {movie.Owner}</span>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Box>
            </DialogContent>
            <Button sx={{ position: 'absolute', top: "1px", right: '1px', color: "while" }} onClick={() => modalshow(false)}><CloseIcon sx={{ color: "white" }}></CloseIcon></Button>
        </Dialog>
    </>);
}


export default DetailPopup