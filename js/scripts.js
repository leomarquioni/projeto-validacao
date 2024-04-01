class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            
        ]
    }

    // iniciar a validação de todos os campos

    validate(form) {
        let inputs = form.getElementsByTagName('input');

        //resgata todas as validações
        let currentvalidations = document.querySelectorAll('form .error-validation');

        if(currentvalidations.length > 0){
            this.cleanValidations(currentvalidations);
        }
        

        // transformo htmlcollection -> array
        let inputsArray = [...inputs];

        inputsArray.forEach(function(input) {
            for(let i = 0; this.validations.length > i; i++){
                if(input.getAttribute(this.validations[i]) != null){
                    let method = this.validations[i].replace('data-','').replace('-', '');

                    //valor do input

                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input, value);
                }
                
            }
        }, this);

    }

    //verifica se uminput tem o numero minimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;

        let errorMessage =` O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input,maxValue) {
        let inputLength = input.value.length;

        let errorMessage =` O campo precisa ter pelono máximo ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    required(input){
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = `Esse campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input){
        // email@gmail.com ou .br
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `insira um e-mail no padrão email@gmail.com`;

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input){
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i =0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))){
                numbers++;
            }
        }
        
        if(uppercases === 0 || numbers === 0){
            let errorMessage = `A senha precisa conter um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }
    }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = 'Este campo não aceita números nem caractéres especiais';

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName) {

        let inputToComapare = document.getElementsByName(inputName)[0];


        let errorMessage = `Este campo deve estar igual ao ${inputName}`;


        if(input.value != inputToComapare.value){
            this.printMessage(input,errorMessage);
        }
    }

    printMessage(input, msg) {

        let errorQty = input.parentNode.querySelector('.error-validation')

        if(errorQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}


let form  = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações

submit.addEventListener('click', function(e){
    e.preventDefault();

    validator.validate(form);
});
