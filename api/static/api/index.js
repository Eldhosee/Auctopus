var products={};

function productDisplay() {
    try 
    {
        fetch('http://127.0.0.1:8000/product-all')
            .then((res) => res.json())
            .then((data) => 
            {
                if (data != null) 
                {
                    products=data
                    //to display all product
                    const container = document.getElementById('productlist');

                    data.forEach((product) => {
                        const object = products.find(obj => obj.id === product.id);
                        console.log("initial:",object)

                        const card = document.createElement('div');
                        card.id = 'card';
                        card.classList.add('card');

                        const front = document.createElement('div');
                        front.classList.add('front');

                        const name = document.createElement('h6');
                        name.textContent = product.name;
                        name.id="name"+object.id
                        front.appendChild(name);

                        const description = document.createElement('p');
                        description.textContent = 'Description: ' + product.description;
                        description.id="descriptions"+object.id
                        front.appendChild(description);

                        const price = document.createElement('p');
                        price.textContent = 'Price: ' + product.price;
                        price.id="prices"+object.id
                        front.appendChild(price);

                        const edit = document.createElement('button');
                        edit.className = 'btn btn-primary';
                        edit.style.width = '100px';
                        edit.innerText = 'Edit';
                        edit.id = 'edit';
                        edit.onclick = function() {
                            card.classList.add('flipped');
                            
                          };
                          
                        
                        front.appendChild(edit);

                        const delete_product = document.createElement('button');
                        delete_product.className = 'btn btn-danger';
                        delete_product.style.width = '100px';
                        delete_product.innerText = 'Delete';
                        delete_product.id = 'delete';
                        delete_product.onclick=function(){
                            try 
                            {
                                fetch(`http://127.0.0.1:8000/delete/${object.id}`, {
                                    method: 'DELETE',
                                    
                                })
                                    .then(() => {
                                        location.reload();
                                    })   
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        front.appendChild(delete_product);

                        const hiddenInput = document.createElement('input');
                        hiddenInput.type = 'hidden';
                        hiddenInput.name = 'id';
                        hiddenInput.value = product.id;
                        front.appendChild(hiddenInput);
                        //for adding edit functionality
                        const back = document.createElement('div');
                        back.classList.add('back');

                        const editForm = document.createElement('form');
                        editForm.className = 'edit-form';

                        const nameLabel = document.createElement('label');
                        nameLabel.textContent = 'Product Name';
                        editForm.appendChild(nameLabel);

                        const nameInput = document.createElement('input');
                        nameInput.type = 'text';
                        nameInput.id = 'editName';
                        nameInput.value = product.name;
                        nameInput.className="form-control" 
                        nameInput.addEventListener('input', () => {
                            object.name = nameInput.value;
                          });
                        editForm.appendChild(nameInput);

                        const descriptionLabel = document.createElement('label');
                        descriptionLabel.textContent = 'Product Description';
                        editForm.appendChild(descriptionLabel);

                        const descriptionTextarea = document.createElement('textarea');
                        descriptionTextarea.id = 'editDescription';
                        descriptionTextarea.value = product.description;
                        descriptionTextarea.className="form-control" 
                        descriptionTextarea.addEventListener('input', () => {
                            object.description = descriptionTextarea.value;
                          });
                        editForm.appendChild(descriptionTextarea);

                        const priceLabel = document.createElement('label');
                        priceLabel.textContent = 'Product Price';
                        
                        editForm.appendChild(priceLabel);

                        const priceInput = document.createElement('input');
                        priceInput.type = 'number';
                        priceInput.id = 'editPrice';
                        priceInput.min = '0';
                        priceInput.value = product.price;
                        priceInput.addEventListener('input', () => {
                            object.price = priceInput.value;
                          });
                        
                        priceInput.className="form-control" 
                        
                        editForm.appendChild(priceInput);

                        const hidden = document.createElement('input');
                        hidden.type = 'hidden';
                        hidden.name = 'id';
                        hidden.value = product.id;
                        editForm.appendChild(hidden);

                        const saveButton = document.createElement('button');
                        saveButton.type = 'button';
                        saveButton.className = 'btn btn-primary save-button';
                        saveButton.textContent = 'Save';
                        saveButton.onclick = function(){
                            
                            
                            const object = products.find(obj => obj.id === product.id);

                            try {

                                fetch(`http://127.0.0.1:8000/update/${object.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrftoken,
                                    },
                                    body: JSON.stringify({
                                        'name': object.name,
                                        'description': object.description,
                                        'price': object.price
                                    }),
                                })
                                    .then(() => {
                                        
                                        const nameElement = document.getElementById("name"+object.id);
                                        const descriptionElement = document.getElementById('descriptions'+object.id);
                                        const priceElement = document.getElementById('prices'+object.id);

                                        
                                        nameElement.textContent = object.name;
                                        descriptionElement.textContent = 'Description: ' + object.description;
                                        priceElement.textContent = 'Price: ' + object.price;


                                    })
            
                            } catch (error) {
                                console.log(error)
                            }
                            card.classList.remove('flipped');
                            
                          };
                        editForm.appendChild(saveButton);

                        back.appendChild(editForm);

                        card.appendChild(front);
                        card.appendChild(back);

                        container.appendChild(card);
                    });

                    
                }
            });
    } catch (error) {
        console.log(error);
    }
}

productDisplay();

        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        var csrftoken = getCookie('csrftoken');



        // create new product
        function create(event) {
            event.preventDefault(); // Prevent default form submission behavior

            const productName = document.getElementById('productName').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const productId = document.getElementById('productId').value;

            const data = {
                productName: productName,
                description: description,
                price: price,
                productId: productId,
            };

            console.log(data);
            if (data != null) {
                try {

                    fetch('http://127.0.0.1:8000/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken,
                        },
                        body: JSON.stringify({
                            'name': productName,
                            'description': description,
                            'price': price
                        }),
                    })
                        .then(() => {
                            location.reload();
                        })

                } catch (error) {
                    console.log(error)
                }
            }

        }

        document.getElementById('productForm').addEventListener('submit', create);










