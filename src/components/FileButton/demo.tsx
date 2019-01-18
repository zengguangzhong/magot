import React, { useState } from 'react';
import FileButton from './FileButton';
import { Link } from 'react-router-dom';

function FileButtonDemo() {
  const [selectedFile, setSelectedFile] = useState('');
  const selectFile = function(file: any) {
    setSelectedFile(file.name);
  };

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const selectFiles = function(files: any) {
    const filenames = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      filenames.push(file.name);
    }
    setSelectedFiles(filenames);
  };

  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <FileButton type="primary" icon="file" onChange={selectFile}>
          选择文件
        </FileButton>
        <FileButton icon="file" disabled={true}>
          选择文件
        </FileButton>
        <FileButton type="link" icon="file" onChange={selectFile}>
          选择文件
        </FileButton>
        <div className="demo-tip">{selectedFile}</div>
      </div>
      <div className="demo-box">
        <FileButton
          type="primary"
          multiple={true}
          maxCount={5}
          onChange={selectFiles}
          onError={alertError}>
          批量选择文件(最多5个)
        </FileButton>
        <FileButton
          type="primary"
          icon="image"
          filters={['image/jpg', 'image/jpeg', 'image/png', 'image/gif']}
          filterError="只能选择图片"
          onError={alertError}>
          选择图片
        </FileButton>
        <FileButton
          type="primary"
          maxSize={200}
          sizeError="文件大小超限"
          onError={alertError}>
          选择文件(小于200k)
        </FileButton>
        <div className="demo-tip">{selectedFiles.join(',')}</div>
      </div>
    </>
  );
}

function alertError(err: Error) {
  alert(err.message);
}

export default FileButtonDemo;
