export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Question {
  id: number;
  typeString: string;
  title: string;
  isRequired: boolean;
  description?: string;
  options:
    | MultipleChoice
    | CheckBox
    | ShortAnswer
    | IRadioElement
    | IInputElement
    | ICheckboxElement
    | ISelectElement;
}

export interface IRadioElement {
  option: { val: string; label: string };
}

interface ISelectElement {
  values: string[];
  label: string;
}

interface IDateElement {
  multiple: null | boolean;
  range: null | boolean;
}

interface ICheckboxElement {
  option: { label: string; required: boolean };
}
interface IInputElement {
  option: {
    label: string;
    hint: string | null;
    required: boolean;
    type: string;
  };
}

export interface MultipleChoice {
  options: string[];
  response: string | null;
}

export interface CheckBox {
  options: string[];
  response: string[] | null;
}

export interface ShortAnswer {
  response: string | null;
}
