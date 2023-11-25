// Espera a que el DOM (Documento Object Model) se cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {

    // Obtén referencias a elementos del formulario y otros elementos relevantes en la página
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const totalPrice = document.getElementById('total-price');

    // Inicializa una variable 'total' que se utilizará para calcular el costo total de las recetas
    let total = 0;

    // Función que se ejecuta cuando se hace clic en el botón "Agregar a la receta"
    function addToRecipe() {
        // Obtén referencias a los elementos del formulario que contienen la información de la receta y guarniciones
        const selectRecipe = document.getElementById('select-recipe');
        const recipeQuantity = document.getElementById('recipe-quantity');
        const selectSideDish = document.getElementById('select-side-dish');
        const sideDishQuantity = document.getElementById('side-dish-quantity');

        // Extrae los valores seleccionados del formulario
        const recipe = selectRecipe.value;
        const recipeQty = parseInt(recipeQuantity.value, 10);
        const sideDish = selectSideDish.value;
        const sideDishQty = parseInt(sideDishQuantity.value, 10);

        // Define un tipo de cambio constante
        const exchangeRate = 3500;

        // Utiliza un switch para calcular el costo total de la receta seleccionada
        let recipeTotal = 0;
        switch (recipe) {
            case 'ensalada':
                recipeTotal = calculateTotal(recipeQty, sideDishQty, 20965, 10465, exchangeRate);
                break;
            case 'pasta':
                recipeTotal = calculateTotal(recipeQty, sideDishQty, 31465, 13965, exchangeRate);
                break;
            case 'pollo':
                recipeTotal = calculateTotal(recipeQty, sideDishQty, 38465, 17465, exchangeRate);
                break;
            case 'sopa':
                recipeTotal = calculateTotal(recipeQty, sideDishQty, 24465, 8715, exchangeRate);
                break;
            default:
                break;
        }

        // Actualiza el total acumulado
        total += recipeTotal;

        // Agrega detalles de la receta a una lista en la página
        const recipeDetails = `${recipeQty} ${recipe} con ${sideDishQty} ${sideDish} - $${recipeTotal.toFixed(2)}`;
        const listItem = document.createElement('li');
        listItem.textContent = recipeDetails;
        recipeList.appendChild(listItem);

        // Actualiza el elemento HTML que muestra el costo total acumulado
        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función que calcula el costo total de una receta
    function calculateTotal(recipeQty, sideDishQty, recipePrice, sideDishPrice, exchangeRate) {
        const recipeTotal = (recipeQty * recipePrice) / exchangeRate;
        const sideDishTotal = (sideDishQty * sideDishPrice) / exchangeRate;

        return recipeTotal + sideDishTotal;
    }

    // Función para limpiar el formulario después de enviar una receta
    function clearForm() {
        recipeForm.reset();
    }

    // Agrega un evento al formulario que evita el comportamiento predeterminado y muestra una alerta con el total acumulado
    recipeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert(`¡Receta enviada! Total: $${total.toFixed(2)}`);
        // Reinicia los valores después de enviar la receta
        total = 0;
        recipeList.innerHTML = '';
        totalPrice.textContent = 'Total: $0';
    });

    // Agrega un evento al botón "Agregar a la receta" que llama a la función addToRecipe
    const addToRecipeButton = document.getElementById('add-to-recipe');
    addToRecipeButton.addEventListener('click', addToRecipe);

});
        
