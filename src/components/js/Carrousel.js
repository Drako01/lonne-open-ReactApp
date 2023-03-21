import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';


const route = '/img/';

const CarrouselPhotos = () => (
    <Carousel>        
        <Paper>
            <img src={`${route}zapa-wilson_1.png`} alt='Imagen'/>
        </Paper>
        <Paper>
            <img src={`${route}zapa-wilson_2.png`} alt='Imagen'/>
        </Paper>
        <Paper>
            <img src={`${route}tubo_pelotas_1.png`} alt='Imagen'/>
        </Paper>
        <Paper>
            <img src={`${route}tubo_pelotas_2.png`} alt='Imagen'/>
        </Paper>
    </Carousel>
);

export default CarrouselPhotos;