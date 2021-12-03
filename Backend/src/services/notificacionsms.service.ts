import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionsmsService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Servicio de email SendGrid
   */

  EnviarEmail(email: string, contenido: string): void {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email,
      from: 'test@example.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: contenido,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  /*
   * Servicio de mensajeria twilio
   */

  EnviarSMS(telefono: string, mensaje: string): void {
    const accountSid = 'ACed0e648cad9d0a69ad0866c6b67f8f35';
    const authToken = '6c5a0b654561d68a788c446b6ef40ad1';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: mensaje,
        from: '+16109897642',
        to: '+57' + telefono
      })
      .then((message: any) => console.log(message.sid));
  }
}
