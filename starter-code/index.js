//const fetch = require("node-fetch");


const factsArray = ["70% of your cat's life is spent asleep.", "The cat has 500 skeletal muscles (humans have 650)."]
const removeButton = document.getElementById("remove-button")
const addButton = document.getElementById("add-button")
const numberInput = document.getElementById("number-input")
//let url = 'https://catfact.ninja/fact' // Visit https://catfact.ninja/ to read the documentation. 
let url = 'https://catfact.ninja/facts/?limit=' 

// ITERACIÓN 1: Añade las dos curiosidades de la array para que se despliegen en la lista del HTML.
function añadirAlHtml() {
    let padre = document.getElementById("cat-facts-list")
    padre.innerHTML = ""

    factsArray.forEach(element => {
        let child = document.createElement("li")
        child.innerText = element
        padre.appendChild(child)
    });
}
// ITERACIÓN 2: Cada vez que el usuario pulse el botón de Remove a cat fact, elimina el último elemento de la lista.
function removeElementFunction() {
    factsArray.pop()
    añadirAlHtml()
}
// ITERACIÓN 3: Cada vez que el usuario pulse el botón de añadir una curiosidad, llama a la API y añade una curiosidad Random. 
function addElementToArray(number) {
    fetch(url+number)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.data.length; i++) {
                const element = data.data[i];
                filterDuplicatedFacts(element.fact)
            }

            //array.push(data.data[0].fact)
        })
        //.then(añadirAlHtml(factsArray))
        .catch(error => console.error(error));
}

// ITERACIÓN 3.BONUS: Asegurate de que nunca se despliegen curiosidades repetidas.
function filterDuplicatedFacts(fact) {
    exist = false
    factsArray.forEach(element => {
        if (element === fact) {
            exist = true
        }
    });
    if (!exist) {
        factsArray.push(fact)
        añadirAlHtml()
    } else {
        console.log(element)
    }

}
// ITERACIÓN 4: Añade un elemento input al HTML de tipo number. Cuando el usuario cambie el número de este input cambia el texto de los botones para que aparezca "Add / Remove x cat facts"
function funcioncambiarnombre() {
    if (document.getElementById("number-input").value > 0) {
        removeButton.innerHTML = `Remove ${document.getElementById("number-input").value} cat facts`
        addButton.innerHTML = `Add ${document.getElementById("number-input").value} cat facts`
    } else {
        removeButton.innerHTML = `Remove a cat fact`
        addButton.innerHTML = `Add a cat fact`
        document.getElementById("number-input").value = ""
    }


}
// ITERACIÓN 4.1: modifica las funciónes anteriores para que al hacer click en el botón se añadan o quiten este número de curiosidades. 
function batch(accion, number) {

    switch (accion) {
        case removeElementFunction:
            for (let i = 0; i < number; i++) {
                accion()
            }
            break;
        case addElementToArray:
            if (number == 0) {
                number = 1
            }
            if (number > 50) {
                number = 50
            }
            accion(number)

            break;

        default:
            break;
    }



    removeButton.innerHTML = `Remove a cat fact`
    addButton.innerHTML = `Add a cat fact`
    document.getElementById("number-input").value = 0

}


window.onload = añadirAlHtml(factsArray)
numberInput.addEventListener("change", funcioncambiarnombre)
addButton.addEventListener("click", function () { batch(addElementToArray, document.getElementById("number-input").value) })
removeButton.addEventListener("click", function () { batch(removeElementFunction, document.getElementById("number-input").value) })
