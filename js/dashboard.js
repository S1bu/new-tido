let list = JSON.parse(localStorage.getItem("List"))  //Calling the items from local storage
  ? JSON.parse(localStorage.getItem("List"))
  : [
    
    ];

// READ List
function readList(items) {
  document.querySelector("#products").innerHTML = "";
  items.forEach((list, position) => {
    document.querySelector("#products").innerHTML +=`
        
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">${list.title}</h4>
            <h7> ${list.description}</h7>
            <p> ${list.date}</p>
            <div d-flex-nowrap>
            
     
            <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editList${position}" ><i class='fas fa-edit'></i>
             <p class="write"> Edit</p>
            </button>
     
            <button type="button" class="btn btn-dark" onclick="deleteList(${position})" ><i class='fas fa-trash-alt'></i>
            <p class="write">Delete</p>
            </button>
            </div>
     
            <!-- Modal Class -->
            <div
            class="modal fade"
            id="editList${position}"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit ${list.title}
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
             
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="editTitle${position}" class="form-label">Title</label>
                    <input
                      class="form-control"
                      type="text"
                      name="editTitle${position}"
                      id="editTitle${position}"
                      value="${list.title}"
                    />
                  </div>
           
                  <div class="mb-3">
                    <label for="editDescription${position}" class="form-label">Description</label>
                    <input
                      class="form-control"
                      type="text"
                      name="editDescription${position}"
                      id="editDescription${position}"
                      value="${list.description}"
                    />
                  </div>
            
                <div class="mb-3">
                    <label for="editDate${position}" class="form-label">Date</label>
                    <input
                      class="form-control"
                      type="date"
                      name="editDate${position}"
                      id="editDate${position}"
                      value="${list.date}"
                    />
         
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onclick="updateList(${position})"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
  `;
  });
}

readList(list);

// CREATE a list     
function createList() {
  let title = document.querySelector("#addTitle").value;
  let description = document.querySelector("#addDescription").value;
  let date = document.querySelector("#addDate").value;

  try {           
    if (!title || !description || !date) //if these items are not filled 
      throw new Error("Please fill in all fields");  //this error mssg appears
    list.push({         //After clicking "add item" this function will take the items and store them in local storage
      title,
      description,
      date,
    });
    localStorage.setItem("List", JSON.stringify(list));
    readList(list);
  } catch (err) {
    alert(err);
    console.log(err);
  }
}
// UPDATE A LIST        //after clicking edit icon this function happens ,displaying your stored info for you to edit it
function updateList(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let description = document.querySelector(`#editDescription${position}`).value;
  let date = document.querySelector(`#editDate${position}`).value;

  try {
    if (!title || !description || !date) //if these items are not filled 
      throw new Error("Please fill in all fields"); //this error mssg appears
    list[position] = {
      title,
      description,
      date,
    };
    localStorage.setItem("List", JSON.stringify(list));
    readList(list);
  } catch (err) {
    alert(err);
  }
}

// DELETE A list
function deleteList(position) {     //delete a list function
  let confirmation = confirm(          //confrim the delete
    `Are you sure you want to remove ${list[position].title.toUpperCase()} from the list?` //are you sure you wanna delete
  );

  if (confirmation) {   //if you confirm the delete then this function deletes the list
    list.splice(position, 1);
    localStorage.setItem("List", JSON.stringify(list));
    readList(list);
  }
}
// Edit function
function editTask(e){
   
  let task = e.parentElement.parentElement
  title.value = task.children[0].innerHTML
  description.value = task.children[1].innerHTML
  date.value = task.children[2].innerHTML

  deleteList(position)
}



// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortTitle").value;

  let sortedList = list.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedList.reverse();
  console.log(sortedList);
  readList(list);
}

