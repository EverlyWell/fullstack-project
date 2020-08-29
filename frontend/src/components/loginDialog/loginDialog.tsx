import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  Button,
} from "@material-ui/core";

interface Props {
  open: boolean;
  handleLogin: (x: string) => void;
}

export const LoginDialog = ({ open, handleLogin }: Props) => {
  const [id, setId] = useState<string>("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open}>
      <DialogTitle>Enter your user ID</DialogTitle>
      <DialogContent>
        {/* <Grid spacing={3} container> */}
        <Input
          placeholder="id"
          disableUnderline
          value={id}
          onChange={handleChangeInput}
        />
        <Button onClick={() => handleLogin(id)}>log in</Button>
        {/* </Grid> */}
      </DialogContent>
    </Dialog>
  );
};
