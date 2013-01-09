ET.School.Utilities.loadScript("http://code.jquery.com/jquery.min.js",
function(){
ET.School.Utilities.loadScript("https://raw.github.com/jquery/jquery-ui/master/tests/jquery.simulate.js",null,false);
ET.School.Utilities.loadScript("http://code.jquery.com/ui/1.8.18/jquery-ui.min.js",
function(){
   jQuery.ui.intersect = function (draggable, droppable, toleranceMode) {
        if (!droppable.offset) return false;
        var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width,
        y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height;
        var l = droppable.offset.left, r = l + droppable.proportions.width,
        t = droppable.offset.top, b = t + droppable.proportions.height;

        if (jQuery.ui.intersect[toleranceMode]) {
            return jQuery.ui.intersect[toleranceMode].call(jQuery.ui.intersect, draggable, droppable, x1, x2, y1, y2, l, r, t, b);
        } else {
            switch (toleranceMode) {
                case 'fit':
                    return (l <= x1 && x2 <= r
            && t <= y1 && y2 <= b);
                    break;
                case 'intersect':
                    return (l < x1 + (draggable.helperProportions.width / 2) // Right Half
            && x2 - (draggable.helperProportions.width / 2) < r // Left Half
            && t < y1 + (draggable.helperProportions.height / 2) // Bottom Half
            && y2 - (draggable.helperProportions.height / 2) < b); // Top Half
                    break;
                case 'pointer':
                    var draggableLeft = ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left),
            draggableTop = ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top),
            isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
                    return isOver;
                    break;
                case 'touch':
                    return (
              (y1 >= t && y1 <= b) || // Top edge touching
              (y2 >= t && y2 <= b) || // Bottom edge touching
              (y1 < t && y2 > b)    // Surrounded vertically
            ) && (
              (x1 >= l && x1 <= r) || // Left edge touching
              (x2 >= l && x2 <= r) || // Right edge touching
              (x1 < l && x2 > r)    // Surrounded horizontally
            );
                    break;
                default:
                    return false;
                    break;
            }
        };

    };
    jQuery.extend(jQuery.ui.intersect, {
        'touchmiddle': function (draggable, droppable, x1, x2, y1, y2, l, r, t, b) {
            y2 = y1 + 47; //47 is the drag item's normal height.use selector act-mt_rl to test
            return (
              (y1 >= t && y1 <= b) || // Top edge touching
              (y2 >= t && y2 <= b) || // Bottom edge touching
              (y1 < t && y2 > b)    // Surrounded vertically
            ) && (
              (x1 >= l && x1 <= r) || // Left edge touching
              (x2 >= l && x2 <= r) || // Right edge touching
              (x1 < l && x2 > r)    // Surrounded horizontally
            );
        }
    }
     );}, false);}, false);