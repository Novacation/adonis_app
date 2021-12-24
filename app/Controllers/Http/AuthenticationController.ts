import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiToken from 'App/Models/Api_Token';
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class AuthenticationController {
  public async register({ request, response, auth }: HttpContextContract) {
    const userValidator = new CreateUserValidator(request.ctx!);
    const payload = await request.validate({
      schema: userValidator.schema,
      messages: userValidator.messages,
    });

    try {
      const user = await User.create(payload);
      const token = await auth.use('api').generate(user, { expiresIn: '1days' });
      return token;
    } catch (error) {
      return response.badRequest('Invalid credentials');
    }
  }

  public async authenticate({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.body();
    try {
      const user = await auth.use('api').verifyCredentials(email, password);

      const apiTokens = await ApiToken.query().where('user_id', user.id);

      if (apiTokens) {
        apiTokens.forEach(async (apiToken) => {
          await apiToken.delete();
        });
      }

      const token = await auth.use('api').generate(user);

      return response.status(200).json({
        token,
      });
    } catch (error) {
      return response.badRequest('Invalid credentials');
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke();

    return response
      .status(200)
      .send("<h1 style='text-align: center; margin:'center'>Register Page</h1>");
  }
}
