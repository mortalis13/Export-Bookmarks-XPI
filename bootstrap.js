
const {classes: Cc, interfaces: Ci, utils: Cu}=Components

Cu.import("resource://gre/modules/Services.jsm")
Cu.import("resource://gre/modules/AddonManager.jsm")

/* ******************************************* vars *********************************************** */

const prefsPrefix="extensions.export_bookmarks_qwe."
const chromeRoot="export-bookmarks"

const menuProps={
  id:"menu_BookmarksExportItem",
  label:"Export Bookmarks",
  accesskey:"E"
}

var self=this,prefs={}
const prefNames=["firstRun","addBranch","installReason","uninstallReason","startupReason","shutdownReason",
        "buttonPos","currentSet","currentSetAfter","savedCurrentSet"]
for(var p of prefNames) prefs[p]=prefsPrefix+p

const reasons=["","APP_STARTUP","APP_SHUTDOWN","ADDON_ENABLE","ADDON_DISABLE","ADDON_INSTALL","ADDON_UNINSTALL","ADDON_UPGRADE","ADDON_DOWNGRADE"]

/* ***************************************** main functions ************************************************* */

function install(data,reason){ 
  pref(prefs.installReason,reasons[reason])
  if(reason==ADDON_INSTALL) pref(prefs.firstRun, true) 
}

function startup(data,reason){
  pref(prefs.startupReason,reasons[reason])
  AddonManager.getAddonByID(data.id, function(addon){
    include(addon, "content/lib.js")
    include(addon, "content/ui.js")
    include(addon, "content/main.js")
    
    eachWindow(loadIntoWindow)                        //ui building function
    Services.ww.registerNotification(windowWatcher)
  })
}

function shutdown(data,reason){
  pref(prefs.shutdownReason,reasons[reason])
  if(reason==ADDON_DISABLE){
    Services.ww.unregisterNotification(windowWatcher)
    eachWindow(unloadFromWindow)                        //ui destroying function
  }
}

/* ****************************************** add functions ************************************************ */

function include(addon, path){                          //load scripts
  Services.scriptloader.loadSubScript(addon.getResourceURI(path).spec, self)
}

function pref(name,value){                            //get/set prefs
  if(value===undefined){
    switch(Services.prefs.getPrefType(name)){
      case 0:return null
      case 32:return Services.prefs.getCharPref(name)
      case 64:return Services.prefs.getIntPref(name)
      case 128:return Services.prefs.getBoolPref(name)
    }
  }
  if(value==="") Services.prefs.clearUserPref(name)
  else{
    switch(typeof value){
      case "boolean":Services.prefs.setBoolPref(name,value);return
      case "number":Services.prefs.setIntPref(name,value);return
      default:Services.prefs.setCharPref(name,value)
    }
  }
}
