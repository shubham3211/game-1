let homeState={
   init:function (message) {
     this.message=message;
   },
   create:function () {
     let background = this.game.add.sprite(0, 0, 'backyard');
     background.inputEnabled=true;

     background.events.onInputDown.add(function () {
       this.state.start('gameState');
     },this);

     let style={font:'35px Arial',fill:'white'};
     this.game.add.text(30,this.game.world.centerY+200,'TOUCH TO START',style);
     if(this.message){
       this.game.add.text(60,this.game.world.centerY-200,this.message,style);
     }
   }

}