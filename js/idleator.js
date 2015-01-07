var		Idleator	=	
{	reseting: false
	,listeners:[]
	,registerListner:
		function(idleseconds,callback,cancelonactivity){
			Idleator.listeners.push({'counter':0,'idleseconds':idleseconds,'cancelonactivity':cancelonactivity,'callback':callback});
		}
	,timerIncrement:
		function(){
			if (Idleator.listeners.length>0 && !Idleator.reseting){
				$.each(Idleator.listeners,
					function(index,listener){
						if (listener.counter == -1){
							if(listener.cancelonactivity){
								Idleator.listeners.splice(index,1);
								return;
							} else
								listener.counter = 0;
						}
						listener.counter++;
						if (listener.counter>=listener.idleseconds && typeof listener.callback === 'function'){
							listener.callback();
							Idleator.listeners.splice(index,1);
						}
					}
				)
			}
		}
	,timerReset:
		function(){
			if (Idleator.listeners.length>0 && !Idleator.reseting){
				Idleator.reseting	=	true;
				$.each(Idleator.listeners,
					function(index,listener){
						listener.counter	=	-1;
					}
				)
				Idleator.reseting	=	false;
			}
		}
}
$(document).ready(function () {
	setInterval(Idleator.timerIncrement, 1000);
	$(this).mousedown(function (e) {
		Idleator.timerReset();
	});
	$(this).keypress(function (e) {
		Idleator.timerReset();
	});
	if (typeof $(this).mousewheel!="undefined")
		$(this).mousewheel(function (e) {
			Idleator.timerReset();
		});
});