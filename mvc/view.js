/**
 * @sakaijun
 * View as SVG => dom
 */

export class View {

   
    //svg led shape properties activity (on/off fill, gradients) position, shape (circle, square) 
    svgShape(led, shapeVal) {

		let svgLed = document.createElementNS("http://www.w3.org/2000/svg", shapeVal);        
		if (shapeVal === "circle") {            
            svgLed.setAttribute("cx", 10);      
            svgLed.setAttribute("cy", 10);
            svgLed.setAttribute("r", 10);
        } else {      
            svgLed.setAttribute("width", 20);
            svgLed.setAttribute("height", 20);          
        }
		
		svgLed.setAttribute("transform", "translate(" + led.xAxis + " " + led.yAxis + ")");
		svgLed.setAttribute("fill-opacity", led.activity.opacity);
        svgLed.setAttribute("fill", `url(${led.activity.color})`);
		document.getElementById("ledDisplay").appendChild(svgLed);
    }

}
