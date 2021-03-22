import React, { useEffect, useState } from 'react';
import Login from '../Login/Login';
import './SelectWay.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Destination from '../Destination/Destination';

const SelectWay = (props) => {
    const { name, img,id ,model} = props.way;
    const handleWay = props.way;
    console.log(handleWay);

    // const [info, setInfo] = useState([]);
    // useEffect(() => {

    //     setInfo(handleWay);

    // })
    
    // console.log(info);

    

    return (
        <Link to={`destination/${id}`}  className="col-md select-div main-div" >


            <CardDeck className="main-card" id="card-deck">

                <Card className="card-div" >
                    <Card.Img variant="top" src={img} />
                    <Card.Body >

                        <h3>{name}</h3>
                        <h6>{model}</h6>
                        {/* <Destination></Destination> */}

                    </Card.Body>
                    <Card.Footer>
                        {/* <Link to={`signUp`}>
                            <Button variant="success"  >  Have a Ride! </Button>
                        </Link> */}

                    </Card.Footer>
                </Card>


            </CardDeck>



        </Link>
    );
};

export default SelectWay;