## Export Bookmarks [Firefox Addon]

This addon adds the "Export Bookmarks" menu item to the Bookmarks menu.

The item exports all the bookmarks to an HTML file.

---

To **install** the addon go to [releases](https://github.com/mortalis13/Export-Bookmarks-XPI/releases) and click on the **.xpi** file or download and drag it to the browser window.

---

For **Firefox 57+** you should install the addon in the **Nightly** version of the browser. Before installation the browser needs to be configured to allow unsigned legacy addons. 

See this **tutorial** for details on how to use legacy addons in Firefox Nightly edition: [Install Legacy Addons in Firefox Nightly 57+](http://pcadvice.co.nf/blog/install-legacy-addons-in-firefox-57).

In short the steps are the following:

- install Nightly edition and create a new Firefox profile for it if you want
- enable legacy addons setting `about:config?filter=extensions.legacy.enabled` preference to `true`
- enable unsigned addons setting `about:config?filter=xpinstall.signatures.required` preference to `false`
- disable multiprocess mode if the addon gives errors setting `about:config?filter=browser.tabs.remote.autostart` to `false`
