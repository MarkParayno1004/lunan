import React, { useState } from "react";
import { ChevronDoubleLeftIcon } from "@twilio-paste/icons/esm/ChevronDoubleLeftIcon";
import { Box } from "@twilio-paste/core";
import { ChevronDoubleRightIcon } from "@twilio-paste/icons/esm/ChevronDoubleRightIcon";

import CreateConversationButton from "./CreateConversationButton";
import ConversationsList from "./ConversationsList";
import styles from "../../styles";

const ConversationsContainer = (props) => {
  const [listHidden, hideList] = useState(false);

  return (
    <Box
      style={
        listHidden
          ? { ...styles.convosWrapper, ...styles.collapsedList }
          : styles.convosWrapper
      }
    >
      <Box style={styles.newConvoButton}>
        <CreateConversationButton
          client={props.client}
          collapsed={listHidden}
        />
      </Box>
      <Box style={styles.convoList}>
        <ConversationsList />
      </Box>
      {/* <Box style={styles.collapseButtonBox}>
        <Box
          paddingTop="space30"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onClick={() => hideList(!listHidden)}
        >
          {listHidden ? (
            <ChevronDoubleRightIcon decorative={false} title="Collapse" />
          ) : (
            <ChevronDoubleLeftIcon decorative={false} title="Collapse" />
          )}
        </Box>
      </Box> */}
    </Box>
  );
};

export default ConversationsContainer;
