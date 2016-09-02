// import 'babel-polyfill';

// import d3 from 'd3';
// import d3Jetpack from 'd3-jetpack';
// import { queue, await, defer } from 'd3-queue';

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

var cities = [{"city":"Kabul, Afghanistan","pm25":86,"lon":"69.16243","lat":"34.519706"},{"city":"Tirana, Albania","pm25":16,"lon":"19.826398","lat":"41.331144"},{"city":"Buenos Aires, Argentina","pm25":14,"lon":"-58.445979","lat":"-34.612869"},{"city":"Adelaide, Australia","pm25":7,"lon":"138.599888","lat":"-34.928634"},{"city":"Brisbane, Australia","pm25":6,"lon":"153.023499","lat":"-27.468968"},{"city":"Canberra, Australia","pm25":7,"lon":"149.128667","lat":"-35.282071"},{"city":"Darwin, Australia","pm25":8,"lon":"130.841047","lat":"-12.46044"},{"city":"Hobart, Tasmania, Australia","pm25":6,"lon":"147.323815","lat":"-42.881903"},{"city":"Melbourne, Australia","pm25":8,"lon":"144.963146","lat":"-37.814255"},{"city":"Perth, Australia","pm25":8,"lon":"115.86048","lat":"-31.952712"},{"city":"Sydney, Australia","pm25":8,"lon":"151.216454","lat":"-33.854816"},{"city":"Graz, Austria","pm25":19,"lon":"15.438292","lat":"47.07081"},{"city":"Innsbruck, Austria","pm25":14,"lon":"11.392769","lat":"47.26543"},{"city":"Salzburg, Austria","pm25":16,"lon":"13.041059","lat":"47.800198"},{"city":"Wien, Austria","pm25":18,"lon":"16.371364","lat":"48.192309"},{"city":"Hamad Town, Bahrain","pm25":66,"lon":"50.498336","lat":"26.126746"},{"city":"Chittagong, Bangladesh","pm25":95,"lon":"91.841286","lat":"22.3308"},{"city":"Dhaka, Bangladesh","pm25":90,"lon":"90.409879","lat":"23.728216"},{"city":"Narayangonj, Bangladesh","pm25":106,"lon":"91.832634","lat":"22.330365"},{"city":"Antwerpen, Belgium","pm25":17,"lon":"4.399708","lat":"51.22111"},{"city":"Brugge, Belgium","pm25":17,"lon":"3.2081","lat":"51.231579"},{"city":"Brussels, Belgium","pm25":18,"lon":"4.367202","lat":"50.844041"},{"city":"Charleroi, Belgium","pm25":15,"lon":"4.443624","lat":"50.412033"},{"city":"Genk, Belgium","pm25":18,"lon":"5.500146","lat":"50.965486"},{"city":"Gent, Belgium","pm25":19,"lon":"3.739013","lat":"51.099884"},{"city":"Liege, Belgium","pm25":15,"lon":"5.57342","lat":"50.645138"},{"city":"Mechelen, Belgium","pm25":17,"lon":"4.469871","lat":"51.028109"},{"city":"Thimphu, Bhutan","pm25":43,"lon":"89.621634","lat":"27.469613"},{"city":"La Paz, Bolivia, Plurinational States of","pm25":44,"lon":"-114.148559","lat":"32.672685"},{"city":"Sarajevo, Bosnia and Herzegovina","pm25":30,"lon":"18.388613","lat":"43.851498"},{"city":"Porto Alegre, Brazil","pm25":13,"lon":"-51.22843","lat":"-30.028268"},{"city":"Curitiba, Brazil","pm25":11,"lon":"-49.272373","lat":"-25.428693"},{"city":"Sao Paulo, Brazil","pm25":19,"lon":"-46.633382","lat":"-23.550651"},{"city":"Rio De Janeiro, Brazil","pm25":16,"lon":"-43.209373","lat":"-22.911014"},{"city":"Plovdiv, Bulgaria","pm25":34,"lon":"24.749839","lat":"42.141912"},{"city":"Sofia, Bulgaria","pm25":22,"lon":"23.322596","lat":"42.697721"},{"city":"Varna, Bulgaria","pm25":36,"lon":"27.901713","lat":"43.21661"},{"city":"Bafoussam, Cameroon","pm25":67,"lon":"10.421559","lat":"5.475847"},{"city":"Bamenda, Cameroon","pm25":132,"lon":"10.153944","lat":"5.956798"},{"city":"Calgary, Canada","pm25":9,"lon":"-114.05803","lat":"51.046362"},{"city":"Edmonton, Canada","pm25":8,"lon":"-113.491213","lat":"53.546135"},{"city":"Halifax, Canada","pm25":5,"lon":"-63.573566","lat":"44.646244"},{"city":"Montreal, Canada","pm25":10,"lon":"-73.553363","lat":"45.509062"},{"city":"Ottawa, Canada","pm25":7,"lon":"-75.692432","lat":"45.420421"},{"city":"Quebec, Canada","pm25":9,"lon":"-71.207425","lat":"46.814184"},{"city":"Toronto, Canada","pm25":8,"lon":"-79.381713","lat":"43.651893"},{"city":"West Vancouver, Canada","pm25":5,"lon":"-123.168017","lat":"49.338206"},{"city":"Coyhaique, Chile","pm25":64,"lon":"-71.802359","lat":"-45.487653"},{"city":"Santiago, Chile","pm25":29,"lon":"-70.650456","lat":"-33.437913"},{"city":"Baoding, China","pm25":126,"lon":"115.490698","lat":"38.857936"},{"city":"Beijing, China","pm25":85,"lon":"116.391195","lat":"39.90647"},{"city":"Chengdu, China","pm25":71,"lon":"104.061278","lat":"30.676555"},{"city":"Chongqing, China","pm25":61,"lon":"106.549282","lat":"29.558571"},{"city":"Guangzhou, China","pm25":48,"lon":"113.259001","lat":"23.130004"},{"city":"Hong Kong, China","pm25":29,"lon":"-114.1644","lat":"51.036"},{"city":"Nanjing, China","pm25":72,"lon":"118.791607","lat":"32.060916"},{"city":"Shanghai, China","pm25":52,"lon":"121.488892","lat":"31.225344"},{"city":"Shenzhen, China","pm25":34,"lon":"114.054533","lat":"22.544267"},{"city":"Wuhan, China","pm25":80,"lon":"114.29928","lat":"30.596021"},{"city":"Xiamen, China","pm25":36,"lon":"118.135564","lat":"24.497442"},{"city":"Bogota, Colombia","pm25":24,"lon":"-74.076087","lat":"4.598048"},{"city":"Medellin, Colombia","pm25":26,"lon":"-75.573553","lat":"6.244338"},{"city":"Heredia, Costa Rica","pm25":29,"lon":"-84.116706","lat":"9.998396"},{"city":"San Jose, Costa Rica","pm25":24,"lon":"-121.888128","lat":"37.334807"},{"city":"Osijek, Croatia","pm25":20,"lon":"18.689682","lat":"45.554104"},{"city":"Rijeka, Croatia","pm25":11,"lon":"14.441356","lat":"45.327112"},{"city":"Zagreb, Croatia","pm25":22,"lon":"15.97703","lat":"45.813155"},{"city":"Nicosia, Cyprus","pm25":17,"lon":"33.364726","lat":"35.17393"},{"city":"Liberec, Czech Republic","pm25":22,"lon":"15.058395","lat":"50.770265"},{"city":"Plzen, Czech Republic","pm25":21,"lon":"13.377525","lat":"49.747742"},{"city":"Prague, Czech Republic","pm25":19,"lon":"14.421256","lat":"50.08744"},{"city":"Aalborg, Denmark","pm25":11,"lon":"9.919663","lat":"57.04821"},{"city":"Copenhagen, Denmark","pm25":11,"lon":"12.570069","lat":"55.686724"},{"city":"Keldsnor, Denmark","pm25":7,"lon":"-70.80716","lat":"43.926964"},{"city":"Quito, Ecuador","pm25":18,"lon":"-78.512091","lat":"-0.220169"},{"city":"Santo Domingo, Ecuador","pm25":33,"lon":"-79.159703","lat":"-0.245729"},{"city":"Cairo, Egypt","pm25":76,"lon":"31.243666","lat":"30.048819"},{"city":"San Salvador, El Salvador","pm25":42,"lon":"-89.19283","lat":"13.696972"},{"city":"Tallinn, Estonia","pm25":8,"lon":"24.745369","lat":"59.437216"},{"city":"Helsinki, Finland","pm25":9,"lon":"24.943508","lat":"60.166628"},{"city":"Tampere, Finland","pm25":9,"lon":"23.760312","lat":"61.498021"},{"city":"Aix-en-Provence, France","pm25":13,"lon":"5.447474","lat":"43.529842"},{"city":"Ajaccio, France","pm25":10,"lon":"8.737603","lat":"41.926399"},{"city":"Calais, France","pm25":15,"lon":"-1.304623","lat":"49.144345"},{"city":"Lille, France","pm25":17,"lon":"3.070641","lat":"50.630509"},{"city":"Marseille, France","pm25":17,"lon":"5.547842","lat":"43.301917"},{"city":"Metz, France","pm25":17,"lon":"6.176355","lat":"49.119696"},{"city":"Paris, France","pm25":18,"lon":"2.352133","lat":"48.856506"},{"city":"Roubaix, France","pm25":20,"lon":"3.174173","lat":"50.691589"},{"city":"Tbilisi, Georgia","pm25":29,"lon":"44.801498","lat":"41.693435"},{"city":"Berlin, Germany","pm25":16,"lon":"13.38886","lat":"52.517037"},{"city":"Bonn, Germany","pm25":14,"lon":"7.10066","lat":"50.735851"},{"city":"Dresden, Germany","pm25":17,"lon":"13.738144","lat":"51.049329"},{"city":"Frankfurt, Germany","pm25":18,"lon":"8.682093","lat":"50.110653"},{"city":"Hamburg, Germany","pm25":14,"lon":"10.000654","lat":"53.550341"},{"city":"k\"Oln, Germany","pm25":17,"lon":"6.959974","lat":"50.938361"},{"city":"m\"Unchen, Germany","pm25":15,"lon":"11.57753","lat":"48.13641"},{"city":"Stuttgart, Germany","pm25":15,"lon":"9.180046","lat":"48.778493"},{"city":"Wolfsburg, Germany","pm25":10,"lon":"10.786168","lat":"52.420559"},{"city":"Budapest, Hungary","pm25":25,"lon":"19.040471","lat":"47.498382"},{"city":"Debrecen, Hungary","pm25":22,"lon":"21.625978","lat":"47.531399"},{"city":"Reykjavik, Iceland","pm25":11,"lon":"-21.9499","lat":"64.150002"},{"city":"Allahabad, India","pm25":170,"lon":"81.833801","lat":"25.43813"},{"city":"Amritsar, India","pm25":108,"lon":"74.873679","lat":"31.634308"},{"city":"Bhopal, India","pm25":93,"lon":"77.39406","lat":"23.260663"},{"city":"Chennai, India","pm25":44,"lon":"80.282953","lat":"13.079691"},{"city":"Delhi, India","pm25":122,"lon":"77.22726","lat":"28.657291"},{"city":"Hyderabad, India","pm25":59,"lon":"78.474731","lat":"17.361623"},{"city":"Jaipur, India","pm25":100,"lon":"75.820406","lat":"26.916129"},{"city":"Kolkata, India","pm25":61,"lon":"88.3463","lat":"22.568746"},{"city":"Mumbai, India","pm25":63,"lon":"72.832711","lat":"18.95238"},{"city":"Bandung, Indonesia","pm25":33,"lon":"107.606531","lat":"-6.922048"},{"city":"Tehran, Iran","pm25":32,"lon":"51.41796","lat":"35.688424"},{"city":"Zabol, Iran","pm25":217,"lon":"61.494821","lat":"31.027778"},{"city":"Baghdad, Iraq","pm25":88,"lon":"44.378799","lat":"33.302425"},{"city":"Dublin, Ireland","pm25":11,"lon":"-6.261175","lat":"53.349307"},{"city":"Jerusalem, Israel","pm25":19,"lon":"35.213782","lat":"31.796816"},{"city":"Tel Aviv-Yafo, Israel","pm25":20,"lon":"34.780527","lat":"32.080481"},{"city":"Firenze, Italy","pm25":16,"lon":"11.255576","lat":"43.769871"},{"city":"Genova, Italy","pm25":9,"lon":"8.933862","lat":"44.40726"},{"city":"Napoli, Italy","pm25":20,"lon":"14.2423","lat":"40.844116"},{"city":"Padova, Italy","pm25":28,"lon":"11.873446","lat":"45.407717"},{"city":"Roma, Italy","pm25":17,"lon":"12.483072","lat":"41.893344"},{"city":"Torino, Italy","pm25":26,"lon":"7.685972","lat":"45.07092"},{"city":"Venezia, Italy","pm25":25,"lon":"12.33459","lat":"45.437191"},{"city":"Vicenza, Italy","pm25":27,"lon":"11.549747","lat":"45.548755"},{"city":"Kingston, Jamaica","pm25":26,"lon":"-76.792813","lat":"17.971215"},{"city":"Nagoya City, Japan","pm25":16,"lon":"-76.96681","lat":"40.183387"},{"city":"Tokyo, Japan","pm25":15,"lon":"139.768522","lat":"35.680071"},{"city":"Nairobi, Kenya","pm25":17,"lon":"36.816667","lat":"-1.283333"},{"city":"Riga, Latvia","pm25":17,"lon":"24.105185","lat":"56.949398"},{"city":"Beirut, Lebanon","pm25":32,"lon":"35.47843","lat":"33.89592"},{"city":"Kaunas, Lithuania","pm25":19,"lon":"23.911752","lat":"54.898106"},{"city":"Vilnius, Lithuania","pm25":23,"lon":"25.285398","lat":"54.684314"},{"city":"Luxembourg, Luxembourg","pm25":16,"lon":"6.129799","lat":"49.611277"},{"city":"Antanarivo, Madagascar","pm25":37,"lon":"47.537494","lat":"-18.908436"},{"city":"Petaling Jaya, Malaysia","pm25":25,"lon":"101.642697","lat":"3.105593"},{"city":"Irapuato, Mexico","pm25":26,"lon":"-101.352105","lat":"20.675876"},{"city":"Mexico City, Mexico","pm25":20,"lon":"-99.13321","lat":"19.43253"},{"city":"Toluca, Mexico","pm25":33,"lon":"-99.656901","lat":"19.292545"},{"city":"Monaco, Monaco","pm25":9,"lon":"7.419758","lat":"43.731142"},{"city":"Ulaanbaatar, Mongolia","pm25":75,"lon":"106.917702","lat":"47.918468"},{"city":"Casablanca, Morocco","pm25":26,"lon":"-7.617629","lat":"33.593916"},{"city":"Marrakech, Morocco","pm25":24,"lon":"-7.988608","lat":"31.62599"},{"city":"Kathmandu, Nepal","pm25":49,"lon":"85.314888","lat":"27.707676"},{"city":"Amsterdam, Netherlands","pm25":16,"lon":"4.900112","lat":"52.371009"},{"city":"Eindhoven, Netherlands","pm25":15,"lon":"5.47806","lat":"51.439528"},{"city":"Auckland, New Zealand","pm25":6,"lon":"174.765551","lat":"-36.853467"},{"city":"Christchurch, New Zealand","pm25":10,"lon":"172.636646","lat":"-43.530955"},{"city":"Dunedin, New Zealand","pm25":9,"lon":"170.503488","lat":"-45.873928"},{"city":"Napier, New Zealand","pm25":7,"lon":"176.917911","lat":"-39.490858"},{"city":"Timaru, New Zealand","pm25":15,"lon":"171.249737","lat":"-44.391858"},{"city":"Kaduna, Nigeria","pm25":90,"lon":"7.435986","lat":"10.51829"},{"city":"Bergen, Norway","pm25":9,"lon":"5.325885","lat":"60.394346"},{"city":"Oslo, Norway","pm25":11,"lon":"10.739111","lat":"59.913269"},{"city":"Muscat, Oman","pm25":35,"lon":"58.445991","lat":"23.59074"},{"city":"Islamabad, Pakistan","pm25":66,"lon":"73.064527","lat":"33.694796"},{"city":"Karachi, Pakistan","pm25":88,"lon":"67.031129","lat":"24.86678"},{"city":"Lahore, Pakistan","pm25":68,"lon":"74.322852","lat":"31.562192"},{"city":"Peshawar, Pakistan","pm25":111,"lon":"71.578746","lat":"34.012385"},{"city":"Rawalpindi, Pakistan","pm25":107,"lon":"73.0641","lat":"33.599148"},{"city":"Asuncion, Paraguay","pm25":18,"lon":"-57.630913","lat":"-25.296141"},{"city":"Lima, Peru","pm25":48,"lon":"-77.030581","lat":"-12.045969"},{"city":"Manila, Philippines","pm25":17,"lon":"120.979901","lat":"14.590607"},{"city":"Warszawa, Poland","pm25":26,"lon":"21.006727","lat":"52.231924"},{"city":"Ilhavo, Portugal","pm25":15,"lon":"-8.666646","lat":"40.600128"},{"city":"Lisboa, Portugal","pm25":11,"lon":"-9.138006","lat":"38.713057"},{"city":"Doha, Qatar","pm25":93,"lon":"51.526837","lat":"25.285252"},{"city":"Busan, Republic of Korea","pm25":25,"lon":"129.050003","lat":"35.099998"},{"city":"Daegu, Republic of Korea","pm25":24,"lon":"128.600006","lat":"35.8666"},{"city":"Incheon, Republic of Korea","pm25":26,"lon":"126.633301","lat":"37.466599"},{"city":"Seoul, Republic of Korea","pm25":24,"lon":"127","lat":"37.566601"},{"city":"Bucharest, Romania","pm25":23,"lon":"26.102744","lat":"44.436139"},{"city":"Moscow, Russian Federation","pm25":20,"lon":"37.618704","lat":"55.751634"},{"city":"Makkah, Saudi Arabia","pm25":74,"lon":"39.82099","lat":"21.422863"},{"city":"Medina, Saudi Arabia","pm25":65,"lon":"39.610828","lat":"24.467158"},{"city":"Riyadh, Saudi Arabia","pm25":156,"lon":"46.714907","lat":"24.63203"},{"city":"Dakar, Senegal","pm25":34,"lon":"-17.447026","lat":"14.693004"},{"city":"Belgrade, Serbia","pm25":23,"lon":"20.456809","lat":"44.817879"},{"city":"Singapore, Singapore","pm25":18,"lon":"103.852038","lat":"1.290453"},{"city":"Bratislava, Slovakia","pm25":18,"lon":"17.113207","lat":"48.065466"},{"city":"Johannesburg, South Africa","pm25":41,"lon":"28.049722","lat":"-26.205"},{"city":"Pretoria, South Africa","pm25":51,"lon":"28.184722","lat":"-25.725"},{"city":"Barcelona, Spain","pm25":15,"lon":"2.177135","lat":"41.38256"},{"city":"Bilbao, Spain","pm25":11,"lon":"-2.934948","lat":"43.262964"},{"city":"Madrid, Spain","pm25":10,"lon":"-3.703583","lat":"40.416705"},{"city":"Sevilla, Spain","pm25":16,"lon":"-5.995317","lat":"37.38863"},{"city":"Valencia, Spain","pm25":11,"lon":"-0.375951","lat":"39.469901"},{"city":"Colombo, Sri Lanka","pm25":36,"lon":"79.85327","lat":"6.934287"},{"city":"g\"Oteborg, Sweden","pm25":6,"lon":"11.968629","lat":"57.706407"},{"city":"Halmstad, Sweden","pm25":5,"lon":"12.857483","lat":"56.673983"},{"city":"Malm\"O, Sweden","pm25":10,"lon":"13.000157","lat":"55.605293"},{"city":"Stockholm, Sweden","pm25":6,"lon":"18.06131","lat":"59.330761"},{"city":"Uppsala, Sweden","pm25":4,"lon":"17.64112","lat":"59.859413"},{"city":"Basel, Switzerland","pm25":14,"lon":"7.587826","lat":"47.558108"},{"city":"Bern, Switzerland","pm25":16,"lon":"7.451501","lat":"46.948276"},{"city":"Geneve, Switzerland","pm25":15,"lon":"6.146601","lat":"46.201756"},{"city":"z\"Urich, Switzerland","pm25":14,"lon":"8.540443","lat":"47.368559"},{"city":"Bangkok, Thailand","pm25":24,"lon":"100.494086","lat":"13.752753"},{"city":"Skopje, Macedonia","pm25":45,"lon":"21.431796","lat":"41.996227"},{"city":"Tunis, Tunisia","pm25":38,"lon":"10.184794","lat":"36.800108"},{"city":"Ankara, Turkey","pm25":47,"lon":"32.851977","lat":"39.927232"},{"city":"Gaziantep, Turkey","pm25":66,"lon":"37.379309","lat":"37.061176"},{"city":"Istanbul, Turkey","pm25":33,"lon":"28.985568","lat":"41.017058"},{"city":"Abu Dhabi, United Arab Emirates","pm25":56,"lon":"54.370576","lat":"24.474796"},{"city":"Aberdeen, United Kingdom","pm25":9,"lon":"-2.091375","lat":"57.145245"},{"city":"Armagh, United Kingdom","pm25":14,"lon":"-6.654043","lat":"54.348198"},{"city":"Belfast, United Kingdom","pm25":12,"lon":"-5.930155","lat":"54.596947"},{"city":"Birkenhead, United Kingdom","pm25":11,"lon":"-3.019157","lat":"53.394351"},{"city":"Birmingham, United Kingdom","pm25":14,"lon":"-1.898073","lat":"52.481368"},{"city":"Bournemouth, United Kingdom","pm25":9,"lon":"-1.876771","lat":"50.719478"},{"city":"Brighton, United Kingdom","pm25":11,"lon":"-0.137406","lat":"50.82204"},{"city":"Bristol, United Kingdom","pm25":13,"lon":"-2.595266","lat":"51.455699"},{"city":"Cardiff, United Kingdom","pm25":14,"lon":"-3.183687","lat":"51.48353"},{"city":"Carlisle, United Kingdom","pm25":12,"lon":"-2.825584","lat":"54.982589"},{"city":"Chepstow, United Kingdom","pm25":14,"lon":"-2.675126","lat":"51.642847"},{"city":"Chesterfield, United Kingdom","pm25":10,"lon":"-1.42641","lat":"53.235213"},{"city":"Eastbourne, United Kingdom","pm25":15,"lon":"0.29703","lat":"50.768563"},{"city":"Edinburgh, United Kingdom","pm25":8,"lon":"-3.193272","lat":"55.94834"},{"city":"Gibraltar, United Kingdom","pm25":14,"lon":"-0.90223","lat":"51.791921"},{"city":"Glasgow, United Kingdom","pm25":16,"lon":"-4.249989","lat":"55.861147"},{"city":"Grangemouth, United Kingdom","pm25":9,"lon":"-3.723234","lat":"56.016087"},{"city":"Hull, United Kingdom","pm25":12,"lon":"-0.337032","lat":"53.765708"},{"city":"Inverness, United Kingdom","pm25":6,"lon":"-4.225739","lat":"57.479012"},{"city":"Leamington Spa, United Kingdom","pm25":13,"lon":"-1.535699","lat":"52.292155"},{"city":"Leeds, United Kingdom","pm25":15,"lon":"-1.543794","lat":"53.797419"},{"city":"Liverpool, United Kingdom","pm25":12,"lon":"-2.980539","lat":"53.405472"},{"city":"London, United Kingdom","pm25":15,"lon":"-0.12766","lat":"51.507276"},{"city":"Londonderry, United Kingdom","pm25":11,"lon":"-7.319208","lat":"54.994296"},{"city":"Manchester, United Kingdom","pm25":13,"lon":"-2.244745","lat":"53.479147"},{"city":"Middlesbrough, United Kingdom","pm25":11,"lon":"-1.234405","lat":"54.576042"},{"city":"Newcastle Upon Tyne, United Kingdom","pm25":10,"lon":"-1.614206","lat":"54.977092"},{"city":"Newport, United Kingdom","pm25":13,"lon":"-2.997497","lat":"51.588233"},{"city":"Norwich, United Kingdom","pm25":13,"lon":"1.29227","lat":"52.628606"},{"city":"Nottingham, United Kingdom","pm25":12,"lon":"-1.150914","lat":"52.955341"},{"city":"Oxford, United Kingdom","pm25":14,"lon":"-1.258214","lat":"51.752155"},{"city":"Plymouth, United Kingdom","pm25":12,"lon":"-4.142566","lat":"50.371266"},{"city":"Port Talbot, United Kingdom","pm25":14,"lon":"-3.781352","lat":"51.593117"},{"city":"Portsmouth, United Kingdom","pm25":14,"lon":"-1.075614","lat":"50.803683"},{"city":"Prestonpans, United Kingdom","pm25":12,"lon":"-2.98424","lat":"55.959395"},{"city":"Reading, United Kingdom","pm25":10,"lon":"-0.967373","lat":"51.458022"},{"city":"Salford, United Kingdom","pm25":15,"lon":"-2.289192","lat":"53.487746"},{"city":"Saltash, United Kingdom","pm25":11,"lon":"-4.209303","lat":"50.407297"},{"city":"Scunthorpe, United Kingdom","pm25":16,"lon":"-0.64987","lat":"53.591819"},{"city":"Southampton, United Kingdom","pm25":15,"lon":"-1.404189","lat":"50.902535"},{"city":"Southend - On - Sea, United Kingdom","pm25":11,"lon":"0.711497","lat":"51.538873"},{"city":"Stanford-Le-Hope, United Kingdom","pm25":14,"lon":"0.423792","lat":"51.516215"},{"city":"Stockton-on-Tees, United Kingdom","pm25":10,"lon":"-1.312916","lat":"54.564094"},{"city":"Stoke - On - Trent, United Kingdom","pm25":14,"lon":"-2.181261","lat":"53.016201"},{"city":"Sunderland, United Kingdom","pm25":9,"lon":"-1.375053","lat":"54.906379"},{"city":"Swansea, United Kingdom","pm25":12,"lon":"-3.946775","lat":"51.621144"},{"city":"Thurrock, United Kingdom","pm25":14,"lon":"-74.1185","lat":"44.333528"},{"city":"Warrington, United Kingdom","pm25":14,"lon":"-2.594318","lat":"53.38995"},{"city":"Wigan, United Kingdom","pm25":13,"lon":"-2.626462","lat":"53.545719"},{"city":"Wrexham, United Kingdom","pm25":10,"lon":"-2.993814","lat":"53.046507"},{"city":"York, United Kingdom","pm25":12,"lon":"-1.081536","lat":"53.959056"},{"city":"Boston, Ma","pm25":7,"lon":"-71.056742","lat":"42.358894"},{"city":"Bridgeport, Ct","pm25":8,"lon":"-73.189476","lat":"41.179195"},{"city":"Chicago, Il","pm25":12,"lon":"-87.632398","lat":"41.883229"},{"city":"Colorado Springs, Co","pm25":6,"lon":"-104.819798","lat":"38.835224"},{"city":"Detroit, Mi","pm25":10,"lon":"-83.047853","lat":"42.332916"},{"city":"Hartford, Ct","pm25":8,"lon":"-72.673356","lat":"41.765775"},{"city":"Honolulu, Hi","pm25":4,"lon":"-157.858158","lat":"21.30992"},{"city":"Hot Springs, Ar","pm25":9,"lon":"-93.055659","lat":"34.502785"},{"city":"Jacksonville, Fl","pm25":8,"lon":"-81.65676","lat":"30.325968"},{"city":"Kansas City, Ks","pm25":9,"lon":"-94.626804","lat":"39.1127"},{"city":"Knoxville, Tn","pm25":10,"lon":"-83.916677","lat":"35.962631"},{"city":"Los Angeles, Ca","pm25":11,"lon":"-118.243344","lat":"34.052238"},{"city":"Lynchburg, Va","pm25":8,"lon":"-79.143204","lat":"37.414345"},{"city":"Memphis, Tn","pm25":9,"lon":"-90.052136","lat":"35.143378"},{"city":"Miami, Fl","pm25":6,"lon":"-80.194702","lat":"25.775084"},{"city":"Milwaukee, Wi","pm25":10,"lon":"-87.909421","lat":"43.041072"},{"city":"Minneapolis, Mn","pm25":8,"lon":"-93.264346","lat":"44.977479"},{"city":"Napa, Ca","pm25":12,"lon":"-122.289405","lat":"38.297242"},{"city":"New Orleans, La","pm25":8,"lon":"-90.074948","lat":"29.950621"},{"city":"New York, Ny","pm25":9,"lon":"-74.007228","lat":"40.713054"},{"city":"Oklahoma City, Ok","pm25":9,"lon":"-97.521264","lat":"35.468494"},{"city":"Philadelphia, Pa","pm25":10,"lon":"-75.16562","lat":"39.951061"},{"city":"Pittsburgh, Pa","pm25":10,"lon":"-79.994945","lat":"40.442169"},{"city":"Portland, or","pm25":7,"lon":"-122.681425","lat":"45.516018"},{"city":"Richmond, Va","pm25":8,"lon":"-77.433932","lat":"37.540759"},{"city":"Salt Lake City, Ut","pm25":7,"lon":"-111.888142","lat":"40.758478"},{"city":"San Diego, Ca","pm25":8,"lon":"-117.163817","lat":"32.71576"},{"city":"San Francisco, Ca","pm25":9,"lon":"-122.420168","lat":"37.78008"},{"city":"San Jose, Ca","pm25":7,"lon":"-121.888128","lat":"37.334807"},{"city":"San Luis, Ca","pm25":9,"lon":"-120.660014","lat":"35.282619"},{"city":"Seaford, De","pm25":8,"lon":"-75.622492","lat":"38.64624"},{"city":"Tucson, Az","pm25":6,"lon":"-110.971225","lat":"32.221878"},{"city":"Washington Dc","pm25":9,"lon":"-77.019912","lat":"38.892062"},{"city":"Montevideo, Uruguay","pm25":8,"lon":"-56.191357","lat":"-34.905904"},{"city":"Caracas, Venezuela","pm25":25,"lon":"-66.912105","lat":"10.501823"}];

window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(UserLocation);
  }
  else
    NearestCity(51.507276, 0.12766);
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

function NearestCity(latitude, longitude) {
  var mindif = 99999;
  var closest;

  for (var index = 0; index < cities.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, +cities[index].lat, +cities[index].lon);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }

  var thisCity = cities[closest];
  d3.select('#city').html('in ' + thisCity.city);
  d3.select('input').node().value = thisCity.pm25;
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
        'width':width + 'px',
        'height':height + 'px'
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

    function generateData(callback){
        var city = cityRisk(15);
        callback(city);
    }

    queue()
        .defer(d3.csv, './assets/world.csv')
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

        colours.range().forEach(function(d,i){
            var c = d3.hsl(d);
            // c.s +=0.05;
            c.l -=0.05;
            textColours.range()[i] = c;
        });

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

        var footnote = chartHolder.append('text.footnote.shadow').attr({
            'x':1,
            'y':height-29
        })
        .tspans(['*Specifically fine particulate matter (PM2.5)','Sources: Tainio, M. et al, 2016, King’s College London','Graphic by John Burn-Murdoch / @jburnmurdoch'],13);

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

        var refText1 = plots.append('text#refText1.shadow')
            .attr({
                y:y(1)-52
            })
            .style({
                fill:'#43423e',
                'font-size':14
            })
            .tspans(['Each extra','minute does','more harm','than good'])
            .attr({
                x:x(cityRaw.inflection)+3
            });

        var refText2 = plots.append('text#refText2.shadow')
            .attr({
                y:y(1)-112
            })
            .style({
                fill:'#43423e',
                'font-size':14
            })
            .tspans(['Overall','impact is','now negative','and worsening'])
            .attr({
                x:cityRaw.cross == undefined ? x(-5):x(cityRaw.cross)+3,
            });

        // var zabol = plots.append('text.curved')
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

    var refText1 = d3.selectAll('#refText1 tspan')
        .attr({
            x:x(cityRaw.inflection)+3
        });

    var refText2 = d3.selectAll('#refText2 tspan')
        .attr({
            x:cityRaw.cross == undefined ? x(-5):x(cityRaw.cross)+3,
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
        d3.select('#city').style('display','none');
        d3.select('#TheToA').html('a');
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
