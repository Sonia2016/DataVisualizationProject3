var onGetDataComplete = function (data) {
    data.forEach(function (datum) {
        $("body").append("<div class='col-md-2'>" + datum.cancer_study_id + "</div>");
    });
};

var onGetGeneListComplete = function (data) {
    data.forEach(function (datum) {
        $("body").append("<div class='col-md-2'>" + datum.geneId + "</div>");
    });
};

var onGetMutExDataComplete = function (data) {
    $("body").append("<div class='row'>");
    $("body").append("<div class='col-md-1'>Source</div>");
    $("body").append("<div class='col-md-1'>Gene A</div>");
    $("body").append("<div class='col-md-1'>Gene B</div>");
    $("body").append("<div class='col-md-2'>p-Value</div>");
    $("body").append("<div class='col-md-2'>Log Odds Ratio</div>");
    $("body").append("<div class='col-md-5'>Association</div>");
    $("body").append("</div>")
    data.forEach(function (datum) {
        $("body").append("<div class='row'>");
        $("body").append("<div class='col-md-1'>" + datum.source + "</div>");
        $("body").append("<div class='col-md-1'>" + datum.geneA + "</div>");
        $("body").append("<div class='col-md-1'>" + datum.geneB + "</div>");
        $("body").append("<div class='col-md-2'>" + datum.pValue + "</div>");
        $("body").append("<div class='col-md-2'>" + datum.logOddsRatio + "</div>");
        $("body").append("<div class='col-md-5'>" + datum.association + "</div>");
        $("body").append("</div>")
    });
};

var onError = function (reason) {
    var thisError = "Error";
};

$("#cancerStudies").on("click", function () {
    dataService().getCancerStudies().then(onGetDataComplete, onError);
});

$("#geneList").on("click", function () {
    dataService().getGeneList().then(onGetGeneListComplete, onError);
});

$("#mutExData").on("click", function () {
    dataService().getMutExData().then(onGetMutExDataComplete, onError);
});

$("#allStudyData").on("click", function () {
    var studyId = "skcm_yale";
    var caseSetId = studyId + "_all";
    var geneticProfileId = studyId + "_mutations";
    var geneList = "CFTR,TG,TLR7,GPRC6A,TP53,GLI2,NOD2,TPO,TLR3,APC,MARCO,FGF9,E2F1,CIITA,GC,ABCA1,PLA2G3";
    var p1 = dataService().getClinicalData(caseSetId);
    var p2 = dataService().getExtendedMutationData(caseSetId, geneticProfileId, geneList);
    Promise.all([p1, p2]).then(values => {
        console.log(values);
    });
})