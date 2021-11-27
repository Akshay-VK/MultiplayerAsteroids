class Player{
    constructor(socket,pos,dir){
        this.skt = socket;
        this.pos = pos;
        this.dir=dir;
    }
    update(){
        this.pos.add(this.dir);
    }
}