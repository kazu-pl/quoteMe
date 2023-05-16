import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "To pole jest wymagane",
  },
  number: {
    min: (props) => `Minimalna dozwolona ilość znaków: ${props.min}`,
    max: (props) => `Maksymalna dozwolona ilość znaków:  ${props.max}`,
  },
  string: {
    email: "Podaj poprawny email",
    min: (props) => `Minimalna dozwolona ilość znaków: ${props.min}`,
    max: (props) => `Maksymalna dozwolona ilość znaków:  ${props.max}`,
  },
});

export default yup;

export type Yup = typeof yup;
