// Mini-Project #7: Dynamic Destination Gallery

// 1. Create the destinations array
const destinations = [
    {
        name: "Paris, France",
        // category: "Cities",
        image: "images/France.jpg",
        description: "Known for its famous landmarks, beautiful streets, and delicious food.",
        details: "Visit the Eiffel Tower, try French croissants, and explore the Louvre Museum.",
        rating: 5,
        dateAdded: "2026-01-10"
    },
    {
        name: "Playa del Carmen, Mexico",
        // category: "Beaches",
        image: "images/Mexico.jpg",
        description: "Known for its beaches, shopping areas, water activities, and food.",
        details: "Enjoy snorkeling, try real Mexican food, and swim with dolphins.",
        rating: 5,
        dateAdded: "2026-02-15"
    },
    {
        name: "Los Angeles, California",
        // category: "Cities",
        image: "images/LosAngeles.jpg",
        description: "Known for its celebrity landmarks and the Hollywood Sign.",
        details: "Walk the Hollywood Walk of Fame, Visit the Hollywood Sign, and Explore Universal Studios.",
        rating: 4,
        dateAdded: "2026-03-05"
    },
    {
        name: "Orlando, Florida",
        // category: "Cities",
        image: "images/Florida.jpg",
        description: "Known for its amazing theme parks.",
        details: "Visit SeaWorld, Walt Disney World, and Disney Springs.",
        rating: 5,
        dateAdded: "2026-04-12"
    },
    {
        name: "Tokyo, Japan",
        // category: "Cities",
        image: "images/Japan.jpg",
        description: "Known for its technology, culture, and exciting attractions.",
        details: "Explore Shibuya Crossing, visit Senso-ji Temple, and explore Akihabara.",
        rating: 5,
        dateAdded: "2026-05-20"
    },
    {
        name: "New York, New York",
        // category: "Cities",
        image: "images/NewYork.jpg",
        description: "Known for the Statue of Liberty, Broadway, and shops.",
        details: "Visit Times Square, see the Statue of Liberty, and explore Central Park.",
        rating: 4,
        dateAdded: "2026-06-01"
    }
];

// 2. Find the gallery
const gallery = document.getElementById("destination-gallery");
const sortButton = document.getElementById("sort-az");

function getDestinationId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

// 3. Display destination cards
function displayDestinations(list) {
    if (!gallery) {
        console.error("Destination gallery was not found.");
        return;
    }
    gallery.innerHTML = "";
    list.forEach(destination => {
        const card = document.createElement("div");
        card.className = "destination-card";
        card.id = getDestinationId(destination.name);
        card.innerHTML = `
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}">
                <div class="image-overlay">
                    <h3>${destination.name}</h3>
                </div>
            </div>
            <div class="destination-info">
                <p>${destination.description}</p>
                <p class="extra-details" hidden>
                    ${destination.details}
                </p>
                <button type="button" class="details-button">
                    View Details
                </button>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// <p>${destination.category}</p>

// 4. View Details button
if (gallery) {
    gallery.addEventListener("click", function (event) {
        const button = event.target.closest(".details-button");
        if (!button) return;
        const card = button.closest(".destination-card");
        const details = card.querySelector(".extra-details");
        details.hidden = !details.hidden;
        button.textContent = details.hidden
            ? "View Details"
            : "Hide Details";
    });
}
// Sort destinations alphabetically
if (sortButton && gallery) {
    let isSortedAlphabetically = false;

    sortButton.addEventListener("click", function () {
        isSortedAlphabetically = !isSortedAlphabetically;

        if (isSortedAlphabetically) {
            const sortedDestinations = [...destinations].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            displayDestinations(sortedDestinations);
            sortButton.textContent = "Sort Original";
        } else {
            displayDestinations(destinations);
            sortButton.textContent = "Sort A-Z";
        }

    });
}
// 5. Display all destinations when page loads
if (gallery) {
    displayDestinations(destinations);

    const destinationId = window.location.hash.slice(1);
    if (destinationId) {
        const card = document.getElementById(destinationId);
        if (card) {
            const details = card.querySelector(".extra-details");
            const button = card.querySelector(".details-button");
            details.hidden = false;
            button.textContent = "Hide Details";
            card.scrollIntoView();
        }
    }
}

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

if (searchBar && searchButton) {
    function searchDestinations() {
        const searchValue = searchBar.value.toLowerCase().trim();

        if (!searchValue) {
            alert("Please enter a destination to search.");
            return;
        }

        const destination = destinations.find(item =>
            item.name.toLowerCase().includes(searchValue)
        );

        if (destination) {
            window.location.href = "destinations.html#" +
                getDestinationId(destination.name);
        } else {
            alert("Sorry! Destination not found. Please try another search.");
        }
    }

    searchButton.addEventListener("click", searchDestinations);

    searchBar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchDestinations();
        }
    });
}
