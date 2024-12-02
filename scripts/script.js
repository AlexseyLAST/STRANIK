//Для navbar
//Добавление класса active (мобильный navbar)
const nav = document.querySelector(".nav__menu");
const burger = document.querySelector(".burger")

burger.addEventListener('click', function(){
    burger.classList.toggle('active');
    nav.classList.toggle('active');
})

// Получаем все элементы dropdown
const dropdownLinks = document.querySelectorAll('.nav__link.dropdown');

// Для каждого dropdown добавляем слушатель клика
dropdownLinks.forEach(dropdown => {
  const link = dropdown.querySelector('.link'); // Ссылка с текстом и стрелкой
  const dropdownImg = dropdown.querySelector('.dropdown-img'); // Стрелочка
  const dropdownMenu = dropdown.querySelector('.dropdown__menu'); // Подменю

  // При клике на ссылку (включая стрелочку)
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке

    // Закрываем все открытые меню перед открытием нового
    dropdownLinks.forEach(otherDropdown => {
      const otherImg = otherDropdown.querySelector('.dropdown-img');
      const otherMenu = otherDropdown.querySelector('.dropdown__menu');

      if (otherDropdown !== dropdown) { // Закрываем только другие меню
        otherImg.classList.remove('active');
        otherMenu.classList.remove('active');
      }
    });

    // Тоггл (добавить/убрать) класс active для текущей стрелки и меню
    dropdownImg.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
  });
});

// Закрытие всех меню при клике вне меню
document.addEventListener('click', (event) => {
  dropdownLinks.forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      const dropdownImg = dropdown.querySelector('.dropdown-img');
      const dropdownMenu = dropdown.querySelector('.dropdown__menu');

      dropdownImg.classList.remove('active');
      dropdownMenu.classList.remove('active');
    }
  });
});

const searchInput = document.querySelector(".search__input");



//форма поиска
// Отслеживание нажатия клавиши Enter
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Предотвращаем стандартное поведение
    const query = searchInput.value.trim(); // Получаем текст из input
    if (query) {
      console.log(`Поиск: ${query}`); // Здесь можно добавить логику обработки запроса
      alert(`Вы ищете: ${query}`);
      searchInput.value = ""; // Очищаем поле
    } else {
      alert("Введите запрос для поиска!");
    }
  }
});



//Для форм входа и регистрации
function toggleBothPasswords(toggleButton) {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const toggleIcons = document.querySelectorAll('.password-toggle img');

  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      confirmPasswordInput.type = 'text';

      // Обновляем иконки на всех кнопках
      toggleIcons.forEach(icon => {
          icon.src = 'images/icon/eye-closed-icon.svg'; // Иконка с закрытым глазом
      });
  } else {
      passwordInput.type = 'password';
      confirmPasswordInput.type = 'password';

      // Обновляем иконки на всех кнопках
      toggleIcons.forEach(icon => {
          icon.src = 'images/icon/eye-icon.svg'; // Иконка с открытым глазом
      });
  }
}

// document.addEventListener('DOMContentLoaded', function() {
//   // Получаем все радиокнопки
//   const userRadio = document.getElementById('user');
//   const equipmentProviderRadio = document.getElementById('equipmentProvider');
//   const locationProviderRadio = document.getElementById('locationProvider');

//   // Функция для проверки выбора
//   function checkRadioSelection() {
//       const isEquipmentChecked = equipmentProviderRadio.checked;
//       const isLocationChecked = locationProviderRadio.checked;

//       if (isEquipmentChecked && isLocationChecked) {
//           // Если выбраны обе "Арендодатели", то выключаем "Обычного пользователя"
//           userRadio.disabled = true;
//       } else {
//           // Если не выбраны обе, разрешаем выбрать "Обычного пользователя"
//           userRadio.disabled = false;
//       }
//   }

//   // Добавляем обработчики событий
//   userRadio.addEventListener('change', checkRadioSelection);
//   equipmentProviderRadio.addEventListener('change', checkRadioSelection);
//   locationProviderRadio.addEventListener('change', checkRadioSelection);
// });

document.addEventListener('DOMContentLoaded', () => {
  const sortingBtn = document.querySelector('.products-sorting-btn');
  const sortingMenu = document.querySelector('.products-sorting-menu');
  const sortingImg = document.querySelector('.products-sorting-img');

  sortingBtn.addEventListener('click', () => {
    sortingMenu.classList.toggle('active');
    sortingImg.classList.toggle('active');
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', (e) => {
    if (!sortingBtn.contains(e.target) && !sortingMenu.contains(e.target)) {
      sortingMenu.classList.remove('active');
      sortingImg.classList.remove('active');
    }
  });
});



const minPriceSlider = document.getElementById('min-price');
const maxPriceSlider = document.getElementById('max-price');
const minPriceDisplay = document.getElementById('price-min');
const maxPriceDisplay = document.getElementById('price-max');
const highlightRange = document.querySelector('.filters__price-highlight');

// Минимальный зазор между ползунками
const minGap = 5;

// Обновление диапазона
function updatePriceRange() {
  const min = parseInt(minPriceSlider.value);
  const max = parseInt(maxPriceSlider.value);
  const rangeMin = parseInt(minPriceSlider.min);
  const rangeMax = parseInt(maxPriceSlider.max);

  // Убедимся, что ползунки не пересекаются
  if (max - min <= minGap) {
    if (event.target.id === 'min-price') {
      minPriceSlider.value = max - minGap;
    } else {
      maxPriceSlider.value = min + minGap;
    }
  }

  // Обновление отображаемых значений
  minPriceDisplay.textContent = `$${minPriceSlider.value}`;
  maxPriceDisplay.textContent = `$${maxPriceSlider.value}`;

  // Обновление позиции цветной полоски
  const minPercent = ((minPriceSlider.value - rangeMin) / (rangeMax - rangeMin)) * 100;
  const maxPercent = ((maxPriceSlider.value - rangeMin) / (rangeMax - rangeMin)) * 100;

  highlightRange.style.left = `${minPercent}%`;
  highlightRange.style.width = `${maxPercent - minPercent}%`;
}

// События обновления
minPriceSlider.addEventListener('input', updatePriceRange);
maxPriceSlider.addEventListener('input', updatePriceRange);

// Инициализация
updatePriceRange();


window.addEventListener('resize', adjustPaginationLayout);
adjustPaginationLayout();  // Initial check when the page loads


// document.addEventListener("DOMContentLoaded", function () {
//   function adjustPaginationLayout() {
//       const pagination = document.querySelector('.pagination');
//       const list = document.querySelector('.pagination__list');
//       const prevButton = document.querySelector('.pagination__button--prev');
//       const nextButton = document.querySelector('.pagination__button--next');

//       if (window.innerWidth <= 768) {
//           pagination.style.flexDirection = 'column'; // Меняем на вертикальное расположение
//           prevButton.style.order = -1; // Кнопка "Предыдущий" сверху
//           nextButton.style.order = 1; // Кнопка "Следующий" снизу
//           list.style.order = 0; // Список страниц между кнопками
//       } else {
//           pagination.style.flexDirection = 'row'; // Горизонтальное расположение на больших экранах
//           prevButton.style.order = 0; // Кнопка "Предыдущий" слева
//           nextButton.style.order = 2; // Кнопка "Следующий" справа
//           list.style.order = 1; // Список страниц между кнопками
//       }
//   }

//   // Вызов функции для первоначальной настройки
//   adjustPaginationLayout();
  
//   // Отслеживание изменений размера экрана
//   window.addEventListener('resize', adjustPaginationLayout);
// });