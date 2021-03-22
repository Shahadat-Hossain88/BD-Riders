import React, { useEffect, useState } from 'react';
import RidersInfo from '../Fakedata/FakeData.json';
import Login from '../Login/Login';
import SelectWay from '../SelectWay/SelectWay';
import './Home.css'

const Home = () => {


    const [info, setInfo] = useState([]);

    useEffect(() => {

        setInfo(RidersInfo);

    }, [])

    const [selectedWay, setSelectedWay] = useState([]);

    const handleWay = (way) => {
        const newWay = [...selectedWay, way];
        setSelectedWay(newWay);
    }


    return (
        <div className="row home-container" id="home">
            {
                info.map(info => <SelectWay way={info} handleWay={handleWay} >  </SelectWay>)
            }

        </div>
    );
};

export default Home;