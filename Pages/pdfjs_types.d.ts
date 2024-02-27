// Some types are not exposed by pdfjs-dist, so I add them manually here.
// The problem is that the namespace will not exist really at runtime,
// so I can't use these types really in js. I can use them only for compilation purposes.
import {RenderParameters} from 'pdfjs-dist/types/src/display/api';
export as namespace pdfjsTypes;
export {RenderParameters};