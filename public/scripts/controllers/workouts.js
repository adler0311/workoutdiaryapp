'use strict';

/**
 * @ngdoc function
 * @name traingingDiaryApp.controller:RecordCtrl
 * @description
 * # RecordCtrl
 * Controller of the traingingDiaryApp
 */
angular.module('traingingDiaryApp')
  .controller('WorkoutsCtrl', ['$http', 'recordManager', function ($http, recordManager) {
  	var vm = this;

  	var refresh = function() {
  		recordManager.getExercise().then(function(data) {
  			vm.exercise = data;
  		});
    };
 
    refresh();

    this.deselect = function() {
      this.initializeData();
    };

    this.update = function(date,part,name,weight,set, runningTime) {
      var _id = vm._id;
      recordManager.updateExercise(_id,date,part,name,weight,set,runningTime).then(function(data) {
        vm.initializeData();
        refresh();
      });
    };


    this.edit = function(id) {
      console.log(id);
      recordManager.editExercise(id).then(function(data) {
        vm._id = data._id;
        vm.date = data.date;
        vm.part = data.part;
        vm.name = data.name;
        vm.weight = [];
        vm.set = [];
        vm.runningTime = [];

        for (var key in data["name"]) {
          
          if (vm.name != undefined)
          {
            if (data["name"].hasOwnProperty(key))
            {
              vm.weight.push(data["name"][key]["중량"]);
              vm.set.push(data["name"][key]["셋트수"]);
              vm.runningTime.push(data["name"][key]["운동시간"]);
            }
            else {
              vm.weight.push(undefined);
              vm.set.push(undefined);
              vm.runningTime.push(undefined);
            };
          };
        };

        vm.showCategory(vm.part);

      });
    };

    this.remove = function(id) {
      console.log(id);
      recordManager.removeExercise(id).then(function() {
        refresh();
      });
    };

    this.save = function(date, part, name, weight, set, runningTime) {
    if (part ==undefined && vm.date == undefined) {
      alert("날짜와 운동부위를 둘 다 선택하세요");
      return;
    }
    else if (part == undefined) {
      alert("운동부위를 선택하세요");
      return;
    } else if (vm.date == undefined)
    {
      alert("날짜를 선택하세요");
      return;
    };


      if (name[1] == undefined) {
        name.splice(name.indexOf(1), 1);
      };
      
      recordManager.recordData(date, part, name, weight, set, runningTime);
      
      this.initializeData();
      refresh();
    };


    this.initializeData = function() {
      this._id = undefined;
      this.date = "";
      this.part = "";
      this.c = "";
      this.partCategory  = [];
      this.weight = [];
      this.set = [];
      this.runningTime = [];
    };

  this.getPartCategory = function(part) {
    return this.partCategory = recordManager.getCategory(part);
  }

  this.showCategory = function(part) {
    if (part ==undefined && vm.date == undefined) {
      alert("날짜와 운동부위를 둘 다 선택하세요");
      return;
    }
    else if (part == undefined) {
      alert("운동부위를 선택하세요");
      return;
    } else if (vm.date == undefined)
    {
      alert("날짜를 선택하세요");
      return;
    };

    this.part1 = part.split("/")[0];
    this.part2 = part.split("/")[1];
    this.partCategory = this.getPartCategory(this.part1).concat(this.getPartCategory(this.part2));
  };

    this.workoutPart = recordManager.getWorkoutPart();
    this.category = recordManager.getCategory();
  }]);
