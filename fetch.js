const contenedor = document.querySelector('.jobs-articles');
const contenedorSelectUbicacion = document.querySelector('[name="ubicacion"]');
const contenedorSelectTecnologia = document.querySelector('[name="tecnologia"]');
const contenedorSelectExperiencia = document.querySelector('[name="experiencia"]');
const contenedorNumResultados = document.querySelector('.numResultados');
const contenedorPaginacion = document.querySelector('.paginacion');

let jobsData = [];
let pageSize = 3;
let currentPage = 1;

// const arrayUbicaciones = [];
// const arrayTecnologias = [];
// const arrayExperiencias = [];
// const arrayResultados = [];
// let arrayFiltrado = [];


async function cargarjobs() {
    const response = await fetch("./data.json");
    return await response.json();
}

function crearArticle(job) {
    const article = document.createElement('article');

    article.className = "job";
    article.dataset.ubicacion = job.data.modalidad;
    article.dataset.tecnologia = job.data.technology;
    article.dataset.experiencia = job.data.nivel;

    article.innerHTML =
       `<div>
           <h3 class="title">${job.titulo}</h3>
           <small>${job.empresa} | ${job.ubicacion}</small>
           <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>`;
    return article;

}

function renderPagina(listaJobs, page=1) {
    

    contenedor.innerHTML='';
    const total = listaJobs.length;
    const start=(page-1)*pageSize;
    const end=start+pageSize;
    const pagina = listaJobs.slice(start,end);

    //Pintar articulos
    const articles = pagina.map(crearArticle);
    contenedor.append(...articles);

    //Contador
    const mostrados = Math.min(pageSize, total-start > 0 ? total-start : 0);
    contenedorNumResultados.innerHtml = `Mostrando <span id="mostrados">${mostrados}</span> de <span id="total">${total}</span> resultados.`;

    //Paginacion
    const numPaginas = Math.ceil(total/pageSize);
    let salida = '';
    for (let i=1; i<=numPaginas; i++){
        salida += `<a href="#" class="pag ${i==page ? 'is-active' : ''}" data-page="${i}">${i}</a>`;
    }
    contenedorPaginacion.innerHTML = salida;

    //Listeners de paginacion
    const paginas = contenedorPaginacion.querySelectorAll('.pag');
    paginas.forEach(a=> {
        a.addEventListener('click', event => {
            event.preventDefault();
            currentPage=Number(a.dataset.page);
            renderPagina(listaJobs,currentPage);
        });
    });
}

function rellenarSelect(jobs) {

    //Evitamos duplicaciones en los options con set 
    const ubicaciones = new Map(); //usamos un map para guardar un par
    const tecnologias = new Set();
    const experiencias = new Set();

    jobs.forEach(job => {
        //Ubicacion
        if (!ubicaciones.has(job.data.modalidad)) {
            ubicaciones.set(job.data.modalidad, job.ubicacion);
        }
        
        //Tecnología
        if (Array.isArray(job.data.technology)) {
            job.data.technology.forEach(t=> tecnologias.add(t));
        } else if (job.data.technology) {
            tecnologias.add(job.data.technology);
        }

        //Experiencia
        if (job.data.nivel) experiencias.add(job.data.nivel);

    })

        //Ubicacion
        ubicaciones.forEach((texto,valor)=>{
            const opt = document.createElement('option');
            opt.value = valor;
            opt.textContent = texto;
            contenedorSelectUbicacion.appendChild(opt);
        });

        //Tecnología
        tecnologias.forEach(t=>{
            const opt = document.createElement('option');
            opt.value=t;
            opt.textContent=t.charAt(0).toUpperCase() + t.slice(1);
            contenedorSelectTecnologia.appendChild(opt);
        });

        //Experiencias
        experiencias.forEach(exp=>{
            const opt = document.createElement('option');
            opt.value=exp;
            opt.textContent=exp.charAt(0).toUpperCase() + exp.slice(1);
            contenedorSelectExperiencia.appendChild(opt);
        });
}

async function init(){
    jobsData = await cargarjobs();
    window.jobsData = jobsData;

    //Rellenamos los select
    rellenarSelect(jobsData);
    window.currentPage = currentPage;
    
    currentPage= 1;
    renderPagina(window.jobsData,currentPage);
}

init();

{/* <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>
            <a class="is-active">1</a>
            <a href="">2</a>
            <a href="">3</a>
            <a href="">4</a>
            <a href="">5</a>
            <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </a> */}
