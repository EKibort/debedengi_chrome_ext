<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:dbd="urn:ddengi"
exclude-result-prefixes="soap dbd"
>

<xsl:output method="xml" version="1.0"
encoding="UTF-8" indent="yes" />

<xsl:template match="/" >
    <h2>Баланс</h2>
    <table border="0" id="di-balance">
      <tr>
        <th class="sub_row">Счет</th>
        <th class="sub_sum">сумма</th>
      </tr>
      <xsl:for-each select="//soap:Body/dbd:getBalanceResponse/getBalanceReturn/item">
        <tr>
          <td class="sub_row"><xsl:value-of select="item[key='place_name']/value"/></td>
          <td class="sub_sum"><xsl:value-of select="item[key='sum']/value"/> (<xsl:value-of select="item[key='currency_name']/value"/>)</td>
	</tr>
      </xsl:for-each>
    </table>
</xsl:template>

</xsl:stylesheet>
