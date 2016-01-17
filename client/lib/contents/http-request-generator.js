var $ = require("jquery");
var createHttpRequest = require("../data-sources/http-request");
var uuid = require("uuid");

module.exports = function(){

  var contentFactory = {
    load : function(rerender, dataSources){

      return {
        render : function(){
          var nameUuid = uuid.v4();
          var nameField = $("<input type='text'></input>").attr("id", nameUuid);
          var urlUuid = uuid.v4();
          var urlField = $("<input type='text'></input>").attr("id", urlUuid);
          var methodUuid = uuid.v4();
          var methodSelect = $("<select><option value='GET'>GET</option><option value='POST'>POST</option><option value='PUT'>PUT</option><option value='DELETE'>DELETE</option></select>").attr("id", methodUuid);
          var intervalUuid = uuid.v4();
          var intervalField = $("<input type='text'></input>").attr("id", intervalUuid);
          var headerUuid = uuid.v4();
          var headerField = $("<textarea></textarea>").attr("id", headerUuid);
          var bodyUuid = uuid.v4();
          var bodyField = $("<textarea></textarea>").attr("id", bodyUuid);
          var submit = $("<input type='button' value='Create'></input>");

          submit.click(function(){
            var name = $("#" + nameUuid).val();
            var url = $("#" + urlUuid).val();
            var method = $("#" + methodUuid).val();
            var interval = parseInt($("#" + intervalUuid).val());
            var headers = JSON.parse($("#" + headerUuid).val() || "\"\"");
            var body = JSON.parse($("#" + bodyUuid).val() || "\"\"");

            if(name && url && method){
              var jqObj = {
                url:url,
                method:method,
                headers:headers || undefined,
                body: body || undefined
              };
              dataSources.get("creationMap").set(name, null, [jqObj, interval], "http-request");
              dataSources.set(name, createHttpRequest(jqObj, interval));
              rerender();
            }
          });

          return $("<span></span>").append($("<div></div>").append($("<span>Name: </span>")).append(nameField))
            .append($("<div></div>").append($("<span>Url: </span>")).append(urlField))
            .append($("<div></div>").append($("<span>Method: </span>")).append(methodSelect))
            .append($("<div></div>").append($("<span>Interval: </span>")).append(intervalField))
            .append($("<div></div>").append($("<span>Headers: </span>")).append(headerField))
            .append($("<div></div>").append($("<span>Body: </span>")).append(bodyField))
            .append($("<div></div>").append(submit));
        }, unload: function(){

        }
      };
    }
  };

  return contentFactory;
}
