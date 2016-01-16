'use strict';

(function () { //Immediately Invoked Function Express (IIFE) IIFE is going to bind all the variables within to the local scope of that function. This means that any variables declared within this function will not conflict with other variables within the application that may share the same name or need to be re-used.
   
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'https://click-count-laloptk.c9users.io/api/clicks';
   
   function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
   
   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
   
   ready(ajaxRequest('GET', apiUrl, updateClickCount));
   
   addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);
   
   deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

})();