import styles from './DetailPopup.module.css'
import appstyles from '../ImageView/ImageView.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Stack } from '@mui/material';

const DetailPopup = ({ movie, modalshow }) => {
    const seasoncount = movie.SeasonCount.match(/\d+/g);
    const count = seasoncount ? parseInt(seasoncount[0], 10) : 0;
    return (<>
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={true}
            onClose={() => modalshow(false)}
        >
            <DialogContent sx={{ background: 'black', padding:'0px'}}>
                <Box>
                    <Stack>
                        <Stack sx={{height:'50vh'}}>
                            <img style={{height:'100%'}} src={movie.ImgUrl}/>
                        </Stack>
                        <Stack sx={{padding : '3%'}}>
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
                                        <Stack>{movie.Name}</Stack>
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
            <Button sx={{ position: 'absolute', top: "1px", right: '1px' }} onClick={() => modalshow(false)}><CloseIcon></CloseIcon></Button>
        </Dialog>
    </>);
}


export default DetailPopup