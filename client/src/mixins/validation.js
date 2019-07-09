export default {
  data(){
    return {
      requiredField: [
        v => !!v || 'Обов\'язкове поле'
      ],
      requiredYear: [
        v => !!v || 'Обов\'язкове поле',
        v => String(v).length == 4 && v > 2000 || 'Некоректний формат дати'
      ],
      creditsValidation: [
        v => !!v || 'Обов\'язкове поле',
        v => v % 5 === 0 || 'Кількість кредитів повинна будти кратним 5'
      ],
      emailRules: [
        v => !!v || 'Обов\'язкове поле',
        v => this.emails.indexOf(v) == -1 || 'Користувач з такою email адресою вже існує',
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Не коректний Email'
      ],
      loginEmailRules: [
        v => !!v || 'Обов\'язкове поле',
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Не коректний Email'
      ],
      isNumber: [
        v => _.isNumber(parseInt(v)) || 'Введіть будь ласка число'
      ],
        passwordRules: [
            v => !!v || 'Обов\'язкове поле',
            v => String(v).length >= 8 || 'Не менше 8 символів'
        ],
        repeatPasswordRules: [
            v => !!v || 'Обов\'язкове поле',
            v => v == this.editedItem.password || `Не вірний пароль`
        ],
        oldPasswordRules: [
            v => !!v || 'Обов\'язкове поле'
        ],
        newPasswordRules: [
            v => !!v || 'Обов\'язкове поле',
            v => String(v).length >= 8 || 'Не менше 8 символів',
            v => v != this.editedItem.oldPassword || `Такий пароль вже існує`
        ],
        repeatNewPasswordRules: [
            v => !!v || 'Обов\'язкове поле',
            v => v == this.editedItem.newPassword || `Не вірний пароль`
        ]
    }
  }
}