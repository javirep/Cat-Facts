## ITERACIÓN 1: 
La idea es crear una función que haga un loop por todos los elementos de la array. Para cada elemento de la array (para cada fact) crearemos un nuevo elemento ```<li>``` y asignamos su propiedad innerHTML a la curiosidad; Finalmente solo nos queda colocar este ```<li>``` dentro de la lista. No nos olvidemos de invocar a la función. 

```js
const list = document.getElementById("cats-facts-list"); // seleccionamos la <ul> del documento y la guardamos en la variable list. 

function loadFacts(){   //definimos la función

    factsArray.forEach(fact => {
        var li = document.createElement("li") // creo un elemento <li>
        li.innerHTML = fact; // le asigno el texto de la curiosidad al <li>
        list.appendChild(li) // añado el li a mi <ul>
    })
}

loadFacts() // Invocamos la función
```

## ITERACIÓN 2:

Primero tenemos que definir una función que al invocarla elimine el último elemento de mi array y volvemos a llamar a la función de la iteración 1 para que muestre los elementos de mi array en el HTML. 

Luego, debemos usar addEventListener para que al pulsar el botón con la id "remove-button" se llame a la función. 

```js
function removeFact(){
    factsArray.pop() // Elimino el último elemento de la array
    loadFacts() // vuelvo a cargar las curiosidades de la array en el HTML
}

const removeButton = document.getElementById("remove-button"); // almaceno el botón en una variable
removeButton.addEventListener("click", removeFact) // le añado la propiedad addEventListener con la función de quitar facts. 
```

Si hacemos esto veremos que cuando pulsamos por primera vez el botón remove-button se añade la primera frase a la ```<ul>``` en vez de quitar el último elemento. 

Esto se debe a que cuando llamamos a la función loadFact al pulsar el botón, no estamos eliminando los elementos antiguos que teníamos desplegados en el DOM. Para ello deberíamos modificar la función loadFacts y añadir esta línea de código:

``` js
function loadFacts(){

    list.innerHTML=""  // Con esta línea borro las curiosidades anteriores que contenía el <ul>

    factsArray.forEach(fact => {
        var li = document.createElement("li")
        li.innerHTML = fact;
        list.appendChild(li)
    })
}
```

Ahora si que debería de funcionar. 

## ITERACIÓN 3: 

La idea es traer una nueva curiosidad con fetch y almacenarla en la variable fact. Luego hacer un push de esta curiosidad a la array de curiosidades y volver a llamar a loadFacts.

```js
async function addFacts (){
    let url = 'https://catfact.ninja/fact/'
    let response = await fetch(url); // Hago la llamada a la API
    let json = await response.json(); // Paso la respuesta a JSON
    let fact = json.fact // Extraigo del JSON la curiosidad que me interesa y la almaceno en la variable fact. 
    
    factsArray.push(fact) // Añado la curiosidad a mi array//
    loadFacts() // Vuelvo a invocar a la función loadFacts
}

// selecciono el botton "add-button" y le añado el addEventListener con mi función. 
const addButton = document.getElementById("add-button") 
addButton.addEventListener("click", addFacts)
```

### ITERACIÓN 3.BONUS:
Una vez sabemos como añadir una curiosidad a la array, lo único que tenemos que hacer es comprobar que la array de curiosidades no incluya esta curiosidad. En caso de que la incluyese, tendríamos que volver a llamar a la API, transformar la respuesta y comprobar que esta nueva curiosidad no esté en al array; convenientemente, tenemos una función que hace esto: addFacts. De tal manera que podemos plantear esta función como una función recursiva (es decir, que se llama a sí misma).

El código de la nueva función debería ser algo como: 

```js
async function addFacts (){

    let url = 'https://catfact.ninja/fact/';
    let response = await fetch(url);
    let json= await response.json();
    let fact= json.fact

    // Si la array no incluye la curiosidad la añade a la array; 
    if (!factsArray.includes(fact)){
        factsArray.push(fact)
    }    
    // En caso contrario, llama a addFacts para volver a hacer una llamada a la API, etc...
    else {
        addFacts()
    }

    loadFacts()
}
```

## ITERACIÓN 4: 

```js
// almaceno el input en la variable input
const input = document.getElementById("number-input")

function changeButtonText(){
    let num = input.value // Almaceno el número que el usuario puso en el input en la variable num. 

    // Cambio la propiedad innerHTML de los botones para que incluya el numero que marcó el usuario.
    addButton.innerHTML = `Add ${num} cat facts` 
    removeButton.innerHTML = `Remove ${num} cat facts`
}

// finalmente le añado un addEventListener que llama a la función cada vez que el usuario cambia el input
input.addEventListener("change", changeButtonText)
```
## Iteración 4.2:

Ahora querremos modificar las funciones addFacts() y removeFacts() si el usuario ha modificado el valor del input. Recuerda que si el input está vacío ```input.value``` valdrá undefined, y si el usuario ha marcado algún valor ```input.value``` valdrá el número que el usuario haya marcado. Por lo tanto tenemos que condicionar nuestras funciones para que hagan lo siguiente:

```js
function removeFact(){
    let numberToRemove = input.value // Indico cuantos facts quiero quitar de la lista

    if (!input.value) { numberToRemove = 1 } // Si el usuario no marcó ninguno, asumiremos que solo quiere quitar uno.

    //Hacemos un que haga tantos .pop() como valor tenga la variable numberToRemove.
    for (i=0; i<numberToRemove; i++){
        factsArray.pop()
    }
    
    // Una vez hemos modificado la array la volvemos a cargar en el HTML con la función loadFacts().
    loadFacts()
}


async function addFacts (){
    //Si el usuario no especifica nada, asumiremos que quiere añadir solo una curiosidad como hacíamos antes. 
    if(!input.value){
        let url = 'https://catfact.ninja/fact/';
        let response = await fetch(url);
        let json= await response.json();
        let fact= json.fact

        factsArray.push(fact)
    }

    // Si el usuario modifica el input, haremos una llamada a la API solicitando el número de curiosidades que especifique el usuario. Finalmente las añadimos a la array con un forEach. 
    if(typeof input.value === "number"){
        let url = `https://catfact.ninja/facts/?limit=${input.value}`;
        let response = await fetch(url);
        let json = await response.json();
        let facts = json.data

        facts.forEach(fact=>{
            factsArray.push(fact.fact)
        })
    }

    // Independientemente del if en el que haya entrado, hemos modificado la array de facts, y deberíamos de volver a mostrarla en le documento HTML con la función loadFacts().

    loadFacts()
}

```

Con estas modificaciones ambas funciones deberían de ser capaces de añadir y eliminar varios elementos a la lista. 

Finalmente, no olvides jugar con la soluciones, romper el código y volver a arreglarlo, porque es así como se aprende. 
