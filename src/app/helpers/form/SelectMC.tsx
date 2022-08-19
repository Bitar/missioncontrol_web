import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { ErrorMessage } from "formik";

type Props = {
  label: string
  api?: any
  onChangeData: any
  data?: any
}

const SelectMC: FC<Props> = ({ label, onChangeData, api, data }) => {
  const [options, setOptions] = useState<any[]>([]);
  const [optionSelected, setOptionSelected] = useState<any | null>(null);
  const [optionsLoaded, setOptionsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (options.length === 0) {
      if (api) {
        api().then((response: any) => {
          let options: any[] = [];
          response?.data?.forEach(function(value: any) {
            let option = {
              value: value.id,
              label: value.name || value.title,
              isSelected: false,
              original: value
            };

            options.push(option);
          });

          setOptions(options);
          setOptionsLoaded(true);
        });
      } else if (data) {
        console.log("in data");
        console.log(data);
      } else {
        console.log("in else");
      }
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
        {optionsLoaded && (
          <Select
            isSearchable
            defaultValue={optionSelected}
            options={options}
            onChange={handleChange}
          />
        )}
        <div className="text-danger mt-2">
          <ErrorMessage name="description" />
        </div>
      </div>
    </>
  );
};
export { SelectMC };
