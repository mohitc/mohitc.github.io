var app = angular.module('publications', []);
app.service('PubDecorator', function() {
  getAuthors = function (authors) {
    if ((typeof(authors)==="undefined") || (authors.length<=0))
      return '';
    return authors.join(", ");
  };

  this.decorateEntry = function(pubEntry) {
    var decoratedEntry = pubEntry;
    decoratedEntry.authors = getAuthors(decoratedEntry.authors);
    return decoratedEntry;
  }
});


app.controller('listPubs', function($scope, PubDecorator, $http) {
    $scope.entryClasses = [{"category" : "journal", "shortentry" : "journals", "title" : "Journal Publications"},
                           {"category" : "conf", "shortentry" : "conferences", "title" : "Conference Publications"},
                           {"category" : "invited", "shortentry" : "invited", "title" : "Invited Conference Publications"}];

    $scope.loadEntries = function() {
      $http.get(location.protocol.concat("//").concat(window.location.hostname).concat('/publications.json')).
        then(function(response) {
            $scope.confData = [];
            $scope.entryClasses.forEach(function(entityClass) {
              $scope.confData[entityClass.category] = response.data
              .filter(function(entry) {return entry.category == entityClass.category})
              .map(PubDecorator.decorateEntry);
            });
        });
    };
    $scope.loadEntries();
});

app.controller('researchGroups', function($scope, PubDecorator, $http) {
  $scope.groups = ["ipopt", "pce", "enc"];

  $scope.loadEntries = function() {
    $http.get(location.protocol.concat("//").concat(window.location.hostname).concat('/publications.json')).
      then(function(response) {
          $scope.resGroupData = [];

          $scope.groups.forEach(function(groupName) {
            $scope.resGroupData[groupName] = response.data
            .filter(function(entry) {
              return entry.resGroup !== undefined && entry.resGroup == groupName})
            .map(PubDecorator.decorateEntry);
          });
          console.log($scope.resGroupData);
      });
  };
  $scope.loadEntries();
});
