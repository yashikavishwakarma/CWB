
export async function translatePdf(file, language) {
  const formData = new FormData();
  formData.append('pdfFile', file);
  formData.append('targetLanguage', language);

  const response = await fetch('https://cwb-ha2t.onrender.com/api/translate-pdf', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'PDF translation failed');
  }

  return response.json(); 
}
