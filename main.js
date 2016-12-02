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
        results.forEach(function (result) {
            console.log(result);
        });
    };

    $("#allExtendedMutationData").on("click", function () {
        var promises = dataService().getAllExtendedMutationData(studyIds, geneList);
        Promise.all(promises).then(onGetAllExtendedMutationDataComplete, onError);
    });

    var onGetAllClinicalDataComplete = function (valueArrays) {
        var results = [];
        valueArrays.forEach(function (valueArray) {
            results = results.concat(valueArray);
        })
        results.forEach(function (result) {
            console.log(result);
        });
    };

    $("#allClinicalData").on("click", function () {
        var promises = dataService().getAllClinicalData(studyIds);
        Promise.all(promises).then(onGetAllClinicalDataComplete, onError);
    });
})();