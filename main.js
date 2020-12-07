

var webstore = new Vue({
   el:"#app",
   data:{
      sitename: "Cat`s Shop",
      showProduct: true,
      states:{
         ЦН:"Центральний",
         НК:"Новокодацький",
         СР:"Соборний",
         СМ:"Самарський"
      },
      order:{
         firstName: "",
         lastName: "",
         address: "",
         city: "",
         zip: "",
         state: "",
         method: "Дім",
         business: "Робота",
         home: "Дім",
         gift: "Відправити як подарунок",
         sendGift: "Відправити як подарунок",
         dontSendGift: "Не відправляти як подарунок"
      },
      products:[],
      cart:[],
   },
   filters:{
      formatPrice:
      function (price) {
         if(!parseInt(price)){return "";}
         if(price>99999){
            var priceString = (price / 100).toFixed(2);
            console.log(priceString);
            var priceArray = priceString.split("").reverse();
            console.log(priceArray);
            var index = 3;
            while (priceArray.length > index + 3){
               priceArray.splice(index + 3,0,",");
               console.log(priceArray);
               index += 4;
            }
            return priceArray.reverse().join("") + "грн";
         }
         else{
            return (price/100).toFixed(2) + "грн";
         }
      }
   },created:function(){
      axios.get('products.json').then((response) =>{
         this.products=response.data.products;
         console.log(this.products);
      });
   },
   methods:{
      deleteItem(id) {
      this.cart = this.cart.filter(t => t.id !== id);
      },
      addToCart (aProduct){
         this.cart.push(aProduct)
         console.log(this.cart)
      },
      showCheckout(){
         this.showProduct = this.showProduct ? false : true;

      },
      submitForm(){
         alert('Підтверджено');
         this.cart = [];
      },
      checkRating(n,  myProduct){
         return myProduct.rating - n >= 0;
      },
      canAddToCart(aProduct){
         return aProduct.availableInventory > this.cartCount(aProduct.id);
      },
      cartCount(id){
         let count = 0;
         for (let i = 0; i < this.cart.length; i++) {
            if(this.cart[i] === id){
               count++;
            }

         }
         return count;

      },
      sorteredProducts(){
         if(this.products.length > 0){
            let productsArray = this.products.slice(0);
            function compare(a,b){
               if(a.title.toLowerCase() < b.title.toLowerCase())
               return -1;
               if(a.title.toLowerCase() > b.title.toLowerCase())
               return 1;
            return 0;
         }
         return productsArray.sort(compare);
         }
      }
   },computed:{
      cartItemCount:function(){
         return this.cart.length || "";
      },
   }
})

