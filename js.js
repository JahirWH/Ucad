function generatePage() {
            const title = document.getElementById('pageTitle').value.trim() || 'Documento UCAD';
            const content_title1 = document.getElementById('subtitulo1').value.trim() || '';
            const content1 = document.getElementById('pageContent1').value.trim() || '<p>No se proporcionó contenido principal.</p>';
            const content_title2 = document.getElementById('subtitulo2').value.trim() || '';
            const content2 = document.getElementById('pageContent2').value.trim() || '';

            const content_title3 = document.getElementById('subtitulo3').value.trim() || '';
            const content3 = document.getElementById('pageContent3').value.trim() || '';

            // LINKS
            const link1 = document.getElementById('link1').value.trim() || '';
            const pdf1 = document.getElementById('pdf1').value.trim() || '';

            const link2 = document.getElementById('link2').value.trim() || '';
            const pdf2 = document.getElementById('pdf2').value.trim() || '';

            const link3 = document.getElementById('link3').value.trim() || '';
            const pdf3 = document.getElementById('pdf3').value.trim() || '';

            const link4 = document.getElementById('link4').value.trim() || '';
            const pdf4 = document.getElementById('pdf4').value.trim() || '';



            // const link2 = document.getElementById('link2').value.trim() || '';
            // const link3 = document.getElementById('link3').value.trim() || '';
            // const link4 = document.getElementById('link4').value.trim() || '';
            
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
        <!-- header -->
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
        <!-- end of header -->
        
        <!-- content -->
        <div id="content" class="grid_8">
            <div class="recent-posts">
            <h2>${content_title1}</h2>
                ${content1}
            </div>
            
            ${content2 ? `
            <div class="recent-posts">
                <h3>${content_title2}</h3>
                ${content2}
            </div>
            ` : ''}
            
            ${content3 ? `
            <div class="recent-posts">
                <h3>${content_title3}</h3>
                ${content3}
            </div>
            ` : ''}
        </div>
        
        <!-- sidebar -->
        <div id="sidebar" class="grid_3">
            <div class="sidebar-container">
                <h3>Información adicional</h3>
                <ul>
                    <li><a href="${link1}">${pdf1}</a> </li>
                    <li><a href="${link2}">${pdf2}</a> </li>
                    <li><a href="${link3}">${pdf3}</a> </li>
                    <li><a href="${link4}">${pdf4}</a> </li>
                  
                    <li>Referencias bibliográficas</li>
                </ul>
            </div>
        </div>
        
        <div class="clear"></div>
        
        <!-- footer -->
        <div id="footer">
            <p>&copy; Copyright ${new Date().getFullYear()} - Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>`;
            
            document.getElementById('preview').innerHTML = html;
            return html;
        }
        
        function downloadPage() {
            const title = document.getElementById('pageTitle').value.trim();
            if (!title) {
                alert('Por favor ingresa un título para la página');
                return;
            }
            
            const html = generatePage();
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = title.toLowerCase().replace(/\s+/g, '-') + '.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }