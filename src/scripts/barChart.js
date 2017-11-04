

const barChart = function () {

    /*Default Values*/
    var local = {
        "svgwidth" : 900,
        "svgheight" : 500,
        "barcolour" : "black",
        "datavalues": function(d,i){return d;},
        "labels":function(d,i){return i;},
        "margin":{"top":10, "bottom":30, "left":30,right:10},
        "barspacingratio": 0.95,
        "xLabel":"",
        "yLavel":"",
    }, data = [], svgContainer = "", svg;

    // Usable dims
    var width;
    var  height;

    //Scales
    var yScale;
    var xScale;

    //Axis
    var xAxis;
    var yAxis;

    //Set global fields
    function setfields(){
        width = local.svgwidth-local.margin.left-local.margin.right;
        height = local.svgheight - local.margin.top - local.margin.bottom;
    }

    //Set any config values passed
    function configure(config) {
        if (config != undefined){
            var keyValues = Object.keys(config);
            for (i=0;i<keyValues.length;i++){
                if (config[keyValues[i]] != undefined){
                    local[keyValues[i]] = config[keyValues[i]];
                }
            }
            setfields();
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
        setfields();
    }

    //Modifier for config values
    function setConfig(config){
        return configure(config);
    }

    //Sets all structural elements of the chart
    function drawChart () {

        //Dimensions for svg
        svg = d3.select(this.svgContainer)
            .attr("width", local.svgwidth)
            .attr("height", local.svgheight);

        svg.selectAll("g")
            .remove()
            .exit();

        svg = svg.append("g")
            .attr("transform", "translate(" + local.margin.left + ", " + local.margin.top + ")");

        //Define scale  + ranges
        xScale = d3.scaleBand().range([0,width]);
        yScale = d3.scaleLinear().range([height, 0]);

        //Define Axis
        xAxis = d3.axisBottom(xScale);
        yAxis = d3.axisLeft(yScale);

        //Attach Axis
        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class","yAxis")
            .call(yAxis);

        //Draw data
        update(this.data);

    }

    /*Draws the data onto the chart*/
    function update (data) {

        //Ranges
        yScale.domain([0, d3.max(data,
                    function(d, i){
                        return local.datavalues(d,i);
                    })
                ]);

        xScale.domain(data.map(
                    function(d, i){
                        return local.labels(d,i);
                    })
                );


        //Width of each bar
        var barWidth = width / data.length;

        //Join data
        var bars = svg.selectAll(".bar")
        .remove()
        .exit()
        .data(data);

        //Draw bars
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", function(d,i){
                        return yScale(local.datavalues(d,i));
                    })
            .attr("x",function(d,i){
                        return barWidth*i + barWidth*(1-local.barspacingratio)*0.5
                    })
            .attr("height", function(d,i){
                        return height - yScale(local.datavalues(d,i));
                    })
            .attr("width", barWidth*local.barspacingratio)
            .attr("fill", local.barcolour);

        //Update axis
        svg.select(".xAxis")
            .call(xAxis);

        svg.select(".yAxis")
            .call(yAxis);


    }


    return{
        init: createChartArea,
        draw: drawChart,
        setConfig: setConfig,
        update:update
    }
}();

export default barChart;
