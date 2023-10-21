export default function generateBrowserFingerprint() {
  var fingerprint = "";

  // User Agent
  fingerprint += navigator.userAgent;

  // Screen Resolution
  fingerprint += screen.width + "x" + screen.height;

  // Timezone Offset
  fingerprint += new Date().getTimezoneOffset();

  // Language
  fingerprint += navigator.language;

  // Plugins
  var plugins = "";
  for (var i = 0; i < navigator.plugins.length; i++) {
    plugins += navigator.plugins[i].name + ",";
  }
  fingerprint += plugins;

  // Canvas Fingerprint
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  if (!ctx) return;
  var txt = "Browser Fingerprint";
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText(txt, 4, 17);

  var dataURI = canvas.toDataURL();
  var imageData = dataURI.replace("data:image/png;base64,", "");
  fingerprint += imageData;

  // Hash the fingerprint
  var hash = 0;
  for (var i = 0; i < fingerprint.length; i++) {
    var char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  // Convert the hash to hex
  var hex = (hash >>> 0).toString(16);

  return hex;
}
