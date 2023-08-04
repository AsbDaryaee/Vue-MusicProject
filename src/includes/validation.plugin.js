import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  numeric,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as notOneOf,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alphaSpaces", alphaSpaces);
    defineRule("email", email);
    defineRule("numeric", numeric);
    defineRule("minVal", minVal);
    defineRule("maxVal", maxVal);
    defineRule("confirmed", confirmed);
    defineRule("notOneOf", notOneOf);
    defineRule("countryExcluded", notOneOf);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The Field ${ctx.field} is Required.`,
          min: `The Field ${ctx.field} is Too Short.`,
          max: `The Field ${ctx.field} is Too Long.`,
          alphaSpaces: `The Field ${ctx.field} May Only Contain Alphabetic Characters and Spaces.`,
          email: `The ${ctx.field} Must Be a Valid Email.`,
          minVal: `The Field ${ctx.field} is Too Low`,
          maxVal: `The Field ${ctx.field} is Too High`,
          confirmed: `The Field ${ctx.field} is Too High`,
          notOneOf: `You Cannot Use This Value For The Field ${ctx.field}`,
          countryExcluded: `We Cannot Accept Users From This Countrty.`,
          confirmed: `The Passwords Do Not Match.`,
          tos: `You Must Accept The Terms Of Services To Continue.`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The Field ${ctx.field} Is Not Valid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnModelUpdate: true,
    });
  },
};
