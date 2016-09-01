import d3 from 'd3';
import d3Jetpack from 'd3-jetpack';
import { queue, await, defer } from 'd3-queue';

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
        if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    };
};

window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(UserLocation);
  }
  else
    NearestCity(38.8951, -77.0367);
}

function UserLocation(position) {
  NearestCity(position.coords.latitude, position.coords.longitude);
}

function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371;
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

var lat = 20;
var lon = 40;

var cities = [
  ["city1", 10, 50, "blah"],
  ["city2", 40, 60, "blah"],
  ["city3", 25, 10, "blah"],
  ["city4", 5, 80, "blah"]
];

function NearestCity(latitude, longitude) {
  var mindif = 99999;
  var closest;

  for (index = 0; index < cities.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, cities[index][1], cities[index][2]);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }

  alert(cities[closest]);
}

function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

var calc = d3.select('#calculator'),
userPollution,
x,y;

function getRisk(minutes, pollution){
    var inhaleDose = (pollution*0.27*56) + (pollution*0.609*(112-(minutes/60*7))) + ((pollution*2)*(minutes/60*7)*2.55);
    var noTravelConc = (pollution*0.27*56) + (pollution*0.609*112);
    var backGroundConcentrationPM25 = ((inhaleDose/noTravelConc)-1)*pollution;
    var backGroundConcentrationRR = Math.exp(Math.log(1.07)*backGroundConcentrationPM25/10);
    var backGroundConcentration1PAF = 1-(1-backGroundConcentrationRR)/1;
    var physicalAcitivtyMEthWeek = (minutes/60*7) * 6.8;
    var physicalAcitivtyRR = Math.pow(0.959330219,(Math.pow(physicalAcitivtyMEthWeek,0.5)));
    var physicalActivity1PAF = 1-(1-physicalAcitivtyRR)/1;
    return d3.format('.4f')(physicalActivity1PAF * backGroundConcentration1PAF);
}

function cityRisk(pol){

    var mins = d3.range(0,1441,2.5),
        risk = [],
        data = [];
    mins.forEach(function(d,i){
        risk.push(+getRisk(mins[i], pol));
        mins[i] = +d3.format('.3f')(mins[i]/60);
        data.push({mins: +mins[i], risk: +risk[i]});
    });

    var inflection = mins[risk.indexOf(d3.min(risk))],
        cross = mins[d3.bisect(risk,1.000001)];

    return {data: data, inflection: inflection, cross: cross};
}

// calc.html(cityRisk(36).inflection + ' ' + cityRisk(36).cross);

function reDraw(){

    calc.html('');

    var bounds = calc.node().getBoundingClientRect(),
        width = bounds.width,
        height = width >= 500 ? width/1.61:width*1.3,
        M = { T:80, L:0, B:45, R:0 },
        pM = { T:25, L:19, B:30, R:40, G:0 },
        rows = 1,
        columns = 1;

    var svg = calc.append('svg').attr({
        'id':'graphic'
    })
    .style({
        'width':width,
        'height':height
    });

    var chartHolder = svg.append('g').attr({
        'id':'chartHolder',
        'transform':'translate(0,0)'
    });
    chartHolder.append('rect').attr({
        'id':'backdrop',
        x:0,
        y:0
    }).style({
        'width':width + 'px',
        'height':height + 'px'
    });

    var footnote = chartHolder.append('text.footnote.shadow').attr({
        'x':1,
        'y':height-29
    })
    .tspans(['*Specifically fine particulate matter (PM2.5)','Sources: Tainio, M. et al, 2016, King’s College London','Graphic by John Burn-Murdoch / @jburnmurdoch'],13);

    function generateData(callback){
        var city = cityRisk(15);
        callback(city);
    }

    queue()
        .defer(d3.csv, '/assets/world.csv')
        .await(drawChart);

    function drawChart(error, world){
        // console.log(error, world);

        var data = world.map(function (d,i){return{
                hoz: d.hours,
                vrt: d.risk,
                subgroup: d.city,
                group: d.region
                    .replace(/North/g,'N.')
                    .replace(/South/g,'S.'),
                tipping: d.tipping,
                harm: d.harm
            }
        });

        data = d3.nest()
            .key(function(d) { return d.group})
            .sortKeys(d3.ascending)
            .key(function(d) { return d.subgroup})
            .entries(data);

        var keys = [];
        data.forEach(function(d,i){
            keys.push(d.key);
        });

        var cityRaw = cityRisk(userPollution);

        var city = cityRaw.data.map(function (d,i){return{
                hoz: d.mins,
                vrt: d.risk
            };
        });

        if(cityRaw.cross == undefined){
            d3.select('#results').style('display','block').select('#hours').html('*literally* all day');
        }else if(cityRaw.cross < 1){
            d3.select('#results').style('display','block').select('#hours').html('for ' + d3.format('.0f')(cityRaw.cross*60) + ' minutes');
        }else if(cityRaw.cross == 1){
            d3.select('#results').style('display','block').select('#hours').html('for ' + d3.format('.0f')(cityRaw.cross) + ' hour');
        }else{
            d3.select('#results').style('display','block').select('#hours').html('for ' + d3.format('.1f')(cityRaw.cross) + ' hours');
        }

        // console.log(city);

        var plotW = ((width-(M.L+M.R))/columns)-(pM.G/2),
            plotH = ((height-(M.T+M.B))/rows);

        var plots = chartHolder.selectAll("g.plot").data([data]);
        plots.enter().append("g").attr({
            class:function(d,i){return 'plot _' + i},
            "transform":function(d,i){
                var xPos = i % columns;
                var yPos = Math.floor(i/columns);
                var gap = (i % columns == 1) ? pM.G:0;
                return 'translate(' + (M.L+(plotW*xPos+gap)) + ',' + (M.T+plotH*yPos) + ')'
            }
        });

        var colours = d3.scale.ordinal()
            .domain(keys)
            .range(['#5ba829','#b4bf2c','#af516c','#ccc2c2','#87cbf2','#0091a7','#3267b4','#f3abc8','#b07979']);

        var textColours = colours.copy();
        textColours.range(['#5ba928','#9e2f50','#008094','#69c0f2','#a7b224','#bfb0b0','#3267b4','#f197bc','#a96565']);

        function drawLegend(shape){

            var legend = plots.append('g.legend').translate([0,-65]);

            var legLabs = legend.selectAll('text.shadow').data(keys);
            legLabs.enter().append('text.shadow');
            legLabs.exit().remove();
            legLabs
            .attr({
                x:function(d,i){return i*50},
                y:0
            })
            .style({
                'text-anchor':'start',
                fill:'#74736c'
            })
            .html(function(d,i){return d});

            var labelLengths = [];

            legLabs.each(function(d,i){
                labelLengths.push([d3.select(this).node().getBoundingClientRect().width,i]);
            });

            // console.log(labelLengths);

            legLabs.attr({
                x:function(d,i){
                    var thisPos = d3.sum(labelLengths.filter(function(a,b){return a[1] <= i-1}),function(x,y){return x[0]});
                    if(shape in oc(['line','rectangle'])){
                        return (thisPos + 6)+i*11
                    }else if(shape == 'textOnly'){
                        return (thisPos)+i*11
                    }else{
                        return (thisPos + 11)+i*11
                    }
                }
            });

            if(shape == 'line'){
                legLabs.enter().append('line')
                .attr({
                    x1:function(d,i){
                        var thisPos = d3.sum(labelLengths.filter(function(a,b){return a[1] <= i-1}),function(x,y){return x[0]});
                        return thisPos+(2+i*11);
                    },
                    x2:function(d,i){
                        var thisPos = d3.sum(labelLengths.filter(function(a,b){return a[1] <= i-1}),function(x,y){return x[0]});
                        return thisPos+(2+i*11);
                    },
                    y1:-13,
                    y2:3
                })
                .style({
                    stroke:function(d,i){return colours(d)},
                    'stroke-width':3
                });
            }else if(shape == 'circle'){
                legLabs.enter().append('circle')
                .attr({
                    cx:function(d,i){
                        var thisPos = d3.sum(labelLengths.filter(function(a,b){return a[1] <= i-1}),function(x,y){return x[0]});
                        return thisPos+(5+i*11);
                    },
                    cy:-5,
                    r:4
                })
                .style({
                    fill:function(d,i){return colours(d)},
                    stroke:function(d,i){return textColours(d)},
                });
            }else if(shape == 'rectangle'){
                legLabs.enter().append('rect')
                .attr({
                    x:function(d,i){
                        var thisPos = d3.sum(labelLengths.filter(function(a,b){return a[1] <= i-1}),function(x,y){return x[0]});
                        return thisPos+(0+i*11);
                    },
                    width:5,
                    y:-13,
                    height:16
                })
                .style({
                    stroke:'#fff1e0',
                    fill:function(d,i){return colours(d)}
                });
            }else if(shape == 'textOnly'){
                legLabs.style({
                    fill:function(d,i){return textColours(d)},
                    'font-weight':500
                });
            }

        }

        y = d3.scale.linear()
            .range([plotH-pM.B,pM.T])
            .domain([0.55,1.32]);
        var ys = d3.svg.axis()
            .orient("left")
            .ticks(5)
            .tickValues(d3.range(0.6,1.5,0.2))
            .tickSize(-1*((plotW)))
            .tickFormat(d3.format('.1f'))
            .scale(y);
        var ya = plots.append('g.axis.y')
            .translate([pM.L,0])
            .call(ys)
            .selectAll('text')
            .classed('shadow',true);

        x = d3.scale.linear()
            .range([pM.L,plotW-pM.R])
            .domain([0,10]);
        var xs = d3.svg.axis()
            .orient("bottom")
            .ticks(5)
            .tickSize(5)
            .tickFormat(d3.format("d"))
            .scale(x);

        var groups = plots.selectAll('g.group').data(function(d){return d}).enter().append('g.group');

        var line = d3.svg.line()
            .interpolate('linear')
            .x(function(d){return x(d.hoz)})
            .y(function(d){return y(d.vrt)});

        var subgroups = groups.selectAll('g.subgroup').data(function(d){return d.values}).enter().append('g.subgroup');

        var lines = subgroups.append('path.line')
            .attr({
                d:function(d){return line(d.values)},
                id:function(d){return d.key.replace(/ /g,'_').toLowerCase()}
            })
            .style({
                fill:'none',
                stroke:function(d){return colours(d.values[0].group)},
                'stroke-width':2,
                opacity:0.5
            });

        var userLineBack = plots.append('path#userLineBack')
            .attr({
                d:function(d){return line(city)}
            })
            .style({
                fill:'none',
                stroke:'#fff1e0',
                'stroke-width':5
            });

        var userLine = plots.append('path#userLine')
            .attr({
                d:function(d){return line(city)}
            })
            .style({
                fill:'none',
                stroke:'#43423e',
                'stroke-width':3
            });

        var refLine1 = plots.append('line#refLine1')
            .attr({
                x1:x(cityRaw.inflection),
                x2:x(cityRaw.inflection),
                y1:y(0),
                y2:y(2)
            })
            .style({
                stroke:'#74736c',
                'stroke-width':2,
                'stroke-dasharray':'2 2'
            });

        var refLine2 = plots.append('line#refLine2')
            .attr({
                x1:cityRaw.cross == undefined ? x(-1):x(cityRaw.cross),
                x2:cityRaw.cross == undefined ? x(-1):x(cityRaw.cross),
                y1:y(0),
                y2:y(2)
            })
            .style({
                stroke:'#74736c',
                'stroke-width':2,
                'stroke-dasharray':'2 2'
            });

        var yt = plots.append('text.y.axis.title.shadow')
            .attr({
                x:0,
                y:y(+d3.selectAll('.axis.y .tick:nth-last-child(2) text').html())-32
            })
            .tspans(['Mortality risk relative to not cycling',' ↓']);

        var xa = plots.append('g.axis.x')
            .translate([0,plotH-(pM.B)])
            .call(xs)
            .selectAll('text')
            .classed('shadow',true);
        d3.selectAll('g.axis.y .tick line')
            .style({
                stroke:'#e9decf',
                'stroke-dasharray':'2 2'
            });
        var xt = plots.append('text.axis.x.title.shadow')
            .attr({
                x:d3.mean(x.range()),
                y:plotH-pM.T+23
            })
            .style({
                'text-anchor':'middle'
            })
            .html('&larr; Hours of cycling per day &rarr;');

        d3.selectAll('.axis.y .tick text').attr({'dy':-2});
        d3.selectAll('.axis.y .tick line').translate([-pM.L,0]);
        d3.selectAll('.axis.y .tick').filter(function(d,i){return d==1}).selectAll('line').style({'stroke-dasharray':'none',stroke:'#74736c'});

        drawLegend('textOnly');

        var topLab = plots.append('text.light.shadow')
            .attr({
                y:y(1)-68,
                'text-anchor':'end'
            })
            .tspans([' ↑ ','Cycling','increases','mortality','risk'],15.5).attr({
                x:plotW
            });

        var bottomLab = plots.append('text.light.shadow')
            .attr({
                y:y(1)+17,
                'text-anchor':'end'
            })
            .tspans(d3.wordwrap('Cycling reduces mortality risk ↓ ', 12),15.5).attr({
                x:plotW
            });

        var zabol = plots.append('text.curved')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#zabol',
        //         'startOffset':45
        //     })
        //     .html('<tspan dy=-2>Zabol, Iran</tspan>');

        // var london = plots.append('text.curved.shadow')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#london',
        //         'startOffset':390
        //     })
        //     .style({
        //         'letter-spacing': '0.3px'
        //     })
        //     .html('<tspan dy=-3>London</tspan>');

        // var delhi = plots.append('text.curved')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#delhi',
        //         'startOffset':90
        //     })
        //     .html('<tspan dy=-2>Delhi</tspan>');

        // var beijing = plots.append('text.curved')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#beijing',
        //         'startOffset':150
        //     })
        //     .html('<tspan dy=11>Beijing</tspan>');

        // var laPaz = plots.append('text.curved')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#la_paz',
        //         'startOffset':300
        //     })
        //     .html('<tspan dy=-2>La Paz</tspan>');

        // var milan = plots.append('text.curved')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#milan',
        //         'startOffset':300
        //     })
        //     .html('<tspan dy=-2>Milan</tspan>');

        // var wellington = plots.append('text.curved')
        //     .append('textPath')
        //     .attr({
        //         'xlink:href':'#wellington',
        //         'startOffset':388
        //     })
        //     .html('<tspan dy=11>Wellington</tspan>');

    }

}

function update(){
    var cityRaw = cityRisk(userPollution);

    var city = cityRaw.data.map(function (d,i){return{
            hoz: d.mins,
            vrt: d.risk
        };
    });

    var line = d3.svg.line()
        .interpolate('linear')
        .x(function(d){return x(d.hoz)})
        .y(function(d){return y(d.vrt)});

    var userLineBack = d3.select('path#userLineBack')
        .attr({
            d:function(d){return line(city)}
        });

    var userLine = d3.select('path#userLine')
        .attr({
            d:function(d){return line(city)}
        });

    var refLine1 = d3.select('line#refLine1')
        .attr({
            x1:x(cityRaw.inflection),
            x2:x(cityRaw.inflection),
            y1:y(0),
            y2:y(2)
        });

    var refLine2 = d3.select('line#refLine2')
        .attr({
            x1:cityRaw.cross == undefined ? x(-1):x(cityRaw.cross),
            x2:cityRaw.cross == undefined ? x(-1):x(cityRaw.cross),
            y1:y(0),
            y2:y(2)
        });

    if(cityRaw.cross == undefined){
        d3.select('#results').style('display','block').select('#hours').html('<em>literally</em> all day');
    }else if(cityRaw.cross < 1){
        d3.select('#results').style('display','block').select('#hours').html('for ' + d3.format('.0f')(cityRaw.cross*60) + ' minutes');
    }else if(cityRaw.cross == 1){
        d3.select('#results').style('display','block').select('#hours').html('for ' + d3.format('.0f')(cityRaw.cross) + ' hour');
    }else{
        d3.select('#results').style('display','block').select('#hours').html('for ' + d3.format('.1f')(cityRaw.cross) + ' hours');
    }
}

var windowWidth = window.innerWidth;

d3.select('button').on('click',function(){
    userPollution = d3.select('input').node().value;
    reDraw();
    d3.select(window).on('resize',debounce(function(){
        if(window.innerWidth != windowWidth){
            reDraw();
        }
    },10));
});

d3.select('input').on('input', function(){
    userPollution = d3.select(this).node().value;
    update();
    d3.select(window).on('resize',debounce(function(){
        if(window.innerWidth != windowWidth){
            reDraw();
        }
    },10));
})
