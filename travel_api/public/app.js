$(document).ready(() => {
    $.getJSON('/api/users')
    .then(addUsers)
});

function addUsers(users) {
    users.forEach(user => {
        let newUser = $('<li class="userName">' + user.name + '</li>');
        $('.list').append(newUser);   
    });
}