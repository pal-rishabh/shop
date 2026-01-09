let selectedSlot = "";
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

const dateInput = document.querySelector('input[type="date"]');

// jab date select ho
dateInput.addEventListener("change", updateSlots);

function updateSlots() {
  selectedSlot = "";
  document.querySelectorAll(".slot").forEach(btn => {
    btn.classList.remove("active");
    btn.disabled = false;
    btn.style.opacity = "1";

    const selectedDate = dateInput.value;

    if (bookings.some(b => b.date === selectedDate && b.slot === btn.innerText)) {
      btn.disabled = true;
      btn.style.opacity = "0.4";
    }
  });
}

// slot select
document.querySelectorAll(".slot").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    document.querySelectorAll(".slot").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSlot = btn.innerText;
  });
});

// form submit
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!dateInput.value) {
    alert("Please select date");
    return;
  }

  if (!selectedSlot) {
    alert("Please select time slot");
    return;
  }

  // safety check
  if (bookings.some(b => b.date === dateInput.value && b.slot === selectedSlot)) {
    alert("This slot is already booked ❌");
    updateSlots();
    return;
  }

  const booking = {
    name: e.target[0].value,
    phone: e.target[1].value,
    service: e.target[2].value,
    barber: e.target[3].value,
    date: e.target[4].value,
    slot: selectedSlot
  };

  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert(
    "Booking Confirmed ✅\n\n" +
    "Please pay ₹50 advance at shop.\n" +
    "Show this booking at counter."
  );
  document.getElementById("waBtn").style.display = "block";

document.getElementById("waBtn").onclick = () => {
  window.open(`https://wa.me/91${booking.phone}?text=${message}`, "_blank");
};

  const message =
  `New Booking ✅%0A` +
  `Name: ${booking.name}%0A` +
  `Phone: ${booking.phone}%0A` +
  `Service: ${booking.service}%0A` +
  `Barber: ${booking.barber}%0A` +
  `Date: ${booking.date}%0A` +
  `Time: ${booking.slot}%0A` +
  `Advance: ₹50`;

const shopNumber = "918287521139"; // yaha shop ka WhatsApp number

window.open(`https://wa.me/${shopNumber}?text=${message}`, "_blank");


  e.target.reset();
  selectedSlot = "";
  updateSlots();
});
