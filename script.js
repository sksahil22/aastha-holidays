
/* =========================================
   AASTHA HOLIDAYS
   WEBSITE INTERACTIONS
========================================= */


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


// CLOSE MOBILE MENU AFTER CLICK

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// 2. HEADER SCROLL EFFECT

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    header.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

});


// 3. SCROLL REVEAL ANIMATION

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// 4. BOOKING MODAL ELEMENTS

const modal = document.getElementById("bookingModal");

const closeModal = document.getElementById("closeModal");

const modalBackdrop = document.getElementById("modalBackdrop");

const loginStep = document.getElementById("loginStep");

const bookingStep = document.getElementById("bookingStep");

const bookingSuccess = document.getElementById("bookingSuccess");

const modalFootnote = document.getElementById("modalFootnote");

let selectedPackage = "";

let customerDetails = {};


// 5. OPEN BOOKING MODAL

function openBooking(packageName = "General Travel Enquiry") {

    selectedPackage = packageName;

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    loginStep.hidden = false;

    bookingStep.hidden = true;

    bookingSuccess.hidden = true;

    modalFootnote.style.display = "block";

    document.getElementById("loginForm").reset();

    document.getElementById("bookingForm").reset();

    document.getElementById("bookingService").value = "";

    document.getElementById("bookingDestination").value =
        packageName;

    document.getElementById("bookingDate").value = "";

    document.getElementById("travellers").value = "2 Travellers";

    setTimeout(() => {

        document.getElementById("customerName").focus();

    }, 200);

}


// 6. CLOSE BOOKING MODAL

function hideBooking() {

    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

}


closeModal.addEventListener("click", hideBooking);

modalBackdrop.addEventListener("click", hideBooking);


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        hideBooking();

    }

});


// 7. ALL BOOKING BUTTONS

document.querySelectorAll("[data-book]").forEach(button => {

    button.addEventListener("click", () => {

        openBooking(button.dataset.book);

    });

});


// 8. QUICK DESTINATION SEARCH

document.getElementById("quickSearch").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const destination = document.getElementById(
            "destinationSearch"
        ).value.trim();

        const travelType = document.getElementById(
            "travelType"
        ).value;

        const travelDate = document.getElementById(
            "travelDate"
        ).value;


        openBooking(travelType);

        document.getElementById("bookingService").value =
            travelType;

        document.getElementById("bookingDestination").value =
            destination;

        document.getElementById("bookingDate").value =
            travelDate;

    }
);


// 9. FILTER TOUR PACKAGES

const filterButtons = document.querySelectorAll(".filter-btn");

const packageCards = document.querySelectorAll(".package-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(item => {

            item.classList.remove("active");

        });

        button.classList.add("active");


        packageCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                filter === "all" || category === filter;

            card.classList.toggle(
                "filtered-out",
                !shouldShow
            );

        });

    });

});


// 10. DETECT PACKAGE SERVICE TYPE

function getSuggestedService(packageName) {

    const name = packageName.toLowerCase();

    if (
        name.includes("train")
    ) {

        return "Train Booking";

    }

    if (
        name.includes("hotel")
    ) {

        return "Hotel Booking";

    }

    if (
        name.includes("flight")
    ) {

        return "Flight Booking";

    }

    if (
        name.includes("international") ||
        name.includes("bali") ||
        name.includes("dubai") ||
        name.includes("thailand") ||
        name.includes("maldives")
    ) {

        return "International Tour";

    }

    if (
        name.includes("domestic") ||
        name.includes("goa") ||
        name.includes("manali") ||
        name.includes("kashmir") ||
        name.includes("kerala")
    ) {

        return "Domestic Tour";

    }

    return "Custom Holiday Package";

}


// 11. CUSTOMER DETAILS - STEP ONE

document.getElementById("loginForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name = document.getElementById(
            "customerName"
        ).value.trim();

        const phone = document.getElementById(
            "customerPhone"
        ).value.trim();


        if (!/^[0-9]{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;

        }


        customerDetails = {

            name: name,

            phone: phone

        };


        document.getElementById("welcomeName").textContent =
            name;


        document.getElementById("bookingService").value =
            getSuggestedService(selectedPackage);

        document.getElementById("bookingDestination").value =
            selectedPackage;


        loginStep.hidden = true;

        bookingStep.hidden = false;

        document.getElementById("bookingService").focus();

    }
);


// 12. TRAVEL DETAILS - STEP TWO

document.getElementById("bookingForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const service = document.getElementById(
            "bookingService"
        ).value;

        const destination = document.getElementById(
            "bookingDestination"
        ).value.trim();

        const date = document.getElementById(
            "bookingDate"
        ).value;

        const travellers = document.getElementById(
            "travellers"
        ).value;

        const message = document.getElementById(
            "bookingMessage"
        ).value.trim();


        // DEMO ENQUIRY OBJECT

        const enquiry = {

            customer: customerDetails.name,

            phone: customerDetails.phone,

            service: service,

            destination: destination,

            travelDate: date,

            travellers: travellers,

            message: message,

            submittedAt: new Date().toISOString()

        };


        // DEMO ONLY:
        // This data is visible in browser console.
        // No email or database is connected.

        console.log(
            "AASTHA HOLIDAYS - DEMO ENQUIRY:",
            enquiry
        );


        // SHOW SUCCESS SCREEN

        bookingStep.hidden = true;

        bookingSuccess.hidden = false;

        modalFootnote.style.display = "none";


        document.getElementById("successNote").textContent =

            `Thank you ${customerDetails.name}. Your ${service} enquiry for ${destination} has been prepared. This is a demonstration and your enquiry has not been sent to the company.`;


    }
);


// 13. CLOSE AFTER SUCCESS

document.getElementById("finishBooking").addEventListener(
    "click",
    hideBooking
);


// 14. PREVENT PAST TRAVEL DATES

const today = new Date();

const localDate = new Date(

    today.getTime() - today.getTimezoneOffset() * 60000

).toISOString().split("T")[0];


document.getElementById("travelDate").min = localDate;

document.getElementById("bookingDate").min = localDate;


// 15. COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// =========================================
// END OF AASTHA HOLIDAYS JAVASCRIPT
// =========================================
