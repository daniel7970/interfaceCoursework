const rego = document.getElementById("rego");
const make = document.getElementById("make");
const model = document.getElementById("model");
const colour = document.getElementById("colour");
const owner = document.getElementById("owner");
const check = document.getElementById("check");
const message = document.getElementById("message");
const results = document.getElementById("owner-results");
const newOwner = document.getElementById("newowner");
const addVehicle = document.getElementById("addv");
const newForm = document.getElementById("newform");
const messageVehicle = document.getElementById("message-vehicle");
let peopleSelected = [];

let personChosen = [0, ""];

owner.addEventListener("keyup", () => {
    if(owner.value != "") {
        check.disabled = false;
    }
    else {
        check.disabled = true;
    }
});

check.addEventListener("click", () => {
    newOwner.disabled = false;
    const checkPeopleData = fetchPeopleData(owner, "");
    checkPeopleData.then((data) => {
        if(data.length == 0) {
            message.textContent = "No result found";
        }
        else {
            clearPrevious(results);
            addPeople(checkPeopleData, results);
            message.textContent = "Search successful";
        }
    });
});

newOwner.addEventListener("click", () => {
    if(newForm.children.length == 0)
    {
        newForm.innerHTML +=
        `<form>
            <label for="name">name</label>
            <input type="text" id="name" name="name"><br>
            <label for="address">address</label>
            <input type="text" id="address" name="address"><br>
            <label for="dob">dob</label>
            <input type="text" id="dob" name="dob"><br>
            <label for="license">license</label>
            <input type="text" id="license" name="license"><br>
            <label for="expire">expiration date</label>
            <input type="text" id="expire" name="expire"><br>
            <button type="button" id="addowner">Add owner</button>
        </form>
        <p id = message-owner></p>`;
        const addOwner = document.getElementById("addowner");
        const messageOwner = document.getElementById("message-owner");
        addOwner.addEventListener("click", () => {
            messageOwner.textContent = "Error! add owner not added";
        });
    }
});

addVehicle.addEventListener("click", () => {
    if(personChosen[0] == 0) {messageVehicle.textContent = "Error";}
    else if(rego.value == "" ) {messageVehicle.textContent = "Error";}
    else if(make.value == "") {messageVehicle.textContent = "Error";}
    else if(model.value == "") {messageVehicle.textContent = "Error";}
    else if(colour.value == "") {messageVehicle.textContent = "Error";}
    else {
        const checkVehicleData = fetchRego(rego);
        checkVehicleData.then((data) => {
            if(data.length == 0) {
                insertVehicle(rego, make, model, colour, personChosen[0]);
                messageVehicle.textContent = "Vehicle added successfully";
            }
            else {
                messageVehicle.textContent = "Error";
            }

        });
    }
});

function clearPrevious(results) {
    while(peopleSelected.length > 0) {
        peopleSelected[0].removeChild(peopleSelected[0].lastChild);
        peopleSelected[0].removeChild(peopleSelected[0].firstChild);
        results.removeChild(peopleSelected[0]);
        peopleSelected.shift();
    }
}

function addPeople(allPeople, results) {
    allPeople.then((data) => {
        let i = 0;
        let temp = [0, ""];
        while(i < data.length)
        {
            const block = document.createElement("div");
            block.setAttribute("class", "info");
            peopleSelected.push(block);
            const para = document.createElement("p");
            para.textContent = "personid: " + data[i].PersonID;
            para.insertAdjacentHTML("beforeend", "<br/>");
            para.insertAdjacentText("beforeend", "name: " + data[i].Name);
            para.insertAdjacentHTML("beforeend", "<br/>");
            para.insertAdjacentText("beforeend", "address: " + data[i].Address);
            para.insertAdjacentHTML("beforeend", "<br/>");
            para.insertAdjacentText("beforeend", "dob: " + data[i].DOB);
            para.insertAdjacentHTML("beforeend", "<br/>");
            para.insertAdjacentText("beforeend", "licensenumber: " + data[i].LicenseNumber);
            para.insertAdjacentHTML("beforeend", "<br/>");
            para.insertAdjacentText("beforeend", "expirydate: " + data[i].ExpiryDate);
            peopleSelected[i].appendChild(para);

            const selectButton = document.createElement("button");
            selectButton.setAttribute("type", "button");
            selectButton.textContent = "Select owner";
            let tempID = data[i].PersonID;
            let tempName = data[i].Name;
            selectButton.addEventListener("click", function () {selectChosen(tempID, tempName);});
            peopleSelected[i].appendChild(selectButton);
            results.appendChild(peopleSelected[i]);
            i = i + 1;
        }
    });
    
    message.textContent = "Search successful";
}

function selectChosen(personId, personName) {
    personChosen[0] = personId;
    personChosen[1] = personName;
}