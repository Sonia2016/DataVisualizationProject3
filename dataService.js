var dataService = function () {
    var cBioPortalService = function () {
        var obj = {};
        obj.getData = function (queryString) {
            // Promises example from https://github.com/mdn/promises-test/blob/gh-pages/index.html
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

    var typesOfCancerService = function () {
        return {
            getData: function () {
                var queryString = "cmd=getTypesOfCancer";
                return genericDataService().getData(queryString);
            }
        };
    };

    var cancerStudiesService = function () {
        return {
            getData: function () {
                var queryString = "cmd=getCancerStudies";
                return genericDataService().getData(queryString);
            }
        };
    };

    var geneticProfilesService = function () {
        return {
            getData: function (cancerStudyId) {
                var queryString = "cmd=getGeneticProfiles&cancer_study_id=" + cancerStudyId;
                return genericDataService().getData(queryString);
            }
        };
    };

    var caseListsService = function () {
        return {
            getData: function (cancerStudyId) {
                var queryString = "cmd=getCaseLists&cancer_study_id=" + cancerStudyId;
                return genericDataService().getData(queryString);
            }
        };
    };

    var profileDataService = function () {
        return {
            getData: function (caseSetId, geneticProfileId, geneList) {
                var queryString = "cmd=getProfileData&case_set_id=" + caseSetId
                    + "&genetic_profile_id=" + geneticProfileId
                    + "&gene_list=" + geneList;
                return genericDataService().getData(queryString);
            }
        };
    };

    var extendedMutationDataService = function () {
        return {
            getData: function (caseSetId, geneticProfileId, geneList) {
                var queryString = "cmd=getMutationData&case_set_id=" + caseSetId
                    + "&genetic_profile_id=" + geneticProfileId
                    + "&gene_list=" + geneList;
                return genericDataService().getData(queryString);
            }
        };
    };

    var clinicalDataService = function () {
        return {
            getData: function (caseSetId) {
                var queryString = "cmd=getClinicalData&case_set_id=" + caseSetId;
                return genericDataService().getData(queryString);
            }
        };
    };

    var proteinArrayInfoService = function () {
        return {
            getData: function (cancerStudyId, proteinArrayType, geneList) {
                var queryString = "cmd=getProteinArrayInfo&cancer_study_id=" + cancerStudyId
                    + "&protein_array_type=" + proteinArrayType
                    + "&gene_list=" + geneList;
                return genericDataService().getData(queryString);
            }
        };
    };

    var proteinArrayDataService = function () {
        return {
            getData: function (caseSetId, arrayInfo) {
                var queryString = "cmd=getProteinArrayData&case_set_id=" + caseSetId
                    + "&array_info=" + arrayInfo;
                return genericDataService().getData(queryString);
            }
        };
    };

    var geneFileService = function () {
        return {
            getData: function () {
                return new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    var url = "data/genes.json";
                    request.open("GET", url);
                    request.responseType = "json";
                    request.onload = function () {
                        if (request.status === 200) {
                            resolve(request.response);
                        } else {
                            reject(Error('Data didn\'t load successfully; error code:' + request.statusText));
                        }
                    };
                    request.onerror = function () {
                        reject(Error('There was a network error.'));
                    };
                    request.send();
                });
            }
        };
    };

    return {
        getTypesOfCancer: typesOfCancerService().getData,
        getCancerStudies: cancerStudiesService().getData,
        getGeneticProfiles: geneticProfilesService().getData,
        getCaseListsData: caseListsService().getData,
        getProfileData: profileDataService().getData,
        getExtendedMutationData: extendedMutationDataService().getData,
        getClinicalData: clinicalDataService().getData,
        getProteinArrayInfo: proteinArrayInfoService().getData,
        getProteinArrayData: proteinArrayDataService().getData,
        getGeneList: geneFileService().getData
    };
};

