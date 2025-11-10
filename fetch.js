const contenedor = document.querySelector('.jobs-articles');
const contenedorSelectUbicacion = document.querySelector('[name="ubicacion"]');
const contenedorSelectTecnologia = document.querySelector('[name="tecnologia"]');
const contenedorSelectExperiencia = document.querySelector('[name="experiencia"]');
const contenedorNumResultados = document.querySelector('.numResultados');
const contenedorPaginacion = document.querySelector('.paginacion');


const arrayUbicaciones = [];
const arrayTecnologias = [];
const arrayExperiencias = [];
const arrayResultados = [];




fetch("./data.json")
    .then((response) => {
        return response.json();
    })
    .then((jobs) => {
        const total = jobs.length;
        jobs.forEach(job => {
            const article = document.createElement('article');
            // Creación de articulos
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

            contenedor.appendChild(article);
            // arrayResultados.push(article);
            // console.log('arrayResultados :>> ', arrayResultados);
            // arrayResultados.filter()
            // Creación de options para el select Ubicación
            if (!arrayUbicaciones.includes(job.ubicacion)) {
                arrayUbicaciones.push(job.ubicacion);
                const optionUbicacion = document.createElement('option');
                optionUbicacion.value = job.data.modalidad;
                optionUbicacion.innerHTML = job.ubicacion;
                contenedorSelectUbicacion.appendChild(optionUbicacion);
            }
            // Creación de options para el select Tecnología
            //Añadimos primero todas las tecnologías al array si no están ya
            if (Array.isArray(job.data.technology)) { //comprobamos si es un array
                job.data.technology.forEach(tech => {
                    if (!arrayTecnologias.includes(tech)) {
                        arrayTecnologias.push(tech);
                    }
                })
            } else if (!arrayTecnologias.includes(job.data.technology)) {
                arrayTecnologias.push(job.data.technology);
            }
            // Creación de options para el select experiencia
            if (!arrayExperiencias.includes(job.data.nivel)) {
                arrayExperiencias.push(job.data.nivel);
                const optionExperiencia = document.createElement('option');
                optionExperiencia.value = job.data.nivel;
                optionExperiencia.innerHTML = (job.data.nivel).charAt(0).toUpperCase() + (job.data.nivel).slice(1);
                contenedorSelectExperiencia.appendChild(optionExperiencia);
            }

        });
        //Creamos los options para todas las tecnologías incluidas en el array
        arrayTecnologias.forEach(tech => {
            const optionTecnologias = document.createElement('option');
            optionTecnologias.value = tech;
            optionTecnologias.innerHTML = tech.charAt(0).toUpperCase() + tech.slice(1);;
            contenedorSelectTecnologia.appendChild(optionTecnologias);
        });

        contenedorNumResultados.innerHTML = `Se han encontrado <span id="total">${total}</span> resultados`
        let contador=1;
        let salida="";
        for (let i=1; i<=total; i+=3){
            salida += `<a href="">${contador++}</a>`
        }
        contenedorPaginacion.innerHTML = salida;


    })


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
