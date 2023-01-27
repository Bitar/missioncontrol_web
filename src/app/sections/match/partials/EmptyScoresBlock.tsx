import { TextImageCell } from "../../../modules/table/columns/TextImageCell";
import { ErrorMessage, Field } from "formik";
import React, { FC } from "react";
import { Team } from "../../../models/squad/Team";
import { useActivity } from "../../activity/core/contexts/ActivityContext";

type Props = {
  roundIndex: number,
  team: Team
}

export const EmptyScoresBlock: FC<Props> = ({roundIndex, team}) => {
  const {activity} = useActivity();

  return (
      <div>
        <TextImageCell dImage={team?.image} dText={team?.name} size={'30'} />

        <div>
          {activity?.game_mode?.scoring_settings.map((settings, index) => {
            return (
              <div className='row mb-6' key={`empty-scoresheet-${index}`}>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {settings?.key?.key}
                </label>
                <div className='col-lg-8 fv-row'>
                  <Field
                    type='text'
                    name={team?.id + '__' + roundIndex + '__' + settings?.key?.key}
                    className='form-control form-control-sm mb-3 mb-lg-0'
                    autoComplete='off'
                    defaultValue={0}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name={team?.id + '__' + roundIndex + '__' + settings?.key?.key} />
                  </div>

                  {/*<Field*/}
                  {/*  type='text'*/}
                  {/*  name='title'*/}
                  {/*  placeholder='Title'*/}
                  {/*  className='form-control mb-3 mb-lg-0'*/}
                  {/*  autoComplete='off'*/}
                  {/*  // value={}*/}
                  {/*/>*/}
                </div>
              </div>
            )
          })}
        </div>
      </div>
  )
}