

var barChart = function () {

    //Convert to object
    /*Default Values*/
    var lowerThreshold = 50;
    var upperThreshold = 90;
    var green = "rgb(12, 150, 30)";
    var yellow = "rgb(255, 190, 0)";
    var red = "rgb(255, 21, 21)";
    var setHeight = 500;
    var setWidth = 900;
    var data = [];
    var svgContainer= "";

    /*Initial Data, SVG object and Size*/
    function createChartArea (svgContainer, data, height, width) {
        /*If function is called with undefine values the defaults
                    should not be overridden*/
        this.setHeight = height;
        this.setWidth = width;
        this.svgContainer = svgContainer;
        this.data = data;
    }

    /*Draw the graph*/
    function drawChart () {

        /*Add width to SVG */
        var chart = d3.select(this.svgContainer)
        .attr("width", this.setWidth)
        .attr("height", this.setHeight);

        /*Ranges*/
        var yRange = d3.scaleLinear().domain([0, d3.max(this.data)]).range([this.setHeight, 0]);


        /*Bars*/
        var barWidth = this.setWidth / this.data.length;

        var bars = chart.selectAll("g")
        .data(this.data)
        .enter()
        .append("g")
        .attr("transform", function(d, i){return "translate(" + i*barWidth + ", 0 )";});

        bars.append("rect")
            .attr("y", function(d){return yRange(d);})
            .attr("height", function(d){return setHeight - yRange(d);})
            .attr("width", barWidth - 1)
            .attr("fill", function(d){
            if(d<lowerThreshold){
                return red;
            }else if(d>=lowerThreshold && d<upperThreshold){
                return yellow;
            }else{
                return green;
            }
        });

    }

    /*
                            */


    return{
        init: createChartArea,
        draw:drawChart
    }
}();
