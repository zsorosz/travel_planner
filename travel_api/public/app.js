$(document).ready(() => {
    $.getJSON('/api/users')
    .then(addUsers)

    $('#userInput').keypress((event) => {
        if(event.which == 13) {
            createUser()
        }
    });
});

function addUsers(users) {
    users.forEach(user => {
        addUser(user)  
    });
};

function addUser(user) {
    let newUser = $('<li class="userName">' + user.name + '</li>');
    $('.list').append(newUser);   
}

function createUser() {
    let input = $('#userInput').val();
    $.post('/api/users', {name: input})
    .then((newUser) => {
        $('#userInput').val('');
        addUser(newUser)
    })
    .catch((err) => {
        console.log(err);      
    })
}