import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormLabel,
    Rating as MuiRating,
    Skeleton,
    Typography
} from "@mui/material";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {Slider, Star} from "../../../formFields";
import {SubjectRatingLanguage} from "../../../language";
import {PrivateButton} from "../../auth";
import {Permission} from "../../auth/Role";
import {ColumnGraph} from "../../common";
import {GraphKeys, Request} from "./model";
import {actions} from "./slice";
import thunk from "./thunk";
import {RouterPop} from "../../../widget";

const Rating = () => {
    const dispatch = useAppDispatch();
    const texts = useAppSelector((root: RootState) => root.common.texts);
    const {id} = useParams();
    const isRatingLoading = useAppSelector(
        (root: RootState) => root.subjectRating.isLoading,
    );
    const average = useAppSelector((root: RootState) => root.subjectRating.average);
    const rating = useAppSelector((root: RootState) => root.subjectRating.rating);
    const subject = useAppSelector((root: RootState) =>
        root.subject.list.find((subject) => subject.id === Number(id)),
    );
    const star = average ? Math.round(average?.star * 100) / 100 : 0;
    const userId = useAppSelector((root: RootState) => root.auth.user?.id);

    const columns = [];
    if (average)
        columns.push({
            label: "Average",
            backgroundColor: "#6200ea",
            values: GraphKeys.map(
                (key) => average[key as keyof typeof average],
            ) as number[],
        });
    if (rating)
        columns.push({
            label: "Your",
            backgroundColor: "#424242",
            values: GraphKeys.map((key) => rating[key as keyof typeof rating]) as number[],
        });

    useEffect(() => {
        if (id && !average) {
            dispatch(thunk.fetchAverageBySubjectId(Number(id)));
            if (userId && !rating) {
                dispatch(thunk.fetchBySubjectIdAndUserId(Number(id), userId));
            }
        }
    }, [dispatch, id, userId, average, rating]);

    return (
        <RouterPop maxWidth="lg">
            <Box minWidth={900}>
                {isRatingLoading ? (
                    <Skeleton
                        sx={{bgcolor: "default"}}
                        variant="rectangular"
                        height={500}
                        animation="wave"
                    />
                ) : (
                    subject && (
                        <Box>
                            <ColumnGraph
                                title={`${subject.name} (Total Rating: ${average?.total || 0})`}
                                data={{
                                    label: GraphKeys.map(
                                        (key) =>
                                            texts.model.subject.rating[key as keyof SubjectRatingLanguage],
                                    ),
                                    columns,
                                }}
                            />
                            <Box display="flex" justifyContent="end">
                                <MuiRating
                                    sx={{
                                        marginX: 4,
                                        cursor: "default"
                                    }}
                                    name="customized-10"
                                    value={star}
                                    max={10}
                                    precision={0.1}
                                    readOnly
                                />
                                <FormLabel>
                                    {star + " "}
                                    {texts.model.subject.rating.star}
                                </FormLabel>
                            </Box>
                        </Box>
                    )
                )}
                <PrivateButton
                    permission={Permission.SUBJECT_RATING_CREATE}
                    sx={{marginTop: 4}}
                    onClick={() => dispatch(actions.setSubjectId(Number(id)))}
                    fullWidth
                    size="large"
                    variant="contained"
                    color="warning">
                    {rating ? "Rate Again" : "Rate"}
                </PrivateButton>
            </Box>
        </RouterPop>
    );
};

export const Form = () => {
    const dispatch = useAppDispatch();
    const subjectId = useAppSelector(
        (root: RootState) => root.subjectRating.subjectId,
    ) as number;
    const userId = useAppSelector((root: RootState) => root.auth.user?.id);
    const rating = useAppSelector((root: RootState) => root.subjectRating.rating);
    const subject = useAppSelector((root: RootState) =>
        root.subject.list.find((subject) => subject.id === subjectId),
    );

    return (
        <Dialog
            open={!!subjectId}
            onClose={() => dispatch(actions.setSubjectId(undefined))}>
            <DialogContent sx={{backgroundColor: "background.default"}}>
                <DialogTitle textAlign="center" fontSize={48}>
                    {rating ? "Update rating" : "Rate Subject"}
                    <Typography variant="h4" component="p" color="Highlight">
                        {subject?.name}
                    </Typography>
                </DialogTitle>
                <FormDetail
                    rating={rating}
                    onSubmit={(ratingRequest) =>
                        rating
                            ? dispatch(
                                thunk.edit(rating.id as number, {
                                    ...ratingRequest,
                                    userId: userId as number,
                                    subjectId: subjectId,
                                }),
                            )
                            : dispatch(
                                thunk.add({
                                    ...ratingRequest,
                                    userId: userId as number,
                                    subjectId: subjectId,
                                }),
                            )
                    }
                />
            </DialogContent>
        </Dialog>
    );
};

interface FormInterface {
    rating?: Request;
    onSubmit: (formValues: Request) => void;
}

const FormDetail = ({
    rating,
    onSubmit
}: FormInterface) => {
    const isLoading = useAppSelector((state: RootState) => state.subject.isLoading);

    const initValue: Request = rating || {
        userId: 0,
        subjectId: 0,
        practicality: 0,
        difficult: 0,
        homework: 0,
        teacherPedagogical: 0,
        testDifficult: 0,
        star: 0,
    };

    const {
        control,
        handleSubmit
    } = useForm<Request>({
        defaultValues: initValue,
    });

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Slider name="practicality" label="Practicality" control={control}/>
                <Slider name="difficult" label="difficult" control={control}/>
                <Slider name="homework" label="homework" control={control}/>
                <Slider
                    name="teacherPedagogical"
                    label="Teacher Pedagogical"
                    control={control}
                />
                <Slider name="testDifficult" label="Test Difficult" control={control}/>
                <Star name="star" label="Star" control={control}/>
                <Button
                    sx={{marginTop: 4}}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="warning"
                    disabled={isLoading}>
                    {isLoading ? <CircularProgress/> : "Submit"}
                </Button>
            </form>
        </Box>
    );
};

export default Rating;
