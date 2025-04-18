export enum EnumAppRoutes {
  HomePage = '',
  SignIn = 'authenticate/signin',
  SignUp = 'authenticate/signup',
  ForgotPassword = 'authenticate/forgotpassword',
  ResetPassword = 'authenticate/resetpassword',
  Products = 'product/:productType',
  Product = 'product/:productType/:productCode',
  Contact = 'contact',
  Account = 'account',
  AccountInformations = 'account/informations',
  AccountInvoices = 'account/invoices',
  AccountGames = 'account/games',
  Basket = 'order/basket',
  Checkout = 'order/checkout',
  CheckoutSuccess = 'order/checkout/success',
  Faq = 'faq',
}
