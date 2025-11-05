const resultadosBusquedaSection = document.querySelector('.resultadosBusqueda');

resultadosBusquedaSection?.addEventListener('click', function (event) {
    let element = event.target;
    if (element.classList.contains('button-apply-job')) {
        window.location.href = "../resultado.html"
    }
})

const filtersDiv = document.querySelector('.filters');

filtersDiv?.addEventListener('change', function (event) {
    let selectName = event.target.name;
    let selectOption = event.target.value;
    const jobArticles = document.querySelectorAll('.job');

    switch(selectName){
        case 'tecnologia':
            jobArticles.forEach(article => {
                const datasetName = article.dataset.tecnologia;
                if (datasetName!==selectOption && selectOption!=="" && !datasetName.includes(selectOption)) {
                    article.classList.add('invisible');
                } else {
                    article.classList.remove('invisible');
                }
            });
            break;
        case 'ubicacion':
            jobArticles.forEach(article => {
                const datasetName = article.dataset.ubicacion;
                if (datasetName!==selectOption && selectOption!=="") {
                    article.classList.add('invisible');
                } else {
                    article.classList.remove('invisible');
                }
            });
            break;
        case 'contrato':
            jobArticles.forEach(article => {
                const datasetName = article.dataset.contrato;
                if (datasetName!==selectOption && selectOption!=="") {
                    article.classList.add('invisible');
                } else {
                    article.classList.remove('invisible');
                }
            });
            break;
        case 'experiencia':
            jobArticles.forEach(article => {
                const datasetName = article.dataset.experiencia;
                if (datasetName!==selectOption && selectOption!=="") {
                    article.classList.add('invisible');
                } else {
                    article.classList.remove('invisible');
                }
            });
            break;
        default:
            article.classList.remove('invisible');

            
    }
})