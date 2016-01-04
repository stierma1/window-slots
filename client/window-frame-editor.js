
var uuid = require("uuid");
var $ = require("jquery");

module.exports = function(root, windowFrame, contentTypes, dataSources){
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
          this.content = this.content.load(this, dataSources);
          $("#" + elementId).append(this.content.render());
        }
        res();
      });
    }.bind(ws);
    ws.actions.unload = function(){
      return new Promise((res, rej) => {
        this.content.unload();
        $("#" + elementId).empty();
        res();
      });
    }.bind(ws);
    ws.actions.rerender = function(){
      return new Promise((res, rej) => {
        if(this.content !== null){
          $("#" + elementId).empty();
          $("#" + elementId).append(this.content.render());
        }
        res();
      });
    }.bind(ws);
    element.appendTo(root);
    session.assert(ws);
    session.match();
  }

  function loadContent(contentKey, slot_id){
    var contentFactory = contentTypes[contentKey] || null;
    session.assert(new Action({slot_id:slot_id, content:contentFactory, sub_type:"load"}))
    session.match();
  }

  createWindowSlot();

  var editor = {
    load:function(){
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
          var contentField = $('<input id="' + fieldContent + '" type="text"></input>');
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

  contentTypes["window-frame-editor"] = editor;
  loadContent("window-frame-editor", slot_num);
}
