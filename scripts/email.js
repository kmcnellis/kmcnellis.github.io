function mailto(prams, name, domain)
{
	var a_ = "@";
	document.write('<a '+prams+' href="mailto:'+name+a_+domain+'">'+name+a_+domain+'</a>');
}
function mailtext(prams, name, domain, text)
{
	var a_ = "@";
	document.write('<a '+prams+' href="mailto:'+name+a_+domain+'">'+text+'</a>');
}

function mail(name, domain)
{
	var a_ = "@";
	document.write('"'+name+a_+domain+'"');
}
