const API_KEY = '66e32f9e494df9a478e48f71'

const gallery = document.querySelector("#gallery");
const form = document.querySelector('.js-form')
const addUserButton = document.querySelector(".js-add-user");

form.addEventListener('submit', handleSubmit)
gallery.addEventListener('click', handleDeleteUser)
fetchUsers()

async function handleSubmit(e) {
    e.preventDefault()

    const formData = {
        name: form.elements.name.value,
        age: form.elements.age.value,
        image: form.elements.image.value,
        description: form.elements.description.value
    }

    form.reset()
    await addUser(formData)
    fetchUsers()
}

async function handleDeleteUser(e) {
    const el = e.target

    if (el.nodeName === 'BUTTON') {
       await deleteUser(el.dataset.id)
       await fetchUsers() 
    }
}

async function fetchUsers() {
    const response = await fetch(`https://${API_KEY}.mockapi.io/users`);
    const users = await response.json();

    const usersMarkup = users.map(({image, name, id, description, age}) => `<div class="card">
             <img width="200" height="200" src="${image}" alt="${name}" />
             <h2>${name}</h2>
             <p>${description}</p>
             <span>${age}</span>
             <button type="button" data-id="${id}">Delete user</button>
        </div>`
    ).join()

    gallery.innerHTML = usersMarkup
}

async function addUser(newUser) {
    await fetch(`https://${API_KEY}.mockapi.io/users`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
            "Content-Type": "application/json",
          },
    });

    //? await axios.post(`https://${API_KEY}.mockapi.io/users`, newUser)
}

async function deleteUser(id) {
    await fetch(`https://${API_KEY}.mockapi.io/users/${id}`, {
        method: "DELETE",
    });
}




