// console.log("Hello World")
// FETCH API => Performs asynchronous operation returning promise => promise can be fullfilled or rejected

// syntax
// fetch(url) =>returns a Promise
// .then() => convert it from json into javascript object using json() method
// .then() => we display converted data to our web page
// .catch() we display error message

// fetch("http://localhost:3000/articles")
// .then(function(response){
//   return response.json()

// })
// .then(function(data){
//  console.log(data)
// })
// .catch(function(err){
//     console.log(err)
// })

let base_url = "http://localhost:3000/products"


function displayProduct(products){

    let product_catalog = document.getElementById('product-catalog')

    products.forEach(product => {
        let html = `
        <div class="single-product">
            <h5>${product.title.substring(0, 10)}...</h5>
            <img src="${product.image}" alt="${product.title}">
            <p>${product.description.substring(0, 30)}...</p>
            <div>${product.category}</div>
            <div>$${product.price}</div>
            <div id="buttons">
            <button class="one update">Update</button>
            <button id="delete-btn" class="one delete" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `
        product_catalog.innerHTML += html

        // let btn = document.getElementById('delete-btn')
        
        // btn.addEventListener('click', () => deleteProduct(product.id))
    })
    
}

function deleteProduct(product_id){

    console.log("------------------------------")
    console.log(product_id)
    fetch(`${base_url}/${product_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))


}

function updateProduct(product){

}


    let form = document.getElementById('form')
    form.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault()
        let product_title = document.getElementById('title').value
        let product_image = document.getElementById('image').value
        let product_price = document.getElementById('price').value
        let product_description = document.getElementById('description').value
        let product_category = document.getElementById('category').value

        let product_object = {
            title: product_title,
            image: product_image,
            price: product_price,
            description: product_description,
            category: product_category
        }

        postProduct(product_object)
}

    function postProduct(product_object){
        fetch(base_url,{
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product_object)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    





// GET method

fetch(base_url)
.then(res => res.json())
.then(data => displayProduct(data))
.catch(err => console.log(err))

// POST method

fetch(base_url, {
    method: "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({key : value})
})
.then(res => res.json())
.then( data => console.log(data))
.catch(err => console.log(err))

// DELETE method
fetch(`${base_url} / ${id}`, {
    method: "DELETE"
})
.then(res => res.json())
.then(data => console.log("Product deleted successfuly"))
.catch(error => console.log(error))

//PATCH method
fetch(`${base_url} / ${id}`, {
    method: "PATCH",
    header : {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({key: value})
})
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error))

// CRUD=> 
//     CREATE(post)
//     READ(get)
//     UPDATE(patch)
//     DELETE