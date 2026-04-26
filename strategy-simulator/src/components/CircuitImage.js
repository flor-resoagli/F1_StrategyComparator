import abudhabi from '../files/images/AbuDhabi.png';
import austin from '../files/images/Austin.png';
import australia from '../files/images/Australia.png';
import austria from '../files/images/Austria.png';
import bahrain from '../files/images/Bahrain.png';
import baku from '../files/images/Baku.png';
import belgium from '../files/images/Belgium.png';
import brazil from '../files/images/Brazil.png';
import canada from '../files/images/Canada.png';
import hungary from '../files/images/Hungary.png';
import jeddah from '../files/images/Jeddah.png';
import mexico from '../files/images/Mexico.png';
import miami from '../files/images/Miami.png';
import monza from '../files/images/Monza.png';
import netherlands from '../files/images/Netherlands.png';
import qatar from '../files/images/Qatar.png';
import singapore from '../files/images/Singapore.png';
import vegas from '../files/images/Vegas.png';


function CircuitImage (props) {

    const circuitImages = [{
        circuit : "AbuDhabi",
        image : abudhabi
    }, {
        circuit : "Austin",
        image : austin
    }, {
        circuit : "Australia",
        image : australia
    }, {
        circuit : "Austria",
        image : austria
    }, {
        circuit : "Bahrain",
        image : bahrain
    }, {
        circuit : "Baku",
        image : baku
    }, {
        circuit : "Belgium",
        image : belgium
    }, {
        circuit : "Brazil",
        image : brazil
    }, {
        circuit : "Canada",
        image : canada
    }, {
        circuit : "Hungary",
        image : hungary
    }, {
        circuit : "Jeddah",
        image : jeddah
    }, {
        circuit : "Mexico",
        image : mexico
    }, {
        circuit : "Miami",
        image : miami
    }, {
        circuit : "Monza",
        image : monza
    }, {
        circuit : "Netherlands",
        image : netherlands
    }, {
        circuit : "Qatar",
        image : qatar
    }, {
        circuit : "Singapore",
        image : singapore
    }, {
        circuit : "Vegas",
        image : vegas
    }]

    const circuitImage = () => {
        return circuitImages.find(c => props.CircuitName === c.circuit).image
    }

    return (
        <div>
            <img src={circuitImage()} width={'500px'} />
        </div>
    );

}

export default CircuitImage;
