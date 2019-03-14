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

    // Generate a random customers hourly
    this.generateRandomCustomersHourly = function (minimumCustomers, maximumCustomers) {
        for (var i = 0; i < workingHours.length; i++) {
            var randomCustomer = Math.floor(Math.random() * (maximumCustomers - minimumCustomers)) + minimumCustomers;
            this.averageCustomerHourlyArray.push(randomCustomer);
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

    // Create render function
    this.render = function () {
        this.generateCookiesHourly();
        var createTableForEachLocation = document.getElementById('table');

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

//Instantiate the Location objects.
var pikePlaceStore = new SalmonCookieLocationDetails('1st and Pike', 23, 65, 6.3);
var seatacAirportStore = new SalmonCookieLocationDetails('Seatac Airport', 3, 24, 1.2);
var seattleCenterStore = new SalmonCookieLocationDetails('Seattle Center', 11, 38, 3.7);
var capitolHillStore = new SalmonCookieLocationDetails('Capitol Hill', 20, 38, 2.3);
var alkiStore = new SalmonCookieLocationDetails('Alki', 2, 16, 4.6);

/**
 * Create Sales Header Function
 */
var createSalesHeader = function () {
    // Main element
    var mainLocationDetailsTable = document.getElementById('salmonCookieSalesTable');
    var table = document.createElement('table');
    mainLocationDetailsTable.appendChild(table);
    table.id = 'table';

    var insideMainLocationDetailsTable = document.getElementById('table');
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
 * Create sales footer function
 */
var createSalesFooter = function () {

    var insideTable = document.getElementById('table');
    var rowValue = document.createElement('tr');
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

// 2. Populate the Sales Table
for (var i = 0; i < salmonCookieStoreLocations.length; i++) {
    //Append each locations render functions
    salmonCookieStoreLocations[i].render();
}

// 3. Populate the Sales Footer
createSalesFooter();
