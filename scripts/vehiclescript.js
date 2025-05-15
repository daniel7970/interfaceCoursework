const form = document.querySelector("form");
const buttons = document.querySelector("button");
const rego = document.getElementById("rego");
const message = document.getElementById("message");
const results = document.getElementById("results");
let vehicleSelected = [];

buttons.addEventListener("click", () => {
    if(rego.value === "")
    {
        message.textContent = "Error";
    }
    else
    {
        const allVehicles = fetchVehicleData(rego);
        allVehicles.then((data) => {
            if(data.length == 0) {
                message.textContent = "No result found";
                return;
            }
            else {
                clearPrevious(results);
                showVehicles(data, results);
                message.textContent = "Search successful";
            }
        });
    }
});

function clearPrevious(results) {
    while(vehicleSelected.length > 0) {
        vehicleSelected[0].removeChild(vehicleSelected[0].firstChild);
        results.removeChild(vehicleSelected[0]);
        vehicleSelected.shift();
    }
}

function showVehicles(data, results) {
    let i = 0;
    while(i < data.length)
    {
        const block = document.createElement("div");
        block.setAttribute("class", "info");
        vehicleSelected.push(block);
        const para = document.createElement("p");
        para.textContent = "platenumber: " + data[i].VehicleID;
        para.insertAdjacentHTML("beforeend", "<br/>");
        para.insertAdjacentText("beforeend", "make: " + data[i].Make);
        para.insertAdjacentHTML("beforeend", "<br/>");
        para.insertAdjacentText("beforeend", "model: " + data[i].Model);
        para.insertAdjacentHTML("beforeend", "<br/>");
        para.insertAdjacentText("beforeend", "Colour: " + data[i].Colour);
        if(data[i].OwnerID != null) {
            const owner = data[i].OwnerID -1;
            everyPerson = fetchAllPeople();
            everyPerson.then((oData) => {
                para.insertAdjacentHTML("beforeend", "<br/>");
                para.insertAdjacentText("beforeend", "owner: " + oData[owner].Name);
                para.insertAdjacentHTML("beforeend", "<br/>");
                para.insertAdjacentText("beforeend", "licensenumber: " + oData[owner].LicenseNumber);
            });
        }
        
        vehicleSelected[i].appendChild(para);
        results.appendChild(vehicleSelected[i]);
        i = i + 1;
    }
    
    message.textContent = "Search successful";
}