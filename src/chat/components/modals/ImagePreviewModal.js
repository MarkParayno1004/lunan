import React from "react";
import { Modal, ModalHeader } from "@twilio-paste/modal";
import { Box, ModalBody, Text } from "@twilio-paste/core";
import {
  MediaBody,
  MediaFigure,
  MediaObject,
} from "@twilio-paste/media-object";
import { Avatar } from "../Avatar";
import { Button } from "@twilio-paste/button";
import { DownloadIcon } from "@twilio-paste/icons/cjs/DownloadIcon";

const ImagePreviewModal = ({
  image,
  isOpen,
  handleClose,
  author,
  date,
  onDownload,
}) => (
  <Modal
    ariaLabelledby="image-preview"
    isOpen={isOpen}
    onDismiss={handleClose}
    size="default"
  >
    <ModalHeader>
      <Box
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <MediaObject verticalAlign="center" style={{ minWidth: "100%" }}>
          <MediaFigure spacing="space40">
            <Avatar size="sizeIcon80" name={author} />
          </MediaFigure>
          <MediaBody>
            <Text as="p" fontSize="fontSize50" lineHeight="lineHeight60">
              {author}
            </Text>
            <Text
              as="p"
              fontSize="fontSize20"
              lineHeight="lineHeight20"
              color="colorTextWeak"
            >
              Sent {date}
            </Text>
          </MediaBody>
        </MediaObject>

        <Button variant="secondary" onClick={onDownload}>
          <DownloadIcon
            decorative={false}
            title="Download File"
            size="sizeIcon60"
            color="colorText"
          />
          Download
        </Button>
      </Box>
    </ModalHeader>
    <ModalBody
      style={{
        maxWidth: "70vw",
        maxHeight: "70vh",
      }}
    >
      <img
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        src={(window.URL || window.webkitURL).createObjectURL(image)}
      />
    </ModalBody>
  </Modal>
);

export default ImagePreviewModal;
