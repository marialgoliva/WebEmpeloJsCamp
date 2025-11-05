const contenedor = document.querySelector('.jobs-articles');
const contenedorSelectUbicacion = document.querySelector('[name="ubicacion"]');
const contenedorSelectTecnologia = document.querySelector('[name="tecnologia"]');
const contenedorSelectExperiencia = document.querySelector('[name="experiencia"]');


const arrayUbicaciones = [];
const arrayTecnologias = [];
const arrayExperiencias = [];




fetch("./data.json")
    .then((response) => {
        return response.json();
    })
    .then((jobs) => {

        jobs.forEach(job => {
            const article = document.createElement('article');
            // Creación de articulos
            article.className = "job";
            article.dataset.ubicacion = job.data.modalidad;
            article.dataset.tecnologia = job.data.technology;
            article.dataset.experiencia = job.nivel;

            article.innerHTML =
                `<div>
                <h3>${job.titulo}</h3>
                <small>${job.empresa} | ${job.ubicacion}</small>
                <p>${job.descripcion}</p>
            </div>
            <button class="button-apply-job">Aplicar</button>`;
            contenedor.appendChild(article);
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

    })



