Meteor.startup(function() {
  BrowserPolicy.content.disallowInlineScripts();
  BrowserPolicy.content.disallowEval();
  BrowserPolicy.content.disallowInlineStyles();

  // Our app always runs in a sandstorm iframe
  // TODO: restrict this to our origin minus the app
  // specific subdomain?
  BrowserPolicy.framing.allowAll();

  // TODO: only allow connects to our own origin
  //BrowserPolicy.content.disallowConnect();
  //var rootUrl = __meteor_runtime_config__.ROOT_URL;
  //BrowserPolicy.content.allowConnectOrigin(rootUrl);
  //BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));
});
