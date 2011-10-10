var API_ID = "demo_api"
var DBD_SOAP_URL = "http://www.drebedengi.ru/soap/"

function getBalanceReq(login,password)
{
	var oBuffer = new Array();		    
	oBuffer.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
	oBuffer.push("<SOAP-ENV:Envelope ");
	oBuffer.push("xmlns:ns3=\"http://www.w3.org/2001/XMLSchema\"  ");
	oBuffer.push("xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\"  ");
	oBuffer.push("xmlns:ns0=\"http://schemas.xmlsoap.org/soap/encoding/\"  ");
	oBuffer.push("xmlns:ns1=\"urn:ddengi\"  ");
	oBuffer.push("xmlns:ns2=\"http://schemas.xmlsoap.org/soap/envelope/\"  ");
	oBuffer.push("xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"  ");
	oBuffer.push("xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\"  ");
	oBuffer.push("SOAP-ENV:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"> ");

	oBuffer.push("<SOAP-ENV:Header/>");
	   oBuffer.push("<ns2:Body>");
	      oBuffer.push("<ns1:getBalance>");
	         oBuffer.push("<apiId xsi:type=\"ns3:string\">"+ API_ID + "</apiId>");
	         oBuffer.push("<login xsi:type=\"ns3:string\">" + login + "</login>");
	         oBuffer.push("<pass xsi:type=\"ns3:string\">" + password + "</pass>");
	         oBuffer.push("<params xsi:type=\"ns3:string\"></params>");
	      oBuffer.push("</ns1:getBalance>");
	   oBuffer.push("</ns2:Body>");
	oBuffer.push("</SOAP-ENV:Envelope>");
	return oBuffer.join("");
}


function fillBalance(login,password){
	jQuery.ajax({
				type		: "POST",
				url		: DBD_SOAP_URL ,
				data		: getBalanceReq(login,password),
	                        contentType	: "text/xml; charset=utf-8",
				dataType	: "xml", 
				success		: function(soapBalanceXml, status,xmlHttp){
							$.get('/xslt/balance.xsl',function(xslDoc){
									 var xsltProcessor=new XSLTProcessor();
									 xsltProcessor.importStylesheet(xslDoc);
									 var resultDocument = xsltProcessor.transformToFragment(soapBalanceXml,document);
									 $("#di-balance").append(resultDocument);
								});
							},
				error		: function(o){console.log(o);},     
				beforeSend	: function(XMLHttpRequest){	XMLHttpRequest.setRequestHeader("SOAPAction", "urn:SoapAction");}
   			});
}

fillBalance("demo@example.com","demo")

