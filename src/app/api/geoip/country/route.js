
const monedasPorPais = {
  "AR": "$",   // Peso argentino
  "BO": "$",   // Dólar estadounidense (uso en Bolivia)
  "BR": "R$",  // Real brasileño
  "CA": "$",   // Dólar canadiense
  "CL": "$",   // Peso chileno
  "CO": "$",   // Peso colombiano
  "CR": "₡",   // Colón costarricense
  "EC": "$",   // Dólar estadounidense
  "SV": "$",   // Dólar estadounidense
  "EU": "€",   // Euro
  "US": "$",   // Dólar estadounidense
  "GT": "Q",   // Quetzal guatemalteco
  "HN": "L",   // Lempira hondureño
  "MX": "$",   // Peso mexicano
  "NI": "C$",  // Córdoba nicaragüense
  "OTHER": "$",// Default dólar
  "PA": "$",   // Dólar estadounidense
  "PY": "₲",   // Guaraní paraguayo
  "PE": "S/",  // Sol peruano
  "UK": "£",   // Libra esterlina
  "DO": "$",   // Peso dominicano
  "UY": "$",   // Peso uruguayo
  "ES": "€"    // España (euro)
};

const emisoresTarjetasPorPais = {
  AR: [
    "Banco Nación", "Banco Galicia", "Santander Río", "BBVA Argentina", "Banco Macro", 
    "Tarjeta Naranja", "Credicoop", "Ualá", "Brubank", "Rebanking", "Naranja X", "Otro"
  ],
  BO: [
    "Banco Nacional de Bolivia", "Banco Mercantil Santa Cruz", "Banco Bisa", 
    "Banco de Crédito BCP", "Banco FIE", "Otro"
  ],
  BR: [
    "Banco do Brasil", "Itaú", "Bradesco", "Caixa", "Santander Brasil", 
    "Nubank", "Inter", "Banco Pan", "C6 Bank", "Otro"
  ],
  CA: [
    "RBC", "TD", "Scotiabank", "CIBC", "BMO", 
    "Capital One", "American Express", "Koho", "Neo Financial", "Otro"
  ],
  CL: [
    "Banco de Chile", "BCI", "Santander", "Banco Estado", "Scotiabank", 
    "CMR Falabella", "Ripley", "Tenpo", "Mach", "Chek", "Otro"
  ],
  CO: [
  "Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA Colombia", "Banco Popular", "Tuya",
  "Nequi", "RappiPay", "Lulo Bank", "Movii", "Bancamía S.A.", "Banco Agrario", "Banco AV Villas",
  "Banco Caja Social", "Banco Cooperativo Coopcentral", "Banco Credifinanciera", "Banco de Occidente",
  "Banco Falabella", "Banco Finandina S.A. BIC", "Banco GNB Sudameris", "Banco Itaú", "Banco Pichincha S.A.",
  "Banco Santander Colombia", "Banco Serfinanza", "Banco Union antes Giros", "Bancomeva S.A.", "CFA Cooperativa Financiera",
  "Citibank", "Coltefinanciera", "Confiar Cooperativa Financiera","Coofinep Cooperativa Financiera", "Cotrafa", "Dale", 
  "Daviplata","Iris","Scotiabank Colpatria", "Otro"
],
  CR: [
    "Banco Nacional", "Banco de Costa Rica", "BAC Credomatic", "Scotiabank", 
    "Coopeservidores", "MikroBank", "Otro"
  ],
  EC: [
    "Banco Pichincha", "Banco Guayaquil", "Banco del Pacífico", "Produbanco", 
    "Cooperativa Jep", "Kushki", "PayPhone", "Banco Internacional", "Banco Bolivariano",
    "Banco del Austro", "Banco de Desarrollo del Ecuador", "Banco General Rumiñahui",
    "Banco de Machala", "Banco Solidario", "BanEcuador", "Banco de Loja", "Citybank",
    "Banco ProCredit", "Banco Amazonas", "Banco Coopnacional", "Banco VisionFund Ecuador",
    "Banco D-Miro", "Banco Amibank", "Banco Comercial de Manabí", "Banco Capital",
    "Banco del Litoral", "Banco Delbank", "Pibank", "Bimo", "Deuna!", "Global66", "Peigo",
    "Otro"
  ],
  ES: [
  "BBVA", "Banco Santander", "CaixaBank", "Banco Sabadell", "Bankinter", "Unicaja Banco",
  "Kutxabank", "Abanca", "Ibercaja", "Liberbank", "Cajamar", "EVO Banco", "Openbank", "ING",
  "Revolut", "N26", "Bnext", "Wise", "Correos Prepago", "Vivid Money", "Verse", "Orange Bank", 
  "Caixa Ontinyent", "Caja Rural", "Otro"
  ],
  SV: [
    "Banco Agrícola", "Davivienda", "Promerica", "Scotiabank", "Banco Cuscatlán", 
    "Tigo Money", "Otro"
  ],
  EU: [
    "CaixaBank", "BBVA", "Santander", "Sabadell", "Unicaja", "Abanca", 
    "Bankinter", "Rebellion Pay", "Verse", "Bnext", "Otro"
  ],
  US: [
    "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One", 
    "American Express", "Discover", "Chime", "Venmo", "Cash App", "SoFi", "Otro"
  ],
  GT: [
    "Banco Industrial", "Banrural", "G&T Continental", "Promerica", "BAC", 
    "Tigo Money", "Otro"
  ],
  HN: [
    "Banco Atlántida", "Ficohsa", "Occidente", "BAC", "Banpaís", 
    "Tigo Money", "Otro"
  ],
  MX: [
    "BBVA México", "Citibanamex", "Banorte", "Santander", "HSBC", 
    "American Express México", "Invex", "Hey Banco", "Ualá México", "Nu México", 
    "Stori", "Klar", "Otro"
  ],
  NI: [
    "BANPRO", "Lafise", "BAC Nicaragua", "Banco de América Central", 
    "Tigo Money Nicaragua", "Otro"
  ],
  OTHER: [
    "Payoneer", "Wise", "Revolut", "N26", "Western Union (tarjeta prepaga)", 
    "Zolve", "Chime", "Curve", "Vivid Money", "Otro"
  ],
  PA: [
    "Banco General", "Banistmo", "Global Bank", "Multibank", "BAC Panamá", 
    "Nequi Panamá", "PayCash", "Otro"
  ],
  PY: [
    "Banco Itaú", "Continental", "Visión Banco", "Sudameris", "Banco Familiar", 
    "Tigo Money", "Zimple", "Otro"
  ],
  PE: [
    "BCP", "Interbank", "BBVA Perú", "Scotiabank Perú", "Banco Ripley", 
    "CMR Falabella", "Yape", "Plin", "RappiCard", "Ligo", "Otro"
  ],
  UK: [
    "HSBC", "Barclays", "Lloyds", "NatWest", "TSB", "Santander UK", 
    "Revolut", "Monzo", "Starling Bank", "Curve", "Tide", "Otro"
  ],
  DO: [
    "Banco Popular", "BHD León", "Banreservas", "Santa Cruz", 
    "Scotiabank RD", "Azul", "TuCrédito", "Otro"
  ],
  UY: [
    "Banco República", "Santander Uruguay", "Scotiabank Uruguay", "Banco Itaú", 
    "OCA", "Creditel", "Prex", "Otro"
  ]
};

const URL_EXTERNA = process.env.URL_EXTERNA

export async function POST(request) {
  try {
    const forwarded =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      ""

    let ip = forwarded.split(",")[0].trim()
    ip == "::1" ? ip = "95.173.223.114":""
    
    const res = await fetch(`${URL_EXTERNA}/geoip/country`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip: ip }),
    })
    console.log(res);
    
    const data = await res.json()

    if (data.success && data.data) {
      const location = data.data.country_code || "CO"
      return Response.json({
        location,
        ip: ip,
        money: monedasPorPais[location] || monedasPorPais.OTHER,
        bancos: emisoresTarjetasPorPais[location] || emisoresTarjetasPorPais.OTHER,
      })
    } else {
      return Response.json({
        location: "CO",
        ip: "unknown",
        money: monedasPorPais.OTHER,
        bancos: emisoresTarjetasPorPais.OTHER,
      })
    }
  } catch (err) {
    console.error("Error en geolocalización:", err)
    return Response.json({
      location: "CO",
      ip: "unknown",
      money: monedasPorPais.CO,
      bancos: emisoresTarjetasPorPais.CO,
    })
  }
}