import React from 'react';
import '../../../scss/main.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { carriageWithSeats, tickets } from '../../utilities/RouteStations';
import { factory } from '../../utilities/FetchHelper';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
const { ticket } = factory;
export default function Carriage({ carriage, props, setCarriage, trainId }) {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState({});
  let { timeTableId, arrivalTimeTo, departureTimeFrom, Date } = props;

  useEffect(() => {
    async function fetchData() {
      // gets the tickets from database
      let getTickets = await tickets();
      //gets carriagesWithSeats
      let carriages = await carriageWithSeats();
      carriages = carriages.filter(
        (x) => x.carriage === carriage && x.trainId === trainId
      );
      console.log(carriages);

      console.log(getTickets);

      if (getTickets.length) {
        carriages.forEach((x) => {
          getTickets.forEach((e) => {
            if (
              x.seatNumber === e.seatId &&
              x.carriage === e.carriageId &&
              e.timeTableId === timeTableId &&
              e.bdate.slice(0, 10) === Date
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

    fetchData();
  }, []);

  async function book() {
    let test = {
      arrival: arrivalTimeTo,
      departure: departureTimeFrom,
      price: 22,
      bookingId: 1,
      seatId: selected,
      carriageId: carriage,
      timeTableId: timeTableId,
      bdate: Date,
    };
    let newBooking = new ticket(test);
    await newBooking.save();
  }

  function selectedSeat(seat) {
    setSelected(seat);
  }

  return (
    <Container>
      <Row>
        {seats.map((item, i) => (
          <Col
            className='test'
            style={{
              backgroundColor: item.booked ? 'gray' : 'green',
            }}
            key={i}
            onClick={() => selectedSeat(item.seatNumber)}
          >
            {item.seatNumber}
          </Col>
        ))}
      </Row>
      <Button className='secondary' onClick={book}>
        BOKA
      </Button>
      <Button
        className='secondary'
        style={{
          margin: '10px',
        }}
        onClick={() => setCarriage(0)}
      >
        TILLBAKA
      </Button>
    </Container>
  );
}
