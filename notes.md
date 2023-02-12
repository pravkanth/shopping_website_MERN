1)Browse product - Filter by category                             1)USER Authentication
		 - Sort by price or name

2)Add item to cart - create, update, and delete items in the user's cart.
3)Place order
Each should be in different pages

fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>console.log(json))

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);

1)Create a dashboard
  1.1)Navigation -> brand name,signin/signout button,show cart -> signin?show name and user image
  1.2)Signin button -> Register --> Fullname,image,address,email,password
  1.3)Homepage -> TOP --> Filter by category,sort by name,sort by price
                  BOTTOM--> 50 products are there show random 20 products
                            (Product name,description,price,rating,prodimag,category)
  1.4)Add item to cart - create, update(Increae or decrease quantity), and delete items in the user's cart.
                         (AMAZON CLONE)
  1.5)Subtotal and proceed to payment btn
2)BACKEND
  2.1)Create user account
  2.2)ADD to cart button ->
        Create product schema(Product name,description,price,rating,prodimag,category,quantity)
        Quantity dispatch(INCREASE OR DECREASE)
  2.3)Proceed to pay button click? third schema product array
  
