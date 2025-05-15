const form = document.querySelector("form");
const buttons = document.querySelector("button");
const dname = document.getElementById("name");
const license = document.getElementById("license");
const message = document.getElementById("message");
const results = document.getElementById("results");
let peopleSelected = [];

buttons.addEventListener("click", () => {
    if(dname.value === "" && license.value === "")
    {

        message.textContent = "Error";
    }
    else if(dname.value != "" && license.value != "")
    {

        message.textContent = "Error";
    }
    else
    {
        const allPeople = fetchPeopleData(dname, license);
        allPeople.then((data) => {
            if(data.length == 0) {
                message.textContent = "No result found";
                return;
            }
            else {
                clearPrevious(results);
                addPeople(allPeople, results);
                message.textContent = "Search successful";
            }
        });
    }
});

function clearPrevious(results) {
    while(peopleSelected.length > 0) {
        peopleSelected[0].removeChild(peopleSelected[0].firstChild);
        results.removeChild(peopleSelected[0]);
        peopleSelected.shift();
    }
}

function addPeople(allPeople, results) {
    allPeople.then((data) => {
        let i = 0;
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
            results.appendChild(peopleSelected[i]);
            i = i + 1;
        }
    });
}