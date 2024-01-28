import {NormalButton, SoloInputNumberFromTo, SoloInputTemplateLiteralSelect, SoloInputText} from "../../../ui";
import {RootState} from "../../../app/store";
import React from "react";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {Gender, genders, nationalities, Nationality} from "../../../model/templateLiteral";
import {UndefinedFromTo} from "../../../model/commonModel";
import {FilterContainer, UseFilterProps} from "../../common/ListFilter";
import {TextFields} from "../../../language";
import {useAppSelector} from "../../../app/hooks";

export interface TeacherListFilterModel {
    name?: string;
    gender?: Gender;
    nationality?: Nationality;
    age: UndefinedFromTo<number>;
}

export const teacherFilterInitValue: TeacherListFilterModel = {
    name: undefined,
    gender: undefined,
    nationality: undefined,
    age: {
        from: undefined,
        to: undefined
    },
}

const TeacherListFilter = ({filter, setFilterPartially, reset}: UseFilterProps<TeacherListFilterModel>) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    return (
        <FilterContainer>
            <SoloInputText
                label={`${texts.model.teacher.name} (or Furigana)`}
                value={filter.name}
                onChange={(value?: string) => setFilterPartially({name: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Gender"}
                value={filter.gender}
                options={genders}
                onSelected={(value?: Gender) => setFilterPartially({gender: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Nationality"}
                value={filter.nationality}
                options={nationalities}
                onSelected={(value?: Nationality) => setFilterPartially({nationality: value})}
            />
            <SoloInputNumberFromTo
                label={texts.common.age}
                value={filter.age}
                onChange={(value: UndefinedFromTo<number>) => setFilterPartially({age: value})}
            />
            <NormalButton size="large" onClick={reset}>Clear Filter</NormalButton>
        </FilterContainer>
    )
}

export const filterTeacherList = (filter: TeacherListFilterModel, teacherList: TeacherResponseModel[]): TeacherResponseModel[] => {
    return teacherList.filter(
        (teacher: TeacherResponseModel): boolean => {
            return (filter.name ? (teacher.name.includes(filter.name)
                    || teacher.furigana.includes(filter.name)) : true)
                && (filter.gender ? teacher.gender === filter.gender : true)
                && (filter.nationality ? teacher.nationality === filter.nationality : true)
                && (filter.age.from ? filter.age.from <= teacher.age : true)
                && (filter.age.to ? teacher.age <= filter.age.to : true)
        }
    );
}

export default React.memo(TeacherListFilter);