// https://fakestoreapi.com/products

// function for fetching three differnt apis data
async function fetchProducts(url){
    try{
    const response=await fetch(url)
    console.log(response);

    if(!response.ok){
        throw new Error("response is n0t ok")
    }

    return await response.json();
    }
catch(error){
    throw new Error("error fetching the data" +error.message)
}
}
// console.log(fetchProducts("https://fakestoreapi.com/products"))
// fetchProducts()

// function display the fecthed data
async function Display(){
    try{
        const Mobiles= await fetchProducts("https://fakestoreapi.com/products");
        const laptops=await fetchProducts("https://fakestoreapi.com/products");
        const dresses=await fetchProducts("https://fakestoreapi.com/products");

    

    // wait for all data to be fetched
    const[data1,data2,data3]=await Promise.all([Mobiles,laptops,dresses]);
    // here data1 stores all info of mobiles
    // similarly data2 and data3

    // limit each category to 18 items

    // const MobilesDataLimited=data1.slice(0,18);
    // const laptopsDataLimited=data2.slice(0,18);
    // const dressesDataLimited=data3.slice(0,18);

    const MobilesDataLimited=data1;
    const laptopsDataLimited=data2;
    const dressesDataLimited=data3;
    
    // access the elements where want to display the data

    const product1=document.querySelector("#mobiles-data");
    const product2=document.querySelector("#laptop-data");
    const product3=document.querySelector("#dress-data");

    

    const Mobilediv=Createproductlist(MobilesDataLimited);
    const Laptopdiv=Createproductlist(laptopsDataLimited);
    const jewellerydiv=Createproductlist(dressesDataLimited);

    product1.appendChild(Mobilediv)
    product2.appendChild(Laptopdiv)
    product3.appendChild(jewellerydiv) 
}


catch(error){
    const Errdisplay = document.getElementById("errorDisplay")
    Errdisplay.textContent="Error:" + error.message;
    console.error(error);
}

function Createproductlist(products){
    const divele=document.createElement('div');
    divele.className='whole';
    products.map((items)=>{
        const CardDiv=document.createElement('div');
        CardDiv.className='card';
        CardDiv.innerHTML= `<img src=${items.image} alt=${items.title}<br>
        <h3> ${items.title}</h3>
        <p> ${items.price}</p>
        <button class="add-to-cart">Add to Cart</button>
        `;

        const addToCartButton=CardDiv.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click',()=>handleAddToCart(items)); 
        divele.appendChild(CardDiv);


        // cart count increases on click add to cart button
        var button = document.getElementById("click_me");
        count = 0;
        addToCartButton.addEventListener('click',()=>handler(items))
        function handler() {
        count += 1;
        button.innerHTML = count;
        };

        });
    

    
    return divele;
}


    function handleAddToCart(item){
        addToCart(item);
        console.log('add to cart:',item);
    }
    
const cartItems=[]

// function to add the product to the cart
function addToCart(product){
    const existingItem=cartItems.find(item1=>item1.id === product.id);
    if(existingItem){
        existingItem.quantity++;
    }
    else{
        cartItems.push({...product,quantity:1});
    }


    updateCart()
}

    function updateCart(){
        const cartList=document.getElementById('cartList');
        cartList.innerHTML='';

        cartItems.forEach(item=>{
            displayCartItem(item);
        })

        // var cartArray = new Array();
        // if (localStorage.getItem('content')) {
        //     cartArray = JSON.parse(localStorage.getItem('content'));
        // }

        // cartArray.push(cartItemJSON);
        
        // var cartJSON = JSON.stringify(cartArray);
        // localStorage.setItem('content', cartJSON);
        // // displayCartItem();
        updateCartTotal()

        
	
	
    }

    function updateCartTotal(){
        const TotalElement=document.getElementById('total');
        const total= cartItems.reduce((sum,item)=> sum+(item.price)*(item.quantity),0);
        TotalElement.textContent=`Total:$${total.toFixed(2)}`;

    
        
    }


    function displayCartItem(product){
        // const cartList=document.getElementById('cartList');
        const cartItem=document.createElement('div');
        cartItem.className='cart-item';
        cartItem.innerHTML=`
        <img src=${product.image} alt=${product.title}/>
        <div class="content">
            <h3>${product.title}</h3>
            <p>Quantity:${product.quantity}</p>
            <p>Total:$${(product.price*product.quantity).toFixed(2)}</p>
            <button class="remove-button">Remove</button>
        </div>
        `;
        const removeButton=cartItem.querySelector('.remove-button');
        removeButton.addEventListener("click",()=>handleRemoveFromCart(product))
        cartList.appendChild(cartItem)

        // cart count decreases on clicking remove button
        removeButton.addEventListener("click",()=>handler1(product))
        const button1=document.getElementById('click_me');
        function handler1(){
            
            count=count-1;
            button1.textContent=count;


        }

    }

    function handleRemoveFromCart(item){
        const index=cartItems.findIndex(cartItem=>cartItem.id===item.id); 
        
        // if(index!==-1 && item.quantity==1){
        //     cartItems.splice(index,1);
        //     // updateCart();
        
        // }
        // else{
        //     item.quantity--;
        //     item.total=item.total-product.price;
        // }

        if(index!==-1){
            const existingItem=cartItems[index]

        if(existingItem.quantity > 1){
            existingItem.quantity--;
        }

        else{
            cartItems.splice(index,1)
        }
        updateCart();
        }
}
}
Display();

// code to implement slideshow
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 3000); 
}



// code for searching item
const search_filter=document.getElementById('search_one')
search_filter.addEventListener('input',active )

function active(e){
    let value = e.target.value

    if (value && value.trim().length > 0){
         value = value.trim().toLowerCase()
            if(value=="mobiles"){
                var ele1=document.getElementById('mobiles-data')
                ele1.scrollIntoView();
            }
            else if(value=="laptops"){
                var ele2=document.getElementById('laptop-data')
                ele2.scrollIntoView()
            }
            else if(value=="jewellery"){
                var ele3=document.getElementById('dress-data')
                ele3.scrollIntoView()
            }

    }
}


// const button1=document.getElementsByClassName('cart-icon')
// button1.addEventListener('click',openCartPage)
// function openCartPage(){
//     document.getElementsByClassName('cart').style.display = 'block';
//     const cartItems=['product1','product2','product3'];
//     const cartitem=document.getElementById('cartList');
//     cartitem.innerHTML='';

//     cartItems.forEach(item=>{
//         const li=document.createElement('li')
//         li.textContent=item;
//         cartitem.appendChild(li);
//     })
// }

