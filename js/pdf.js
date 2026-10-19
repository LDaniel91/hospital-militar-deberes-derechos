/* ============================================================
   GENERADOR DE PDF
   ============================================================ */
(function initPdfButtons() {
    document.querySelectorAll('.pdf-download-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            downloadPDF();
        });
    });
})();

async function downloadPDF() {
    const btns = document.querySelectorAll('.pdf-download-btn');
    const originalTexts = [];
    btns.forEach((b, i) => {
        originalTexts[i] = b.textContent;
        b.textContent = 'Generando PDF...';
        b.disabled = true;
    });

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        const secciones = [
            { id: 'derechos-paciente', titulo: 'Derechos del Paciente',     intro: 'Todo paciente tendrá derecho a:' },
            { id: 'deberes-paciente',  titulo: 'Deberes del Paciente',      intro: 'Todo paciente tendrá el deber de:' },
            { id: 'derechos-acomp',    titulo: 'Derechos del Acompañante',  intro: 'Todo acompañante tendrá los siguientes derechos:' },
            { id: 'deberes-acomp',     titulo: 'Deberes del Acompañante',   intro: 'Todo acompañante tendrá el deber de:' }
        ];

        secciones.forEach((sec, index) => {
            const panel = document.getElementById('panel-' + sec.id);
            if (!panel) return;

            const rows = [];
            panel.querySelectorAll('.accordion-item').forEach(item => {
                const header = item.querySelector('.accordion-header div');
                const body   = item.querySelector('.accordion-body');
                if (!header || !body) return;

                const headerText = header.textContent.trim();
                const parts = headerText.match(/^(\d+)\s+(.+)$/);
                const num   = parts ? parts[1] : '';
                const title = parts ? parts[2] : headerText;
                const bodyText = body.textContent.trim();

                rows.push([num, title, bodyText]);
            });

            if (index > 0) doc.addPage();

            doc.setFontSize(20);
            doc.setTextColor(13, 110, 253);
            doc.text(sec.titulo, 14, 22);

            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            doc.text(sec.intro, 14, 32);

            doc.autoTable({
                startY: 38,
                head: [['N°', 'Título', 'Descripción']],
                body: rows,
                theme: 'plain',
                headStyles: {
                    fillColor: [13, 110, 253],
                    textColor: [255, 255, 255],
                    fontSize: 11,
                    halign: 'center',
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 10,
                    textColor: [0, 0, 0],
                    lineColor: [200, 200, 200],
                    lineWidth: 0.1,
                    cellPadding: 2.5,
                    overflow: 'linebreak'
                },
                columnStyles: {
                    0: { cellWidth: 10, halign: 'center' },
                    1: { cellWidth: 50 },
                    2: { cellWidth: 'auto' }
                },
                margin: { left: 14, right: 14 },
                tableWidth: 'auto'
            });
        });

        doc.save('Deberes_y_Derechos_Hospital_Castillo_Duany.pdf');
        alert('✅ PDF generado correctamente con texto en negro y fondo blanco.');

    } catch (error) {
        console.error('Error en PDF:', error);
        alert('❌ Ocurrió un error al generar el PDF. Revise la consola.');
    } finally {
        btns.forEach((b, i) => {
            b.textContent = originalTexts[i] || '📥 Descargar PDF';
            b.disabled = false;
        });
    }
}