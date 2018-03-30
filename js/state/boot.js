let bootState={
  init:function () {
    this.scale.scaleMode= Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically=true;
    this.scale.pageAlignHorizontally=true;
  },
  prelaod:function () {
    this.load.image('preLoadbar','assets/images/bar.png');
    this.load.image('log    o','assets/images/logo.png');
  },
  create:function () {
    this.game.stage.backgroundColor='white';
    this.state.start('preloadState');
  }  
};