// Модуль валидации
var validation = (function (){

	var init = function(){
				console.log('Инициализация модуля validation');
				_setUpListners();
			},
			validateForm = function (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
	      console.log('Проверяем форму');

	      var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
	          valid = true;

	      $.each(elements, function(index, val) {
	        var element = $(val),
	            val = element.val(),
	            pos = element.attr('qtip-position');

	        if(val.length === 0){
	          element.addClass('has-error');
	          _createQtip(element, pos);
	          valid = false;
	        }

	      }); // each

	      return valid;
      },
			_setUpListners = function () { // Прослушивает все события
	      $('form').on('keydown', '.has-error', _removeError); // удаляем красную обводку у элементов форм
	      $('form').on('reset', _clearForm); // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
	    },
    	_removeError = function() { // Убирает красную обводку у элементов форм
	      console.log('Красная обводка у элементов форм удалена');

	      $(this).removeClass('has-error');
	    },
	    _clearForm = function(form) { // Очищает форму
	      console.log('Очищаем форму');

	      var form = $(this);
	      form.find('.input, .textarea').trigger('hideTooltip'); // удаляем тултипы
	      form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
	      form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
	    },
	    _createQtip = function (element, position) { // Создаёт тултипы
	      console.log('Создаем тултип');

	      // позиция тултипа
	      if (position === 'right') {
	        position = {
	          my: 'left center',
	          at: 'right center'
	        }
	      }else{
	        position = {
	          my: 'right center',
	          at: 'left center',
	          adjust: {
	            method: 'shift none'
	          }
	        }
	      }

	      // инициализация тултипа
	      element.qtip({
	        content: {
	          text: function() {
	            return $(this).attr('qtip-content');
	          }
	        },
	        show: {
	          event: 'show'
	        },
	        hide: {
	          event: 'keydown hideTooltip'
	        },
	        position: position,
	        style: {
	          classes: 'qtip-mystyle qtip-rounded',
	          tip: {
	            height: 10,
	            width: 16
	          }
	        }
	      }).trigger('show');
    	};

	return {
		init: init,
		validateForm: validateForm
	};

})();

validation.init();
