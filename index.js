document.addEventListener('DOMContentLoaded', domloaded);

function domloaded() {  
    document.getElementById("second").addEventListener("change", refresh);
    document.getElementById("first").addEventListener("change", refresh);
    document.getElementById("a_min").addEventListener("change", refresh);
    document.getElementById("a_max").addEventListener("change", refresh);
    document.getElementById("b_min").addEventListener("change", refresh);
    document.getElementById("b_max").addEventListener("change", refresh);
    
    function refresh(){
        //clear canvas and reload page to redraw canvas after a change
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        location.reload();
    }
    /* Colect user input from the 'scale' input elements to asign the
     * bounds of the 2 sets
     */
    let a_min = parseInt(document.getElementById("a_min").value);
    let a_max = parseInt(document.getElementById("a_max").value);
    
    let b_min = parseInt(document.getElementById("b_min").value);
    let b_max = parseInt(document.getElementById("b_max").value);

    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    
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
    /*
     * There are 24 posible conditions (assuming none of the 4 endpoints 
     * are equal) for aranging the four endpoints of the 2 sets in order
     * 
     * There are only 6 unique cases, but I would need to use all 24
     * to continue using the stratagie used in the intersection function * as defigned below
     * 
     * There must be an algorithem that is more efficeint and can handel * all casses or at least four unique cases at a time
     * 
     * Changing the way a_min, a_max,... , b_max are colected may also  * be nessisary / more efficient
     *
     */

    function intersection(a_min, a_max, b_min, b_max) {
        // function returns the intersection of sets a and b
        if (a_min < b_min && b_min < a_max && a_max < b_max) {
            return [b_min, a_max];
        }
        else if (b_max < a_max && a_max < b_min && b_min < a_min) {
            return [a_max, b_min];
        }
        else
            return [':(',':(']
    }

    function union(a_min, a_max, b_min, b_max) {
        // function returns the union of sets a and b
        let x = [a_min, a_max, b_min, b_max];
        let y = x.sort(function(a,b){return a-b});
        return [y[0],y[3]];
    }
  
    let a_b_int = intersection(a_min, a_max, b_min, b_max);
    let a_b_uni = union(a_min, a_max, b_min, b_max);
    
    let a_b_int_min = a_b_int[0];
    let a_b_int_max = a_b_int[1];

    let a_b_uni_min = a_b_uni[0];
    let a_b_uni_max = a_b_uni[1];
    
    /*
     * this wasn't working and I dont Know why
     *
     * 
        function whichLaw() {
            //
            if (firstValue == true) {
                return draw(a_b_uni_min, a_b_uni_max, 75, 'red', 1, 10);
            }
            else if (secondValue == true) {
                return draw(a_b_int_min, a_b_int_max, 75, 'red', 1, 10);
            }
        }
    */

    /*
     *draw the two sets and either their union or intersection.
     *draw the complements ofthe two sets and the complement of their  *union or intersection
     */
    let firstValue = document.getElementById("first").checked;
    let secondValue = document.getElementById("second").checked;
    draw(a_min, a_max, 25, 'cornflowerblue', 1, 10);
    draw(b_min, b_max, 50, 'burlywood', 1, 10)
    if (firstValue) {
        draw(a_b_uni_min, a_b_uni_max, 75, 'red', 1, 10);
    }
    else if (secondValue) {
        draw(a_b_int_min, a_b_int_max, 75, 'red', 1, 10);
    }
}    
