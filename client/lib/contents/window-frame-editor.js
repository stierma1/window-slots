
var uuid = require("uuid");
var $ = require("jquery");

module.exports = function(root, windowFrame, dataSources){
  var WindowSlot = windowFrame.WindowSlot;
  var Action = windowFrame.Action;
  var session = windowFrame.session;
  var slot_num = 0;
  function createWindowSlot(){
    slot_num++;
    var elementId = uuid.v4();
    var element = $('<div id="' + elementId + '" class="window-slot"></div>');
    var ws = new WindowSlot({slot_id:slot_num, content:null, slot_element:element});
    ws.actions = {};
    ws.actions.load = function(){
      return new Promise((res, rej) => {
        if(this.content !== null){
          Promise.resolve().then(() => {
            return this.content.load(this.actions.rerender, dataSources);
          })
          .then((initialized) => {
            this.content = initialized;
            return this.content.render();
          })
          .then((rendered) => {
            $("#" + elementId).append(rendered);
            res();
          })
          .catch((err) => {
            rej(err);
          });
        } else {
          res();
        }
      });
    }.bind(ws);
    ws.actions.unload = function(){
      return new Promise((res, rej) => {
        if(this.content){
          Promise.resolve()
          .then(() => {
            return this.content.unload();
          })
          .then(() => {
            $("#" + elementId).empty();
            res();
          })
          .catch((err) => {
            rej(err);
          });
        } else {
          res();
        }
      });
    }.bind(ws);
    ws.actions.rerender = function(dontEmpty){
      return new Promise((res, rej) => {
        if(this.content !== null){
          if(!dontEmpty){
            $("#" + elementId).empty();
          }
          Promise.resolve().then(() => {
            return this.content.render(dontEmpty);
          })
          .then((rendered) => {
            if(!dontEmpty){
              $("#" + elementId).append(rendered);
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
        } else {
          res();
        }
      });
    }.bind(ws);
    element.appendTo(root);
    session.assert(ws);
    session.match();
  }

  function loadContent(contentKey, slot_id){
    var contentFactory = dataSources.get("contentTypes").get(contentKey) || null;
    session.assert(new Action({slot_id:slot_id, content:contentFactory, sub_type:"load"}))
    session.match();
  }

  function unloadContent(slot_id){
    session.assert(new Action({slot_id:slot_id, sub_type:"unload"}))
    session.match();
  }

  var editor = {
    load:function(rerender, dataSources){
      dataSources.get("contentTypes").on("change", function(){
        rerender();
      });
      return {
        render: function(){
          var ele = $("<span></span>");
          var addSlotButton = $('<input type="button" value="Add Slot"></input>');
          addSlotButton.click(createWindowSlot);
          ele.append(addSlotButton);
          ele.append("Slot Id: ");
          var fieldId = uuid.v4();
          var slotIdField = $('<input id="' + fieldId + '" type="text"></input>');
          ele.append(slotIdField);
          ele.append("Content: ");
          var fieldContent = uuid.v4();
          var contentField = $('<select id="' + fieldContent + '"></select>');
          dataSources.get("contentTypes").keys().map((key) => {
            contentField
              .append($("<option></option>")
              .attr("value",key)
              .text(key));
            });
          ele.append(contentField);
          var loadSlot = $('<input type="button" value="Load Slot"></input>');
          loadSlot.click(function(){
            var idVal = parseInt($("#" + fieldId).val());
            var fieldVal = $("#" + fieldContent).val();
            if(idVal && fieldVal){
              loadContent(fieldVal, idVal);
            }
          });
          ele.append(loadSlot);
          return ele;
        },
        unload: function(){

        }
      }
    }
  }

  dataSources.get("contentTypes").set("window-frame-editor", editor);
  return {loadContent:loadContent, createWindowSlot: createWindowSlot, unloadContent:unloadContent};
}
