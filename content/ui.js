
/* ***************************************** ui change *******************************************/

function addMenuItem(w) {
  var $=w.$
  $.init(w.document)
  
  var exportMenuItem = $("<menuitem>");
  if(exportMenuItem){
    exportMenuItem.attr("id", menuProps.id);
    exportMenuItem.attr("label",menuProps.label);
    exportMenuItem.attr("accesskey", menuProps.accesskey);
    exportMenuItem.bind("command", exportBookmarks);
    var bookmarksMenuPopup=$("bookmarksMenuPopup")
    if(bookmarksMenuPopup) bookmarksMenuPopup.insertBefore(exportMenuItem, $("bookmarksToolbarSeparator"));
  }
}

function removeMenuItem(w){
  var $=w.$
  $.init(w.document)
  var menuitem=$(menuProps.id)
  menuitem && menuitem.remove()
}

function exportBookmarks(e){
  var window=e.target.ownerDocument.defaultView
  Cu.import("resource:///modules/PlacesUIUtils.jsm")
  
  var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
  var fpCallback = function fpCallback_done(aResult) {
    if (aResult != Ci.nsIFilePicker.returnCancel) {
      Cu.import("resource://gre/modules/BookmarkHTMLUtils.jsm");
      BookmarkHTMLUtils.exportToFile(fp.file.path).then(null, Cu.reportError);
    }
  };

  fp.init(window, PlacesUIUtils.getString("EnterExport"),Ci.nsIFilePicker.modeSave);
  fp.appendFilters(Ci.nsIFilePicker.filterHTML);
  fp.defaultString = "bookmarks.html";
  fp.open(fpCallback);
}
