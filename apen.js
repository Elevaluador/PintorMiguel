javascript: (function () {  var domains_str = prompt("Pega aquí los dominios:"); 
     if (domains_str == null || domains_str == "") {    console.log("User cancelled the prompt.");  } else {    var domains = domains_str.split(/\r?\n/);  }  for (const domain of domains)
     {    window.open(`https://www.google.com/search?q=site:${domain}`, "_blank");  }})();