(function() {
    'use strict';
    angular
        .module('doItApp')
        .factory('Task', Task);

    Task.$inject = ['$resource', 'DateUtils'];

    function Task ($resource, DateUtils) {
        var resourceUrl =  'api/tasks/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.creationDate = DateUtils.convertLocalDateFromServer(data.creationDate);
                    data.finishedDate = DateUtils.convertLocalDateFromServer(data.finishedDate);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.creationDate = DateUtils.convertLocalDateToServer(data.creationDate);
                    data.finishedDate = DateUtils.convertLocalDateToServer(data.finishedDate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.creationDate = DateUtils.convertLocalDateToServer(data.creationDate);
                    data.finishedDate = DateUtils.convertLocalDateToServer(data.finishedDate);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
