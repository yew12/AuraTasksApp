// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function addTaskRow() {
  var table = document.getElementById("taskTableBody");
  var row = table.insertRow(-1); // Add row at the end
  var task = row.insertCell(0);
  var category = row.insertCell(1);
  var date = row.insertCell(2);
  var saveBtn = row.insertCell(3);
  task.innerHTML =
    '<input class="form-control" type="text" placeholder="Enter Task" name="taskTxt" required>';
  category.innerHTML =
    '<input class="form-control" type="text" placeholder="Enter Category" name="categoryTxt" required>';
  date.innerHTML =
    '<input class="form-control" type="date" placeholder="Enter Task" name="date" required>';
  saveBtn.innerHTML =
    '<button type="submit" onclick="addTask()" class="btn btn-success" >Save</button>';
}

function addTask() {
  // Get the last row in the table
  var table = document.getElementById("taskTableBody");
  var lastRow = table.rows[table.rows.length - 1]; // Get the last row

  // Get the values of the inputs in the last row
  var task = lastRow.querySelector("input[name='taskTxt']").value;
  var category = lastRow.querySelector("input[name='categoryTxt']").value;

  var date = lastRow.querySelector("input[name='date']").value;

  // Prepare data to send to the server
  var model = {
    TaskItem: task,
    Category: category,
    Date: date,
  };

  // Send the data to the server using AJAX (jQuery)
  $.ajax({
    url: "/Home/SaveTask", // URL to the controller action
    type: "POST", // HTTP method
    contentType: "application/json", // Set content type to JSON
    data: JSON.stringify(model), // Send data as JSON
    success: function (response) {
      // On success, show a message and clear inputs or take any other action
      alert("Task saved successfully: " + response.message);

      // Optionally, clear the inputs
      lastRow.querySelector("input[placeholder='Enter Task']").value = "";
      lastRow.querySelector("input[placeholder='Enter Category']").value = "";
      lastRow.querySelector("input[type='date']").value = "";

      window.location.reload(); // reload to show the new item in the table
    },
    error: function (xhr, status, error) {
      // Handle any errors
      alert("Error: " + error);
    },
  });
}

function editTask(button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td:not(:last-child");
  cells.forEach((cell, index) => {
    const input = document.createElement("input");
    // last cell is the date
    if (index === cells.length - 1) {
      input.type = "date";
      input.value = cell.textContent;
      input.name = "date"
      cell.textContent = "";
    } else {
      input.type = "text";
      // first column is task
      if(index == 0) {
        input.name = "taskTxt";
      }
      // 2nd column is category
      else if(index == 1) {
        input.name = "categoryTxt";
      }
      input.value = cell.textContent.trim();
      cell.textContent = "";
    }

    cell.appendChild(input);
  });

  button.style.display = "none";
  var saveBtn = row.querySelector("#saveBtn");
  saveBtn.style.display = 'block'
}

function saveRow(button) {
  const row = button.parentElement.parentElement;
  // Get the values of the inputs in the last row
  var task = row.querySelector("input[name='taskTxt']").value;
  var category = row.querySelector("input[name='categoryTxt']").value;
  var date = row.querySelector("input[name='date']").value;
  var taskId = row.querySelector("input[name='taskId']").value;

  var errors = [];
  
  if(task === "") {
    let error = "Task must not be blank";
    errors.push(error);
  }
  
  if(category === "") {
    let error = "Category must not be blank";
    errors.push(error);
  }

  if(date === "") {
    let error = "Please enter a date";
    errors.push(error);    
  }

  if(errors.length > 0) {
    const errorMessage = errors.join("\n");
    alert(errorMessage);
    return;
  }

  // Prepare data to send to the server - name must be same as controller param
  var model = {
    Id: taskId,
    TaskItem: task,
    Category: category,
    Date: date,
  };

  // Send the data to the server using AJAX (jQuery)
  $.ajax({
    url: "/Home/UpdateTask", // URL to the controller action
    type: "POST", // HTTP method
    contentType: "application/json", // Set content type to JSON
    data: JSON.stringify(model), // Send data as JSON
    success: function (response) {
      // On success, show a message and clear inputs or take any other action
      alert("Task saved successfully: " + response.message);

      // Optionally, clear the inputs
    //   row.querySelector("input[placeholder='Enter Task']").value = "";
    //   row.querySelector("input[placeholder='Enter Category']").value = "";
    //   row.querySelector("input[type='date']").value = "";

      button.textContent = "Edit";
      button.onclick = () => editTask(button);

      window.location.reload(); // reload to show the new item in the table     
    },
    error: function (xhr, status, error) {
      // Handle any errors
      alert("Error: " + error);
    },
  });

  
}
