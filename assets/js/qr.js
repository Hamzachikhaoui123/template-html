const qrCodeImg = document.getElementById('qrcode');

function extractTextFromClass(className) {
  const element = document.querySelector('.' + className);
  if (element) {
    return element.textContent.trim();
  }
  return '';
}

function generateQRCode(doctorName, specialty, address, tel1, tel2) {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${doctorName}
FN:${doctorName}
ORG:Ophtalmologue
ADR;TYPE=HOME:;;${address}
TEL;TYPE=CELL:${tel1}
TEL;TYPE=CELL:${tel2}
URL:https://www.altabib.tn
END:VCARD`;

  // Encodage des données vCard en format URI
  const qrCodeData = encodeURIComponent(vCardData);

  // Construction de l'URL pour le QR code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeData}&size=200x200`;

  // Attribution de l'URL comme source de l'image
  qrCodeImg.src = qrCodeUrl;
}

// Extraction des informations
const doctorName = extractTextFromClass('name-user');
const specialty = 'Ophtalmologue'; // Vous pouvez changer cela pour obtenir la spécialité du document HTML si nécessaire
const address = extractTextFromClass('adress');
const tel1 = document.querySelectorAll('.tel')[0].textContent.trim(); // Premier numéro de téléphone
const tel2 = document.querySelectorAll('.tel')[1].textContent.trim(); // Deuxième numéro de téléphone

// Génération initiale du QR code
generateQRCode(doctorName, specialty, address, tel1, tel2);
