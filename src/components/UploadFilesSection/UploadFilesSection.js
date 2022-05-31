import { useState, useCallback } from "react";
import update from "immutability-helper";
import UploadedDocument from "../UploadedDocument/UploadedDocument";
import Modal from "../Modal/Modal";
import style from "./UploadFilesSection.module.css";

function UploadFilesSection() {
  const [files, setFiles] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function changeModalStatus() {
    setIsOpen(false);
  }

  function handleInputChange(event) {
    const data = event.currentTarget.files;
    if (data?.length < 2 || data?.length > 5) {
      setIsOpen(true);
      return;
    }

    setFiles([...data]);
  }

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setFiles((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <section
      className={style.section}
      style={{
        backgroundColor: files ? "#EAEBEC" : "#FFFFFF",
      }}
    >
      {files ? (
        <div className={style.div}>
          {files.map((file, i) => (
            <UploadedDocument
              file={file}
              index={i}
              key={file.name}
              moveCard={moveCard}
            />
          ))}
        </div>
      ) : (
        <label className={style.label}>
          <input
            type="file"
            accept="application/pdf"
            className={style.input}
            onChange={handleInputChange}
            multiple
          />
          Add file
        </label>
      )}

      {isOpen && <Modal changeModalStatus={changeModalStatus} />}
    </section>
  );
}

export default UploadFilesSection;
