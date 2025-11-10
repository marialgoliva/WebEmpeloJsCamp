const searchInput = document.querySelector('.search-input');

function removeAccents(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

searchInput.addEventListener('input', function() {
    const searchValue = searchInput.value;
    const jobArticles = document.querySelectorAll('.job');
    jobArticles.forEach(article => {
        const title = article.querySelector('h3');
        
        if (!removeAccents(title.textContent.toLowerCase()).includes(removeAccents(searchValue.toLowerCase()))) {
            article.classList.add('invisible');
        } else {
            article.classList.remove('invisible');
        }
    });

})

// searchInput.addEventListener('blur', function() {
//     console.log('BLUR',searchInput.value);
// })

searchInput.addEventListener('submit', function(event) {
    event.preventDefault();
    
})


