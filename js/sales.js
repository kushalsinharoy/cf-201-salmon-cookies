/***********  Kushal Sinha Roy  **********************
Salmon Cookies Project - This js file would be used for
daily sales projection for salmon cookies accross 
different locations.
*******************************************************/
'use-strict';

// create variable for hours 
var workingHours = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

// define store variables
var salmonCookieStoreLocations = []; // define an array for all the locations.
var salmonCookieTotalCount = 0; // Total Cookies per location for each Hour.
var locationDetailsTable = document.getElementById('location_details_table');

/* Create the intake form for the location details */
var locationDetailsInputForm = document.getElementById('location_details_input_form');
var errorStatus = "N";

/**
 * Constructor function for instantiating location objects.
 * @param {*} location 
 * @param {*} minimumCustomers 
 * @param {*} maximumCustomers 
 * @param {*} averageCookiesPerCustomer 
 */
function SalmonCookieLocationDetails(location, minimumCustomers, maximumCustomers, averageCookiesPerCustomer) {
    this.location = location;
    this.minimumCustomers = minimumCustomers;
    this.maximumCustomers = maximumCustomers;
    this.averageCookiesPerCustomer = averageCookiesPerCustomer;
    this.averageCustomerHourlyArray = [];
    this.cookiesHourlyArray = [];
    this.totalCookiesLocation = 0;

    console.log("Inside Constructor Function" + location + minimumCustomers + maximumCustomers + averageCookiesPerCustomer);

    // Generate a random customers hourly
    this.generateRandomCustomersHourly = function (minimumCustomers, maximumCustomers) {
        for (var i = 0; i < workingHours.length; i++) {
            var randomCustomer = Math.floor(Math.random() * (maximumCustomers - minimumCustomers)) + minimumCustomers;
            this.averageCustomerHourlyArray.push(randomCustomer);
            console.log(randomCustomer);
        }
    };

    //Generate cookies sales hourly using average customers hourly
    this.generateCookiesHourly = function () {
        this.generateRandomCustomersHourly(minimumCustomers, maximumCustomers);
        for (var i = 0; i < workingHours.length; i++) {
            var CookiesPerHour = Math.ceil(this.averageCustomerHourlyArray[i] * this.averageCookiesPerCustomer);
            this.cookiesHourlyArray.push(CookiesPerHour);
            this.totalCookiesLocation += CookiesPerHour;
            console.log(workingHours[i] + ' ' + this.cookiesHourlyArray[i]);
        }
        console.log(this.totalCookiesLocation);
    };

    //Push the location objects
    salmonCookieStoreLocations.push(this);
    console.log("Length : " + salmonCookieStoreLocations.length);

    // Create render function
    this.render = function () {
        this.generateCookiesHourly();
        var createTableForEachLocation = document.getElementById('salestable');

        //Start - Create row element
        var newRowValue = document.createElement('tr');
        var locationName = this.location;
        newRowValue.id = locationName;
        newRowValue.innerText = locationName;
        createTableForEachLocation.appendChild(newRowValue);
        //End - Create Row Element

        for (var j = 0; j <= this.cookiesHourlyArray.length; j++) {
            if (j < this.cookiesHourlyArray.length) {
                var nameOfLocation = document.getElementById(locationName);
                var newColumnValue = document.createElement('td');
                var columnValue = this.cookiesHourlyArray[j];
                newColumnValue.innerText = columnValue;
                nameOfLocation.appendChild(newColumnValue);
            }
            else {
                var nameOfLocation = document.getElementById(locationName);
                var totalCountDataColumn = document.createElement('td');
                var totString = this.totalCookiesLocation;
                totalCountDataColumn.innerText = totString;
                nameOfLocation.appendChild(totalCountDataColumn);
            }
        }
    };
}; // End Create of Constructor Function

/**
 * Instantiate the location objects based on the form input, 
 * call form validations, and render functions.
 * @param {*} event 
 */
function salmonCookieLocationInputFormData(event) {
    event.preventDefault();

    var locationNameForm = event.target.locationName.value;
    var minimumCustomersForm = event.target.minimumCustomers.value;
    var maximumCustomersForm = event.target.maximumCustomers.value;
    var averageCookieSalesForm = event.target.averageCookiesPerCustomer.value;

    //Instantiate the object
    var newStore = new SalmonCookieLocationDetails(locationNameForm, minimumCustomersForm, maximumCustomersForm, averageCookieSalesForm);

    //Call form validation functions
    validateDuplicateLocation(salmonCookieStoreLocations);
    validateSpecialCharacters(salmonCookieStoreLocations);

    //Call only if error status is N
    if (errorStatus === "N") {
        newStore.render();
        createTable();
        createSalesFooter();
        locationDetailsInputForm.reset();
    }
}

/**
 * Create Table for storing the form inputs.
 */
function createTable() {
    var row;
    for (var i = 0; i < salmonCookieStoreLocations.length; i++) {
        row = document.createElement('tr');
        row.innerHTML =
            '<td>' + salmonCookieStoreLocations[i].location + '</td>' +
            '<td>' + salmonCookieStoreLocations[i].minimumCustomers + '</td>' +
            '<td>' + salmonCookieStoreLocations[i].maximumCustomers + '</td>' +
            '<td>' + salmonCookieStoreLocations[i].averageCookiesPerCustomer + '</td>'
        console.log("Create Table" + salmonCookieStoreLocations[i].locationName);
    }
    locationDetailsTable.appendChild(row);
}

/**
 * Validate Duplicate Location in the form.
 * @param {*} salmonCookieStoreLocations 
 */
function validateDuplicateLocation(salmonCookieStoreLocations) {
    errorStatus = "N"; //reset error status
    var locationArrayLength = salmonCookieStoreLocations.length;
    if (locationArrayLength > 1) {
        try {
            for (var i = 0; i < locationArrayLength - 1; i++) {
                if (salmonCookieStoreLocations[locationArrayLength - 1].location === salmonCookieStoreLocations[i].location) {
                    errorStatus = "Y";
                    salmonCookieStoreLocations.length = salmonCookieStoreLocations.length - 1; //delete the duplicate from array
                    throw (salmonCookieStoreLocations[i].location + " is a duplicate location.");
                }
            }
        }
        catch (e) {
            alert("Error :" + e);
        }
    }
}

/**
 * Validate Special characters in the location.
 * @param {*} salmonCookieStoreLocations 
 */
function validateSpecialCharacters(salmonCookieStoreLocations) {
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    var locationArrayLength = salmonCookieStoreLocations.length - 1;
    alert(salmonCookieStoreLocations[locationArrayLength].location);
    try {
        if (pattern.test(salmonCookieStoreLocations[locationArrayLength].location)) {
            errorStatus = "Y";
            salmonCookieStoreLocations.length = salmonCookieStoreLocations.length - 1; //delete the duplicate from array
            throw ("Please only use standard alphanumerics");
        }
    }
    catch (e) {
        alert("Error :" + e);
    }
}

/**
 * Create Sales Header Function
 */
var createSalesHeader = function () {
    // Main element
    var mainLocationDetailsTable = document.getElementById('salmonCookieSalesTable');
    var table = document.createElement('table');
    mainLocationDetailsTable.appendChild(table);
    table.id = 'salestable';

    var insideMainLocationDetailsTable = document.getElementById('salestable');
    var newRow = document.createElement('tr');
    newRow.id = 'heading';
    insideMainLocationDetailsTable.appendChild(newRow);

    var headerLocation = document.getElementById('heading');
    var newTh = document.createElement('th');
    headerLocation.appendChild(newTh);

    //Create headers for the Working Hours.
    for (var i = 0; i < workingHours.length; i++) {
        if (i < workingHours.length) {
            var newTh = document.createElement('th');
            var newString = workingHours[i];
            newTh.innerText = newString;
            headerLocation.appendChild(newTh);
        }
    }

    // Create the Total Header.
    var headerTotal = document.createElement('th');
    var salesTotalString = 'Total';
    headerTotal.innerText = salesTotalString;
    headerLocation.appendChild(headerTotal);
};

/**
 * Hourly Sales Total function
 */
var calculateHourlySalesTotal = function () {
    salmonCookieTotalCount = 0;
    for (var i = 0; i < workingHours.length; i++) {
        //Initialize hourly Totals to 0
        var hourlyTotalSalesPerLocation = 0;
        for (var j = 0; j < salmonCookieStoreLocations.length; j++) {
            hourlyTotalSalesPerLocation += salmonCookieStoreLocations[j].cookiesHourlyArray[i];
            console.log("Hourly Total" + hourlyTotalSalesPerLocation);
        }
        var footerColumnTotalValue = document.getElementById('footer');
        var columnValue = document.createElement('td');
        columnValue.innerText = hourlyTotalSalesPerLocation;
        footerColumnTotalValue.appendChild(columnValue);
        salmonCookieTotalCount += hourlyTotalSalesPerLocation;

        console.log(salmonCookieTotalCount);
    }
};

/**
 * Create sales footer function.
 */
var createSalesFooter = function () {
    var insideTable = document.getElementById('salestable');
    let table = document.querySelector('table');
    var rowValue = document.createElement('tr');

    if (salmonCookieStoreLocations.length > 1) {
        console.log("Delete Hourly Row" + (salmonCookieStoreLocations.length));
        table.deleteRow(salmonCookieStoreLocations.length);
    }
    rowValue.id = 'footer';
    insideTable.appendChild(rowValue);

    var footerLocation = document.getElementById('footer');
    var columnValue = document.createElement('td');
    columnValue.innerText = 'Hourly Totals';
    footerLocation.appendChild(columnValue);

    // Call the Hourly Sales Total
    calculateHourlySalesTotal();

    var footerColumnTotalValue = document.createElement('td');
    footerColumnTotalValue.innerText = salmonCookieTotalCount;
    footerLocation.appendChild(footerColumnTotalValue);
};

// 1. Call the Sales Header
createSalesHeader();

// 2. Call the input form data
locationDetailsInputForm.addEventListener('submit', salmonCookieLocationInputFormData);
