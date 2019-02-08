import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal, { ModalProps } from './Modal';
import Button from '../Button';

function ModalDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <BasicModal placement="center" />
        <BasicModal placement="top" />
        <FooterModal />
        <NoTitleModal />
        <DisableClosableModal />
        <DisableMaskModal />
        <DisableMaskClosableModal />
        <DisableEscapeClosableModal />
      </div>
    </>
  );
}

function ModalBody() {
  return (
    <Modal.Body>
      This is content, This is content, This is content, This is content, This
      is content, This is content...
    </Modal.Body>
  );
}

function BasicModal(props: Partial<ModalProps>) {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        {`Open Modal(${props.placement})`}
      </Button>
      <Modal
        title={`This is a Modal(${props.placement})`}
        placement={props.placement}
        visible={visible}
        onClose={handleClose}>
        <ModalBody />
      </Modal>
    </>
  );
}

function FooterModal() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal with footer
      </Button>
      <Modal
        title="This is a Modal with footer"
        visible={visible}
        onClose={handleClose}>
        <ModalBody />
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function NoTitleModal() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal(no title)
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <ModalBody />
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DisableClosableModal() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal(disable closable)
      </Button>
      <Modal visible={visible} closable={false} onClose={handleClose}>
        <ModalBody />
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DisableMaskModal() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal(disable mask)
      </Button>
      <Modal visible={visible} mask={false} onClose={handleClose}>
        <ModalBody />
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DisableMaskClosableModal() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal(disable mask closable)
      </Button>
      <Modal visible={visible} maskClosable={false} onClose={handleClose}>
        <ModalBody />
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DisableEscapeClosableModal() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal(disable escape closable)
      </Button>
      <Modal visible={visible} escapeClosable={false} onClose={handleClose}>
        <ModalBody />
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDemo;
