angular.module('ihframework')
  .filter('words', function() {
    return function(text) {
      if (typeof text == 'string') {
        return text.substr(0, text.lastIndexOf(' '));
      } else {
        return '';
      }
    };
  })
  .filter('encode', function() {
    return window.encodeURIComponent;
  })
  .filter('sentence', function() {
    return function(str) {
      if (typeof str !== 'undefined') {
        str = str.replace(/ +(?= )/g, ' ').replace(/[!.-]{2,}/, '!');
        var ret = '';
        var strs = str.split(/\. |\! /)
        for (var i = 0; i < strs.length; i++) {
          ret += strs[i].charAt(0).toUpperCase() + strs[i].slice(1).toLowerCase() + '.';
          if (i != strs.length - 1)
            ret += ' ';
        }
        return ret;
      }
    }
  })
  .filter('tel', function() {
    return function(tel) {
      if (!tel) {
        return '';
      }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return tel;
      }

      var country, city, number;
      switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
          break;

        case 11: // +CPPP####### -> CCC (PP) ###-####
          country = value[0];
          city = value.slice(1, 4);
          number = value.slice(4);
          break;

        case 12: // +CCCPP####### -> CCC (PP) ###-####
          country = value.slice(0, 3);
          city = value.slice(3, 5);
          number = value.slice(5);
          break;

        default:
          return tel;
      }

      if (country == 1) {
        country = "";
      }

      number = number.slice(0, 3) + '-' + number.slice(3);

      return (country + " (" + city + ") " + number).trim();
    };
  })
  .filter('split', function() {
    return function(input, splitChar, splitIndex) {
      if(input != undefined) {
        var split = input.split(splitChar);
        if(split.length > splitIndex) {
          return input.split(splitChar)[splitIndex];
        }
        
        return split[0];
      }
    }
  })
  .filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }])
  .filter('startFrom', function() {
    return function(input, start) {
      if (input) {
        start = +start; //parse to int
        return input.slice(start);
      }
      return [];
    }
  })
	.filter('spaceless', function() {
		return function(input) {
      if(input != undefined) {
  			return input.replace(/ /g, '');
      }
		};
	});
