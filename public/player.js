class Player {
  constructor(socket, pos, dir, w, h) {
    this.skt = socket;
    this.pos = pos;
    this.dir = dir;
    this.angle = 0;
    this.w = w;
    this.h = h;
    this.local_state = {};
  }
  update() {
    angleMode(DEGREES);
    if (keyIsDown(LEFT_ARROW)) {
      this.angle--;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.angle++;
    }
    this.dir.x = cos(this.angle);
    this.dir.y = sin(this.angle);
    this.pos.add(this.dir);

    this.pos.x = Math.max(Math.min(this.pos.x, this.w / 2), -this.w / 2);
    this.pos.y = Math.max(Math.min(this.pos.y, this.h / 2), -this.h / 2);
  }
  show() {
    push();
    // translate(this.pos.x,this.pos.y);
    // translate(width/2,height/2);
    // rotate(this.angle);

    //translate(this.pos.x,this.pos.y);
    // rotate(this.angle);
    translate(width / 2, height / 2);
    rotate(this.angle);
    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();
    vertex(10, 0);
    vertex(-5, -5);
    vertex(-5, 5);

    // vertex(10+width/2,height/2);
    // vertex(-5+width/2,-5+height/2);
    // vertex(-5+width/2,5+height/2);
    endShape(CLOSE);
    pop();
  }
  ping() {
    this.skt.emit("beat", {
      x: this.pos.x,
      y: this.pos.y,
      dx: this.dir.x,
      dy: this.dir.y,
      angle: this.angle
    });
  }
  drawOthers() {
    var arg = this.local_state;
    var keys = Object.keys(arg);
    console.log(arg);
    //console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] != this.skt.id) {
        var x = arg[keys[i]].x - this.pos.x + width / 2;
        var y = arg[keys[i]].y - this.pos.y + height / 2;

        // push();
        // translate(arg[keys[i]].x-this.pos.x,arg[keys[i]].y-this.pos.y);
        // translate(width/2,height/2);
        // rotate(arg[keys[i]].angle);
        // noFill();
        // stroke(255);
        // strokeWeight(2);
        // beginShape();
        // vertex(10, 0);
        // vertex(-5, -5);
        // vertex(-5, 5);
        // pop();
        fill(255);
        rect(x, y, 5, 5);
        //console.log(1);
      }
    }
  }
  updateState(arg) {
    this.local_state = arg;
  }
  // drawOthers(arg){
  //   var keys = Object.keys(arg);
  //   console.log(arg);
  //   //console.log(keys);
  //   for(var i = 0; i < keys.length;i++){
  //     if(keys[i] != this.skt.id){
  //       var x = (arg[keys[i]].x-this.pos.x)+(width/2);
  //       var y = (arg[keys[i]].y-this.pos.y)+(height/2);

  //       // push();
  //       // translate(arg[keys[i]].x-this.pos.x,arg[keys[i]].y-this.pos.y);
  //       // translate(width/2,height/2);
  //       // rotate(arg[keys[i]].angle);
  //       // noFill();
  //       // stroke(255);
  //       // strokeWeight(2);
  //       // beginShape();
  //       // vertex(10, 0);
  //       // vertex(-5, -5);
  //       // vertex(-5, 5);
  //       // pop();
  //       fill(255);
  //       rect(x,y,5,5);
  //       //console.log(1);
  //     }
  //  }
  //}
}
