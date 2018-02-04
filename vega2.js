var vlSpec1 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 750,
    'height': 500,
    "layer": [
	    {
		    'mark': 'line',
		    'encoding': {
		        'x': { 'field': 'x', 'type': 'quantitative', 'scale': { 'zero': false } },
		        'y': { 'field': 'y', 'type': 'quantitative' },
		        'color': { 'field': 'category', 'type': 'nominal' }
		    }
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};

var vlSpec2 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 750,
    'height': 500,
    "layer": [
	    {
		    'mark': 'circle',
		    'encoding': {
    "x": {
      "bin": {"maxbins": 10},
      "field": "x",
      "type": "quantitative"
    },
    "y": {
      "bin": {"maxbins": 10},
      "field": "y",
      "type": "quantitative"
    },
    "size": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};

var vlSpec3 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 750,
    'height': 500,
    "layer": [
	    {
		    'mark': 'bar',
		    'encoding': {
		        'x': { 'field': 'x', 'type': 'quantitative', 'scale': { 'zero': false } },
		        'y': { 'field': 'y', 'type': 'quantitative' },
		        'color': { 'field': 'category', 'type': 'nominal' }
		    }
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};

var vlSpec4 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 750,
    'height': 500,
    "layer": [
	    {
		    'mark': 'rect',
		    'encoding': {
		        "x": {
			      "bin": {"maxbins":60},
			      "field": "x",
			      "type": "quantitative"
			    },
		        "y": {
			      "bin": {"maxbins": 40},
			      "field": "y",
			      "type": "quantitative"
			    },
		        'color': { 'field': 'category', 'type': 'nominal' }
		    },
		    "config": {
			    "range": {
			      "heatmap": {
			        "scheme": "greenblue"
			      }
			    },
			    "view": {
			      "stroke": "transparent"
			    }
			}
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};

var vlSpec5 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 750,
    'height': 500,
    "layer": [
	    {
		    'mark': 'area',
		    "encoding": {
		      "x": {
		          "field": "x",
		          "type": "temporal",
		          "axis": {
		              "title": "x",
		              "grid": false
		          }
		      },
		      "y": {
		          "field": "y",
		          "type": "quantitative",
		          "axis": {
		              "title": "y",
		              "grid": false
		          }
		      }
		      // "color": {
		      //     "field": "symbol",
		      //     "type": "nominal",
		      //     "legend": null
		      // },
		      // "row": {
		      //     "field": "symbol",
		      //     "type": "nominal",
		      //     "header": {"title": "Symbol"}
		      // }
		  }
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};

function newGenerator() {
    var counter = -1;
    var previousY = [5, 5];
    return function () {
        counter++;
        var newVals = previousY.map(function (v, c) { 
        	var rand = Math.round(Math.random() * 10 - c * 3);
        	return ({
            x: counter,
            y: (rand%2 == 0) ? (v + Math.round(Math.random() * 10 - c * 3)) : (v - Math.round(Math.random() * 10 - c * 3)),
            category: c
        }); });
        previousY = newVals.map(function (v) { return v.y; });
        return newVals;
    };
}

function utilityFunction(res, value) {
	var valueGenerator = newGenerator();
    var minimumX = value;
    window.setInterval(function () {
        minimumX++;
        var changeSet = vega.changeset().insert(valueGenerator()).remove(
        	function (t) { return t.x < minimumX; }
        );
        console.log(changeSet);
        res.view.change('table', changeSet).run();
    }, 300);
    console.log(res.view);
}


vegaEmbed('#chart1', vlSpec1).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
     utilityFunction(res, -100);
});

vegaEmbed('#chart2', vlSpec2).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
     utilityFunction(res, -100);
});

vegaEmbed('#chart3', vlSpec3).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
    utilityFunction(res, -100);
});

vegaEmbed('#chart4', vlSpec4).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
    utilityFunction(res, -100);
});

vegaEmbed('#chart5', vlSpec5).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
    utilityFunction(res, -40);
});