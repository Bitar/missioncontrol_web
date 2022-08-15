import React, { FC, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ErrorMessage } from "formik";
import { updateData } from "./FormHelper";

type Props = {
  label: string
  api: any,
  onChangeData: any
}

let options: any[] = [];

const SelectMC: FC<Props> = ({ label, api, onChangeData }) => {
    const [optionSelected, setOptionSelected] = useState<any | null>(null);
    const optionsLoaded = useRef(false);

    useEffect(() => {
      if (options.length === 0) {
        api().then((response: any) => {
          response?.data?.forEach(function(value: any) {
            let option = {
              value: value.id,
              label: value.name,
              isSelected: false,
              original: value
            };
            options.push(option);
          });
        });
      }
    }, []);

    const handleChange = (selectedOption: any) => {
      setOptionSelected(selectedOption);

      let object = selectedOption.original;
      onChangeData(object);
    };

    return (
      <>
        <label className="col-lg-4 col-form-label required fw-bold fs-6">{label}</label>
        <div className="col-lg-8 fv-row">
          {optionsLoaded &&
            <Select
              isSearchable
              defaultValue={optionSelected}
              options={options}
              onChange={handleChange}
            />
          }
          <div className="text-danger mt-2">
            <ErrorMessage name="description" />
          </div>
        </div>
      </>
    );
  }
;

export { SelectMC };