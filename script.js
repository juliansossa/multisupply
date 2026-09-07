// Selección de elementos
const menuToggle = document.getElementById('menu-toggle');
const menuDropdown = document.getElementById('menu-dropdown');
const closeMenuButton = document.getElementById('close-menu');
const menuLinks = menuDropdown.querySelectorAll('a');

// Función para abrir el menú
menuToggle.addEventListener('click', () => {
  menuDropdown.classList.add('show');
});

// Función para cerrar el menú
closeMenuButton.addEventListener('click', () => {
  menuDropdown.classList.remove('show');
});

// Cerrar menú al hacer clic en cualquier enlace
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuDropdown.classList.remove('show');
  });
});


// Codigo del carrusel

const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots-container");
const sliderContainer = document.querySelector(".slider-container");

let currentIndex = 0;
let interval;
//Esta variable verifica si se está pasando el mouse.
let isHovering = false;

// Crear los dots
slide.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dotsContainer.appendChild(dot);

  if (index === 0) dot.classList.add("active");

  dot.setAttribute("data-index", index);
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

function updateSlider() {
  slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  updateSlider();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetInterval();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function autoSlide() {
  nextSlide();
}

function startInterval() {
  /*Si ya existe un intervalo, salgo la funcion, si no existe
  creo uno nuevo.*/
  if (interval) {
    return;
  }
  interval = setInterval(autoSlide, 2000);
}

function stopInterval() {
  clearInterval(interval);
  interval = null;
}
function resetInterval() {
  stopInterval();

  // ❗ NO reinicia si el mouse está encima
  if (!isHovering) {
    startInterval();
  }
}

// Iniciar el slider
startInterval();

// Reinicia al hacer click en los botones
document.querySelector(".buttons").addEventListener("click", resetInterval);

// 👇 Detecta si el usuario cambia de pestaña o vuelve
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopInterval(); // pausa cuando la pestaña no está visible
  } else {
    startInterval(); // reanuda cuando vuelves
  }
});

//Al pasar el mouse sobre el contenedor principal, se detiene la animación, y al sacarlo se reanuda la animacion, puedes ver la interacción a travéz de la consola del navegador.
sliderContainer.addEventListener("mouseenter", () => {
  isHovering = true;
  stopInterval();
  console.log("El mouse entró, detente!");
});

sliderContainer.addEventListener("mouseleave", () => {
  isHovering = false;
  startInterval();
  console.log("El mouse salio, avanza!");
});

// cierre codigo carrusel