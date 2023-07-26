import MuiSkeleton from '@mui/material/Skeleton';


export const Skeleton = () => {
    return (
        <MuiSkeleton sx={{marginY: 3}} animation="wave" variant="rounded" width="100%" height={50}/>
    );
};