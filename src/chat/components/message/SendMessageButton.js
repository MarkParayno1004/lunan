import { Button } from "@twilio-paste/button";
import { Box } from "@twilio-paste/core";
import styles from "../../styles";

const SendMessageButton = (props) => {
  return (
    <Box style={styles.buttonWrapper}>
      <Button
        variant="primary"
        onClick={() => {
          props.onClick();
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default SendMessageButton;
