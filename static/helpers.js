document.addEventListener('DOMContentLoaded', function () {
    initDelete();
    initDisableButtonsOnSubmit();
    initBack();
    initToggle();

    if (window.timeago)
        window.timeago().render(document.querySelectorAll('.timeAgo'));

    var dateElements = document.querySelectorAll(".dateTime");
    dateElements.forEach(function(elem){
        var date = new Date(elem.dateTime);
        elem.innerHTML =date.toLocaleDateString() +", " + date.toLocaleTimeString().substr(0,5)+" Uhr";
    });
});

document.addEventListener('turbolinks:load', function() {
    initDelete();
    initDisableButtonsOnSubmit();
    initBack();
    initToggle();

    if (window.timeago)
        window.timeago().render(document.querySelectorAll('.timeAgo'));

    var dateElements = document.querySelectorAll(".dateTime");
    dateElements.forEach(function(elem){
        var date = new Date(elem.dateTime);
        elem.innerHTML =date.toLocaleDateString() +", " + date.toLocaleTimeString().substr(0,5)+" Uhr";
    });
});

function initDelete() {
    var elements = document.getElementsByClassName('js-delete');

    function handleClick(event) {
        event.preventDefault();

        if (!confirm('Are you sure you want to delete this?')) {
            return;
        }

        var form = document.createElement('form');
        form.action = event.target.href;
        form.method = 'POST';

        var methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';

        form.appendChild(methodInput);

        document.body.appendChild(form);
        form.submit();
    }

    for (var i in elements) {
        var element = elements[i];
        if (element instanceof HTMLAnchorElement) {
            element.addEventListener('click', handleClick);
        }
    }
}

function initBack() {
    var elements = document.getElementsByClassName('js-back');

    function handleClick(event) {
        event.preventDefault();
        event.target.setAttribute('disabled', 'disabled');
        event.target.classList.add('disabled');

        window.history.back();
    }

    for (var i in elements) {
        var element = elements[i];
        if (element instanceof HTMLButtonElement) {
            element.addEventListener('click', handleClick);
        }
    }
}

function initDisableButtonsOnSubmit() {
    function initForm(form) {
        form.addEventListener('submit', function (e) {
            var buttons = form.getElementsByTagName('button');
            for (var j in buttons) {
                var button = buttons[j];
                if (button instanceof HTMLButtonElement) {
                    button.setAttribute('disabled', 'disabled');
                }
            }

            var alerts = form.getElementsByClassName('alert');
            for (var j in alerts) {
                var alert = alerts[j];
                if (alert instanceof HTMLDivElement) {
                    alert.classList.add('dismiss');
                }
            }
        })
    }

    for (var i in document.forms) {
        var form = document.forms[i];
        if (!(form instanceof HTMLFormElement)) {
            return;
        }

        initForm(form);
    }
}

function initToggle() {
    var elements = document.querySelectorAll('[data-toggle]');

    function handler () {
        var elements = document.querySelectorAll(this.getAttribute('data-toggle'));
        for (var i in elements) {
            var element = elements[i];
            if (!(element instanceof HTMLElement)) {
                return;
            }

            if (!this.checked) {
                element.setAttribute('disabled', 'disabled');
            } else {
                element.removeAttribute('disabled');
            }
         }

    };

    for (var i in elements) {
        var element = elements[i];
        if (!(element instanceof HTMLInputElement)) {
            continue;
        }

        element.addEventListener('change', handler);
        handler.call(element);
    }
}