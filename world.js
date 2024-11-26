document.addEventListener("DOMContentLoaded", () => {
    const countryInput = document.querySelector("#country");
    const searchCountryBtn = document.querySelector("#lookup");
    const searchCityBtn = document.querySelector("#lookup-cities");
    const outputContainer = document.querySelector("#result");

    // Utility to reset output display
    const resetOutput = () => {
        outputContainer.innerHTML = "";
    };

    // Display an error in the result area
    const showError = (errorText) => {
        resetOutput();
        const errorElement = document.createElement("p");
        errorElement.textContent = errorText;
        errorElement.style.color = "crimson";
        outputContainer.appendChild(errorElement);
    };

    // Fetch data from the server and update the results
    const performLookup = (searchCities = false) => {
        const countryQuery = countryInput.value.trim();

        if (!countryQuery) {
            showError("Please provide a country name.");
            return;
        }

        const queryType = searchCities ? "&lookup=cities" : "";
        const requestURL = `world.php?country=${encodeURIComponent(countryQuery)}${queryType}`;

        fetch(requestURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server returned status: ${response.status}`);
                }
                return response.text();
            })
            .then((result) => {
                resetOutput();
                if (!result.trim()) {
                    showError("No data found for the given input.");
                } else {
                    outputContainer.innerHTML = result;
                }
            })
            .catch((err) => {
                console.error("Error occurred during lookup:", err);
                showError("Failed to retrieve information. Please try again later.");
            });
    };

    // Assign event handlers to buttons
    if (searchCountryBtn) {
        searchCountryBtn.addEventListener("click", () => performLookup(false));
    }
    if (searchCityBtn) {
        searchCityBtn.addEventListener("click", () => performLookup(true));
    }
});
