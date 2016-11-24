var onGetDataComplete = function (data) {
    var thisData = data;
    data.forEach(function (datum) {
        $("body").append("<div class='col-md-2'>" + datum.cancer_study_id + "</div>");
    });
}

var onError = function (reason) {
    var thisError = "Error";
}

$("#cancerStudies").on("click", function () {
    cancerStudiesService().getData().then(onGetDataComplete, onError);
});