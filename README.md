
Some General Notes

function createWindowSlot : () -> Instance<Window-Slot>

function loadContent : string, number -> Instance<Content>

Instance<Content> window-frame-editor
  function loadContent : Instance<Window-Slot> , Type<Content> -> Instance<Content>
  function addSlot : () -> Instance<Window-Slot>

Instance<Content> connector : Instance<DataSource>, Type<View> -> Type<Content>

Instance<Content> generator : Instance<Obj> -> Instance<DataSource>
