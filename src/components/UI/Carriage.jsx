import React from 'react';
import '../../../scss/main.scss';
import { useState, useEffect } from 'react';
import { carriageWithSeats, bookings } from '../../utilities/Bookings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
export default function Carriage({
  carriage,
  props,
  setCarriage,
  trainId,
  travelerArray,
}) {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  let {
    timeTableId,
    arrivalTimeTo,
    departureTimeFrom,
    date,
    startStation,
    endStation,
    rorderFrom,
    rorderTo,
    price,
    trainNumber,
    platformFrom: platformFrom,
    platformTo: platformTo,
  } = props;
  // Splits "seats" array in 4
  const middle = Math.floor(seats.length / 2);
  const seatsRowOne = seats.slice(0, middle);
  const seatsRowTwo = seats.slice(middle);

  const middleTwo = Math.floor(seatsRowOne.length / 2);
  const middleThree = Math.floor(seatsRowTwo.length / 2);

  const seats1 = seatsRowOne.slice(0, middleTwo);
  const seats2 = seatsRowOne.slice(middleTwo);
  const seats3 = seatsRowTwo.slice(0, middleThree);
  const seats4 = seatsRowTwo.slice(middleThree);

  // x är stolarna
  // e är bokningar
  useEffect(() => {
    async function fetchData() {
      // gets all the bookings from database
      let getbookings = await bookings();
      //gets carriagesWithSeats
      let carriages = await carriageWithSeats();

      carriages = carriages.filter(
        (x) => x.carriage === carriage && x.trainId === trainId
      );

      if (getbookings.length) {
        carriages.forEach((x) => {
          x.selected = false;
          getbookings.forEach((e) => {
            if (
              x.seatNumber === e.seatId &&
              x.carriage === e.carriageId &&
              e.timeTableId === timeTableId &&
              e.bdate.slice(0, 10) === date &&
              e.rorderTo > rorderFrom &&
              e.rorderFrom < rorderTo
            ) {
              x.booked = true;
            }
          });
        });
        setSeats(carriages);
      } else {
        setSeats(carriages);
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    fetchData();
  }, []);

  function selectedSeat(id) {
    if (!selected.includes(id) && selected.length < travelerArray.length) {
      let newSelected = [...selected, id];
      setSelected(newSelected);
    } else {
      let newSelected = selected.filter((t) => t !== id);
      setSelected(newSelected);
    }
  }
  return (
    <Container>
      <Row>
        {carriage === 1 ? (
          <Col>{`1:a klass pris: ${price.firstClass} kr`}</Col>
        ) : (
          <Col>{`2:a klass pris: ${price.secondClass} kr`}</Col>
        )}
      </Row>
      <Row>
        <Col>Välj antal platser: {travelerArray.length - selected.length}</Col>
      </Row>
      <Row className='grid-container' style={{ paddingTop: '5%' }}>
        {seats1.map((item, index) => (
          <div
            onClick={() => selectedSeat(item.seatNumber)}
            key={index}
            className={`seat${
              selected.includes(item.seatNumber) ? 'selected' : ''
            }${item.handicapSeat ? 'handicapSeat' : ''}${
              item.booked ? 'booked' : ''
            }`}
            style={{
              backgroundImage: "url('images/seat.png')",
              backgroundSize: '100% 100%',
              width: '50px',
              height: '50px',
              transform: 'rotate(90deg)',
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '9px',
              cursor: 'pointer',
              maxHeight: '100px',
              gridRow: '1',
            }}
          >
            <p
              className='number'
              style={{
                transform: 'rotate(270deg)',
                marginTop: '15px',
                marginRight: '5px',
              }}
            >
              {' '}
              {item.seatNumber}
            </p>
          </div>
        ))}
        {seats2.map((item, index) => (
          <div
            onClick={() => selectedSeat(item.seatNumber)}
            key={index}
            className={`seat${
              selected.includes(item.seatNumber) ? 'selected' : ''
            }${item.handicapSeat ? 'handicapSeat' : ''}${
              item.booked ? 'booked' : ''
            }`}
            style={{
              backgroundImage: "url('images/seat.png')",
              backgroundSize: '100% 100%',
              width: '50px',
              height: '50px',
              transform: 'rotate(90deg)',
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '9px',
              cursor: 'pointer',
              maxHeight: '100px',
              gridRow: '2',
              marginBottom: '80px',
            }}
          >
            <p
              className='number'
              style={{
                transform: 'rotate(270deg)',
                marginTop: '15px',
                marginRight: '5px',
              }}
            >
              {' '}
              {item.seatNumber}
            </p>
          </div>
        ))}
        {seats3.map((item, index) => (
          <div
            onClick={() => selectedSeat(item.seatNumber)}
            key={index}
            className={`seat${
              selected.includes(item.seatNumber) ? 'selected' : ''
            }${item.handicapSeat ? 'handicapSeat' : ''}${
              item.booked ? 'booked' : ''
            }`}
            style={{
              backgroundImage: "url('images/seat.png')",
              backgroundSize: '100% 100%',
              width: '50px',
              height: '50px',
              transform: 'rotate(270deg)',
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '9px',
              cursor: 'pointer',
              maxHeight: '100px',
              gridRow: '3',
            }}
          >
            <p
              className='number'
              style={{
                transform: 'rotate(90deg)',
                marginTop: '15px',
                marginRight: '5px',
              }}
            >
              {' '}
              {item.seatNumber}
            </p>
          </div>
        ))}
        {seats4.map((item, index) => (
          <div
            onClick={() => selectedSeat(item.seatNumber)}
            key={index}
            className={`seat${
              selected.includes(item.seatNumber) ? 'selected' : ''
            }${item.handicapSeat ? 'handicapSeat' : ''}${
              item.booked ? 'booked' : ''
            }`}
            style={{
              backgroundImage: "url('images/seat.png')",
              backgroundSize: '100% 100%',
              width: '50px',
              height: '50px',
              transform: 'rotate(270deg)',
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '9px',
              cursor: 'pointer',
              maxHeight: '100px',
              gridRow: '4',
            }}
          >
            <p
              className='number'
              style={{
                transform: 'rotate(90deg)',
                marginTop: '15px',
                marginRight: '5px',
              }}
            >
              {' '}
              {item.seatNumber}
            </p>
          </div>
        ))}
      </Row>
      <Row
        style={{ textAlign: 'center', paddingTop: '5%', marginBottom: '-4%' }}
      >
        <Col>
          <strong style={{ color: '#FFA500' }}>Orange</strong> = Handikapp
        </Col>
      </Row>
      <Row
        style={{ textAlign: 'center', paddingTop: '5%', marginBottom: '-4%' }}
      >
        <Col>
          <strong style={{ color: 'red' }}>Röd</strong> = Redan bokat
        </Col>
      </Row>
      <Row
        style={{ textAlign: 'center', paddingTop: '5%', paddingBottom: '5%' }}
      >
        <Col>
          <strong style={{ color: 'green' }}>Grön</strong> = Din bokning
        </Col>
      </Row>
      <Row
        style={{ textAlign: 'center', paddingTop: '0%', paddingBottom: '5%' }}
      >
        <Col
          style={{
            textAlign: 'center',
            paddingTop: '1%',
          }}
        >
          <div className='petWrapper'>
            <div
              style={{
                backgroundImage: `url(${
                  (trainId === 1 && carriage === 6) ||
                  (trainId === 2 && carriage === 5) ||
                  (trainId === 3 && carriage === 4)
                    ? `images/pet.png`
                    : 'images/no-pets.png'
                })`,
                backgroundSize: '100% 100%',
                width: '50px',
                height: '50px',
                display: 'flex',
              }}
            ></div>
          </div>
        </Col>
      </Row>
      <Button
        className='back-btn'
        style={{
          margin: '10px',
          paddingTop: '5%',
        }}
        onClick={() => setCarriage(0)}
      >
        TILLBAKA
      </Button>

      <Button
        className='to-payment-btn'
        disabled={travelerArray.length - selected.length}
        style={{ paddingTop: '5%' }}
      >
        <Link
          className='to-payment-btn-link'
          to={`/betala`}
          style={{ textDecoration: 'none' }}
          state={{
            startStation: startStation,
            endStation: endStation,
            arrivalTimeTo: arrivalTimeTo,
            departureTimeFrom: departureTimeFrom,
            timeTableId: timeTableId,
            trainId: trainId,
            trainNumber: trainNumber,
            date: date,
            travelerArray: travelerArray,
            rorderFrom: rorderFrom,
            rorderTo: rorderTo,
            selected: selected,
            carriage: carriage,
            price: carriage === 1 ? price.firstClass : price.secondClass,
            firstClass: carriage === 1 ? true : false,
            platformFrom: platformFrom,
            platformTo: platformTo,
          }}
        >
          Till BETALNING
        </Link>
      </Button>
    </Container>
  );
}
