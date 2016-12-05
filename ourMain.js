(function () {
    var studyIds = ["skcm_yale", "skcm_tcga", "skcm_broad", "skcm_broad_dfarber"];
    var geneList = "CFTR,TG,TLR7,GPRC6A,TP53,GLI2,NOD2,TPO,TLR3,APC,MARCO,FGF9,E2F1,CIITA,GC,ABCA1,PLA2G3";

    var onError = function (reason) {
        var thisError = "Error";
    };

    var onGetCancerStudiesComplete = function (data) {
        data.forEach(function (datum) {
            console.log(datum);
        });
    };

    $("#cancerStudies").on("click", function () {
        dataService().getCancerStudies().then(onGetCancerStudiesComplete, onError);
    });

    var onGetGeneListComplete = function (data) {
        data.forEach(function (datum) {
            console.log(datum);
        });
    };

    $("#geneList").on("click", function () {
        dataService().getGeneList().then(onGetGeneListComplete, onError);
    });

    var onGetMutExDataComplete = function (data) {
        data.forEach(function (datum) {
            console.log(datum);
        });
    };

    $("#mutExData").on("click", function () {
        dataService().getMutExData().then(onGetMutExDataComplete, onError);
    });


    var onGetAllExtendedMutationDataComplete = function (valueArrays) {
        var results = [];
        valueArrays.forEach(function (valueArray) {
            results = results.concat(valueArray);
        })

        //it restore #mutated of genes in different studies
        var freqGenes = {}
        var patientList = {}
        var entrezCode = {}

        var geneName = document.getElementById('search').value;

        for(var i = 0 ; i < 4; i++){
            freqGenes[i] = valueArrays[i].filter(Boolean).reduce(function(freq, x) {
             if(x.gene_symbol == geneName){
                  freq[x.gene_symbol] = ++freq[x.gene_symbol] || 1;}
              return freq;
            },{})
            patientList[i] = valueArrays[i].filter(Boolean).reduce(function(pList, x) {
              if(x.gene_symbol == geneName){
                if(pList[x.gene_symbol] == undefined){
                    pList[x.gene_symbol] = [];
                    pList[x.gene_symbol].push(x["case_id"]);}
                else
                    pList[x.gene_symbol].push(x["case_id"]);
                }
              return pList;
            },{})
            entrezCode[i] = valueArrays[i].filter(Boolean).reduce(function(entrezId, x) {
                 if(x.gene_symbol == geneName){
                  entrezId[x.gene_symbol] = x["entrez_gene_id"];}
                  //As a hyperlink to this website for detailed information
                  // "https://www.ncbi.nlm.nih.gov/gene/"+entrezId[x["gene_symbol"]]
              return entrezId;
            },{})
        }
        
        var studyIds = ["skcm_yale", "skcm_tcga", "skcm_broad", "skcm_broad_dfarber"];

        var freqInStudy = [];
        for(var studyId in freqGenes){
            var freqData = {};
            freqData.label = studyIds[studyId];
            freqData.value = freqGenes[studyId][geneName];
            freqInStudy.push(freqData);
        }

        var w = 150;
        var h = 150;
        var r = h/2;
        var aColor = [
            'rgb(178, 55, 56)',
            'rgb(213, 69, 70)',
            'rgb(230, 125, 126)',
            'rgb(239, 183, 182)'
        ]

        d3.select('#chart').select("svg").remove();
        var vis = d3.select('#chart').append("svg:svg").data([freqInStudy]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

        var pie = d3.layout.pie().value(function(d){return d.value;});

        // Declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // Select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
        arcs.append("svg:path")
            .attr("fill", function(d, i){return aColor[i];})
            .attr("d", function (d) {return arc(d);})
        ;

        // Add the text
        arcs.append("svg:text")
            .attr("transform", function(d){
                d.innerRadius = 15;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";}
            )
            .attr("text-anchor", "middle")
            .text( function(d, i) {return freqInStudy[i].value + '%';});


        $("#geneInfo").append("<p> Gene Name: "+geneName +"<button class=ui-widget id=test>Info</button>"+"</p>");

        $("#test").click(function(){
            window.open("https://www.ncbi.nlm.nih.gov/gene/"+entrezCode[0][geneName], "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=400");
        });

        var patientDataList = [];
        for(var studyId in patientList){
            var patientData = {};
            patientData.id = studyId;
            patientData.patientId = patientList[studyId][geneName];
            patientDataList.push(patientData);
        }
        
       
        var temp = [];
        for(i = 0 ; i < 4; i++){
            for(var j = 0 ; j < patientDataList[i].patientId.length;j++){
                var temp2 = [];
                temp2 = temp2
                .concat(patientDataList[i].patientId[j])
                .concat(studyIds[i]);
                
                temp.push(temp2);   
            }
        }
        // $("#example tr").remove();
        $('#example').dataTable({
            "aaData":temp,
                  "aoColumnDefs":[{
                        "sTitle":"Site name"
                      , "aTargets": [ "site_name" ]
                  },{
                        "aTargets": [ 0 ]
                      , "bSortable": false
                      , "mRender": function ( url, type, full )  {
                          return  '<a href="'+url+'" id = "contact">' + url + '</a>';
                      }
                  }
                  ]
        } );
    };

    $("#allExtendedMutationData").on("click", function () {
        var promises = dataService().getAllExtendedMutationData(studyIds, geneList);
        Promise.all(promises).then(onGetAllExtendedMutationDataComplete, onError);
    });

    var onGetAllClinicalDataComplete = function (valueArrays) {
      
////////////////

 var results = valueArrays[selected];
        var results2=results.filter(function(d){

            if(!d["GENDER"] &&(selected!=3)

                &&d["GENDER"]!="MALE" && d["GENDER"]!="FEMALE"
                )
                return 0;

            if(selected==3 && !d["NRAS_STATUS"])  
                return 0;

           // if(
            //    &&d["GENDER"]!="Male" && d["GENDER"]!="Female"
             //   )
             //   return 0;

//            if(!d["PRIMARY_SITE"])
 //               return 1;
   //         if(d["PRIMARY_SITE"==""])
     //           return 0;
            
            
            else 
                return 1;
        });
        console.log(results2);
        //debugger;
       
    /*
        valueArrays.forEach(function (valueArray) {
            results = results.concat(valueArray);
        });
*/
       // console.log(results2);
      //  results.forEach(function (result) {
       //     console.log(result);



        /////////////////////////////////////////////


        
      
      

       




        //var catName="MEAN_PLOIDY";

        //var color = d3.scale.category10();


        var margin = {top: 30, right: 10, bottom: 10, left: 10},
            width = 560 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangePoints([0, width], 1),
            y = {},
            dragging = {};

        var line = d3.svg.line(),
            axis = d3.svg.axis().orient("left"),
            background,
            foreground;

        var svg = d3.select("#studyInfo").append("svg")
            .attr("class","pc")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
        //var color;

      
        drawGraph();



        function drawGraph(){

        //d3.tsv("Melanoma_Board.tsv", function(error, cars) {

            var numericParam=["DAYS_TO_COLLECTION","AGE","DFS_MONTHS","AGE_AT_PROCUREMENT",
                                "TUMOR_PURITY","MEAN_PLOIDY"];
            var categoricalParam=["GENDER","DFS_STATUS","ETHNICITY","TUMOR_SITE","VITAL_STATUS",
                                    "PRIMARY_SITE","PRIMARY_TUMOR_LOCALIZATION_TYPE","NRAS_STATUS",
                                    "TISSUE_SOURCE_SITE","SPECIMEN_SITE"];

            function include(arr, obj) {
                for(var i=0; i<arr.length; i++) {
                    if (arr[i] === obj) return true;
                }
            }   
         
          // Extract the list of dimensions and create a scale for each.
            x.domain(dimensions = d3.keys(results2[0]).filter(function(d) {

                if(include(categoricalParam,d)) {
                    y[d] = d3.scale.ordinal()
                      .domain(results2.map(function(p) {  return p[d]; }))
                      .rangePoints([height, 0]);
                      return true;
                }
         
                
                if (include(numericParam,d)){ 

                    //return false;
                    y[d] = d3.scale.linear()
                      .domain(d3.extent(results2, function(p) {  return +p[d]; }))
                      .range([height, 0]);
                      return true;
                }
                
                else 
                    return false;

                
            }));


              // Add grey background lines for context.
          

            background = svg.append("g")
                  .attr("class", "background")
                .selectAll("path")
                  .data(results2)
                .enter().append("path")
                  .attr("d", path);

              
            var temp=[];

           

          //  color=d3.scale.linear().domain([d3.min(temp),d3.max(temp)]).range(["#0000FF","#FF0000"]);     
                  
              
          // Add blue foreground lines for focus.
            foreground = svg.append("g")
              .attr("class", "foreground")
            .selectAll("path")
              .data(results2)
            .enter().append("path")
              .attr("d", path);

          // Add a group element for each dimension.
            var g = svg.selectAll(".dimension")
              .data(dimensions)
            .enter().append("g")
              .attr("class", "dimension")
              .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
              .call(d3.behavior.drag()
                .origin(function(d) { return {x: x(d)}; })
                .on("dragstart", function(d) {
                  dragging[d] = x(d);
                  background.attr("visibility", "hidden");
                })
                .on("drag", function(d) {
                  dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                  foreground.attr("d", path);
                  dimensions.sort(function(a, b) { return position(a) - position(b); });
                  x.domain(dimensions);
                  g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
                })
                .on("dragend", function(d) {
                  delete dragging[d];
                  transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                  transition(foreground).attr("d", path);
                  background
                      .attr("d", path)
                    .transition()
                      .delay(500)
                      .duration(0)
                      .attr("visibility", null);
                }));

            // Add an axis and title.
            g.append("g")
              .attr("class", "axis")
              .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
            .append("text")
              .style("text-anchor", "middle")
              .attr("y", -9)
              .text(function(d) { console.log(d);return d; });

            // Add and store a brush for each axis.
            g.append("g")
              .attr("class", "brush")
              .each(function(d) {
                d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
              })
            .selectAll("rect")
              .attr("x", -8)
              .attr("width", 16);
        //});



        }

        function position(d) {
          var v = dragging[d];
          return v == null ? x(d) : v;
        }

        function transition(g) {
          return g.transition().duration(500);
        }

        // Returns the path for a given data point.
        function path(d) {
          return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
        }

        function brushstart() {
          d3.event.sourceEvent.stopPropagation();
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
          var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
              extents = actives.map(function(p) { return y[p].brush.extent(); });
          foreground.style("display", function(d) {
            return actives.every(function(p, i) {
              return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
          });
        }


        //////////////////////////////////////












     //   });







    };

    

    $("#allClinicalData").on("change", function () {
        d3.selectAll("svg.pc").remove();
        var promises = dataService().getAllClinicalData(studyIds);
        selected=+this.value;
        Promise.all(promises).then(onGetAllClinicalDataComplete, onError);
    });

    $("#allExtendedMutationData").on("click", function () {
        selected=0;
        d3.selectAll("svg.pc").remove();
        var promises = dataService().getAllClinicalData(studyIds);
        Promise.all(promises).then(onGetAllClinicalDataComplete, onError);
    });

})();