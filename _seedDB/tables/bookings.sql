CREATE TABLE bookings  (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  bookingId varchar(100) NOT NULL,
  fromDeparture varchar(100) NOT NULL,
  toDestination varchar(100) NOT NULL,
  rorderFrom int(11) NOT NULL,
  rorderTo int(11) NOT NULL,
  arrival varchar(100) NOT NULL,
  departure varchar(100) NOT NULL,
  price int(11) NOT NULL,
  seatId int(11) NOT NULL,
  carriageId int(11) NOT NULL,
  timeTableId int(11) NOT NULL,
  bdate varchar(100) not null,
  PRIMARY KEY (id)
);