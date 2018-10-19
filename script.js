window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let inputPhone = document.querySelector('#phone'),
        x = '_', //Заменяемый символ
        mask = `+7 (${x}${x}${x}) ${x}${x}${x} ${x}${x} ${x}${x}`; //Маска поля

    inputPhone.addEventListener('focus', (event) => {
        let target = event.target;
        if (!target.value) {
            target.value = mask;//Записываем маску в значение
        }
        target.selectionStart = mask.indexOf(x);//Устанавливаем курсор к первому заменяемогу символу
        target.setAttribute('maxlength', mask.length);//Максимальное количество символов не больше количества символов маски
    });

    inputPhone.addEventListener('blur', (event) => { //Если поле заполнено не по маске или не до конца - обнуляем
        let target = event.target;
        if (target.value.match(x) || target.value.length < mask.length) {
            target.value = '';
        }
    });

    inputPhone.addEventListener('keypress', (event) => { //Если не цифра, отменяем ввод символа
        if (!/\d/.test(event.key)) {
            event.preventDefault();
        }
    }); 

    inputPhone.addEventListener('input', (event) => {
        let target = event.target,
            temp; //временная переменная значения поля ввода
            temp = target.value.substring(0, target.selectionStart) + //В переменную поместили значение поля ввода до курсора
                mask.substring(target.selectionStart); //и добавили остаток с маски
            target.value = temp;
            target.selectionStart = temp.indexOf(x); //Устанавливаем курсор к первому заменяемогу символу
    });

});