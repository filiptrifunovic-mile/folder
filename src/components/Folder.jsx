import { useEffect, useState } from "react";
const Folder = ({ handleInsertNode, data }) => {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  function handleNewFolder(e, isFolder) {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  }

  function onAddFolder(e) {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(data.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  }

  if (data.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand((prev) => !prev)}>
          <span>📁 {data.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>Files +</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📃"}</span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={onAddFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {data.items.map((item, index) => (
            <Folder
              handleInsertNode={handleInsertNode}
              data={item}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📃 {data.name}</span>;
  }
};

export default Folder;
