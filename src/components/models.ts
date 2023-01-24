export interface Question {
  id: number;
  typeString: string;
  title: string;
  isRequired: boolean;
  description?: string;
  userInput: any;
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
  option: { val: string; label: string; color?: string };
}

interface ISelectElement {
  values: string[];
  label: string;
  color?: string;
}

interface IDateElement {
  multiple: null | boolean;
  range: null | boolean;
  color?: string;
}

interface ICheckboxElement {
  option: { label: string; required: boolean; color?: string };
}
interface IInputElement {
  option: {
    label: string;
    hint: string | null;
    required: boolean;
    type: string;
    color?: string;
  };
}

export interface MultipleChoice {
  options: string[];
  response: string | null;
  color?: string;
}

export interface CheckBox {
  options: string[];
  response: string[] | null;
  color?: string;
}

export interface ShortAnswer {
  response: string | null;
}
