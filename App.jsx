import React, { useState } from "react";
import "./App.css";

const ReservationSystem = () => {
    const totalSeats = 50;
    const [seatsLeft, setSeatsLeft] = useState(totalSeats);
    const [reservations, setReservations] = useState([]);

    const handleReserve = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const phone = event.target.phone.value;
        const guestCount = parseInt(event.target.guestCount.value);

        if (guestCount > seatsLeft) {
            alert("Not enough seats available!");
            return;
        }

        const newReservation = {
            name,
            phone,
            guestCount,
            checkInTime: new Date().toLocaleTimeString(),
            checkOutTime: null,
        };

        setReservations([...reservations, newReservation]);
        setSeatsLeft(seatsLeft - guestCount);
        event.target.reset();
    };

    const handleCheckout = (index) => {
        const updatedReservations = [...reservations];
        if (!updatedReservations[index].checkOutTime) {
            updatedReservations[index].checkOutTime = new Date().toLocaleTimeString();
            setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
        }
        setReservations(updatedReservations);
    };

    const handleDelete = (index) => {
        const deletedReservation = reservations[index];
        let updatedSeatsLeft = seatsLeft;

        if (!deletedReservation.checkOutTime) {
            updatedSeatsLeft += deletedReservation.guestCount;
        }

        setReservations(reservations.filter((_, i) => i !== index));
        setSeatsLeft(updatedSeatsLeft);
    };

    const getBarColor = () => {
        if (seatsLeft > 50) return "green";
        if (seatsLeft > 20) return "orange";
        return "red";
    };

    return (
        <div className="container">
            <h2>Restaurant Reservation System</h2>
            <p>Seats Left: <span id="seatsLeft">{seatsLeft}</span></p>
            
            <div className="bar-container">
                <div id="seatBar" className="seat-bar" 
                    style={{ width: `${(seatsLeft / totalSeats) * 100}%`, backgroundColor: getBarColor() }}>
                </div>
            </div>

            <form id="reservationForm" onSubmit={handleReserve}>
                <input type="text" name="name" placeholder="Name" required />
                <input type="tel" name="phone" placeholder="Phone Number" required />
                <input type="number" name="guestCount" placeholder="Guest Count" required />
                <button type="submit">Reserve</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Guest Count</th>
                        <th>Check-in Time</th>
                        <th>Checkout Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res, index) => (
                        <tr key={index}>
                            <td>{res.name}</td>
                            <td>{res.phone}</td>
                            <td>{res.guestCount}</td>
                            <td>{res.checkInTime}</td>
                            <td>{res.checkOutTime || "-"}</td>
                            <td>
                                {!res.checkOutTime && (
                                    <button className="checkout-btn" onClick={() => handleCheckout(index)}>Checkout</button>
                                )}
                                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationSystem;
