import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import map from '../../../src/Map.png'
import './Destination.css';
import fakeData from '../Fakedata/FakeData.json'

const Destination = (props) => {
    
    // console.log(props.way);
    const {id} = useParams();
    
    const info = fakeData.find( pd => pd.id === id)
    // console.log(info);
    
    // const [infor, setInfor] = useState([]);
    // useEffect(() => {

    //     setInfor(id);

    // })
    // console.log(infor);

    const history = useHistory();
    const handlePickUp = (id) => {
        history.push(`distination/${id}`);

    }

    return (
        <div className=" main-div">
            <div>
                
                    <h1>id:{id}</h1>
                    <p>Pick From</p>
                    <input type="text" name=""/>
                    <p>Pick To</p>
                    <input type="text" name=""/>
                <br/>
                <Link to='/pickup'>
                <button >  Search</button>
                </Link>
            </div>
            <div className="map">
                <img src={map} alt=""/>
            </div>
        </div>
    );
};

export default Destination;