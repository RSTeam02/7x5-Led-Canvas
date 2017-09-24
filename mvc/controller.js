/**
 * @sakaijun
 * Control unit 
 */

import { Led } from "./led.js";
import { View } from "./view.js";

export class Controller {

    constructor() {
        this.readJSON();
        this.inputUI();
        this.newMatrix();
        this.initRefresh();

    }

    readJSON() {
        $.getJSON("alphanumeric.json", (data) => {
            this.alphanumeric = data;
        });
    }

    //connect model, view, evaluate with keyup
    inputUI() {
        //update string led output, when keyup in the input field

        $(".mkInput").on("input", () => {
            this.initRefresh();
        });
    }
    //new led matrix after refresh, clear
    newMatrix(update) {

        let stringConv = $("#txtInput").val();
        stringConv += "\u0020";
        let i = 0;
        let loopCnt = 0;

        this.interval = setInterval(() => {
            let mode = $("input:radio[name='mode']:checked").val();
            let str = "";
            let date = new Date();
            let digit = 0;
            while (ledDisplay.firstChild) {
                ledDisplay.removeChild(ledDisplay.firstChild);
            }

            digit = (date.getHours() % 12 >= 10 || date.getHours() % 12 === 0) ? 5 : 4;        
            str = (mode === "#text")
                ? stringConv.split("").join("\u0020")
                : (new Date().toLocaleTimeString().slice(0, digit) + "\u0020").split("").join("\u0020");
            this.ledCanvas7x5(str[loopCnt]);
            loopCnt = (i++) % str.length;

        }, update);
    }

    //interval between next letters (millis)
    initRefresh() {
        clearInterval(this.interval);
        $("#updateSlider").html(`Update every ${$("#slider").val()}ms:`);
        this.newMatrix($("#slider").val());
    }

    //canvas for each letter (char)
    ledCanvas7x5(chr) {
        //console.log(this.alphanumeric[chr])
        let view = new View();
        let led = new Led();
        let currentShape = $("input:radio[name='shape']:checked").val();
        led.setOn(1, this.colorChooser());
        led.setOff(.2, "#RadialGradient2");
        let y = 0;
        for (let i = 0; i < 7; i++) {
            let x = 0;
            for (let j = 0; j < 5; j++) {
                let ledObj = {
                    activity: {},
                    xAxis: x,
                    yAxis: y
                }

                ledObj.activity = (this.alphanumeric[chr][i].split("")[j] === "1") ? led.getOn() : led.getOff();
                view.svgShape(ledObj, currentShape);
                //next row
                x += 20;
            }
            //next column
            y += 20
        }
    }

    //random or checked letter color
    colorChooser() {
        let allColor = document.getElementsByClassName("radioCol");
        let rndVal = Math.floor(Math.random() * (allColor.length - 1));
        let color = $("input:radio[name='color']:checked").val();

        if (color === "#Random") {
            color = allColor[rndVal].value;
        }

        return color;
    }

}
