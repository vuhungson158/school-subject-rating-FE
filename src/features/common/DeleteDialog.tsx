import { Button, Dialog, DialogContent, Typography } from "@mui/material";

interface Props {
  open: boolean;
  label: string;
  onClose: () => void;
  onSubmit: () => void;
}
export const DeleteDialog = ({ open, label, onClose, onSubmit }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <Typography textAlign="center" variant="h2" color="red">
          DELETE
        </Typography>
        <Typography
          textAlign="center"
          variant="h2"
          color="Highlight"
          whiteSpace="nowrap"
          textOverflow="ellipsis">
          {label}
        </Typography>

        <Button fullWidth variant="outlined" color="error" onClick={onSubmit}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};
