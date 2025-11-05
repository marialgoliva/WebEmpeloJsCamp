const botones = document.querySelectorAll('.button-apply-job');

botones.forEach(boton=>{
    boton.addEventListener('click', function() {
        boton.textContent='Aplicado!';
        boton.classList.add('is-applied');
        boton.disabled = true;
    })
})