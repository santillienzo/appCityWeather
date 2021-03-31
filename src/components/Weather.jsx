import React from 'react';

const Weather = (props) => {
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.icon} display-1`}></i>
                </h5>
                {props.currentTemp ? (<h1 className="py-2">{props.currentTemp}°</h1>): (null)}
                
                {minmaxTemp(props.maxTemp, props.minTemp)}    {/*Aquí  pasaremos los parámetros de la temperatura máxima y mínima*/}
                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
};

function minmaxTemp(min, max){
    if (min && max) {
        return(
            <h3>
                <span className="px-4">{min}°</span>
                <span className="px-4">{max}°</span>
            </h3>
        );
    }
}

export default Weather;