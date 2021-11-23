import React, {useEffect, useState} from 'react'
import GoogleMaps from "../google-map-api/map";


const parking = {
    "Alumni A Lot" : [43.000716, -78.780223, true,"https://goo.gl/maps/z4SbM4aJdfuB5HwV6", false],
    "Alumni B Lot" : [43.001901, -78.77871, true,"https://goo.gl/maps/s33e9WZaAFmrB4Rz7",false],
    "Alumni C Lot" : [43.001909, -78.779976, true,"https://goo.gl/maps/Camn2CzybZpLsUcU9",false],
    "Arena Lot" : [43.000857, -78.779418, true,"https://goo.gl/maps/5pTg8WhP4RhjSy8X7",false],
    "Baird A Lot" : [42.998558, -78.784504, true,"https://goo.gl/maps/45MivZVFVq22L2Fh9",false],
    "Bookstore Lot": [43.002333,-78.78534, false,"https://goo.gl/maps/87c2krGjP7XR92qQ7",false],
    "Cooke A Lot" : [42.999437, -78.793216 ,true,"https://goo.gl/maps/Pk3XbMH2YNsZXkLj9",false],
    "Cooke B Lot" : [42.998715, -78.793237, true,"https://goo.gl/maps/dyMAes4BksPJ8FdZ7",false],
    "Crofts Lot" : [42.994807, -78.797078, true,"https://goo.gl/maps/GKfubFAw3Gjcy8pi7",false],
    "Furnas Lot" : [43.00245, -78.786328, true,"https://goo.gl/maps/sTBnFFY6f53cRRdH6", true],
    "Fronczak Lot" : [43.002425, -78.791424, true,"https://goo.gl/maps/VchkxMUY14nd4Nwq8",false],
    "Hochstetter A Lot" : [42.998809, -78.791585, true,"https://goo.gl/maps/9V5vYTvcDN2eT8Xx9", true],
    "Hochstetter B Lot" : [42.99859, -78.790212, false,"https://goo.gl/maps/bUJnnMTF1eFhpxRc7",false],
    "Governors A Lot" :[43.00234,-78.790877,true,"https://goo.gl/maps/28n38jT1GiTqfQqF9", true],
    "Jacobs B Lot": [42.998401,-78.7871, true,"https://goo.gl/maps/qGXTVax2x9d6YNFj9",false],
    "Jacobs A Lot": [42.998511,-78.788302, true,"https://goo.gl/maps/xgxEpQ4t3bUt9z6x6",true],
    "Jacobs C Lot": [42.998574,-78.786113, true,"https://goo.gl/maps/Ha3VeTLKDvSWJCTB9",false],
    "Jarvis A Lot" : [43.003721, -78.788517, false,"https://goo.gl/maps/DJrwMmxD3FNmkjr96",false],
    "Jarvis B Lot" : [43.003972, -78.786929, true,"https://goo.gl/maps/pcVVLd6PnjKf1hZa9",false],
    "Ketter Lot" :  [43.002466, -78.788838, true,"https://goo.gl/maps/6h7i4edeea1Jd2BKA",false],
    "Park Hall Lot" : [42.999657, -78.788688, true,"https://goo.gl/maps/5ja1ArexJ4VQQ3UX7",false],
    "Slee A Lot" : [42.99848, -78.783517, true,"https://goo.gl/maps/3eavzUUU53MVKbmt9",false],
    "Slee B Lot" : [42.999374, -78.783474, true,"https://goo.gl/maps/qDQPpq8UavPQi75q6",false]
}

function UserDashboard(){
    const [available, setAvailable] = useState(true);
    const [free, setFree] = useState(false);
    const [paid, setPaid] = useState(false);
    const [faculty, setFaculty] = useState(false);

    const [nearByLotFree, setNearByLotFree] = useState(Object.keys(parking)[0]);
    const [nearByLotPaid, setNearByLotPaid] = useState(Object.keys(parking)[0]);
    const [nearByFacultyLot, setNearByFacultyLot] = useState(Object.keys(parking)[0]);

    const [times, setTime] = useState(new Date().toLocaleTimeString());

    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        findNearFreeLots(free,paid,faculty)
    })

    function findNearFreeLots(free,paid,faculty){
        console.log(faculty);
        let distance = {};
        for(let [keys,values] of Object.entries(parking)){
            if(free){
                if(values[2]){
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }
            else if(paid) {
                if (!values[2]) {
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }
            else if(faculty){
                if(values[4]){
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }

        }

        distance = Object.entries(distance).sort((a, b) => a[1] - b[1])
        if (free){
            setNearByLotFree(distance[0][0]);
        }
        else if(paid){
            setNearByLotPaid(distance[0][0]);
        }
        else if(faculty){
            console.log(distance)
            setNearByFacultyLot(distance[0][0]);
        }
        return 0;
    }


    function distanceFormula(latitude1, longitude1, latitude2, longitude2){

        //Radius of Earth
        const radius =  6371000;

        //Change PI into Radians
        const latitude1InRadians = latitude1 * (Math.PI/180);
        const latitude2InRadians = latitude2 * (Math.PI/180);

        //Change in Longitude and Latitude
        const changeInLatitude = (latitude2 - latitude1) * (Math.PI/180);
        const changeInLongitude = (longitude2 - longitude1) * (Math.PI/180);

        const sum = (Math.sin(changeInLatitude/2) * Math.sin(changeInLatitude/2)) +
            (Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) * Math.sin(changeInLongitude/2) *
                Math.sin(changeInLongitude/2))

        const tanInverse = 2 * Math.atan(Math.sqrt(sum), Math.sqrt(1-sum));

        return (radius * tanInverse)/1000;

    }

    useEffect(()=>{
        setInterval(getTime,1000);
    });

    function handleLots(setLots){
        if (setLots === "free"){
            setFree(!free);
            setFaculty(false);
        }
        else if (setLots === "paid"){
            setPaid(!paid);
            setFaculty(false);
        }
        else if(setLots === "faculty"){
            setFaculty(!faculty);

            setAvailable(false);
            setPaid(false);
            setFree(false);
        }
        else{
            setAvailable(!available);
            setFaculty(false);
        }

        return 0;
    }

    function getTime(){
        const today = new Date();
        const currentTime = today.toLocaleTimeString();
        setTime(currentTime);
    }
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return(
        <div className="single-height-pages">
            <div className="row dashboard">
                <div style={{textAlign:'center'}}>
                    <div className="column dashboard" >
                        <h1 className="super-heading time" >{times}</h1>
                        <h3 className="heading">{date}</h3>
                        {/*<a href={"/edit-time"} className="menu-links register" style={{borderRadius:'5px', width:'85px'}}>EDIT TIME</a>*/}
                    </div>
                    {/*<AvailableParkingLots/>*/}
                    <div>
                        <div>
                            <button onClick={()=>handleLots("available")} className={available ? "dashboard-buttons active" : "dashboard-buttons"}>Available Lots</button>
                            <button onClick={()=>handleLots("free")} className={free ? "dashboard-buttons active" : "dashboard-buttons"}>Free Lots</button>
                            <button onClick={()=>handleLots("paid")} className={paid ? "dashboard-buttons active" : "dashboard-buttons"}>Paid Lots</button>
                            <button onClick={()=>handleLots("faculty")} className={faculty ? "dashboard-buttons active" : "dashboard-buttons"}>Faculty Lots</button>
                        </div>
                        <div>
                            {available || free || paid ?
                                !free && available && paid ?
                                    <div className="dashboard-parking-lots">
                                        {Object.entries(parking).map((key,value)=>{
                                            if (!key[1][2] && !key[1][4]){
                                                return (
                                                    <div className="available-parking-lots">
                                                        <a href={key[1][3]} target={"_blank"}>
                                                            {key[0]}
                                                        </a>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    : !paid && available && free ?
                                    <div className="dashboard-parking-lots">
                                        {Object.entries(parking).map((key,value)=>{
                                            if (key[1][2] && !key[1][4]){
                                                return (<div className="available-parking-lots">
                                                    <a href={key[1][3]} target={"_blank"}>
                                                        {key[0]}
                                                    </a>
                                                </div>)
                                            }
                                        })}
                                    </div>
                                    : paid && !free && !available ?
                                        <div className="dashboard-parking-lots">
                                            {Object.entries(parking).map((key,value)=>{
                                                if (!key[1][2] && !key[1][4]){
                                                    return (<div className="available-parking-lots">
                                                        <a href={key[1][3]} target={"_blank"}>
                                                            {key[0]}
                                                        </a>
                                                    </div>)
                                                }
                                            })}
                                        </div>
                                        : free && !paid && !available ?
                                            <div className="dashboard-parking-lots">
                                                {Object.entries(parking).map((key,value)=>{
                                                    if (key[1][2] && !key[1][4]){
                                                        return (<div className="available-parking-lots">
                                                            <a href={key[1][3]} target={"_blank"}>
                                                                {key[0]}
                                                            </a>
                                                        </div>)
                                                    }
                                                })}
                                            </div>
                                            : <div className="dashboard-parking-lots">
                                                {Object.entries(parking).map((key,value)=>{
                                                    if(!key[1][4]){
                                                        return (<div className="available-parking-lots">
                                                            <a href={key[1][3]} target={"_blank"}>
                                                                {key[0]}
                                                            </a>
                                                        </div>)
                                                    }


                                                })}
                                            </div>
                                : <div/>
                            }
                            {
                                faculty ?
                                <div className="dashboard-parking-lots">
                                    {Object.entries(parking).map((key,value)=>{
                                        if(key[1][4]){
                                        console.log(key[1][4])
                                        return (<div className="available-parking-lots">
                                        <a href={key[1][3]} target={"_blank"}>
                                    {key[0]}
                                        </a>
                                        </div>)
                                    }
                                    })}
                                </div> : <></>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {
                        free && !paid && !faculty ?
                            <GoogleMaps frees={true} availables={true} paids={false} faculty={false} nearbyFree={nearByLotFree} nearbyPaid={""} nearbyFaculty={""} />
                        :
                        paid && !free && !faculty?
                            <GoogleMaps frees={false} availables={true} paids={true} faculty={false} nearbyFree={""} nearbyPaid={nearByLotPaid} nearbyFaculty={""} />
                        :
                        faculty && !free && !paid && !available ?
                            <GoogleMaps frees={false} availables={false} paids={false} faculty={true} nearbyFree={""} nearbyPaid={""} nearbyFaculty={nearByFacultyLot} />
                        :
                        !faculty &&
                            <GoogleMaps frees={true} availables={true} paids={true} faculty={false} nearbyFree={""} nearbyPaid={""} nearbyFaculty={""} />
                    }

                </div>
            </div>
        </div>
    )
}

export default UserDashboard;