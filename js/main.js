let gameState={
    preload: function() {
        this.load.image('backyard', 'assets/images/backyard.png');
        this.load.image('apple', 'assets/images/apple.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('rotate', 'assets/images/rotate.png');
        this.load.image('toy', 'assets/images/rubber_duck.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
    },

    create: function() {
        this.background = this.game.add.sprite(0, 0, 'backyard');
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.placeItem,this);

        this.pet = this.game.add.sprite(100, 400, 'pet');
        this.pet.anchor.setTo(0.5);
        this.pet.customParams = {health: 100, fun: 100};
        this.pet.inputEnabled = true;
        this.pet.input.enableDrag();

        //spriteSheet animation
        this.pet.animations.add('funnyFaces',[1,2,3,2,1],7,false);

        this.apple = this.game.add.sprite(72, 570, 'apple');
        this.apple.anchor.setTo(0.5);
        this.apple.inputEnabled = true;
        this.apple.customParams = {health: 20};
        this.apple.events.onInputDown.add(this.pickItem, this);

        this.candy = this.game.add.sprite(144, 570, 'candy');
        this.candy.anchor.setTo(0.5);
        this.candy.inputEnabled = true;
        this.candy.customParams = {health: -20, fun: 10};
        this.candy.events.onInputDown.add(this.pickItem, this);

        this.toy = this.game.add.sprite(216, 570, 'toy');
        this.toy.anchor.setTo(0.5);
        this.toy.inputEnabled = true;
        this.toy.customParams = {fun: 20};
        this.toy.events.onInputDown.add(this.pickItem, this);

        this.rotate = this.game.add.sprite(288, 570, 'rotate');
        this.rotate.anchor.setTo(0.5);
        this.rotate.inputEnabled = true;
        this.rotate.events.onInputDown.add(this.rotatePet, this);

        this.buttons = [this.apple, this.candy, this.toy, this.rotate];

        this.selectedItem = null;
        this.uiBlocked = false;

        let style={font:'20px Arial',fill:'white'};
        this.game.add.text(10,20,'Health:',style);
        this.game.add.text(140,20,'Fun:',style);

        this.healthText=this.game.add.text(80,20,'',style);
        this.funText=this.game.add.text(185,20,'',style);

        this.refreshStats();

        this.statDec
    },
    pickItem: function(sprite, event) {
        if(!this.uiBlocked) {
            this.clearSelection();
            sprite.alpha = 0.4;
            this.selectedItem = sprite;
        }
    },
    rotatePet: function(sprite, event) {
        if(!this.uiBlocked) {
            this.uiBlocked = true;
            this.clearSelection();
            sprite.alpha = 0.4;

            var petRotation = this.game.add.tween(this.pet);
            petRotation.to({angle: '+720'}, 1000);
            petRotation.onComplete.add(function() {
                this.uiBlocked = false;
                sprite.alpha = 1;
                this.pet.customParams.fun += 10;
                this.refreshStats();
            }, this)
            petRotation.start();
        }
    },
    clearSelection: function () {
        this.buttons.forEach(function(element, index) {
            element.alpha = 1;
        });
        this.selectedItem = null;
    },
    
    placeItem:function (sprite,event) {
      if(this.selectedItem&&!this.uiBlocked){
         let x=event.position.x;
         let y=event.position.y;
         let newItem=this.game.add.sprite(x,y,this.selectedItem.key);
         newItem.anchor.setTo(0.5);
         newItem.customParams=this.selectedItem.customParams;
         this.uiBlocked=true;

         let petMovement=this.game.add.tween(this.pet);
         petMovement.to({x:x,y:y},100);
         petMovement.onComplete.add(function () {
           newItem.destroy();
           this.uiBlocked=false;

           let stat;
           for(stat in newItem.customParams){
               if(newItem.customParams.hasOwnProperty(stat)){
                   this.pet.customParams[stat]+=newItem.customParams[stat];
               }
           }

         this.pet.animations.play('funnyFaces');
         this.refreshStats();

         },this);
         petMovement.start();

      }
    },
    refreshStats:function () {
      this.healthText.text=this.pet.customParams.health;
      this.funText.text=this.pet.customParams.fun;
    }
};

let game=new Phaser.Game(360,640,Phaser.AUTO);
game.state.add('gameState',gameState);
game.state.start('gameState');