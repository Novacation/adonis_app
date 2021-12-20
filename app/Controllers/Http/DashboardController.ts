import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DashboardController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate();

      return response.status(200).json(user);
    } catch (error) {
      return response
        .status(401)
        .send("<h1 style='text-align: center; margin:'center'>Register Page</h1>");
    }
  }
}
