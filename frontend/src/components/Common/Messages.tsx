import { Alert } from "react-bootstrap";

interface ICatsMessagesProps {
  message: string;
  variant: string | undefined;
  openMessage: boolean;
  handleMessageClose: any;
}

const Messages = ({message, variant, openMessage, handleMessageClose}: ICatsMessagesProps) => {
  return (
    <>
      {openMessage &&
        <Alert
          data-testid="message-alert"
          variant={variant || 'success'}
          onClose={handleMessageClose}
          dismissible
        >
          {message}
        </Alert>}
    </>
  );
}

export default Messages;
