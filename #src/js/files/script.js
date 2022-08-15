window.onload = function () {
   document.addEventListener("click", documentActions);
   // Actions (Делегирование событий Click)
   function documentActions(e) {
      const targetElement = e.target;
      if (targetElement.classList.contains('more-header__icon')) {
         targetElement.closest('.more-header__language').classList.toggle('_hover');
      }
      if (!targetElement.closest('.more-header__language') && document.querySelectorAll('.more-header__language._hover').length > 0) {
         _removeClasses(document.querySelectorAll('.more-header__language._hover'), "_hover");
      }
   }
}