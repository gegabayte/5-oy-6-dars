const name = document.querySelector('#name');
const button = document.querySelector('#button');
const tbody = document.querySelector('#tbody');
const form = document.querySelector('#form');


function validate(name) {
    if (name.value.trim().length < 3) {
        alert('Please Enter A Valid name');
        name.focus();
        return false;
    }


    return true;
}
function getDeta() {
    let data = [];
    if (localStorage.getItem("todos")) {
        data = JSON.parse(localStorage.getItem("todos"))
    }
    return data;
}



button && button.addEventListener('click', function (e) {
    e.preventDefault();
    const isValid = validate(name);

    if (isValid) {
        const todo = {
            name: name.value,
            status: "todo",
            id: Date.now()
        }

        let todos = getDeta();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        form.reset()

        let tr = creatRow(todo, todos.length);
        tbody.innerHTML += tr;
    }
})

function creatRow(todo, index) {
    return `
    <tr>
         <td>${index}</td>
         <td>${todo.name}</td>
         <td>
             <button id="this">${todo.status}</button>
         </td>
         <td>
             <i class="fa-regular fa-pen-to-square"></i>
         </td>
         <td>
             <i data-id = ${todo.id} class="fa-regular fa-trash-can"></i>
         </td>
    </tr>
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    let thisBtn = document.querySelectorAll('#this');

    let todos = getDeta();
    if (todos.length) {
        todos.forEach((todo, index) => {
           let tr = creatRow(todo, index + 1);
           tbody.innerHTML += tr;
        });
    }

    const deleteButtons = document.querySelectorAll('i.fa-trash-can');

    if (deleteButtons.length) {
        deleteButtons.forEach((del) => {
            del && del.addEventListener('click', function(e) {
                e.preventDefault();
                let isDalete = confirm('Rostan ham ushbu malumotni ochirmohchimisiz?');

                let id = this.getAttribute('data-id');
                if (isDalete && id) {
                    todos = todos.filter(todo => {
                        return todo.id != id;
                    })
                    localStorage.setItem('todos', JSON.stringify(todos));
                    window,location.reload();
                }
            })
            
        })
    }

    thisBtn && thisBtn.addEventListener('click', function() {
       thisBtn.stayle.color = 'blue'
    })
    
})

