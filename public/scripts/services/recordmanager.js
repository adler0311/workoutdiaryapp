'use strict';

/**
 * @ngdoc service
 * @name traingingDiaryApp.recordManager
 * @description
 * # recordManager
 * Service in the traingingDiaryApp.
 */
angular.module('traingingDiaryApp')
  .service('recordManager', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function 
    var vm = this;

	this.workoutPart = ["유산소", "가슴/삼두", "가슴/유산소", "등/유산소", "등/이두", "하체/유산소", "하체/어깨"];

	this.category = {
		"유산소": ["유산소"],
		"가슴" : ["벤치 프레스", "덤벨 프레스", "플라잉 머신", "딥스"],
		"삼두" : ["케이블 삼두", "딥스 삼두"],
		"등" : ["데드 리프트", "시티드 로우", "T바 로우", "랫 풀다운", "랫 풀 좁게"],
		"이두" : ["케이블 이두", "덤벨 이두"],
		"하체" : ["스쿼트", "레그 프레스", "런지"],
		"어깨" : ["솔더 프레스 머신", "덤벨 숄더 프레스", "레터럴 레이즈"]
	};


  	this.getExercise = function() {
  		var promise = $http.get('/workouts');
  		promise = promise.then(function (response) {
    		console.log("I got the data I requested");
    		return response.data;
    	});
    	return promise;
  	};

    this.removeExercise = function(id) {
      var promise = $http.delete('/workouts/' + id);
      promise = promise.then(function(response) {
        return response.data;
      });
      return promise;
    };

    this.editExercise = function(id) {
      var promise = $http.get('/workouts/' + id);
      promise = promise.then(function(response) {
        return response.data;
      });
      return promise;
    };

    this.updateExercise = function(id,date,part,name,weight,set,runningTime) {
      var data = vm.mergeData(date,part,name,weight,set,runningTime);
      console.log(data);

      var promise = $http.put('/workouts/' + id, data);
      promise = promise.then(function(response) {
        return response.data;
      });
      return promise;
    };

  	this.getWorkoutPart = function() {
  		return this.workoutPart;
  	};

  	this.getCategory = function(part) {
  		return this.category[part];
  	};

    this.mergeData = function(date,part,name,weight,set,runningTime) {
      var data = {};
      data["created"] = new Date();
      data["date"] = date;
      data["part"] = part;
      data["name"] = {};

      if (name != undefined && weight != undefined) {
        for (var i=0; i < name.length; i++) {
            if (name[i] != undefined){

              data["name"][name[i]] = {"중량": weight[i], "셋트수": set[i], "운동시간": runningTime[i]};
            }
        };
      };

      return data;
    };

  	this.recordData = function(date, part, name, weight, set, runningTime) {
      if ((weight == undefined || weight == '[]') && runningTime == undefined )
      {
        alert("운동을 기록해주세요");
        return;
      }

      var data = vm.mergeData(date,part,name,weight,set,runningTime);

  		$http.post('/workouts', data).then(function(response) {
  			console.log(response);
  		});
  	};
});
