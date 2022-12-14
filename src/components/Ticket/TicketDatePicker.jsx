import React from 'react';
import Form from 'react-bootstrap/Form';

const TicketDatePicker = ({ setWeekend, setDate }) => {
  function checkweekday(e) {
    setDate(e);
    let day = new Date(e);
    let getdate = day.getUTCDay();
    if (getdate === 0 || getdate === 6) setWeekend(true);
    else {
      setWeekend(false);
    }
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control
            type='date'
            name='duedate'
            placeholder='Choose date of your departure'
            min='2022-01-01'
            onChange={(e) => checkweekday(e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
};
export default TicketDatePicker;
