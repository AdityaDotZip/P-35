class Food{
    constructor(){
        this.foodStock = foodStock;

        this.milk = loadImage("images/Milk.png");
    }

    display(){
        var x=80;
        var y =100;

        imageMode(CENTER);
        image(this.milk, 720,220,70,70);

        if(this.foodStock!== 0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10 === 0){
                    x =80;
                    y+=50;
                }
                image(this.milk, x, y, 50, 50);
                x+=30;
            }
        }
    }

    getFoodStock(){
        var foodRef = database.ref('Food');
        foodRef.on("value", (data)=>{
            foodStock = data.val;
        })
    }

    updateFoodStock(){
        database.ref('/').update({
            Food: foodStock
        })
    }

    dedeuctFood(){
        foodStock-=1;
        
        database.ref('/').update({
            Food: foodStock
        })
    }
}