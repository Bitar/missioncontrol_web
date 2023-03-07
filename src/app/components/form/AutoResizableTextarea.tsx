import React, { useCallback, useEffect, useState } from "react";
import { Field } from "formik";
import clsx from "clsx";

interface AutoResizableTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string,
  value: string;
}

const AutoResizableTextarea = ({
                                 className,
                                 value,
                                 ...restProps
                               }: AutoResizableTextareaProps) => {
  const classSelector = 'mc-textarea';
  const [originalHeight, setOriginalHeight] = useState<number | undefined>();

  const handleInput = useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLTextAreaElement;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
      // setValue(target.value);
    }
  }, []);

  useEffect(() => {

    const textAreas = document.querySelectorAll(`.${classSelector}`) as NodeListOf<
      HTMLTextAreaElement
    >;

    textAreas.forEach((textarea) => {
      textarea.addEventListener("input", handleInput);
    });

    return () => {
      textAreas.forEach((textarea) => {
        textarea.removeEventListener("input", handleInput);
      });
    };
  }, [handleInput]);

  useEffect(() => {
    const textAreas = document.querySelectorAll(`.${classSelector}`) as NodeListOf<
      HTMLTextAreaElement
    >;

    textAreas.forEach((textarea) => {
      if (!originalHeight) {
        setOriginalHeight(textarea.clientHeight);
      }

      if (value === "") {
        textarea.style.height = `${originalHeight}px`;
      }
    });
  }, [originalHeight, value]);

  return <Field
    className={clsx('mc-textarea form-control mb-3 mb-lg-0', className)}
    as="textarea"
    placeholder="Body"
    value={value}
    {...restProps}
  />
};

export default AutoResizableTextarea;