

var barChart = function () {

    /*Default Values*/
    var local = {
        "width":900,
        "height":500,
        "barcolour":"black"
    }

    var setHeight = 500;
    var setWidth = 900;
    var data = [];
    var svgContainer= "";
    var svg = 0;

    //Only set values if they are provided
    function configure (config) {
        if(config != undefined){
            var keyValues = Object.keys(config);
            for(i=0;i<keyValues.length;i++){
                if(config[keyValues[i]] != undefined){
                    local[keyValues[i]] = config[keyValues[i]];
                }
            }
        }else{
            return "Configuration object is not valid.";
        }
    }

    //Initial Data, SVG object and Size
    function createChartArea (svgContainer, data, config) {
        this.svgContainer = svgContainer;
        this.data = data;
        //Only set the
        configure(config);
    }

    //Modifier for config values
    function setConfig(config){
        return configure(config);
    }

    //Sets all structural elements of the chart
    function drawChart () {

        //Dimensions for svg
        svg = d3.select(this.svgContainer)
            .attr("width", local.width)
            .attr("height", local.height);

        //Draw data
        update(this.data);

    }

    /*Draws the data onto the chart*/
    function update (data) {
        console.log(svg)
        /*Ranges*/
        var yRange = d3.scaleLinear().domain([0, d3.max(data)]).range([local.height, 0]);


        //Width of each bar
        var barWidth = local.width / data.length;

        //Join data
        var bars = svg.selectAll("g")
        .data(data);

        //Draw bars
        bars.enter()
            .append("rect")
            .attr("y", function(d){return yRange(d);})
            .attr("x",function(d,i){return barWidth*i})
            .attr("height", function(d){return setHeight - yRange(d);})
            .attr("width", barWidth - 1)
            .attr("fill", local.barcolour);
    }

    /*
                            */


    return{
        init: createChartArea,
        draw: drawChart,
        setConfig: setConfig,
        update:update,
        local:local
    }
}();
