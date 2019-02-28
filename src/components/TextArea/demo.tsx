import React from 'react';
import TextArea from './TextArea';
import { Link } from 'react-router-dom';

function TextAreaDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <TextArea placeholder="please enter..." value="This is a TextArea" />
        <TextArea placeholder="please enter..." rows={6} />
        <TextArea placeholder="please enter..." resize="none" />
        <TextArea
          placeholder="please enter...(with clear icon)"
          clearable={true}
        />
      </div>
    </>
  );
}

export default TextAreaDemo;
