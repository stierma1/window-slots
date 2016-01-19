var $ = require("jquery");
var buildCreationPath = require("../build-creation-path");

module.exports = function(dataSources){

  var contentFactory = {
    load : function(rerender){

      return {
        render : function(){
          var inField = $("<textarea></textarea>");

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var input = inField.val();
              if(input){
                var obj = null;
                try{
                  var obj = JSON.parse(input);
                  buildCreationPath(obj, dataSources);
                  rerender();
                } catch(err){
                  console.log(err);
                }
              }
            });

          return $("<span></span>")
            .append($("<h3>Build Creation Path</h3>"))
            .append($("<div></div>").append(inField))
            .append($("<div></div>").append(createButton));

        },
        unload: function(){

        }
      };
    }
  };

  dataSources.get("contentTypes").set("build-creation-path", contentFactory);
}
