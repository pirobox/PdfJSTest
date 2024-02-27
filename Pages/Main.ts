function start()
{
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
  //var url = "https://css4.pub/2015/textbook/somatosensory.pdf";

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  // var pdfjsLib = globalThis.pdfjsLib;
  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/PDFJsTest/node_modules/pdfjs-dist/build/pdf.worker.mjs";

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded'); 

    // Fetch the first page
    var pageNumber = 1; 
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      var scale = 1.5;
      var viewport = page.getViewport({scale: scale});

      // Prepare canvas using PDF page dimensions
      var canvas = <HTMLCanvasElement>document.getElementById('the-canvas');
      const context = <CanvasRenderingContext2D>canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext: globalThis.pdfjsTypes.RenderParameters = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
}

window.addEventListener('DOMContentLoaded', function() { start(); });