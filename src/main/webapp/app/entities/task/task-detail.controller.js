(function() {
    'use strict';

    angular
        .module('doItApp')
        .controller('TaskDetailController', TaskDetailController);

    TaskDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Task', 'User'];

    function TaskDetailController($scope, $rootScope, $stateParams, entity, Task, User) {
        var vm = this;
        vm.task = entity;
        
        var unsubscribe = $rootScope.$on('doItApp:taskUpdate', function(event, result) {
            vm.task = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
