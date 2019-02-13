function alertUser(evt) {
evt.preventDefault();
alert('Sorry, this hasn't been built yet');
}

$('body').on('click', 'a[href="#"]', alertUser);
