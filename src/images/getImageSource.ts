import  dumbledore from  '../assets/pictures/dumbledore.png';
import  harry from  '../assets/pictures/harry.png';
import  hermione from  '../assets/pictures/hermione.png';
import  ron from  '../assets/pictures/ron.png';
 import hagrid from  '../assets/pictures/hagrid.png';

export const getImageSource = (imageName: string) => {
    switch (imageName) {
        case 'dumbledore':
            return dumbledore;
        case 'harry':
            return harry;
        case 'hermione':
            return hermione;
        case 'ron':
            return ron;
        case 'hagrid':
            return hagrid;
        default:
            return '';
    }
}
