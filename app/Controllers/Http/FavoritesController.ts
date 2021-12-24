import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Band from 'App/Models/Band';
import Favorite from 'App/Models/Favorite';

export default class FavoritesController {
  public async favorite({ request, response, auth }: HttpContextContract) {
    //incrementar o número de favoritos da banda
    //salvar que o usuário favoritou a banda

    try {
      const user = await auth.use('api').authenticate();
      const { bandId } = request.body();

      const band = await Band.find(bandId);

      if (band) {
        const isFavorite = await Favorite.query().where('user', user.id).where('band', band.id);

        if (isFavorite.length) {
          const newBand = await Band.updateOrCreate(
            { id: band.id },
            { favorites: band.favorites - 1 }
          );

          await isFavorite[0].delete();

          return response.status(200).json({
            newBand,
          });
        } else {
          const newBand = await Band.updateOrCreate(
            { id: band.id },
            { favorites: band.favorites + 1 }
          );

          const newFavorite = await Favorite.create({ user: user.id, band: band.id });

          return response.status(200).json({
            newBand,
            newFavorite,
          });
        }
      } else return response.status(401).json({ error: 'Band not found' });
    } catch (error) {
      return response
        .status(401)
        .send("<h1 style='text-align: center; margin:'center'>Register Page</h1>");
    }
  }

  public async getFavoriteBands({}: HttpContextContract) {}
}
