const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', function() {
    console.log(searchInput.value);
})

searchInput.addEventListener('blur', function() {
    console.log('BLUR',searchInput.value);
})

searchInput.addEventListener('submit', function(event) {
    event.preventDefault();
    
})