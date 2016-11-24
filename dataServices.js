// Promises example from https://github.com/mdn/promises-test/blob/gh-pages/index.html

var cBioPortalService = function () {
    var obj = {};
    obj.getData = function (queryString) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            var url = "http://www.cbioportal.org/webservice.do?" + queryString;
            request.open("GET", url);
            request.responseType = "text";
            // When the request loads, check whether it was successful
            request.onload = function () {
                if (request.status === 200) {
                    // If successful, resolve the promise by passing back the request response
                    resolve(request.response);
                } else {
                    // If it fails, reject the promise with a error message
                    reject(Error('Data didn\'t load successfully; error code:' + request.statusText));
                }
            };
            request.onerror = function () {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error('There was a network error.'));
            };
            // Send the request
            request.send();
        })
    };
    return obj;
};

var genericDataService = function () {
    var obj = {};
    obj.getData = function (queryString) {
        var parseData = function (data) {
            return Papa.parse(data, {
                "header": "true",
                "delimiter": "\t",
                "comments": "#"
            }).data;
        }

        return cBioPortalService().getData(queryString)
            .then(function (response) {
                return parseData(response);
            });
    }
    return obj;
};

var cancerStudiesService = function () {
    var obj = {};
    obj.getData = function () {
        var queryString = "cmd=getCancerStudies";
        return genericDataService().getData(queryString);
    };
    return obj;
};
