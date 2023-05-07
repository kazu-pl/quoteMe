import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "To pole jest wymagane",
  },
  number: {
    min: (props) => `Minimalna dozwolona wartość to: ${props.min}`,
    max: (props) => `Maksymalna dozwolona wartość to:  ${props.max}`,
  },
  string: {
    email: "Podaj poprawny email",
  },
});

export default yup;

export type Yup = typeof yup;
