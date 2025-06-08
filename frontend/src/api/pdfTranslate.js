// frontend/src/api/pdfTranslate.js

export async function translatePdf(file, language) {
  const formData = new FormData();
  formData.append('pdfFile', file);
  formData.append('targetLanguage', language);

  const response = await fetch('http://localhost:3000/api/translate-pdf', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'PDF translation failed');
  }

  return response.json(); // { translatedText }
}
