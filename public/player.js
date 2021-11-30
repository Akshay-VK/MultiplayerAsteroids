class Player {
  constructor(socket, pos, dir) {
    this.skt = socket;
    this.pos = pos;
    this.dir = dir;
    this.angle = 0;
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
      dirX: this.dir.x,
      dirY: this.dir.y
    });
  }
}
