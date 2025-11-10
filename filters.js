const resultadosBusquedaSection = document.querySelector('.resultadosBusqueda');

resultadosBusquedaSection?.addEventListener('click', function (event) {
    let element = event.target;
    if (element.classList.contains('button-apply-job')) {
        window.location.href = "../resultado.html"
    }
})
const jobArticles = document.querySelectorAll('.job');
const filtersDiv = document.querySelector('.filters');

filtersDiv?.addEventListener('change', function (event) {
    let selectName = event.target.name;
    let selectOption = event.target.value;
    const jobArticles = document.querySelectorAll('.job');
    let numResultados = 0;

    switch(selectName){
        case 'tecnologia':
            jobArticles.forEach(article => {
                const datasetName = article.dataset.tecnologia;
                if (datasetName!==selectOption && selectOption!=="" && !datasetName.includes(selectOption)) {
                    article.classList.add('invisible');
                } else {
                    article.classList.remove('invisible');
                    numResultados++;
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
                    numResultados++;
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
                    numResultados++;
                }
            });
            break;
        case 'experiencia':
            jobArticles.forEach(article => {
                const datasetName = article.dataset.experiencia;
                console.log('datasetName :>> ', datasetName);
                if (datasetName!==selectOption && selectOption!=="") {
                    article.classList.add('invisible');
                } else {
                    article.classList.remove('invisible');
                    numResultados++;
                }
            });
            break;
        default:
            article.classList.remove('invisible');

            
    }
    document.querySelector('#total').textContent = numResultados;


})

