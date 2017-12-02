
/* ***************************************** ui change *******************************************/

function addMenuItem(w) {
  var $=w.$
  $.init(w.document)
  
  var menuitem = $(menuProps.id);
  menuitem && menuitem.remove();

  var bookmarksMenuItem = $("<menuitem>");
  if(bookmarksMenuItem){
    bookmarksMenuItem.attr("id", menuProps.id);
    bookmarksMenuItem.attr("label",menuProps.label);
    bookmarksMenuItem.attr("accesskey", menuProps.accesskey);
    bookmarksMenuItem.bind("command", exportBookmarks);
    
    var bookmarksMenuPopup=$("bookmarksMenuPopup");
    var beforeItem = w.document.getElementById('bookmarksShowAll');
    if(bookmarksMenuPopup) {
      bookmarksMenuPopup.insertBefore(bookmarksMenuItem, beforeItem);
    }
  }
}

function removeMenuItem(w) {
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
