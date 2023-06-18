import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Table, {Filter, ShowColumnController} from "../features/subject/base/Table";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Table">
                <Table/>
            </ComponentPreview>
          <ComponentPreview path="/Filter">
            <Filter/>
          </ComponentPreview>
            <ComponentPreview path="/ShowColumnController">
                <ShowColumnController/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;