// function searchLocation(event) {
//     event.preventDefault(); // Prevent form submission
  
//     const location = document.getElementById("search-input").value.trim();
//     if (location) {
//       // Send request to the server to fetch results or filter the results directly in the frontend
//       fetch(`/search?location=${location}`)
//         .then(response => response.json())
//         .then(data => {
//           // Display the results
//           displayResults(data);
//         })
//         .catch(error => console.error("Error fetching search results:", error));
//     }
//   }
  
//   function displayResults(data) {
//     // You can update your page to display the search results dynamically here
//     console.log(data);
//   }
  

function searchLocation(event) {
    event.preventDefault(); // Prevent the form from submitting

    const location = document.getElementById("search-input").value.trim();
    if (location) {
        const resultsContainer = document.getElementById("results-container");
        const mainContent = document.getElementById("main-content");
        
        // Show loading message
        resultsContainer.innerHTML = "<p>Loading results...</p>";
        resultsContainer.style.display = "block"; // Show results container

        // Fetch results from the server
        fetch(`/search?location=${location}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                resultsContainer.innerHTML = "<p>Error fetching results.</p>";
            });
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById("results-container");
    const mainContent = document.getElementById("main-content");

    // Clear previous results
    resultsContainer.innerHTML = ""; 
    mainContent.style.display = "none"; // Hide main content

    if (data.length === 0) {
        resultsContainer.innerHTML = "<p>No results found for this location.</p>";
        resultsContainer.style.display = "block"; // Show results
        return;
    }

    // Loop through the data array and create HTML elements for each result
    data.forEach(item => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("result-item", "card", "mb-4", "shadow-sm");

        resultElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${item.image.url}" class="img-fluid rounded-start" alt="${item.title}" style="object-fit: cover; height: 200px;">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text"><small class="text-muted">Location: ${item.location}, ${item.country}</small></p>
                        <p class="card-text">Price: ₹${item.price.toLocaleString("en-IN")}/night</p>
                        <a href="/listing/${item._id}" class="btn btn-primary">View Listing</a>
                    </div>
                </div>
            </div>
        `;

        // Append the result item to the container
        resultsContainer.appendChild(resultElement);
    });

    resultsContainer.style.display = "block"; // Show the results
}



//   function showMainContent() {
//     const resultsContainer = document.getElementById("results-container");
//     const mainContent = document.getElementById("main-content");
//     mainContent.style.display = "block"; // Show main content
//     resultsContainer.style.display = "none"; // Hide results
//   }
  