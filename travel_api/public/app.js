$(document).ready(() => {
    $.getJSON('/api/users')
    .then(addUsers)

    $('#userInput').keypress((event) => {
        if(event.which == 13) {
            createUser()
        }
    });
});

$('.list').on('click', 'span', function(){
    removeUser($(this).parent());
})

function addUsers(users) {
    users.forEach(user => {
        addUser(user)  
    });
};

function addUser(user) {
    let newUser = $('<li class="userName">' + user.name + '<span>X</span></li>');
    newUser.data('id', user._id);
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

function removeUser(user){
    let clickedId = user.data('id');
    let deleteUrl = '/api/users/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then((data) => {
        user.remove();
    })
    .catch((err) => {
        console.log(err);      
    })
}