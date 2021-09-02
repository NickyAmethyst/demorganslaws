document.addEventListener('DOMContentLoaded', domloaded);
//document.addEventListener('')
function domloaded() {  
   document.getElementById("a_min").addEventListener("change", refresh);
   document.getElementById("a_max").addEventListener("change", refresh);
   document.getElementById("b_min").addEventListener("change", refresh);
   document.getElementById("b_max").addEventListener("change", refresh);
   /*function assign_a_min(){
        //location.reload(true);
        return document.getElementById("a_min").value;
    }*/


    var a_min = 50;
    a_min = parseInt(document.getElementById("a_min").value);
    console.log(a_min);
    var a_max = 250;
    a_max = parseInt(document.getElementById("a_max").value);
    //var a = [a_min, a_max];

    var b_min = 150;
    b_min = parseInt(document.getElementById("b_min").value);
    var b_max = 350;
    b_max = parseInt(document.getElementById("b_max").value);
    //var b = [b_min, b_max];

    d = 400;
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    
    function draw(s_min, s_max, y, color, thin, thick) {
        //function to draw a set and its complement
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.strokeStyle = color;
        ctx.lineWidth = thin;
        ctx.lineTo(s_min,y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(s_min,y);
        ctx.strokeStyle = color;
        ctx.lineWidth = thick;
        ctx.lineTo(s_max,y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(s_max,y);
        ctx.strokeStyle = color;
        ctx.lineWidth = thin;
        ctx.lineTo(400,y);
        ctx.stroke();
    }
//a_min < b_min && b_min < a_max && a_max < b_max
    function intersection(a_min, a_max, b_min, b_max) {
        // function returns the intersection of sets a and b
        if (a_min < b_min && b_min < a_max && a_max < b_max) { // <-- does it work now?
                                                                      // yayyyy parseInt!!
            return [b_min, a_max];
        }
        else if (b_max < a_max && a_max < b_min && b_min < a_min) { // b_min is acctualy b_max...ect...
            return [a_max, b_min];
        }
    }

    //function complement(a_min, a_max, b_min, b_max) {
        // function returns the complement of sets a and b

    //}
  
    var a_b_int = intersection(a_min, a_max, b_min, b_max);
    //var a_b_int = complement(a_min, a_max, b_min, b_max)
    console.log("a_min is:" + typeof a_min)
    console.log("a_min is:" + typeof a_max)
    console.log("a_min is:" + typeof b_min)
    console.log("a_min is:" + typeof b_max)
    console.log(a_max < b_max)

    console.log("a_b_int is: " + a_b_int)
    var a_b_int_min = a_b_int[0];
    var a_b_int_max = a_b_int[1];
    draw(a_min, a_max, 25, 'cornflowerblue', 1, 10);
    draw(b_min, b_max, 50, 'burlywood', 1, 10)
    draw(a_b_int_min, a_b_int_max, 75, 'red', 1, 10)
   
    function refresh(){
        //location.reload(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx = c.getContext('2d');
        draw(a_min, a_max, 25, 'cornflowerblue', 1, 10);
        draw(b_min, b_max, 50, 'burlywood', 1, 10)
        draw(a_b_int_min, a_b_int_max, 75, 'red', 1, 10)
        location.reload();
    }
    
}
    