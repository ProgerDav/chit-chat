import React, { useState } from "react";

import { IconButton, Snackbar, Tooltip } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

function CopyButton({
  text,
  autoHideDuration = 1500,
  alertMessage = "Invitation link was copied to clipboard",
}) {
  const [open, setOpen] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setOpen(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={autoHideDuration}
        message={alertMessage}
        onClose={() => setOpen(false)}
      />
      <Tooltip title="Copy" placement="top-center">
        <IconButton onClick={copyText}>
          <FileCopy />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default CopyButton;
