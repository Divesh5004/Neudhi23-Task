// User Register API
async function makeApiCall() {
  try {
    const username = document.getElementById('username-input').value;
    const orgName = document.getElementById('org-input').value;

    let data = JSON.stringify({
      "username": username,
      "orgName": orgName
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);
    const responseData = response.data;

    // Clear any existing table
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';

    // Create the table element
    const table = document.createElement('table');
    table.classList.add('data-table');

    // Create the table headers
    const headers = Object.keys(responseData);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create the table rows
    const row = document.createElement('tr');
    headers.forEach(header => {
      const cell = document.createElement('td');
      cell.textContent = responseData[header];
      row.appendChild(cell);
    });
    table.appendChild(row);

    // Append the table to the container
    tableContainer.appendChild(table);
  } catch (error) {
    console.log(error);
  }
}


//   readasset api
async function readasset() {
  try {
    const arg = document.getElementById('asset').value;
    let data = JSON.stringify({
      "fcn": "ReadAsset",
      "chaincodeName": "token_erc20",
      "channelName": "mychannel",
      "args": [arg]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/channels/mychannel/chaincodes/token_erc20?fcn=ReadAsset',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY0MTU5OTEsInVzZXJuYW1lIjoicmFqIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2ODYzNzk5OTF9.xO1Y3ZgNare_DLxXTEXI0veObJzEwQqmeZ69KFVPEL0'
      },
      data: data
    };

    const response1 = await axios.request(config);
    const responseData1 = response1.data.result.result;

    const table = document.createElement('table');
    table.classList.add('my-table'); // Add class name to table

    const headers = Object.keys(responseData1);
    const headerRow = table.insertRow();
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      th.classList.add('my-header'); // Add class name to table headers
      headerRow.appendChild(th);
    });

    const dataRow = table.insertRow();
    Object.values(responseData1).forEach(value => {
      const cell = dataRow.insertCell();
      cell.textContent = value;
      cell.classList.add('my-cell'); // Add class name to table cells
    });

    document.getElementById('result').innerHTML = '';
    document.getElementById('result').appendChild(table);
  } catch (error) {
    console.log(error);
  }
}



// getasset api
async function getasset() {
  try {
    let data = JSON.stringify({
      "fcn": "GetAllAssets",
      "chaincodeName": "token_erc20",
      "channelName": "mychannel",
      "args": [""]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/channels/mychannel/chaincodes/token_erc20?fcn=GetAllAssets',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY0MTU5OTEsInVzZXJuYW1lIjoicmFqIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2ODYzNzk5OTF9.xO1Y3ZgNare_DLxXTEXI0veObJzEwQqmeZ69KFVPEL0'
      },
      data: data
    };

    const response1 = await axios.request(config);
    const responseData1 = response1.data.result.result; // Extract the result array from the response data

    // Create the table
    const table = document.createElement('table');
    table.classList.add('result-table');

    // Create the table headers
    const headers = Object.keys(responseData1[0].Record);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the table rows with data
    responseData1.forEach(item => {
      const row = document.createElement('tr');
      Object.values(item.Record).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    document.getElementById('result1').innerHTML = ''; // Clear the existing content
    document.getElementById('result1').appendChild(table);
  } catch (error) {
    console.log(error);
  }
}



//   DeleteAsset api

async function DeleteAsset() {
  try {
    const arg = document.getElementById('asset1').value;
    let data = JSON.stringify({
      "fcn": "DeleteAsset",
      "chaincodeName": "token_erc20",
      "channelName": "mychannel",
      "args": [arg]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/channels/mychannel/chaincodes/token_erc20?fcn=DeleteAsset',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY0MTU5OTEsInVzZXJuYW1lIjoicmFqIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2ODYzNzk5OTF9.xO1Y3ZgNare_DLxXTEXI0veObJzEwQqmeZ69KFVPEL0'
      },
      data: data
    };

    const response1 = await axios.request(config);
    const message = response1.data.result.message;

    document.getElementById('result2').textContent = message;
  } catch (error) {
    console.log(error);
  }
}

// TransferAsset  API

async function TransferAsset() {
  try {
    const arg = document.getElementById('asset2').value;
    const arg1 = document.getElementById('asset3').value;
    let data = JSON.stringify({
      "fcn": "TransferAsset",
      "chaincodeName": "token_erc20",
      "channelName": "mychannel",
      "args": [arg, arg1]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/channels/mychannel/chaincodes/token_erc20?fcn=TransferAsset',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY0MTU5OTEsInVzZXJuYW1lIjoicmFqIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2ODYzNzk5OTF9.xO1Y3ZgNare_DLxXTEXI0veObJzEwQqmeZ69KFVPEL0'
      },
      data: data
    };

    const response1 = await axios.request(config);
    const responseData1 = response1.data.result;

    // Get the reference to the result element in your HTML
    const resultElement = document.getElementById('result3');

    // Clear previous result content
    resultElement.textContent = '';

    // Display the message
    resultElement.textContent = responseData1.message;
  } catch (error) {
    console.log(error);
  }
}


// create asset api
async function CreateAsset() {
  try {
    const arg = document.getElementById('asset4').value;
    const arg1 = document.getElementById('asset5').value;
    const arg2 = document.getElementById('asset6').value;
    const arg3 = document.getElementById('asset7').value;
    const arg4 = document.getElementById('asset8').value;
    let data = JSON.stringify({
      "fcn": "CreateAsset",
      "chaincodeName": "token_erc20",
      "channelName": "mychannel",
      "args": [arg, arg1, arg2, arg3, arg4]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/channels/mychannel/chaincodes/token_erc20?fcn=CreateAsset',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY0MTU5OTEsInVzZXJuYW1lIjoicmFqIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2ODYzNzk5OTF9.xO1Y3ZgNare_DLxXTEXI0veObJzEwQqmeZ69KFVPEL0'
      },
      data: data
    };

    const response1 = await axios.request(config);
    const responseData1 = response1.data.result.message;

    document.getElementById('result4').textContent = responseData1;
  } catch (error) {
    console.log(error);
  }
}
