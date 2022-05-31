import { Document, Page, pdfjs } from "react-pdf";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import style from "./UploadDocument.module.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function UploadedDocument({ file, index, moveCard }) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      file,
      index,
    },
    type: "file",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "file",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      data-handler-id={handlerId}
      className={style.div}
    >
      <Document file={file}>
        <Page pageNumber={1} height={144}></Page>
      </Document>
      <p className={style.text}>{file.name}</p>
    </div>
  );
}

export default UploadedDocument;
