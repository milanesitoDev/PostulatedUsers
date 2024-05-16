

function DownloadPDF() {
    const onDownloadPDF = () => {
        fetch('http://localhost:4000/api/simulate-pdf')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'SimulatedApplicants.pdf'); // Nombre del archivo PDF a descargar
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error downloading PDF:', error));
    };
    

    return (
        <div>
            <button onClick={onDownloadPDF}>
                Download Simulated PDF
            </button>
        </div>
    );
}

export default DownloadPDF;
