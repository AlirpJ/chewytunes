import paper from 'paper';

console.log('wave loaded');

function myFunction(event) { 
	var x = event.view;
	return x
  }

var path1 = new Wave();
path1.color = '#324a63';
path1.height = 15;
path1.init();

var path2 = new Wave();
path2.color = '#182839';
path2.amount = 10;
path2.offsetX = 10;
path2.height = 20;
path2.waveSpeed = 2;
//path2.selected = true;
path2.init();

function Wave(){
	
	this.color = 'blue';
	this.amount = 8;
	this.height = 10;
	this.offsetX = 0;
	this.waveSpeed = 3;
	this.selected = false;
	
	this._path = new paper.Path({ fillColor: this.color });
	
	this.init = function(){
		
		this._path.fillColor = this.color;
		this._path.selected = this.selected;
		
		this._path.segments = [];
		this._path.add(new paper.Point(0, 100));
		this._path.add(new paper.Point(0, 100));
		for(var i = 0; i <= this.amount; i++){
			this._path.add(new paper.Point(i / this.amount, 1) * 100);
		}
		this._path.add(new paper.Point(100, 100));
		
	}
	
	this.update = function(_event){
		
		var w_sinus = (Math.sin(_event.count/100) + 1) * 100;
		
		// Loop through every secound point of the path to make waves:
		for (var i = 1; i <= this.amount+2; i = i+2){
			var segment = this._path.segments[i];
			// Make a sinus wave
			var sinus = Math.sin(_event.time * this.waveSpeed + i);
			// Change the y position of the point:
			segment.point.y = sinus * this.height + (this.height * 2);
		}
		
		// Same as over (but on the "left over" segments) to make it look more random
		for (var i = 2; i <= this.amount+2; i = i+2){
			var segment = this._path.segments[i];
			var sinus = Math.sin(_event.time * (this.waveSpeed * .8) + i);
			segment.point.y = sinus * this.height + (this.height * 2);
		}
		
		// Water "tide" (makes alle the waves go up and down):
		for(var i = 1; i <= this.amount+2; i++){
			this._path.segments[i].point.y += w_sinus/30 + this.offsetX;
		}
		
		// Smooth the waves:
		this._path.smooth({ from: 2, to: this.amount+2 });
		
	}
	
}

function onFrame(event) {
	
	path1.update(event);
	path2.update(event);
	
}

function onResize(event) {
	path1.init();
	path2.init();
}