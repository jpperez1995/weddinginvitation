const API_URL = "https://script.google.com/macros/s/AKfycbxjfTVfR9-Nx5CEZKcz9agMUaVKoWrKDf36uxqmUCSfnL9tfum-Y-NPT3HPRbhnqw2xJQ/exec";

// Read the guest ID from the URL
const params = new URLSearchParams(window.location.search);
const guestId = params.get("id");

// Make sure an ID exists
if (!guestId) {

    document.getElementById("guestName").textContent =
        "Invitation link is invalid.";

    throw new Error("Missing guest ID");

}

// Fetch guest information
fetch(`${API_URL}?id=${guestId}`)
    .then(response => response.json())
    .then(data => {

        if (!data.success) {

            document.getElementById("guestName").textContent =
                "Guest not found.";

            return;

        }

        // Display guest name
        document.getElementById("guestName").textContent = data.name;

        // Display reserved seats
        document.getElementById("reservedSeats").textContent = data.seats;

        // Populate the Number Attending dropdown
        const dropdown = document.getElementById("attendingSeats");

        dropdown.innerHTML = "";

        for (let i = 1; i <= data.seats; i++) {

            const option = document.createElement("option");

            option.value = i;
            option.textContent = i;

            dropdown.appendChild(option);

        }

    })
    .catch(error => {

        console.error(error);

        document.getElementById("guestName").textContent =
            "An error occurred while submitting your RSVP.";

    });
	
document
.getElementById("rsvpForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const attendance =
        document.getElementById("attendance").value;

    const attendingSeats =
        document.getElementById("attendingSeats").value;


    fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            id:guestId,

            attendance:attendance,

            attendingSeats:attendingSeats


        })

    })

    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            document.getElementById("status").innerHTML =
                "Thank you! Your RSVP has been received.";

        }

        else{

            document.getElementById("status").innerHTML =
                "Unable to save RSVP.";

        }

    });

});

const attendance = document.getElementById("attendance");
const seats = document.getElementById("attendingSeats");

attendance.addEventListener("change", () => {

    if (attendance.value === "No") {

        seats.value = "0";
        seats.disabled = true;

    } else {

        seats.disabled = false;

    }

});