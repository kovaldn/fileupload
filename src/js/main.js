// Модуль добавления проекта
var addProject = (function (){

	// Инициализация проекта
	var init = function(){
		_setUpListners();
  };

  	// Получаем название файла из пути
	var _getNameFromPath = function (path) {
		return path.replace(/\\/g, '/').replace(/.*\//, '');
	};

  // Прослушка событий
	var _setUpListners = function (){
		$('#add-new-project').on('submit', _addProject); // добавление проекта
		$('#fileupload').on('change', _changefileUpload);
	};

	// Изменили файл аплоад (добавили файл в файлаплоад)
	var _changefileUpload = function (){
		var input = $(this), // инпут type="file"
			name = _getNameFromPath(input.val()); // имя загруженного файла

		$('#filename')
			.val(name) // 
			.trigger('hideTooltip')
			.removeClass('has-error'); 
	};

	var _addProject = function (ev){

	      ev.preventDefault();

	      var form = $(this),
	          url = $(this).attr('action'),
	          defObject = _ajaxForm(form, url);

	      if (defObject) {
	    		// ...дальнейшие действия с ответом с сервера
	      }
    	};

	var _ajaxForm = function (form, url) {

	      if (!validation.validateForm(form)) return false;  // Возвращает false, если не проходит валидацию
	      var data = form.serialize(); // собираем данные из формы в объект data

	      return $.ajax({ // Возвращает Deferred Object
	        type: 'POST',
	        url: url,
	        dataType : 'JSON',
	        data: data
	      }).fail( function(ans) {
	        console.log('Проблемы в PHP');
	        form.find('.error-mes').text('На сервере произошла ошибка').show();
	      });
	};

	return {
		init: init
	};

})();

addProject.init();
