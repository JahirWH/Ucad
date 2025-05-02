// Función auxiliar para obtener valores de elementos del DOM
function getElementValue(id, defaultValue = '') {
    const element = document.getElementById(id);
    return element ? element.value.trim() : defaultValue;
}

function generatePage() {
    // Obtener valores principales
    const title = getElementValue('pageTitle', 'Documento UCAD');
    const content1 = getElementValue('pageContent1', '<p>No se proporcionó contenido principal.</p>');
    
    // Obtener títulos y contenidos
    const contents = [
        { title: getElementValue('subtitulo1'), content: content1 },
        { title: getElementValue('subtitulo2'), content: getElementValue('pageContent2') },
        { title: getElementValue('subtitulo3'), content: getElementValue('pageContent3') }
    ];

    // Obtener enlaces
    const links = [];
    for (let i = 1; i <= 4; i++) {
        links.push({
            url: getElementValue(`link${i}`),
            text: getElementValue(`pdf${i}`)
        });
    }

    // Generar contenido dinámico
    const contentHtml = contents
        .filter(item => item.title || item.content)
        .map((item, index) => `
            <div class="recent-posts">
                <h${index === 0 ? '2' : '3'}>${item.title}</h${index === 0 ? '2' : '3'}>
                ${item.content}
            </div>
        `).join('');

    // Generar enlaces dinámicos
    const linksHtml = links
        .filter(link => link.url && link.text)
        .map(link => `<li><a href="${link.url}">${link.text}</a></li>`)
        .join('');

    const html = `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="style.css" />
</head>
<body>
    <div id="main-wrapper" class="container_12">
        <div id="header">
            <div id="logo" class="grid_6">
                <p class="title"><a href="../ucad.html">Ucad</a></p>
                <span class="description">${title}</span>
            </div>
            <div id="menu" class="grid_6">
                <ul>
                    <li><a href="../ucad.html">Home</a></li>
                </ul>
            </div>
        </div>
        
        <div id="content" class="grid_8">
            ${contentHtml}
        </div>
        
        <div id="sidebar" class="grid_3">
            <div class="sidebar-container">
                <h3>Información adicional</h3>
                <ul>
                    ${linksHtml}
                    <li>Referencias bibliográficas</li>
                </ul>
            </div>
        </div>
        
        <div class="clear"></div>
        
        <div id="footer">
            <p>&copy; Copyright ${new Date().getFullYear()} - Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>`;
    
    try {
        const preview = document.getElementById('preview');
        if (preview) {
            preview.innerHTML = html;
        }
        return html;
    } catch (error) {
        console.error('Error al generar la página:', error);
        return null;
    }
}

function downloadPage() {
    const title = getElementValue('pageTitle');
    if (!title) {
        alert('Por favor ingresa un título para la página');
        return;
    }
    
    try {
        const html = generatePage();
        if (!html) {
            throw new Error('No se pudo generar el HTML');
        }
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar la página:', error);
        alert('Ocurrió un error al descargar la página. Por favor, inténtalo de nuevo.');
    }
}