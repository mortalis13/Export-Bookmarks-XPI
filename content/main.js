
/* ******************************************* ui build *********************************************** */

function loadIntoWindow(window){
  try{
    setShortFunctions(window)                     //jQuery-like syntax
    addMenuItem(window)
  }
  catch(e){}
}

function unloadFromWindow(window){
  if (!window) return
  removeMenuItem(window)
  clearUserPrefs()
}

/* ***************************************** load functions ******************************************** */

function eachWindow(callback){
  let enumerator=Services.wm.getEnumerator("navigator:browser")
  while (enumerator.hasMoreElements()){
    let win=enumerator.getNext()
    if (win.document.readyState==="complete") callback(win)
    else runOnLoad(win, callback)
  }
}

function windowWatcher (subject, topic){
  if (topic==="domwindowopened")
    runOnLoad(subject, loadIntoWindow)
}

function runOnLoad (window, callback){
  window.addEventListener("load", function(){
    window.removeEventListener("load", arguments.callee, false)
    callback(window)
  }, false)
}
